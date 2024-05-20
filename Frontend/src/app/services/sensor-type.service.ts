import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SensorType } from '../models/sensorType.interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SensorTypeService {
  
  API_URL: string = environment.API_ENDPOINT;

  constructor(private httpClient: HttpClient) { }

  getList() {
    return this.httpClient.get<SensorType[]>(this.API_URL + '/sensorTypes/getAll');
  }

  add(dto: SensorType) {
    return this.httpClient.post<SensorType>(this.API_URL + '/sensorTypes/add', dto);
  }

  update(dto: SensorType) {
    return this.httpClient.put<SensorType>(this.API_URL + '/sensorTypes/' + dto.id, dto);
  }

  remove(id: string) {
    return this.httpClient.delete<{msg: string}>(this.API_URL + '/sensorTypes/'+id);
  }

}
