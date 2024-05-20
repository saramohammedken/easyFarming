import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SensorReadingComponent } from './sensor-reading.component';
import { SensorReadingService } from '../services/sensor-reading.service';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SensorTypeService } from '../services/sensor-type.service';

describe('SensorReadingComponent', () => {
  let component: SensorReadingComponent;
  let fixture: ComponentFixture<SensorReadingComponent>;
  let sensorReadingServiceMock: any;
  let sensorTypeServiceMock: any;
  let sensorReadingService: jasmine.SpyObj<SensorReadingService>;
  let sensorTypeService: jasmine.SpyObj<SensorTypeService>;

  beforeEach(async () => {
    sensorReadingServiceMock = jasmine.createSpyObj('SensorReadingService', ['getList', 'add', 'update', 'remove']);
    sensorTypeServiceMock = jasmine.createSpyObj('SensorTypeService', ['getList']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SensorReadingComponent, CommonModule],
      declarations: [],
      providers: [
        { provide: SensorReadingService, useValue: sensorReadingServiceMock },
        { provide: SensorTypeService, useValue: sensorTypeServiceMock },
      ]
    }).compileComponents();
    sensorReadingService = TestBed.inject(SensorReadingService) as jasmine.SpyObj<SensorReadingService>;
    sensorTypeService = TestBed.inject(SensorTypeService) as jasmine.SpyObj<SensorTypeService>;
    fixture = TestBed.createComponent(SensorReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display Sensors Reading', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('tr').length).toBeGreaterThan(0);
  });

  it('should get Sensors Reading list', () => {
    const sensorReadings = [
      { id: '1',sensorTypeId: 'D4334-443', value: 100, name: 'Temperature Sensor', timestamp: '30 Oct' },
      { id: '2',sensorTypeId: 'D4334-345', value: 200, name: 'Pressure Sensor', timestamp: '15 Oct' }
    ];
    const sensorTypes = [
      { id: 'D4334-443',name: 'Temperature Sensor',description: 'test decrip' },
      { id: 'D4334-345',name: 'Pressure Sensor',description: 'test decrip 2'}
    ];

    sensorReadingService.getList.and.returnValue(of(sensorReadings));
    sensorTypeService.getList.and.returnValue(of(sensorTypes));

    component.ngOnInit();

    fixture.detectChanges();

    expect(sensorReadingService.getList).toHaveBeenCalled();
    expect(sensorTypeService.getList).toHaveBeenCalled();
    expect(component.sensorReadingList).toEqual([
      { id: '1', sensorTypeId: 'D4334-443', value: 100, name: 'Temperature Sensor', timestamp: '30 Oct' },
      { id: '2', sensorTypeId: 'D4334-345', value: 200, name: 'Pressure Sensor', timestamp: '15 Oct' }
    ]);
    expect(component.sensorTypesList).toEqual(sensorTypes);

  });
  
  it('should add a Sensors Reading', fakeAsync(() => {
    expect(component).toBeTruthy();
    expect(component.form.valid).toBeFalse();
    expect(component.form.get('sensorTypeId')?.value).toBe('');
    expect(component.form.get('value')?.value).toBe('');
    let api1Data = {id: '1',sensorTypeId: '2', value: 3.3, timestamp: '30 Oct'};
    component.form.patchValue({
      value: 123,
      sensorTypeId: '05d98d78-e3a1-471a-b4d7-81cf2220ac40'
    });

    let dd = sensorReadingService.add;
    
    dd.and.returnValue(of(api1Data));
    component.submit();
    expect(component.alertExists).toBe(true);
    expect(component.alertType).toBe('danger');
    expect(component.alertMessage).toBeUndefined();
    tick();
    dd.and.returnValue(throwError(() => new Error()));
    component.submit();
    
    // sensorReadingService.add(component.form.getRawValue()).pipe().subscribe({
    //   next: (res) => {
    //   },
    //   error: (err) => {
    //     expect(component.alertExists).toBe(true);
    //     expect(component.alertType).toBe('danger');
    //   }
    // })

    fixture.detectChanges();
  }));

  it('should handle add error', () => {
    const data = { id: '', sensorTypeId: 'Sensor1', value: 100, timestamp: '30 May' };
    const errorResponse = { error: 'Add failed' };

    component.form.setValue(data);

    sensorReadingService.add.and.returnValue(throwError(errorResponse));

    component.submit();

    expect(sensorReadingService.add).toHaveBeenCalledWith(data);
    expect(component.alertExists).toBeTrue();
    expect(component.alertType).toBe('danger');
    expect(component.alertMessage).toBe('Add failed');
  });

  it('should not call add if form is invalid', () => {
    component.form.setValue({ id: '', sensorTypeId: '', value: '', timestamp: '' });

    component.submit();

    expect(sensorReadingService.add).not.toHaveBeenCalled();
  });

  it('should update a Sensors Reading', () => {
    expect(component).toBeTruthy();
    expect(component.form.valid).toBeFalse();
    expect(component.form.get('sensorTypeId')?.value).toBe('');
    expect(component.form.get('value')?.value).toBe('');
    let api1Data = {id: '1',sensorTypeId: '2', value: 3.3, timestamp: '30 Oct'};
    component.form.patchValue({
      id: '1',
      value: 123,
      sensorTypeId: '05d98d78-e3a1-471a-b4d7-81cf2220ac40'
    });

    let dd = sensorReadingService.update;
    
    dd.and.returnValue(of(api1Data));
    component.submit();
    expect(component.alertExists).toBe(true);
    expect(component.alertType).toBe('danger');
    expect(component.alertMessage).toBeUndefined();
    component.form.reset();
    dd.and.returnValue(throwError({error: ''}));
    component.submit();

    fixture.detectChanges();
  });

  it('should handle update error', () => {
    const data = { id: '444-444', sensorTypeId: 'Sensor1', value: 100, timestamp: '30 May' };
    const errorResponse = { error: 'Update failed' };

    component.form.setValue(data);

    sensorReadingService.update.and.returnValue(throwError(errorResponse));

    component.submit();

    expect(sensorReadingService.update).toHaveBeenCalledWith(data);
    expect(component.alertExists).toBeTrue();
    expect(component.alertType).toBe('danger');
    expect(component.alertMessage).toBe('Update failed');
  });

  it('should patch Value to the for,', () => {
    let data = { id: '1', sensorTypeId: 'Sensor1', value: 100, timestamp: '30 May' };
    component.update(data)
    expect(component.form.getRawValue().id).toBe('1');
  });

  it('should remove a Sensor Reading', () => {
    const response = { msg: 'SensorReading deleted' };
    sensorReadingService.remove.and.returnValue(of(response));

    component.remove('1');

    expect(sensorReadingService.remove).toHaveBeenCalledWith('1');
    expect(component.alertExists).toBeTrue();
    expect(component.alertType).toBe('danger');
    expect(component.alertMessage).toBeUndefined();
  });

  it('should handle remove error', () => {
    const errorResponse = { error: 'remove failed' };
    sensorReadingService.remove.and.returnValue(throwError(errorResponse));

    component.remove('1');

    expect(sensorReadingService.remove).toHaveBeenCalledWith('1');
    expect(component.alertExists).toBeTrue();
    expect(component.alertType).toBe('danger');
    expect(component.alertMessage).toBe('remove failed');
  });
  
});
