import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }


  public creaNota(body:any){
    return this.http.post("https://todolistgirlando.somee.com/api/Note/creaNota",body)
  }
  public getNote(){
    return this.http.get("https://todolistgirlando.somee.com/api/Note/getNoteByUserID")
  }
  public removeNota(id:number){
    return this.http.delete("https://todolistgirlando.somee.com/api/Note/cancellaNota?id="+id)
  }

}
