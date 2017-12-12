import { Injectable } from '@angular/core';
import * as OktaSignIn from '@okta/okta-signin-widget';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class OktaAuthService {

  signIn = new OktaSignIn({
    baseUrl: 'https://dev-158606.oktapreview.com',
    clientId: '0oabl213xlbMjGJYo0h7',
    redirectUri: 'http://localhost:4200',
    authParams: {
      issuer: 'default',
      responseType: ['id_token', 'token'],
      scopes: ['openid', 'email', 'profile']
    }
  });

  private userSource: ReplaySubject<any>;
  public user$: Observable<any>;

  constructor(private router: Router) {
    this.userSource = new ReplaySubject<any>(1);
    this.user$ = this.userSource.asObservable();
  }

  isAuthenticated() {
    // Checks if there is a current accessToken in the TokenManger.
    return !!this.signIn.tokenManager.get('accessToken');
  }

  login(next?: string) {
    if (next) {
      this.router.navigate(['login', {next: next}]);
    } else {
      this.router.navigate(['login']);
    }
  }

  showLogin() {
    // Launches the widget and stores the tokens
    try {
      this.signIn.renderEl({el: '#okta-signin-container'}, response => {
        if (response.status === 'SUCCESS') {
          response.forEach(token => {
            if (token.idToken) {
              this.signIn.tokenManager.add('idToken', token);
            }
            if (token.accessToken) {
              this.signIn.tokenManager.add('accessToken', token);
            }
          });
          this.userSource.next(this.idTokenAsUser);
          this.signIn.hide();
        } else {
          console.error(response);
        }
      });
    } catch (exception)  {
      // An instance of the widget has already been rendered. Call remove() first.
    }
  }

  get idTokenAsUser() {
    const token = this.signIn.tokenManager.get('idToken');
    return {
      name: token.claims.name,
      email: token.claims.email,
      username: token.claims.preferred_username
    };
  }

  async logout() {
    // Terminates the session with Okta and removes current tokens.
    this.signIn.tokenManager.clear();
    await this.signIn.signOut();
    this.signIn.remove();
    this.userSource.next(undefined);
    this.login();
  }
}
