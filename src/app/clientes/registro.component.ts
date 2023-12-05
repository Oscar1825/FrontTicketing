import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import  swal  from "sweetalert2";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent {

  public cliente: Cliente = new Cliente()
  public titulo:string = "Crear cliente :D"
  public hide : true

  constructor(private clienteService :ClienteService,
              private router : Router,
              private activatedRoute : ActivatedRoute){}


  public create(): void{
    this.clienteService.create(this.cliente).subscribe(
      Response => 
      {
        this.router.navigate([''])
        swal.fire('Te has registrado exitosamente')
      }
    );
  }

}
