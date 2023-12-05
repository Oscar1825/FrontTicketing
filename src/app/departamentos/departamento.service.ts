import { Injectable } from '@angular/core';
import { Departamento } from "./departamento";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private urlEndPoint: string = 'http://localhost:8080/api/departamentos'
  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'})

  constructor(private http : HttpClient) { }

  getDepartamentos() : Observable<Departamento[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map((Response) => Response as Departamento[])
    );
  }

  create(departamento:Departamento) : Observable<Departamento>{
    return this.http.post<Departamento>(this.urlEndPoint, departamento, {headers: this.httpHeaders})
  }

  getDepartamento(id) : Observable <Departamento>{
    return this.http.get<Departamento>(`${this.urlEndPoint}/${id}`)
  }

  update(departamento:Departamento):Observable<Departamento>{
    return this.http.put<Departamento>(`${this.urlEndPoint}/${departamento.id}`, departamento, {headers:this.httpHeaders})
  }

  delete(id : number) : Observable<Departamento>{
    return this.http.delete<Departamento>(`${this.urlEndPoint}/${id}`, {headers:this.httpHeaders})
  }
}
