import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = 'http://localhost:8080';
  constructor(private http: HttpClient) {}
  signUp(
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    photo: string | null
  ): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/signup`, {
      username,
      password,
      firstName,
      lastName,
      photo,
    });
  }
  getMyAccount(): Observable<User> {
    return this.http.get<any>(`${this.API_URL}/user/`).pipe(
      map((char: any) => ({
        id: char.id,
        firstName: char.firstName,
        lastName: char.lastName,
        username: char.username,
        photo: char.photo,
      }))
    );
  }

  editMyAccount(
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    photo: string | null
  ): Observable<any> {
    return this.http.put(`${this.API_URL}/user/`, {
      username,
      password,
      firstName,
      lastName,
      photo,
    });
  }
}
