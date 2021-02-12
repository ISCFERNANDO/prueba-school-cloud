import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class DireccionesServices {
  public apiURL=environment.apiURL;
  public auth_token='Bearer '+localStorage.getItem('tokenscloud');

  constructor(
    private httpClient: HttpClient
  ) {}

      /**
       * OBTIENE EL LISTADO DE PAISES
       */
      getAPIServicePaises(): Observable<any>{

        const httpHeaders: HttpHeaders = new HttpHeaders({
          Authorization: this.auth_token
        });
        return this.httpClient.get<HttpResponse<Object>>(this.apiURL+'/paises',{ observe: 'response'});
      }
      /**
       * OBTIENE LOS DATOS A PARTIR DE UN PAIS
       * - Devuelve Estados y datos del pais
       */
      getAPIServicePais(id): Observable<any>{

        const httpHeaders: HttpHeaders = new HttpHeaders({
          Authorization: this.auth_token
        });
        return this.httpClient.get<HttpResponse<Object>>(this.apiURL+'/paises/'+id,{ observe: 'response'});
      }
      /**
       * OBTIENE LOS DATOS A PARTIR DE UN ESTADO
       * - Devuelve Municipios y datos del estado
       */
      getAPIServiceEstado(id): Observable<any>{

        const httpHeaders: HttpHeaders = new HttpHeaders({
          Authorization: this.auth_token
        });
        return this.httpClient.get<HttpResponse<Object>>(this.apiURL+'/estados/'+id,{ observe: 'response'});
      }
      /**
       * OBTIENE LOS DATOS A PARTIR DE UN MUNICIPIO
       * - Devuelve Colonias y datos del municipio
       */
      getAPIServiceMunicipio(id): Observable<any>{

        const httpHeaders: HttpHeaders = new HttpHeaders({
          Authorization: this.auth_token
        });
        return this.httpClient.get<HttpResponse<Object>>(this.apiURL+'/municipios/'+id,{ observe: 'response'});
      }
      /**
       * OBTIENE TODAS LAS COLONIAS
       */
      getAPIServiceColonias(): Observable<any>{

        const httpHeaders: HttpHeaders = new HttpHeaders({
          Authorization: this.auth_token
        });
        return this.httpClient.get<HttpResponse<Object>>(this.apiURL+'/colonias', { observe: 'response'});
      }
      /**
       * OBTIENE LOS DATOS A PARTIR DE UN CP
       * - Devuelve Pais, Estado, Municipio y Colonias
       */
      getAPIServiceCodigoPostal(id): Observable<any>{

        const httpHeaders: HttpHeaders = new HttpHeaders({
          Authorization: this.auth_token
        });
        return this.httpClient.get<HttpResponse<Object>>(this.apiURL+'/cp/'+id,{ observe: 'response'});
      }

}
