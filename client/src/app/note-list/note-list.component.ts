import { Component, OnInit } from '@angular/core';
import { NoteService } from '../shared/note/note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  notes: Array<any>;

  constructor(private noteService: NoteService) {
  }

  ngOnInit() {
    this.noteService.getAll().subscribe(data => {
      this.notes = data;
    }, error => console.error(error));
  }
}
