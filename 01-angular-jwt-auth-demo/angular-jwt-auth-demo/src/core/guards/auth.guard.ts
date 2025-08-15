import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../../app/components/auth/auth.service';
import { MessageService } from 'primeng/api/messageservice';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router,
    private messageService: MessageService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    if (!this.authService.isAuthenticated()) {
      this.messageService.add({ severity: 'warning', summary: 'Access Denied', detail: 'You need to be logged to see the data!' });
      return false;
    }
    return true;
  }
}

