/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

// import { Headers } from "@angular/http";
import { MessageService } from 'primeng/api';

import { RestResult } from '../models/rest-result';
// Rxjs
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';

// Enviroments
import { environment } from '../../environments/environment';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root',
})

export class RestService {
  result: RestResult;
  headers = new Headers();
  ul = '';
  public xxx:any;

  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService,
    public  messageService: MessageService
  ) {
    this.xxx = messageService;

  }

  private GetUrl(endpoints: string): any {
    return environment.apiUrl + endpoints;
  }

  post(endpoints: string, data?: any, type?: string, errorHandler: (err: any, caught: Observable<unknown>) => Observable<never> = this.handleError): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + this.sessionStorage.getCurrentToken()
      })
    },
    body   = JSON.stringify(data),
    result = this.http.post<any>(this.GetUrl(endpoints), body, options)
              .pipe(catchError(errorHandler));
    return result;
  }
  public postSubCentro(endpoints: string, data?: any, subCentro?:string, type?: string, errorHandler: (err: any, caught: Observable<unknown>) => Observable<never> = this.handleError): Observable<any> {
    const
      body = JSON.stringify(data),
      options = { headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.sessionStorage.getCurrentToken()
        })} ,
      result = this.http.post<any>(`${subCentro}${endpoints}`, body, options)
        .pipe(catchError(errorHandler));
    return result;
  }
  public postEvidenceSubCentro(endpoints: string, data?: any, subCentro?:string, type?: string, errorHandler: (err: any, caught: Observable<unknown>) => Observable<never> = this.handleError): Observable<any> {
    const
      body = data,
      options = { headers: new HttpHeaders({
        'Content-Disposition': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + this.sessionStorage.getCurrentToken()
      })
    },
      result = this.http.post<any>(`${subCentro}${endpoints}`, body, options)
        .pipe(catchError(errorHandler));
    return result;
  }
  postEvidence(endpoints: string, data?: any, type?: string, errorHandler: (err: any, caught: Observable<unknown>) => Observable<never> = this.handleError): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Disposition': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + this.sessionStorage.getCurrentToken()
      })
    },
    body   = data,
    result = this.http.post<any>(this.GetUrl(endpoints), body, options)
              .pipe(catchError(errorHandler));
    return result;
  }

  postFiles(endpoints: string, data?: any, errorHandler: (err: any, caught: Observable<unknown>) => Observable<never> = this.handleError): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + this.sessionStorage.getCurrentToken()
      })
    };

    const formData = new FormData();

    for (const key in data) {
      formData.append(key.charAt(0).toUpperCase() + key.slice(1), data[key]);
    }

    return this.http.post<any>(this.GetUrl(endpoints), formData, options).pipe(catchError(errorHandler));
  }

  get(endpoints: string, data?: any, type?: string, errorHandler: (err: any, caught: Observable<unknown>) => Observable<never> = this.handleError): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.sessionStorage.getCurrentToken()
      }),
      params: data
    };

    return this.http.get<any>(this.GetUrl(endpoints), httpOptions).pipe(catchError(errorHandler));
  }
  getFile(endpoints: string, data?: any, type?: string, errorHandler: (err: any, caught: Observable<unknown>) => Observable<never> = this.handleError): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.sessionStorage.getCurrentToken()
      }),
      params: data,
      responseType:'blob'  as const,
    };

    return this.http.get(this.GetUrl(endpoints), httpOptions).pipe(catchError(errorHandler));
  }

  getImageJPG(endpoints: string, data?: any, type?: string, errorHandler: (err: any, caught: Observable<unknown>) => Observable<never> = this.handleError): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'image/jpeg',
        'Authorization': 'Bearer ' + this.sessionStorage.getCurrentToken()
      }),
      params: data,
      responseType:'blob'  as const,
    };
    return this.http.get(this.GetUrl(endpoints), httpOptions).pipe(catchError(errorHandler));
  }

  getMap(endpoints: any, data?: any, type?: string, errorHandler: (err: any, caught: Observable<unknown>) => Observable<never> = this.handleError): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + this.sessionStorage.getCurrentToken(),
      }),
      params: data
    };
    return this.http.get<any>(endpoints, httpOptions).pipe(catchError(errorHandler));
  }

  getDocument(endpoints: string, data?: any, type?: string, errorHandler: (err: any, caught: Observable<unknown>) => Observable<never> = this.handleError): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.sessionStorage.getCurrentToken(),
      responseType: 'blob',
      Accept: 'application/octet-stream',
      observe: 'response'
    });


    return this.http.get(this.GetUrl(endpoints), { headers: headers, responseType: "blob", params: data }).pipe(catchError(errorHandler));

  }

  put(endpoints: string, data?: any, type?: string, errorHandler: (err: any, caught: Observable<unknown>) => Observable<never> = this.handleError): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + this.sessionStorage.getCurrentToken()
      })
    };

    const body = JSON.stringify(data);
    return this.http.put<any>(this.GetUrl(endpoints), body, options).pipe(catchError(errorHandler));
  }

  patch(endpoints: string, data?: any, type?: string, errorHandler: (err: any, caught: Observable<unknown>) => Observable<never> = this.handleError): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + this.sessionStorage.getCurrentToken()
      })
    };

    const body = JSON.stringify(data);
    return this.http.patch<any>(this.GetUrl(endpoints), body, options).pipe(catchError(errorHandler));
  }

  delete(endpoints: string, data?: any, type?: string, errorHandler: (err: any, caught: Observable<unknown>) => Observable<never> = this.handleError): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.sessionStorage.getCurrentToken()
      }),
      params: data
    };

    return this.http.delete<any>(this.GetUrl(endpoints), httpOptions).pipe(catchError(errorHandler));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private handleError(error: HttpErrorResponse, caught: Observable<unknown>) {
    let message;
    console.log(error);
    if (error.status == 400) {
      message = error.error[0];
    }
    else if (error.status == 499) {
      // A timeout error
      message = 'Se ha presentado un error de tiempo:' + error.error.message;
      console.error(message);
    }
    else if (error.error instanceof ErrorEvent) {
      // A http-side or network error occurred. Handle it accordingly.
      message = 'Se ha presentado un error:' + error.error.message;
      console.error(message);
    }
    else if (error.status == 404) {
      // A http-side or network error occurred. Handle it accordingly.
      message = 'Se ha presentado un error, por favor intente más tarde. (00):';
      console.error('El servicio devolvió un error código ' + error.status + ' con mensaje: ' + error.message);
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      message = 'Se ha presentado un error, por favor intente más tarde.<br/> error code:' + error.status + '<br/> error:' + error.message;
      console.error('El servicio devolvió un error código ' + error.status + ' con mensaje: ' + error.message);
    }
    // return an observable with a user-facing error message
    message = JSON.stringify(error);
    return throwError(error);
  }
}
