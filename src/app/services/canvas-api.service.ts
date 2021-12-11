import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TouchSequence } from 'selenium-webdriver';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanvasApiService {
  headers: HttpHeaders;
  token: String;
  _courseMap: Map<String, Array<Number>>;

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
    return this._http.get(`${url}`).pipe(map(res => {
      //console.dir(res);
    return res;
    }));
    }
  postTypeRequest(url, payload): Observable<any> {
    return this._http.post(`${url}`, payload).pipe(map(res => {
    console.dir(res);
      return res;
    }));
    }
  putTypeRequest(url, payload) {
    return this._http.put(`${url}`, payload).pipe(map(res => {
    return res;
    }));
    }
}
