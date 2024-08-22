import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  username: string | null = null;
  private authSubscription: Subscription | null = null;
  constructor(private router: Router, private authService: AuthService) {}

  redirectToLogin() {
    this.router.navigate(['/login']);
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
  }
}
