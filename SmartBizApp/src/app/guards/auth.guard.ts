import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class Permissions {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(expectedRole: string): boolean | UrlTree {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.role === expectedRole) {
      return true;
    } else {
      // Redirect to login or unauthorized page
      return this.router.createUrlTree(['/unauthorized']);
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class CanActivateRoleGuard implements CanActivate {
  constructor(private permissions: Permissions, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const expectedRole = route.data['expectedRole'] || '';
    return this.permissions.canActivate(expectedRole);
  }
}
