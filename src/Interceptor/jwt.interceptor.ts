import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.authService.isUserLoggedIn()) {
          const token = this.authService.getJwt();
          request = request.clone({setHeaders:{Authorization: `Bearer ${token}`,'Access-Control-Allow-Origin': '*'}});
        }
        return next.handle(request);
    }
}
