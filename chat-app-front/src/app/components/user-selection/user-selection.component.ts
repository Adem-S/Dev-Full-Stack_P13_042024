import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.css'],
})
export class UserSelectionComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.clearUserRole();
  }

  selectRole(role: 'user' | 'support'): void {
    this.userService.setUserRole(role);
    this.router.navigate(['/conversations']);
  }
}
