import { Component, OnInit } from '@angular/core';
import { Departamento } from "./departamento";
import { DepartamentoService } from "./departamento.service";
import { Router, ActivatedRoute } from "@angular/router";
import  swal  from "sweetalert2";


@Component({
  selector: 'app-departamentos-form',
  templateUrl: './departamentos-form.component.html'
})
export class DepartamentosFormComponent implements OnInit {
  public departamento: Departamento = new Departamento()
  public titulo: string = "Agregar departamento"

  constructor(private departamentoService : DepartamentoService,
              private router : Router,
              private activatedRoute : ActivatedRoute){}



  ngOnInit(){
      this.cargarDepartamento();
  }

  cargarDepartamento() : void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.departamentoService.getDepartamento(id).subscribe((departamento) => this.departamento = departamento)
      }
    })
  }

  public create() : void{
    this.departamentoService.create(this.departamento).subscribe(
      Response =>
      {
        this.router.navigate(['/departamentos'])
        swal.fire('Nuevo departamento', `Departamento ${this.departamento.nombre} creado con éxito`, 'success')
      }
    );
  }

  update() : void{
    this.departamentoService.update(this.departamento)
    .subscribe(departamento =>{
      this.router.navigate(['/departamentos'])
      swal.fire('Departamento actualizado', `Departamento ${departamento.nombre} actualizado con éxito`, 'success')
    })
  }

}
