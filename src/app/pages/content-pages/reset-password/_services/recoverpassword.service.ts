import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { User } from './../_models/user';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RecoverpasswordService {
  modificar = environment.apiURL+'/actualizarPassword';


  constructor(private http: HttpClient) { }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  updatePassword(user: User): Observable<any> {
    // const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<User>(this.modificar, user);

  }
}
