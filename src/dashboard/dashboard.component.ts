import { NoteService } from 'src/services/note.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { confirm } from 'devextreme/ui/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  constructor(private authService:AuthService,private router:Router,private noteService:NoteService){}
  note:any = [];
  popupVisible:boolean = false;
  newNota:string = ""
  UpdateNotaID:number = 0;
  public logout(){
    this.authService.logout();
    this.router.navigate(['']);
  }
  ngOnInit(){
    this.getNote();
  }
  autoGrowTextZone(e:any) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight + 25)+"px";
  }
  public get windowSize(){
    return window.screen.availWidth
  }
  public clear(){
    this.popupVisible=false
  }
  public creaNota(){
    var body = {
      "noteID": 0,
      "nota": this.newNota,
      "userID": 0
    }
    this.noteService.creaNota(body).subscribe({
      next: (data:any) =>{
        this.getNote();
        this.clear();
      }
    })
  }
  public OpenModificaNota=(e:any)=>{
    console.log(e)
    this.UpdateNotaID = e.noteID
    this.newNota = e.nota
    this.popupVisible = true
  }
  public getNote(){
    this.noteService.getNote().subscribe({
      next: (data:any) =>{
        this.note = data.note
        console.log(this.note);
      }
    })
  }
  public async eliminaNota(nNota:any){
    var nota = this.note.at(nNota)
    let result = confirm("<h3>Sei sicuro di voler eliminare la nota?</h3>", "Eliminazione");
    if(await result){
      this.noteService.removeNota(nota.noteID).subscribe({
        next: (data:any) =>{
          this.getNote();
        }
      })
    }

  }

}
