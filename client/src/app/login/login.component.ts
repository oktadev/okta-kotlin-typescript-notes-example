import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OktaAuthService } from '../shared/okta/okta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteListComponent } from '../note-list/note-list.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private oktaService: OktaAuthService, private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (this.oktaService.isAuthenticated()) {
        this.router.navigate(['/']);
      } else {
        this.oktaService.showLogin();
      }
    });

    this.oktaService.user$.subscribe(user => {
      this.router.navigate(['/']);
    });
  }

}
