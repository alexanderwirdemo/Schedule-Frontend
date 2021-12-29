import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000/';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API+'login',
      {
        email,
        password,
      },
      httpOptions
    );
  }

  courses(user: string): Observable<any> {
    console.log(user);
    return this.http.get(
      AUTH_API+'courses',
      httpOptions
    );
  }
}
