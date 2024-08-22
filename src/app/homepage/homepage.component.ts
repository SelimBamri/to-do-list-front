import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  authenticated: boolean = false;
  private authSubscription: Subscription | null = null;
  constructor(private router: Router, private authService: AuthService) {}
  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.updateStatus();
    this.authSubscription = this.authService.authState$.subscribe(() => {
      this.updateStatus();
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private updateStatus(): void {
    this.authenticated = this.authService.isAuthenticated();
  }
}
