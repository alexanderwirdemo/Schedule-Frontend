import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TouchSequence } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:3000/';
  headers: HttpHeaders;
  token: String;

  constructor(private _http: HttpClient) { 
    this.token = "3755~0H049oLoUPpNxP85OmmXJf8MiSE5R7Fv4HvFPkt8GB3634QvaksVv3XqVM9DEF2A";
    /*this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Authorization': 'Bearer '+this.token,
    });*/
    
  }
  

  getTypeRequest(url) {
    /*const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Authorization': 'Bearer '+this.token,
    });*/
    return this._http.get(`${this.baseUrl}${url}`).pipe(map(res => {
      console.dir(res);
    return res;
    }));
    }
  postTypeRequest(url, payload) {
    return this._http.post(`${this.baseUrl}${url}`, payload).pipe(map(res => {
    return res;
    }));
    }
  putTypeRequest(url, payload) {
    return this._http.put(`${this.baseUrl}${url}`, payload).pipe(map(res => {
    return res;
    }));
    }
}
