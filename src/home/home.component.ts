import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { NoteService } from 'src/services/note.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private authService:AuthService,private noteService:NoteService){}




  public get windowSize(){
    return window.screen.availWidth
  }
}
