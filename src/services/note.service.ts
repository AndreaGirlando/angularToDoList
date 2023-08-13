import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }
  link:string = "https://todolistgirlando.somee.com/"
  //link:string = "https://localhost:7234/"

  public creaNota(body:any){
    return this.http.post(this.link+"api/Note/creaNota",body)
  }
  public modificaNota(body:any){
    return this.http.post(this.link+"api/Note/modificaNota",body)
  }
  public getNote(){
    return this.http.get(this.link+"api/Note/getNoteByUserID")
  }
  public removeNota(id:number){
    return this.http.delete(this.link+"api/Note/cancellaNota?id="+id)
  }

}
