import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { student } from '../model/student';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  getAllStudenturl = 'Student/GetAllStudents';
  getStudenturl = 'Student/GetStudentId';
  postStudenturl = 'Student/CreateStudent';
  updateStudenturl = 'Student/UpdateStudentId';
  deleteStudenturl = 'Student/DeleteStudentId';

  constructor(private http: HttpClient, private jwt : TokenService) {}


  getHttpOptions(){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Authorization': 'Bearer ' + this.jwt.getJwt()
      }),
    };
    return httpOptions;
  }



  getAllStudents(): Observable<student> {
    return this.http.get<student>(
      environment.apiUrl + this.getAllStudenturl,
      this.getHttpOptions()
    ).pipe();
  }

  getStudentId(data: any): Observable<student> {
    return this.http.post<student>(
      environment.apiUrl + this.getStudenturl,
      JSON.stringify(data),
      this.getHttpOptions()
    ).pipe();
  }

  createStudent(data: any): Observable<student> {
    return this.http.post<student>(
      environment.apiUrl + this.postStudenturl,
      JSON.stringify(data),
      this.getHttpOptions()
    ).pipe();
  }

  updateStudent(id: number, data: any): Observable<student> {
    return this.http.put<student>(
      environment.apiUrl + this.updateStudenturl + '?id=' + id,
      JSON.stringify(data),
      this.getHttpOptions()
    ).pipe();
  }

  deleteStudent(data: any): Observable<student> {
    return this.http.post<student>(
      environment.apiUrl + this.deleteStudenturl,
      JSON.stringify(data),
      this.getHttpOptions()
    ).pipe();
  }
}
