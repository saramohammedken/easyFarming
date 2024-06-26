import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SensorReading } from '../models/sensorReaading.interfaces';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorReadingService {

  API_URL: string = environment.API_ENDPOINT;

  constructor(private httpClient: HttpClient) { }

  getList(): Observable<SensorReading[]> {
    return this.httpClient.get<SensorReading[]>(this.API_URL + '/sensors/data');
  }

  add(dto: SensorReading): Observable<SensorReading> {
    return this.httpClient.post<SensorReading>(this.API_URL + '/sensors/data', dto);
  }

  update(dto: SensorReading): Observable<SensorReading> {
    return this.httpClient.put<SensorReading>(this.API_URL + '/sensors/' + dto.id, dto);
  }

  remove(id: string): Observable<{msg: string}> {
    return this.httpClient.delete<{msg: string}>(this.API_URL + '/sensors/'+id);
  }

}

