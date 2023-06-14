import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  link:string = "https://todolistgirlando.somee.com/"
  //link:string = "https://localhost:7234//"

  public login(username:string,password:string){
    const headers = { 'content-type': 'application/json' , 'Access-Control-Allow-Origin': '*'}
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
  public setJwtToken(jwtToken:string){
    localStorage.setItem("Token",jwtToken.toString())
  }
  public logout(){
    localStorage.removeItem("Token")
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
