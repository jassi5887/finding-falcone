import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRoute, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
                private router: Router,
                private route: ActivatedRoute) {}

  canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) { 
        if (this.authService.isAuthorized()) {
            return true;
        } else {
            this.router.navigate(['/'], {relativeTo: this.route});
            return false;
        }
    }
}