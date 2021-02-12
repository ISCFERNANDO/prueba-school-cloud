import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from '../../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RecoverpasswordService {
  apiSendRecover = environment.apiURL+'/recuperarPassword';
  constructor(private http: HttpClient) { }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  recoverPass(email: string, url: string): Observable<any> {
    return this.http.post<any>(this.apiSendRecover,{ email, url })
  }
}
