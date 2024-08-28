import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, FontAwesomeModule, MatSnackBarModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  faTrashCan = faTrashCan;
  faInfoCircle = faInfoCircle;
  users$!: Observable<User[]>;
  constructor(
    private adminService: AdminService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  loadUsers(): void {
    this.users$ = this.adminService.getUsers();
  }
  toUserDetails(id: number) {
    this.router.navigate([`/user/${id}`]);
  }
  ngOnInit(): void {
    this.loadUsers();
    this.users$.subscribe((users) => console.log(users));
  }

  deleteUser($id: number) {
    this.adminService.deleteAccount($id).subscribe({
      next: (response) => {
        console.log('Account successfully deleted:', response);
        this.loadUsers();
        this.showSnackBar('Account deleted successfully.');
      },
      error: (error) => {
        console.error('Error deleting account:', error);
        this.showSnackBar('Failed to delete account: ' + error);
      },
    });
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
