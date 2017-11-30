import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { OktaAuthService } from './okta.service';
import 'rxjs/add/operator/map';

@Injectable()
export class OktaAuthInterceptor implements HttpInterceptor {

  constructor(private oktaService: OktaAuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.oktaService.isAuthenticated()) {
      const accessToken = this.oktaService.signIn.tokenManager.get('accessToken');
      request = request.clone({
        setHeaders: {
          Authorization: `${accessToken.tokenType} ${accessToken.accessToken}`
        }
      });
    }

    return next.handle(request).map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        return event;
      }
    }).catch(error => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this.oktaService.login();
          return Observable.throw(error);
        }
      }
    });
  }
}
