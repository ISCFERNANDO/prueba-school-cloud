import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { environment } from "./../../../environments/environment";
import { Injectable } from "@angular/core";
import { ContactoCorporativo, Corporate } from "../models/corporate";

@Injectable({
  providedIn: "root",
})
export class CorporateService {
  apiURL = environment.apiURL;
  token = `Bearer ${localStorage.getItem("tokenscloud")}`;

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: this.token,
  });

  constructor(private http: HttpClient) {}

  getListOfCorporate(): Observable<any> {
    return this.http.get(`${this.apiURL}/corporativos`, {
      headers: this.headers,
    });
  }

  getDetailOfCorporate(corporateId: number): Observable<any> {
    return this.http.get(`${this.apiURL}/corporativos/${corporateId}`, {
      headers: this.headers,
    });
  }

  updateCorporate(corporate: Corporate): Observable<any> {
    //corporate.S_LogoURL = `${this.apiURL}/corporativos/${corporate.id}`;
    return this.http.put(
      `${this.apiURL}/corporativos/${corporate.id}`,
      corporate,
      {
        headers: this.headers,
      }
    );
  }

  deleteContact(id: number) {
    return this.http.delete(`${this.apiURL}/contactos/${id}`, {
      headers: this.headers,
    });
  }

  updateContact(contact: ContactoCorporativo) {
    return this.http.put(`${this.apiURL}/contactos/${contact.id}`, contact, {
      headers: this.headers,
    });
  }

  addContact(contact: ContactoCorporativo) {
    return this.http.post(`${this.apiURL}/contactos`, contact, {
      headers: this.headers,
    });
  }
}
