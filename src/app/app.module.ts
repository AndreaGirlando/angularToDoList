import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AppRoutingModule } from 'src/app-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';
import { SpinnerComponent } from 'src/spinner/spinner.component';
import { LoadingInterceptor } from 'src/Interceptor/loading.interceptor';
import { DxPopupModule } from 'devextreme-angular';
import { JwtInterceptor } from 'src/Interceptor/jwt.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    DxPopupModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
