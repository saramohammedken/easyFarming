import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SensorReadingService } from '../services/sensor-reading.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SensorReading } from '../models/sensorReaading.interfaces';
import { SensorTypeService } from '../services/sensor-type.service';
import { forkJoin } from 'rxjs';
import { SensorType } from '../models/sensorType.interfaces';

@UntilDestroy()
@Component({
  selector: 'app-sensor-reading',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule,  NgbAlertModule],
  templateUrl: './sensor-reading.component.html',
  styleUrl: './sensor-reading.component.scss'
})
export class SensorReadingComponent {
  
  sensorTypesList: any =[];
  sensorReadingList: any =[];
  alertExists: boolean = false;
  alertType: string = '';
  alertMessage: string = '';
  private intervalId: any;

  form: FormGroup = this.fb.group({
    id: [''],
    sensorTypeId: ['',Validators.required], 
    value: ['',Validators.required],
    timestamp: ['']
  });

  constructor(private fb: FormBuilder, private sensorReadingService: SensorReadingService, private sensorTypeService: SensorTypeService) {}


  ngOnInit() {
    this.getSensorReadings(); 
    this.intervalId = setInterval(() => this.getSensorReadings() , 3000);  
  }
  
  getSensorReadings() {
    let sensorReadingList = this.sensorReadingService.getList();
    let sensorTypeList = this.sensorTypeService.getList();

    let getSensorReadingList$ = forkJoin({sensorReadingList, sensorTypeList});
    getSensorReadingList$?.pipe(untilDestroyed(this)).subscribe({
      next: (res: any) => {
      this.sensorReadingList = res.sensorReadingList.map((val: SensorReading) => { return {...val, name: res.sensorTypeList.find((type:SensorType)=> type.id == val.sensorTypeId)?.name}} )
      this.sensorTypesList = res.sensorTypeList;
      },
      error: (err) => {
        this.alertExists = true;
        this.alertType = 'danger';
        this.alertMessage = err.error;
      }
    });
  }

  submit() {
    if(!this.form.valid) return;

    let data: SensorReading = this.form.getRawValue();
    if(!data.id){
      
      this.sensorReadingService.add(data)?.pipe(untilDestroyed(this)).subscribe({
        next: (res) => {
          this.alertExists = true;
          this.alertType = 'success';
          this.alertMessage = 'Added.';
          this.form.reset();
        },
        error: (err) => {
          this.alertExists = true;
          this.alertType = 'danger';
          this.alertMessage = err.error;
        }
      });
    }
    else {
      this.sensorReadingService.update(data)?.pipe(untilDestroyed(this)).subscribe({
        next: (res) => {
          this.alertExists = true;
          this.alertType = 'success';
          this.alertMessage = 'Saved.';
          this.form.reset();
        },
        error: (err) => {
          this.alertExists = true;
          this.alertType = 'danger';
          this.alertMessage = err.error;
        }
      });
    }
  }

  update(sensorReaading: any){
    this.form.patchValue({
      id: sensorReaading.id,
      sensorTypeId: sensorReaading.sensorTypeId,
      value: sensorReaading.value
    });
  }

  remove(id: string){ 
    this.sensorReadingService.remove(id)?.pipe(untilDestroyed(this)).subscribe({
      next: (res) => {
        this.alertExists = true;
        this.alertType = 'success';
        this.alertMessage = 'Deleted.';
        //this.getSensorReadings();
      },
      error: (err) => {
        this.alertExists = true;
        this.alertType = 'danger';
        this.alertMessage = err.error;
      }
    });
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

}

