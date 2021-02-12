import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginUser } from '../_models/loginuser';

import { environment } from '../../../../../environments/environment';

import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { isNullOrUndefined } from "util";



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiLogin = environment.apiURL+'/login';
  options: any;


  constructor(private http: HttpClient) {

  }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  loginUser(email: string, password: string): Observable<any> {
    return this.http
      .post<LoginUser>(
        this.apiLogin,
        { email, password },
        { headers: this.headers }
      )
      .pipe(map(success => success.success));
  }

   logout() {
     localStorage.setItem("tokenscloud",null);
   }

}
