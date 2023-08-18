import { alert } from 'devextreme/ui/dialog';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private route:Router) { }
  link:string = "https://todolistgirlando.somee.com/"
  //link:string = "https://localhost:7234//"
  private username:string = ""
  private password:string = ""

  public UserID(){
    return localStorage.getItem("UserID")
  }

  public login(username:string,password:string){
    const headers = { 'content-type': 'application/json' , 'Access-Control-Allow-Origin': '*'}
    this.username = username
    this.password = password
    return this.http.post(this.link+"api/Auth/login",{username:username,password:password},{ 'headers': headers })
  }
  public register(username:string,password:string){
    const headers = { 'content-type': 'application/json' , 'Access-Control-Allow-Origin': '*'}
    return this.http.post(this.link+"api/Auth/register",{username:username,password:password},{ 'headers': headers })
  }
  public getJwt(){
    if(this.isUserLoggedIn()){
      return localStorage.getItem("Token");
    }else{
      return null
    }
  }
  public setItems(jwtToken:string,UserID:number){
    localStorage.setItem("Token",jwtToken.toString())
    localStorage.setItem("UserID",UserID.toString())
  }
  public logout(){
    localStorage.removeItem("Token")
    localStorage.removeItem("UserID")
  }
  public isUserLoggedIn(){
    var jwtToken = localStorage.getItem("Token")?.length
    if(jwtToken != null){
      return true
    }
    else{
      return false
    }
  }

}
