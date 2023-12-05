import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent {

  listaCurso: string[] = ['TypeScript', 'JavaScript', 'Java SE', 'C#', 'PHP'];
  
  Habilitar: boolean = true;


  setHabilitar(): void{
    this.Habilitar = (this.Habilitar==true)?false:true
  }
}
