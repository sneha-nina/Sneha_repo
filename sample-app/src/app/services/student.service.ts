import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
private baseUrl = 'http://localhost:9090/students';

  constructor(private http: HttpClient) { }

  // Add student
  addStudent(student: Student): Observable<any> {
    // Wrapping HttpClient.post() inside an Observable explicitly
    return new Observable<any>((observer) => {
      this.http.post(`${this.baseUrl}`, student).subscribe({
        next: (response) => {
          observer.next(response);
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
        }
      });
    });
  }

  // Get student by ID
  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/${id}`);
  }

  // (Optional) Get all students
  getAllStudents(): Observable<Student[]> {
  return this.http.get<Student[]>(`${this.baseUrl}/getAllStudent`);
}
updateStudent(id: number, student: Student): Observable<any> {
  return this.http.put(`${this.baseUrl}/updateStudent/${id}`, student, { responseType: 'text' });
}

  // (Optional) Delete student by ID
 deleteStudent(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/deleteStudent/${id}`, { responseType: 'text' });
 }
}
