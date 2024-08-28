import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDoList } from '../models/to-do-list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TodoService } from '../services/todo.service';
import { Router } from '@angular/router';
import {
  faCirclePlus,
  faSquareCheck,
  faTrashCan,
  faDeleteLeft,
} from '@fortawesome/free-solid-svg-icons';
import { NgForm, FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-to-do-list-card',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, NgClass],
  templateUrl: './to-do-list-card.component.html',
  styleUrl: './to-do-list-card.component.scss',
})
export class ToDoListCardComponent {
  faTrashCan = faTrashCan;
  faCirclePlus = faCirclePlus;
  faSquareCheck = faSquareCheck;
  faDeleteLeft = faDeleteLeft;

  constructor(private todoService: TodoService, private router: Router) {}

  @Input() toDoList!: ToDoList;
  @Output() changed = new EventEmitter();

  deleteList(id: number) {
    this.todoService.deleteToDo(id).subscribe({
      next: (response) => {
        console.log('List deleted successfully', response);
        this.changed.emit();
      },
      error: (error) => {
        console.error('Error deleting list', error);
      },
    });
  }

  deleteElement(id: number) {
    this.todoService.deleteToDoElement(id).subscribe({
      next: () => {
        console.log('Successfully deleted element');
        this.todoService.GetMyTodoById(this.toDoList.id).subscribe({
          next: (updatedToDoList) => {
            this.toDoList = updatedToDoList;
          },
          error: (err) => {
            console.error('Failed to delete todo list', err);
          },
        });
      },
      error: (err) => {
        console.error('Failed to add element', err);
      },
    });
  }

  onSubmit(form: NgForm) {
    this.todoService
      .newElement(form.value.element, this.toDoList.id)
      .subscribe({
        next: () => {
          console.log('Successfully added element');
          this.todoService.GetMyTodoById(this.toDoList.id).subscribe({
            next: (updatedToDoList) => {
              this.toDoList = updatedToDoList;
              form.reset();
            },
            error: (err) => {
              console.error('Failed to update to-do list', err);
            },
          });
        },
        error: (err) => {
          console.error('Failed to add element', err);
        },
      });
  }

  checkElement(id: number) {
    console.log(
      this.toDoList.elements[0].completed +
        ' ' +
        this.toDoList.elements[0].element +
        ' ' +
        this.toDoList.elements[0].id
    );
    this.todoService.checkElement(id).subscribe({
      next: () => {
        this.todoService.GetMyTodoById(this.toDoList.id).subscribe({
          next: (updatedToDoList) => {
            this.toDoList = updatedToDoList;
          },
          error: (err) => {
            console.error('Failed to update to-do list', err);
          },
        });
      },
      error: (err) => {
        console.error('Failed to add element', err);
      },
    });
  }
}
