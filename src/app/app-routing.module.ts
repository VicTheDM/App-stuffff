import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/shared/login/login.component';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { PersonasComponent } from './components/views/personas/personas.component';


const routes: Routes = [    
  {path: '', pathMatch: 'full', redirectTo: 'inicio'},
    {path: 'inicio' , component: PersonasComponent},
    // {path: 'hero' , component: ContactDetailComponent},
    {path: 'participantes' , component: PersonasComponent},
    {path: 'checador' , component: PersonasComponent},
    {path: 'participantes-form/:id' , component: PersonasComponent},
    {path: 'login' , component: LoginComponent},
    {path: 'testingStuff',pathMatch: 'full',redirectTo: 'login'},
    {path: '**',component: LoginComponent,}, // Aqui iria el nofound page

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
