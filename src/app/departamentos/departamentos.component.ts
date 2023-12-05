import { Component, OnInit } from '@angular/core';
import { Departamento } from "./departamento";
import { DepartamentoService } from "./departamento.service";
import  swal from "sweetalert2";

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html'
})
export class DepartamentosComponent implements OnInit{
  departamentos : Departamento[]=[]

  constructor(private departamentoService : DepartamentoService){}

  ngOnInit(): void {
      this.departamentoService.getDepartamentos().subscribe(
        departamentos => this.departamentos = departamentos
      )
  }

  delete(departamento: Departamento): void{
    swal.fire({
      title: '¡Alto ahí!',
      text: `¿Desea eliminar a ${departamento.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.departamentoService.delete(departamento.id).subscribe(
          response => {
            this.departamentos = this.departamentos.filter(cli => cli !== departamento)
            swal.fire(
              'Cliente eliminado',
              `El cliente ${departamento.nombre} ha sido eliminado`,
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
