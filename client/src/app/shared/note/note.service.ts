import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NoteService {
  public API = 'http://localhost:8080';
  public NOTE_API = this.API + '/notes';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.API);
  }

  get(id: string) {
    return this.http.get(this.NOTE_API + '/' + id);
  }

  save(note: any): Observable<any> {
    let result: Observable<Object>;
    if (note['href']) {
      result = this.http.put(note.href, note);
    } else {
      result = this.http.post(this.NOTE_API, note);
    }
    return result.catch(error => Observable.throw(error));
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
