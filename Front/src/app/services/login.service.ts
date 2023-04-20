import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { login } from '../model/login';
import { environment } from 'src/environments/environment';
import { student } from '../model/student';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl = 'Login/authenticate';
  private _std : string;
  loggedin: boolean = false;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    }),
  };

  studentLogin(data: any){
    return this.http.post<any>(environment.apiUrl + this.loginUrl, data, this.httpOptions);
  }

  setStudentLogged(_studentLogged: string){
    this._std = _studentLogged;
  }

  getStudentLogged(){
    return this._std;
  }
}
