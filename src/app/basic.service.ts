import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
import {map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasicService {

  constructor(
    private http: HttpClient,
  ) { }

  getData(endPoint) {
    return this.http.get('https://au-api.basiq.io' + endPoint);
  }

  sendData(endPoint, data) {
    return this.http.post('https://au-api.basiq.io' + endPoint, data);
  }
}
