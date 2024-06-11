import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/shared/login/login.component';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { PersonasComponent } from './components/views/personas/personas.component';
import { PersonasFormComponent } from './components/views/personas/personas-form/personas-form.component';
import { ChecadorComponent } from './components/views/checador/checador.component';
import { InicioComponent } from './components/views/inicio/inicio.component';
import { EventosComponent } from './components/views/eventos/eventos.component';
import { EventosFormComponent } from './components/views/eventos/eventos-form/eventos-form.component';
import { AsistenciasComponent } from './components/views/asistencias/asistencias.component';
import { AsistenciasFormComponent } from './components/views/asistencias/asistencias-form/asistencias-form.component';
import { CorreosComponent } from './components/views/correos/correos.component';
import { CorreosFormComponent } from './components/views/correos/correos-form/correos-form.component';
import { UsuariosComponent } from './components/views/usuarios/usuarios.component';
import { UsuariosFormComponent } from './components/views/usuarios/usuarios-form/usuarios-form.component';
// import { InicioComponent } from './components/views/inicio/inicio.component';
const routes: Routes = [    
  {path: '', pathMatch: 'full', redirectTo: 'inicio'},
    {path: 'inicio' , component: InicioComponent},
    // {path: 'hero' , component: ContactDetailComponent},
    {path: 'participantes' , component: PersonasComponent},
    {path: 'eventos' , component: EventosComponent},
    {path: 'eventos-form/:_id' , component: EventosFormComponent},
    {path: 'asistencias' , component: AsistenciasComponent},
    {path: 'asistencias-form/:_id' , component: AsistenciasFormComponent},
    {path: 'correos' , component: CorreosComponent},
    {path: 'correos-form/:_id' , component: CorreosFormComponent},
    {path: 'usuarios' , component: UsuariosComponent},
    {path: 'usuarios-form/:_id' , component: UsuariosFormComponent},
    {path: 'checador' , component: ChecadorComponent},
    {path: 'participantes-form/:_id' , component: PersonasFormComponent},
    {path: 'login' , component: LoginComponent},
    {path: 'testingStuff',pathMatch: 'full',redirectTo: 'inicio'},
    {path: '**',component: InicioComponent,}, // Aqui iria el nofound page

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
