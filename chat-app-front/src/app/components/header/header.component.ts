import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userRole: 'user' | 'support' | null = null;
  private userRoleSubscription!: Subscription;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userRoleSubscription = this.userService
      .getUserRole()
      .subscribe((role) => {
        this.userRole = role;
      });
  }

  ngOnDestroy(): void {
    this.userRoleSubscription.unsubscribe();
  }

  navigateToUserSelection(): void {
    this.userService.clearUserRole();
    this.router.navigate(['/select-role']);
  }
}
