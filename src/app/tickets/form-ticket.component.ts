import { Component } from '@angular/core';
import { Ticket } from "./ticket";
import { TicketService } from "./ticket.service";
import { Router, ActivatedRoute } from "@angular/router";
import  swal  from "sweetalert2";
import { tick } from '@angular/core/testing';
import { Agente } from '../agentes/agente';
import { AgentesService } from '../agentes/agentes.service';

@Component({
  selector: 'app-form-ticket',
  templateUrl: './form-ticket.component.html'
})
export class FormTicketComponent {

  public ticket : Ticket = new Ticket()
  public agentes : Agente[]=[];
  agenteElegido : Agente = null
  public titulo: string = "Crear Ticket"

  constructor(private ticketService : TicketService, private agenteService :AgentesService,
              private router : Router,
              private activatedRoute : ActivatedRoute){}


  ngOnInit(){
    this.cargarTicket()

    this.agenteService.getAgentes().subscribe(
      agentes => this.agentes = agentes
    );
  }

  cargarTicket(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if (id) {
        this.ticketService.getTcket(id).subscribe((ticket) => this.ticket = ticket)
      }
    })
  }

  public create() : void{
    this.ticketService.create(this.ticket).subscribe(
      Response =>
      {
        this.router.navigate(['/tickets'])
        swal.fire('Nuevo Ticket', `Ticket ${this.ticket.id} creado con éxito`, 'success')
      }
    )
  }

  update() : void{
    this.ticketService.update(this.ticket)
    .subscribe(ticket => {
      this.router.navigate(['/tickets'])
      swal.fire('Ticket actualizado', `Ticket ${ticket.id} actualizado con éxito`, 'success')
    })
  }
}
