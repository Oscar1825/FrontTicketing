import { Component, OnInit } from '@angular/core';
import { Ticket } from "./ticket";
import { TicketService } from "./ticket.service";
import swal from "sweetalert2";
import { Agente } from '../agentes/agente';
import { AgentesService } from "../agentes/agentes.service";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html'
})
export class TicketsComponent  implements OnInit{
  
  tickets: Ticket[]=[];
  agentes : Agente[]=[];
  agenteElegido : Agente = null

  constructor (private ticketService: TicketService, private agenteService :AgentesService){

  }

  ngOnInit() {
      this.ticketService.getTickets().subscribe(
        tickets => this.tickets = tickets
      );

      this.agenteService.getAgentes().subscribe(
        agentes => this.agentes = agentes
      );
  }

  delete(ticket: Ticket): void{
    swal.fire({
      title: '¡Alto ahí!',
      text: `¿Desea eliminar a ${ticket.id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.ticketService.delete(ticket.id).subscribe(
          response => {
            this.tickets = this.tickets.filter(cli => cli !== ticket)
            swal.fire(
              'Cliente eliminado',
              `El cliente ${ticket.id} ha sido eliminado`,
              'success'
            )
          }
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === swal.DismissReason.cancel
      ) {
        swal.fire(
          'Cancelado',
          'Tranquilo, ningún cambio fue aplicado',
          'error'
        )
      }
    })
  }
}
