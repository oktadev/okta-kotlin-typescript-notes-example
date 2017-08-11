import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isNumber } from 'util';
import { NoteService } from '../shared/note/note.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  note: any = {text: ''};

  constructor(private route: ActivatedRoute,
              private router: Router,
              private noteService: NoteService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id !== 'add') {
        this.noteService.get(params.id).subscribe((note: any) => {
          this.note = note;
          this.note.href = note._links.self.href;
        }, error => console.error(error));
      }
    });
  }

  onSubmit(form: NgForm) {
    this.noteService.save(form).subscribe(() => {
      this.router.navigate(['/notes']);
    });
  }

  remove(href) {
    this.noteService.remove(href).subscribe(() => {
      this.router.navigate(['/notes']);
    });
  }
}
