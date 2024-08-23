import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule, MatSnackBarModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.showSnackBar('All fields are required');
      return;
    }
    if (form.value.password !== form.value.confirmPassword) {
      this.showSnackBar('Passwords do not match');
      return;
    }
    this.userService
      .signUp(
        form.value.username,
        form.value.fname + ' ' + form.value.lname,
        form.value.password
      )
      .subscribe({
        next: () => {
          console.log('Register successful');
          this.router.navigate(['/']);
          this.showSnackBar('Account created successfully.');
        },
        error: (err) => {
          console.error('Register failed', err);
          this.showSnackBar('This username is taken.');
        },
      });
  }
  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
