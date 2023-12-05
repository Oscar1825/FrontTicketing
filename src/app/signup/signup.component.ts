import { Component, OnInit } from '@angular/core';
import { Cliente } from "../clientes/cliente";
import { ClienteService } from "../clientes/cliente.service";
import { FormComponent } from "../clientes/form.component";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit{

public cliente = {
  nombre : '',
  apellido : '',
  email : ''

}

  constructor(private clienteService : FormComponent,
              private clientes : Cliente
    ){}

  ngOnInit(): void {
    
  }

  formSubmit(){
    console.log(this.clientes);
    if(this.clientes.nombre == '' || this.clientes.nombre == null){
      alert('el nombre de usuario es requerido')
      return;
    }
  
  }


}
