import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import  swal from "sweetalert2";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{
  
  clientes: Cliente[]=[];

  constructor (private clienteService : ClienteService){

  }


  //manera optimizada de inyectar, sin necesidad de mucho código
  //ngOnInit(){
    //this.clientes = this.clienteService.getClientes();
  //}

  ngOnInit(){
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }

  delete(cliente: Cliente): void{
    swal.fire({
      title: '¡Alto ahí!',
      text: `¿Desea eliminar a ${cliente.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swal.fire(
              'Cliente eliminado',
              `El cliente ${cliente.nombre} ha sido eliminado`,
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
