import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userRoleSubject: BehaviorSubject<'user' | 'support' | null>;

  constructor() {
    this.userRoleSubject = new BehaviorSubject<'user' | 'support' | null>(
      localStorage.getItem('userRole') === 'user'
        ? 'user'
        : localStorage.getItem('userRole') === 'support'
        ? 'support'
        : null
    );
  }

  setUserRole(role: 'user' | 'support'): void {
    localStorage.setItem('userRole', role);
    this.userRoleSubject.next(role);
  }

  clearUserRole(): void {
    localStorage.removeItem('userRole');
    this.userRoleSubject.next(null);
  }

  getUserRole(): Observable<'user' | 'support' | null> {
    return this.userRoleSubject.asObservable();
  }
}
