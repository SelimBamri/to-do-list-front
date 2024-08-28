import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-account',
  standalone: true,
  imports: [FormsModule, MatSnackBarModule, AsyncPipe, NgIf, FontAwesomeModule],
  templateUrl: './edit-account.component.html',
  styleUrl: './edit-account.component.scss',
})
export class EditAccountComponent implements OnInit {
  user$!: Observable<User>;
  url!: string | null;
  faTrashCan = faTrashCan;

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

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
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
        form.value.fname,
        form.value.lname,
        password,
        this.url
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
    this.user$.subscribe({
      next: (user) => {
        if (user.photo) {
          this.url = user.photo;
        }
      },
      error: (err) => {
        console.error('Failed to load user photo', err);
      },
    });
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

  cancelPhoto() {
    this.user$.subscribe({
      next: (user) => {
        if (user.photo) {
          this.url = user.photo;
        } else {
          this.url = null;
        }
      },
      error: (err) => {
        console.error('Failed to load user photo', err);
      },
    });
  }
}
