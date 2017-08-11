import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { OktaAuthService } from './okta.service';

@Injectable()
export class OktaAuthGuard implements CanActivate {
  signIn;
  authenticated;

  constructor(private oktaService: OktaAuthService) {
    this.signIn = oktaService;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.authenticated = this.oktaService.isAuthenticated();
    if (this.authenticated) {
      return true;
    }
    this.signIn.login();
    return false;
  }
}
