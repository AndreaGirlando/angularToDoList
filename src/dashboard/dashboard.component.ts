import { NoteService } from 'src/services/note.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { confirm } from 'devextreme/ui/dialog';
import { LottoService } from 'src/services/lotto.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  constructor(public authService:AuthService,private router:Router,private noteService:NoteService,private lottoService:LottoService){}
  note:any = [];
  lotto:any = [];
  newRecord:any = [];
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
    this.newNota = ""
    this.UpdateNotaID = 0
  }
  editOrNew(){
    if(this.UpdateNotaID == 0){
      this.creaNota()
    }else{
      this.modificaNota()
    }
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
  public modificaNota(){
    var userID = localStorage.getItem("UserID")
    var body = {
      "noteID": this.UpdateNotaID,
      "nota": this.newNota,
      "userID": userID?.toString()
    }
    this.noteService.modificaNota(body).subscribe({
      next: (data:any) =>{
        this.getNote();
        this.clear();
      }
    })
  }
  public OpenModificaNota=(e:any)=>{
    this.UpdateNotaID = e.noteID
    this.newNota = e.nota
    this.popupVisible = true
  }
  public getNote(){
    this.noteService.getNote().subscribe({
      next: (data:any) =>{
        this.note = data.note
        //console.log(this.note);
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

  lottoPopup:boolean = false
  OpenLottoPopup(){
    this.lottoPopup = true
    this.getLottoNumbers()
  }

  getLottoNumbers(){
    this.lottoService.getBestNumbers().subscribe({
      next: (data:any) =>{
        this.lotto = data.data
        //console.log(this.lotto)
      }
    })
  }

  newRecordLotto(){
    console.log(this.newRecord)
    this.lottoService.creaRecord({...this.newRecord}).subscribe({
      next: (data:any) =>{
        this.getLottoNumbers();
      }
    })
  }



}
