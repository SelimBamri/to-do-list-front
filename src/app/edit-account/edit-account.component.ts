import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-edit-account',
  standalone: true,
  imports: [FormsModule, MatSnackBarModule, AsyncPipe, NgIf],
  templateUrl: './edit-account.component.html',
  styleUrl: './edit-account.component.scss',
})
export class EditAccountComponent implements OnInit {
  user$!: Observable<User>;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.showSnackBar('The username and the name are required');
      return;
    }
    if (form.value.password !== form.value.confirmPassword) {
      this.showSnackBar('Passwords do not match');
      return;
    }
    const password = form.value.password ? form.value.password : null;
    this.userService
      .editMyAccount(
        form.value.username,
        form.value.fname + ' ' + form.value.lname,
        password
      )
      .subscribe({
        next: (resp) => {
          const newToken = resp?.token;
          if (newToken) {
            this.authService.logout();
            localStorage.setItem('auth_token', newToken);
            this.authService.authStateSubject.next(true);
          }
          this.showSnackBar('Account updated successfully.');
          this.router.navigate(['/account']);
        },
        error: (err) => {
          console.error('Register failed', err);
          this.showSnackBar('This username is taken.');
        },
      });
  }

  ngOnInit(): void {
    this.user$ = this.userService.getMyAccount();
  }

  OnDeleteAccount() {
    this.authService.deleteMyAccount().subscribe({
      next: (response) => {
        console.log('Account successfully deleted:', response);
        this.authService.logout();
        this.router.navigate(['/']);
        this.showSnackBar('Account deleted successfully.');
      },
      error: (error) => {
        console.error('Error deleting account:', error);
        this.showSnackBar('Failed to delete account: ' + error);
      },
    });
  }
}
