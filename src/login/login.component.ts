import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { alert } from "devextreme/ui/dialog"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message:string="";
  title:string="";
  passwordVisiblity:boolean=false;
  constructor(
    private authService:AuthService,
    private route:Router,
  ){}
  form: FormGroup = new FormGroup({
    Username:new FormControl("",Validators.required),
    Password:new FormControl("",Validators.required)
  })
  public get windowSize(){
    return window.screen.availWidth
  }
  ngOnInit(){
    if(this.route.url === '/login'){
      this.title = "Accedi"
    }else{
      this.title = "Registrati"
    }
  }

  public login(){

    if(this.route.url === '/login'){
      this.authService.login(this.form.value.Username,this.form.value.Password).subscribe({
        next: (data:any) =>{
          this.authService.setJwtToken(data.jwtToken)
          this.route.navigateByUrl("/dashboard")
        },
        error: (err:any) =>{
          alert( err.errore.message, "Errore")
        },
      })
    }
    else{
      this.authService.register(this.form.value.Username,this.form.value.Password).subscribe({
        next: (data:any) =>{
          alert( "Registrazione Effettuata", "Registrazione")
          this.route.navigateByUrl("/home")
        },
        error: (err:any) =>{
          alert( err.error.message, "Errore")
        },
      })
    }
  }

}
