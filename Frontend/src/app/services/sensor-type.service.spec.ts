import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SensorTypeService } from './sensor-type.service';
import { environment } from '../../environments/environment';

describe('SensorTypeService', () => {
  let service: SensorTypeService;
  let httpMock: HttpTestingController;
  let API_URL: string = environment.API_ENDPOINT;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SensorTypeService]
    });
    service = TestBed.inject(SensorTypeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();  
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch sensor types', () => {
    const dummyTypes = [
      { id: '1', name: 'name test1', description: 'description test1'},
      { id: '2', name: 'name test2', description: 'description test1'},
    ];

    service.getList().subscribe(types => {
      expect(types.length).toBe(2);
      expect(types).toEqual(dummyTypes);
    });

    const req = httpMock.expectOne(API_URL+'/sensorTypes/getAll');
    expect(req.request.method).toBe('GET');
    req.flush(dummyTypes);
  });

  it('should add a sensor type', () => {
    const dummyData = { id: '1', name: 'name test1', description: 'description test1'};

    service.add(dummyData).subscribe(response => {
      expect(response).toEqual(dummyData);
    });

    const req = httpMock.expectOne(API_URL+'/sensorTypes/add');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyData);
    req.flush(dummyData);
  });

  it('should update a sensor type', () => {
    const dummyData = { id: '1', name: 'name test1', description: 'description test1'};

    service.update(dummyData).subscribe(response => {
      expect(response).toEqual(dummyData);
    });

    const req = httpMock.expectOne(API_URL+'/sensorTypes/' + dummyData.id);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(dummyData);
    req.flush(dummyData);
  });

  it('should remove a sensor type', () => {
    const dummyResponse = { msg: 'SensorType deleted' }; 
    const id ='1';

    service.remove(id).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(API_URL+'/sensorTypes/' + id);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyResponse);
  });

});
