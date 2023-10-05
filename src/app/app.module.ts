import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AsistenciasComponent } from './components/views/asistencias/asistencias.component';
import { EventosComponent } from './components/views/eventos/eventos.component';
import { PersonasComponent } from './components/views/personas/personas.component';
import { LoginComponent } from './components/shared/login/login.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    AsistenciasComponent,
    EventosComponent,
    PersonasComponent,
    LoginComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
