import { ChangeDetectorRef, Component, ComponentRef, OnInit } from '@angular/core';
import { OktaAuthService } from './shared/okta/okta.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My Notes';
  user;

  constructor(public oktaService: OktaAuthService, private router: Router) {
  }

  ngOnInit() {
    if (this.oktaService.isAuthenticated()) {
      this.user = this.oktaService.idTokenAsUser;
    }

    this.oktaService.user$.subscribe(user => {
      this.user = user;
      if (user) {
        this.router.navigate(['/notes']);
      } else {
        // todo: figure out how to logout router
        // this.router.navigate(['/']);
        window.location.reload();
      }
    });
  }
}
