import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from "../app-routing.module";
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { SidebarModule } from 'primeng/sidebar';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { ButtonModule } from "primeng/button";
LOAD_WASM().subscribe((res: any) => console.log('LOAD_WASM', res));
import { MenubarModule } from 'primeng/menubar';
import { UsuariosFormComponent } from './views/usuarios/usuarios-form/usuarios-form.component';
import { CorreosComponent } from './views/correos/correos.component';
import { CorreosFormComponent } from './views/correos/correos-form/correos-form.component';
@NgModule({
  imports: [
    FeatherModule.pick(allIcons)
  ],
  exports: [
    MenubarModule,
    ButtonModule,
    TableModule,
    QRCodeModule,
    NgxScannerQrcodeModule,
    SidebarModule,
    ConfirmDialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FeatherModule,
  ],
  providers: [MessageService, ConfirmationService],
  declarations: [ ]

})
export class PrimeNgModule {}
