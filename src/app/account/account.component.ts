import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { NgIf, AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  user$!: Observable<User>;
  constructor(private userService: UserService, private router: Router) {}

  redirectToEditMyAccount() {
    this.router.navigate(['/update']);
  }
  ngOnInit(): void {
    this.user$ = this.userService.getMyAccount();
  }
}
