import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { Observable } from 'rxjs';
import { ToDoList } from '../models/to-do-list';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ToDoListCardComponent } from '../to-do-list-card/to-do-list-card.component';

@Component({
  selector: 'app-todos-page',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, AsyncPipe, ToDoListCardComponent],
  templateUrl: './todos-page.component.html',
  styleUrl: './todos-page.component.scss',
})
export class TodosPageComponent implements OnInit {
  lists$!: Observable<ToDoList[]>;
  constructor(private todoService: TodoService) {}
  onSubmit(form: NgForm) {
    this.todoService.newList(form.value.title).subscribe({
      next: () => {
        console.log('Successfully added List');
        this.loadLists();
        form.reset;
      },
      error: (err) => {
        console.error('Failed to add list', err);
      },
    });
  }
  ngOnInit(): void {
    this.loadLists();
  }

  loadLists(): void {
    this.lists$ = this.todoService.GetMyTodos();
  }
}
