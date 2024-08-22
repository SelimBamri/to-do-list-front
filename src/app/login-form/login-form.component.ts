import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  constructor(private authService: AuthService, private router: Router) {}
  onSubmit(form: NgForm) {
    this.authService.login(form.value.username, form.value.password).subscribe({
      next: () => {
        console.log('Login successful');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Login failed', err);
      },
    });
  }
}
