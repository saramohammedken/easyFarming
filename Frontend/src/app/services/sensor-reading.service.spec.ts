import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SensorReadingService } from './sensor-reading.service';
import { environment } from '../../environments/environment';

describe('SensorReadingService', () => {
  let service: SensorReadingService;
  let httpMock: HttpTestingController;
  let API_URL: string = environment.API_ENDPOINT;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SensorReadingService]
    });
    service = TestBed.inject(SensorReadingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch sensor readings', () => {
    const dummyReadings = [
      { id: '1', sensorTypeId: '555-32-ss', value: 100, timestamp: '3 April' },
      { id: '2', sensorTypeId: '555-333-ss', value: 200, timestamp: '4 April' },
    ];

    service.getList().subscribe(readings => {
      expect(readings.length).toBe(2);
      expect(readings).toEqual(dummyReadings);
    });

    const req = httpMock.expectOne(API_URL+'/sensors/data');
    expect(req.request.method).toBe('GET');
    req.flush(dummyReadings);
  });

  it('should add a sensor reading', () => {
    const dummyData = { id: '', sensorTypeId: '555-32-DD', value: 100, timestamp: '3 April' };

    service.add(dummyData).subscribe(response => {
      expect(response).toEqual(dummyData);
    });

    const req = httpMock.expectOne(API_URL+'/sensors/data');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyData);
    req.flush(dummyData);
  });

  it('should update a sensor reading', () => {
    const dummyData = { id: '1', sensorTypeId: '555-32-DD', value: 100, timestamp: '3 April' };

    service.update(dummyData).subscribe(response => {
      expect(response).toEqual(dummyData);
    });

    const req = httpMock.expectOne(API_URL+'/sensors/' + dummyData.id);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(dummyData);
    req.flush(dummyData);
  });

  it('should remove a sensor reading', () => {
    const dummyResponse = { msg: 'SensorReading deleted' }; 
    const id ='1';

    service.remove(id).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(API_URL+'/sensors/' + id);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyResponse);
  });

});
