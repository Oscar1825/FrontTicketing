import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { MatInputModule } from "@angular/material/input";
import {MatButtonModule} from '@angular/material/button'; 
import {MatDividerModule} from '@angular/material/divider'; 
import {MatSelectModule, matSelectAnimations} from '@angular/material/select'; 

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component'; 
import { FooterComponent } from "./footer/footer.component";
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from "./clientes/cliente.service";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormComponent } from './clientes/form.component';
import { FormsModule } from "@angular/forms";
import { SidebarComponent } from './sidebar/sidebar.component';
import { AgentesComponent } from './agentes/agentes.component';
import { AgentesService } from './agentes/agentes.service';
import { AgenteFormComponent } from "./agentes/agente-form.component";
import { TicketsComponent } from './tickets/tickets.component';
import { FormTicketComponent } from './tickets/form-ticket.component';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { DepartamentosFormComponent } from './departamentos/departamentos-form.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistroComponent } from './clientes/registro.component';


//Configuracion de URL 
const routes: Routes = [
  {path: '', component:LandingPageComponent, pathMatch: 'full'},
  {path: 'signup', component:RegistroComponent},
  {path: 'login', component:LoginComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/form', component:FormComponent},
  {path: 'clientes/form/:id', component:FormComponent},
  {path: 'agentes', component: AgentesComponent},
  {path:'agentes/form', component : AgenteFormComponent},
  {path: 'agentes/form/:id', component : AgenteFormComponent},
  {path: 'tickets', component: TicketsComponent},
  {path: 'tickets/form', component: FormTicketComponent},
  {path: 'tickets/form/:id', component: FormTicketComponent},
  {path: 'departamentos', component:DepartamentosComponent},
  {path: 'departamentos/form', component: DepartamentosFormComponent},
  {path: 'departamentos/form/:id', component: DepartamentosFormComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    SidebarComponent,
    AgentesComponent,
    AgenteFormComponent,
    TicketsComponent,
    FormTicketComponent,
    DepartamentosComponent,
    DepartamentosFormComponent,
    LandingPageComponent,
    LoginComponent,
    SignupComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,  FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatSelectModule
  ],
  providers: [ClienteService, AgentesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
