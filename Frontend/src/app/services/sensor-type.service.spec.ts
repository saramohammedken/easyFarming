import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SensorTypeService } from './sensor-type.service';

describe('SensorTypeService', () => {
  let service: SensorTypeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SensorTypeService]
    });
    service = TestBed.inject(SensorTypeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests.
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

    const req = httpMock.expectOne('http://localhost:3000/sensorTypes/getAll');
    expect(req.request.method).toBe('GET');
    req.flush(dummyTypes);
  });

  it('should add a sensor type', () => {
    const dummyData = { id: '1', name: 'name test1', description: 'description test1'};

    service.add(dummyData).subscribe(response => {
      expect(response).toEqual(dummyData);
    });

    const req = httpMock.expectOne('http://localhost:3000/sensorTypes/add');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyData);
    req.flush(dummyData);
  });

  it('should update a sensor type', () => {
    const dummyData = { id: '1', name: 'name test1', description: 'description test1'};

    service.update(dummyData).subscribe(response => {
      expect(response).toEqual(dummyData);
    });

    const req = httpMock.expectOne('http://localhost:3000/sensorTypes/' + dummyData.id);
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

    const req = httpMock.expectOne('http://localhost:3000/sensorTypes/' + id);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyResponse);
  });

});
