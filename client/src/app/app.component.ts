import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from './shared/okta/okta.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My Notes';
  user;

  constructor(public oktaService: OktaAuthService) {
  }

  ngOnInit() {
    if (this.oktaService.isAuthenticated()) {
      this.user = this.oktaService.idTokenAsUser;
    }

    this.oktaService.user$.subscribe(user => {
      this.user = user;
    });
  }
}
