import { Injectable } from '@angular/core';
import { Agente } from "./agente";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AgentesService {

  private urlEndPoint:string = 'http://localhost:8080/api/agentes';
  private httpHeaders = new HttpHeaders({'Conte-Type' : 'application/json'})

  constructor(private http: HttpClient, private router : Router) { }

  getAgentes(): Observable<Agente[]>{
      
  return this.http.get(this.urlEndPoint).pipe(
    map((Response) => Response as Agente[])
  );
  }

  create(agente:Agente) : Observable<Agente>{
    return this.http.post<Agente>(this.urlEndPoint, agente, {headers: this.httpHeaders}).pipe(
      map( (response : any) => response.agente as Agente),
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
  getAgente(id):Observable<Agente>{
    return this.http.get<Agente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);  
        console.error(e.error.mensaje)
        swal.fire('Error al editar ', e.error.mensaje, 'error');
        return throwError(e); 
      })
    );
    
  }
  update(agente : Agente) : Observable<any>{
    return this.http.put<Agente>(`${this.urlEndPoint}/${agente.id}`, {headers : this.httpHeaders}).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
  delete(id : number) : Observable<Agente>{
    return this.http.delete<Agente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}
