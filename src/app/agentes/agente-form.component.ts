import { Component, OnInit} from '@angular/core';
import { Agente } from "./agente";
import { AgentesService } from "./agentes.service";
import { Router, ActivatedRoute } from "@angular/router";
import  swal  from "sweetalert2";

@Component({
  selector: 'app-agente-form',
  templateUrl: './agente-form.component.html'
})
export class AgenteFormComponent implements OnInit{
  public agente : Agente = new Agente()
  public titulo : string = "Crear agente :D"

  constructor(private agenteService : AgentesService,
    private router : Router,
    private activatedRoute : ActivatedRoute){}


  ngOnInit(){
      this.cargarAgente()
  }

  cargarAgente(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if (id) {
        this.agenteService.getAgente(id).subscribe((agente) => this.agente = agente)
      }
    })
  }

  public create() : void{
    this.agenteService.create(this.agente)
    .subscribe(agente =>
      {
        this.router.navigate(['/agentes'])
        swal.fire('Nuevo agente', `Agente ${agente.nombre} creado con éxito`, 'success')
      }
    );
  }

  update() : void{
    this.agenteService.update(this.agente)
    .subscribe(json =>{
      this.router.navigate(['/agentes'])
      swal.fire('Agente actualizado', `${json.nombre} actualizado con éxito`, 'success')
    })
  }
}
