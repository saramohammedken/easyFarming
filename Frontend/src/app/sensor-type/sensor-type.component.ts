import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SensorTypeService } from '../services/sensor-type.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SensorType } from '../models/sensorType.interfaces';

@UntilDestroy()
@Component({
  selector: 'app-sensor-type',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule,  NgbAlertModule],
  templateUrl: './sensor-type.component.html',
  styleUrl: './sensor-type.component.scss'
})
export class SensorTypeComponent {
  
  alertExists: boolean = false;
  alertType: string = '';
  alertMessage: string = '';

  form: FormGroup = this.fb.group({
    id: [''],
    name: ['',Validators.required], 
    description: ['',Validators.required]
  });

  constructor(private fb: FormBuilder, private sensorTypeService: SensorTypeService) {}

  sensorTypesList: any =[];

  ngOnInit() {
    this.getSensorTypes();
  }

  getSensorTypes() {
    this.sensorTypeService.getList()?.pipe(untilDestroyed(this)).subscribe({
      next: (res) => {
        this.sensorTypesList = res;
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

    let data: SensorType = this.form.getRawValue();
    if(!data.id){
      
      this.sensorTypeService.add(data).pipe(untilDestroyed(this)).subscribe({
        next: (res) => {
          this.alertExists = true;
          this.alertType = 'success';
          this.alertMessage = 'Added.';
          //this.getSensorTypes();
          this.sensorTypesList.push(res);
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
      this.sensorTypeService.update(data).pipe(untilDestroyed(this)).subscribe({
        next: (res) => {
          this.alertExists = true;
          this.alertType = 'success';
          this.alertMessage = 'Saved.';
          // let updatedRow = this.sensorTypesList.find((val: any ) => val.id == data.id) || {name: '', description:''};
          // updatedRow.name = res.name;
          // updatedRow.description = res.description;
          this.getSensorTypes();
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

  update(sensorType: any){
    this.form.patchValue({
      id: sensorType.id,
      name: sensorType.name,
      description: sensorType.description
    });
  }

  remove(id: string){ 
    this.sensorTypeService.remove(id)?.pipe(untilDestroyed(this)).subscribe({
      next: (res) => {
        this.alertExists = true;
        this.alertType = 'success';
        this.alertMessage = 'Deleted.';
        this.getSensorTypes();
      },
      error: (err) => {
        this.alertExists = true;
        this.alertType = 'danger';
        this.alertMessage = err.error;
      }
    });
  }
}
