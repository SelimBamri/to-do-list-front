import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDoList } from '../models/to-do-list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { TodoService } from '../services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-to-do-list-card',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './to-do-list-card.component.html',
  styleUrl: './to-do-list-card.component.scss',
})
export class ToDoListCardComponent {
  faTrashCan = faTrashCan;
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
}
