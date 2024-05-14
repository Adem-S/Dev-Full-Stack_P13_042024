import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserService } from '../core/services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  public canActivate(): Observable<boolean> {
    return this.checkAuthentication();
  }

  private checkAuthentication(): Observable<boolean> {
    return this.userService.getUserRole().pipe(
      map((role: 'user' | 'support' | null) => {
        if (role != 'user' && role != 'support') {
          this.router.navigate(['select-role']);
        }
        return role ? true : false;
      })
    );
  }
}
