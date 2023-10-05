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
@NgModule({
  imports: [
    FeatherModule.pick(allIcons),
    
  ],
  exports: [
    TableModule,
    SidebarModule,
    ConfirmDialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FeatherModule,
  ],
  providers: [MessageService, ConfirmationService],
  declarations: [  ]

})
export class PrimeNgModule {}
