import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '../shared/okta/okta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private oktaService: OktaAuthService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.oktaService.isAuthenticated()) {
      this.router.navigate(['/']);
    } else {
      this.oktaService.showLogin();
    }

    // user authentication listener
    this.oktaService.user$.subscribe(user => {
      this.router.navigate(['/']);
    });
  }
}
