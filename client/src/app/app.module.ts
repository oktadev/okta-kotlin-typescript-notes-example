import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteService } from './shared/note/note.service';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { OktaAuthService, OktaAuthGuard, OktaAuthInterceptor } from './shared/okta';
import {
  MdButtonModule, MdCardModule, MdIconModule, MdInputModule, MdListModule,
  MdToolbarModule
} from '@angular/material';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  {path: 'notes', component: NoteListComponent, canActivate: [OktaAuthGuard]},
  {path: 'notes/:id', component: NoteDetailComponent, canActivate: [OktaAuthGuard]},
  {path: '', redirectTo: '/notes', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    NoteDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MdToolbarModule,
    MdListModule,
    MdCardModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    FormsModule
  ],
  providers: [NoteService, OktaAuthService, OktaAuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: OktaAuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
