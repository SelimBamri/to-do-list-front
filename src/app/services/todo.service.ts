import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ToDoList } from '../models/to-do-list';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  newList(title: string): Observable<any> {
    return this.http.post(`${this.API_URL}/todos/`, {
      title,
    });
  }

  GetMyTodos(): Observable<ToDoList[]> {
    return this.http
      .get<any[]>(`${this.API_URL}/todos/`)
      .pipe(
        map((r) =>
          r.map(
            (todoList: any) =>
              new ToDoList(
                todoList.id,
                todoList.title,
                todoList.toDoListElement || []
              )
          )
        )
      );
  }

  GetMyTodoById(id: number): Observable<ToDoList> {
    return this.http
      .get<any>(`${this.API_URL}/todos/${id}`)
      .pipe(
        map(
          (todoList: any) =>
            new ToDoList(
              todoList.id,
              todoList.title,
              todoList.toDoListElement || []
            )
        )
      );
  }

  deleteToDo(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/todos/${id}`);
  }

  deleteToDoElement(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/todos/element/${id}`);
  }

  newElement(title: string, id: number): Observable<any> {
    return this.http.post(`${this.API_URL}/todos/${id}`, {
      title,
    });
  }

  checkElement(id: number): Observable<any> {
    return this.http.put(`${this.API_URL}/todos/${id}`, {});
  }
}
