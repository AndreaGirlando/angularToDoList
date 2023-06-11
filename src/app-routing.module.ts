import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './Interceptor/auth-guard.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
