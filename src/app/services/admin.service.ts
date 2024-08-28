import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly API_URL = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<any[]>(`${this.API_URL}/admin/users`)
      .pipe(
        map((r) =>
          r.map(
            (user: any) =>
              new User(
                user.id,
                user.username,
                user.firstName,
                user.lastName,
                user.photo
              )
          )
        )
      );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<any>(`${this.API_URL}/admin/users/${id}`).pipe(
      map((char: any) => ({
        id: char.id,
        username: char.username,
        firstName: char.firstName,
        lastName: char.lastName,
        photo: char.photo,
      }))
    );
  }

  deleteAccount(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/admin/users/${id}`);
  }

  addAdmin(
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    photo: string | null
  ): Observable<any> {
    return this.http.post(`${this.API_URL}/admin/new`, {
      username,
      password,
      firstName,
      lastName,
      photo,
    });
  }
}
