import { Injectable } from '@angular/core';

import { RestService } from './rest.service';
import { LoginObject } from "../models/login_object";
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

// Messages
import { MessageService } from 'primeng/api';

// Rxjs
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user: BehaviorSubject<unknown> = new BehaviorSubject(null);

  public static refreshUrl = 'users/refreshAuthentication';
  public static loginUrl = '/login/signin';


  constructor(
    private http: HttpClient,
    private restService: RestService,
    private router: Router,
    private sessionStorage: SessionStorageService,
    private messageService: MessageService
  ) {}

  login(loginObj: LoginObject)
  {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'Authorization':'authkey',
        'userid':'1'
      })
    };      
      //return this.http.post(`${environment.apiUrl}/${AuthService.loginUrl}/`,loginObj, httpOptions);
     return this.restService.post(AuthService.loginUrl ,loginObj, undefined, this.loginHandleError);
  }

  logout()
  {
    this.sessionStorage.removeCurrentSession();
    window.location.href='/login';
  }

  refreshSesion() : Observable<unknown>
  {
    const token = this.sessionStorage.getRefreshToken();
    return this.restService.post(AuthService.refreshUrl, {token}, undefined);
  }


  setPermissions(data){
    localStorage.removeItem('permissions');
    localStorage.setItem('permissions', JSON.stringify(data) );
  }

  getPermissions(){
    let JsonParseado = localStorage.getItem('permissions');
    JsonParseado = JSON.parse(JsonParseado);
    return JsonParseado;
  }

  validatePermission(){
    return true;
    // let listPermissions = JSON.parse(localStorage.getItem('permissions'));
    // return listPermissions.find(x => x === query);
  }

  private loginHandleError(error: HttpErrorResponse) {
    let message;
    console.log(error);

    if(error.status == 401){
      message = 'Usuario o contraseña inválida'
    } else if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      message = 'Se ha presentado un error:'+ error.error.message;
      console.error(message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      message = 'Se ha presentado un error, por favor intente más tarde.<br/> error code:'+ error.status + '<br/> error:'+error.message;
      console.error('El servicio devolvió un error código ' + error.status + ' con mensaje: ' + error.message);
    }
    // return an observable with a user-facing error message
    this.messageService.add({severity:'error', summary: 'Error' , detail: 'Error',life: 3000 });
    return throwError(message);
  }

  private refreshHandleError(error : HttpErrorResponse) {
    if(error.status != 401){
        return throwError(error)
    }
    this.messageService.add({
      severity:'warning',
      summary: 'Advertencia' ,
      detail: '¡Su Sesión a expirado! Por favor inicie sesión para continuar de nuevo.',
      life: 3000
    });
    this.sessionStorage.removeCurrentSession()
    this.router.navigate(['/login']);
    return false
  }
}
