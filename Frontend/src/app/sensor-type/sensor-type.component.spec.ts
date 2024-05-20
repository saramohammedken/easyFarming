import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SensorTypeComponent } from './sensor-type.component';
import { SensorTypeService } from '../services/sensor-type.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { of, throwError } from 'rxjs';

describe('SensorTypeComponent', () => {
  let component: SensorTypeComponent;
  let fixture: ComponentFixture<SensorTypeComponent>;
  let sensorTypeServiceMock: any;
  let sensorTypeService: jasmine.SpyObj<SensorTypeService>;

  beforeEach(async () => {
    sensorTypeServiceMock = jasmine.createSpyObj('SensorTypeService', ['getList', 'add', 'update', 'remove']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SensorTypeComponent, CommonModule],
      declarations: [],
      providers: [
        { provide: SensorTypeService, useValue: sensorTypeServiceMock },
      ]
    }).compileComponents();
    sensorTypeService = TestBed.inject(SensorTypeService) as jasmine.SpyObj<SensorTypeService>;
    fixture = TestBed.createComponent(SensorTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display Sensors Type', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('tr').length).toBeGreaterThan(0);
  });

  it('should get Sensors Types list', () => {
    let apiData = [{id: 'D4334-443',name: 'test name',description: 'test decrip'}];
    sensorTypeService.getList.and.returnValue(of(apiData));
    component.getSensorTypes();
    expect(sensorTypeService.getList).toHaveBeenCalled();
    expect(component.sensorTypesList.length).toBeGreaterThanOrEqual(0);
  });

  it('should handle get Sensors Types list error', () => {
    const errorResponse = { error: 'No Data' };
    sensorTypeService.getList.and.returnValue(throwError(errorResponse));
    component.getSensorTypes();
    expect(component.alertExists).toBeTrue();
    expect(component.alertType).toBe('danger');
    expect(component.alertMessage).toBe('No Data');
  });
  
  it('should add a Sensors type', () => {
    expect(component).toBeTruthy();
    expect(component.form.valid).toBeFalse();
    expect(component.form.get('name')?.value).toBe('');
    expect(component.form.get('description')?.value).toBe('');
    let apiData = {id: '1',name: 'test name', description: 'test description'};
    component.form.patchValue({
      name: 'test name',
      description: 'test description'
    });

    let dd = sensorTypeService.add;
    
    dd.and.returnValue(of(apiData));
    component.submit();
    expect(component.alertExists).toBe(true);
    expect(component.alertType).toBe('success');
    expect(component.alertMessage).toBe('Added.');
    dd.and.returnValue(throwError(() => new Error()));
    component.submit();
    
    fixture.detectChanges();
  });

  it('should handle add error', () => {
    const data = { id: '', name: 'Sensor1', description: 'test'};
    const errorResponse = { error: 'Add failed' };

    component.form.setValue(data);

    sensorTypeService.add.and.returnValue(throwError(errorResponse));

    component.submit();

    expect(sensorTypeService.add).toHaveBeenCalledWith(data);
    expect(component.alertExists).toBeTrue();
    expect(component.alertType).toBe('danger');
    expect(component.alertMessage).toBe('Add failed');
  });

  it('should not call add if form is invalid', () => {
    component.form.setValue({ id: '', name: '', description: ''});

    component.submit();

    expect(sensorTypeService.add).not.toHaveBeenCalled();
  });
  
  it('should update a Sensors Type', () => {
    expect(component).toBeTruthy();
    expect(component.form.valid).toBeFalse();
    let apiData = {id: '1',name: 'name testing', description: 'try to test'};
    component.form.patchValue({
      id: '1',
      name: 123,
      description: 'try to test'
    });

    let dd = sensorTypeService.update;
    
    dd.and.returnValue(of(apiData));
    component.submit();
    expect(component.alertExists).toBe(true);
    expect(component.alertType).toBe('success');
    expect(component.alertMessage).toBe('Saved.');
    component.form.reset();
    dd.and.returnValue(throwError({error: ''}));
    component.submit();

    fixture.detectChanges();
  });

  it('should handle update error', () => {
    const data = {id: '1',name: 'name testing', description: 'try to test'};
    const errorResponse = { error: 'Update failed' };

    component.form.setValue(data);

    sensorTypeService.update.and.returnValue(throwError(errorResponse));

    component.submit();

    expect(sensorTypeService.update).toHaveBeenCalledWith(data);
    expect(component.alertExists).toBeTrue();
    expect(component.alertType).toBe('danger');
    expect(component.alertMessage).toBe('Update failed');
  });

  it('should patch Value to the for,', () => {
    let data = {id: '1',name: 'name testing', description: 'try to test'};
    component.update(data)
    expect(component.form.getRawValue().id).toBe('1');
  });

  it('should remove a Sensor Type', () => {
    const response = { msg: 'Type deleted' };
    sensorTypeService.remove.and.returnValue(of(response));

    component.remove('1');

    expect(sensorTypeService.remove).toHaveBeenCalledWith('1');
    expect(component.alertExists).toBeTrue();
    expect(component.alertType).toBe('success');
    expect(component.alertMessage).toBe('Deleted.');
  });

  it('should handle remove error', () => {
    const errorResponse = { error: 'remove failed' };
    sensorTypeService.remove.and.returnValue(throwError(errorResponse));

    component.remove('1');

    expect(sensorTypeService.remove).toHaveBeenCalledWith('1');
    expect(component.alertExists).toBeTrue();
    expect(component.alertType).toBe('danger');
    expect(component.alertMessage).toBe('remove failed');
  });

});
