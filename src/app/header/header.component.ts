import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatSnackBarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  username: string | null = null;
  photo: string | null = null;
  private authSubscription: Subscription | null = null;
  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  redirectToLists() {
    this.router.navigate(['/lists']);
  }

  redirectToMyAccount() {
    this.router.navigate(['/account']);
  }

  redirectToEditMyAccount() {
    this.router.navigate(['/update']);
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }

  ngOnInit(): void {
    this.updateUsername();
    this.authSubscription = this.authService.authState$.subscribe(() => {
      this.updateUsername();
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private updateUsername(): void {
    this.username = this.authService.getUsername();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    this.showSnackBar('Successfully logged out.');
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
