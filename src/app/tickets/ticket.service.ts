import { Injectable } from '@angular/core';
import { Ticket } from "./ticket";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private urlEndPoint:string = 'http://localhost:8080/api/tickets';

  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'})
  constructor(private http: HttpClient) { }

  getTickets() : Observable<Ticket[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map((Response) => Response as Ticket[])
    );
  }

  create(ticket:Ticket) : Observable<Ticket>{
    return this.http.post<Ticket>(this.urlEndPoint, ticket, {headers: this.httpHeaders})
  }

  getTcket(id):Observable<Ticket>{
    return this.http.get<Ticket>(`${this.urlEndPoint}/${id}`)
  }

  update(ticket : Ticket) : Observable<Ticket>{
    return this.http.put<Ticket>(`${this.urlEndPoint}/${ticket.id}`, ticket, {headers:this.httpHeaders})
  }

  delete(id : number) : Observable<Ticket>{
    return this.http.delete<Ticket>(`${this.urlEndPoint}/${id}`, {headers : this.httpHeaders})
  }
}
