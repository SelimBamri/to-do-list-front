import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AdminService } from '../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [NgIf, AsyncPipe, MatSnackBarModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent {
  user$!: Observable<User>;
  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  ngOnInit(): void {
    this.user$ = this.adminService.getUserById(
      Number(this.route.snapshot.paramMap.get('id'))
    );
    this.user$.subscribe((user) => {
      console.log('Users:', user);
    });
  }
  deleteUser($id: number) {
    this.adminService.deleteAccount($id).subscribe({
      next: (response) => {
        console.log('Account successfully deleted:', response);
        this.router.navigate(['/lists']);
        this.showSnackBar('Account deleted successfully.');
      },
      error: (error) => {
        console.error('Error deleting account:', error);
        this.showSnackBar('Failed to delete account: ' + error);
      },
    });
  }
}
