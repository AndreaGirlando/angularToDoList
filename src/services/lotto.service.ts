import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LottoService {
  link:string = "https://todolistgirlando.somee.com/"
  constructor(private http: HttpClient,private route:Router) { }
  public getBestNumbers(){
    return this.http.get(this.link+"api/Lotto/getBestNumbers")
  }
  public creaRecord(body:any){
    return this.http.post(this.link+"api/Lotto/creaLottoRecord",body)
  }
}
