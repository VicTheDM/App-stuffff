import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';


import { Persona } from '../domain/personas';

@Injectable()
export class PersonasService {
    private url = 'Participante';
    info: any[]
  //readonly URL = 'http://localhost:3501/inventario'

    private endpoints ={      
        0: "Participante",
        1: "Asistencias",
        2: "Eventos"
    }
    private finalEndpoint = '';
    constructor(private http: HttpClient) { }

    public getAll(url:number): Observable<any[]> {
        this.finalEndpoint = this.endpoints[url];        
        return this.http.get<any[]>(`${environment.apiUrl}/${this.finalEndpoint}`);
      }
    
      public update(hero: any, url:number): Observable<any[]> {
        this.finalEndpoint = this.endpoints[url];
        return this.http.put<any[]>(
          `${environment.apiUrl}/${this.finalEndpoint}/${hero._id}`, hero);
      }
    
      public create(hero: any,url:number): Observable<any[]> {
        this.finalEndpoint = this.endpoints[url];
        return this.http.post<any[]>(
          `${environment.apiUrl}/${this.finalEndpoint}`,hero );
      }
    
      public delete(id: string, url:number): Observable<any[]> {
        this.finalEndpoint = this.endpoints[url];
        return this.http.delete<any[]>(
          `${environment.apiUrl}/${this.finalEndpoint}/${id}`
        );
      }
}