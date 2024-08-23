import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = 'http://localhost:8080';
  constructor(private http: HttpClient) {}
  signUp(
    username: string,
    fullName: string,
    password: string
  ): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/signup`, {
      username,
      password,
      fullName,
    });
  }
}
