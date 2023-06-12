import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(username:string,password:string){
    return this.http.post("https://todolistgirlando.somee.com/api/Auth/login",{username:username,password:password})
  }
  public register(username:string,password:string){
    return this.http.post("https://todolistgirlando.somee.com/api/Auth/register",{username:username,password:password})
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
