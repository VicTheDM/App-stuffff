import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AsistenciasComponent } from './components/views/asistencias/asistencias.component';
import { EventosComponent } from './components/views/eventos/eventos.component';
import { PersonasComponent } from './components/views/personas/personas.component';
import { LoginComponent } from './components/shared/login/login.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule, ErrorHandler, enableProdMode, APP_INITIALIZER, isDevMode   } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationService, SharedModule } from 'primeng/api';
import { PrimeNgModule } from './components/prime-ng.module';
import { CommonModule } from '@angular/common';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonasFormComponent } from './components/views/personas/personas-form/personas-form.component';
import { ChecadorComponent } from './components/views/checador/checador.component';

import { QRCodeModule } from 'angularx-qrcode';
import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
LOAD_WASM().subscribe((res: any) => console.log('LOAD_WASM', res));
import { InicioComponent } from './components/views/inicio/inicio.component';
@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ChecadorComponent,
    AsistenciasComponent,
    EventosComponent,
    PersonasComponent,
    PersonasFormComponent,
    LoginComponent,
    MenuComponent
  ],
  imports: [
    QRCodeModule,
    NgxScannerQrcodeModule,
    BrowserModule,
    RouterModule,
    CommonModule,
    SharedModule,
    PrimeNgModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
