import { Component, OnInit } from '@angular/core';
import { Agente } from './agente';
import { AgentesService } from './agentes.service';
import swal from "sweetalert2";

@Component({
  selector: 'app-agentes',
  templateUrl: './agentes.component.html'
})

export class AgentesComponent {
  agentes : Agente[]=[];

  constructor(private agenteService :AgentesService){}

  ngOnInit(){
    this.agenteService.getAgentes().subscribe(
      agentes => this.agentes = agentes
    );
  }

  delete(agente: Agente): void{
    swal.fire({
      title: '¡Alto ahí!',
      text: `¿Desea eliminar a ${agente.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.agenteService.delete(agente.id).subscribe(
          response => {
            this.agentes = this.agentes.filter(cli => cli !== agente)
            swal.fire(
              'Cliente eliminado',
              `El cliente ${agente.nombre} ha sido eliminado`,
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
