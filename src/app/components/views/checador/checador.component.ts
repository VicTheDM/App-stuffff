import { Component, ViewChild } from '@angular/core';
import {
  ScannerQRCodeConfig,
  ScannerQRCodeResult,
  NgxScannerQrcodeService,
  NgxScannerQrcodeComponent,
  ScannerQRCodeSelectedFiles,
} from 'ngx-scanner-qrcode';
import { PersonasService } from 'src/app/services/personas.service';
import moment from 'moment';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-checador',
  templateUrl: './checador.component.html',
  styleUrls: ['./checador.component.css'],
  providers: [PersonasService]

})

export class ChecadorComponent {
  items: MenuItem[] | undefined;

  public qrCodeStr: string = '2';
  @ViewChild('action') action!: NgxScannerQrcodeComponent;
  personas: any[];
  asistencias: any[];
  constructor(
    private personaService: PersonasService, 
    private qrcode: NgxScannerQrcodeService,
    private messageService: MessageService, 
    ) {
      this.items = [
          
          {
              label: 'Inicio',
              icon: 'pi pi-fw pi-home',
              routerLink:'/inicio'
          },
          {
              label: 'Checador',
              icon: 'pi pi-fw pi-camera'
          }
      ];
    this.qrCodeStr = '65232a5bf9b3ccdff7e424ed';
    this.personaService.getAll(0).subscribe(data => {
      this.personas = data });

    this.personaService.getAll(1).subscribe(data => {
      this.asistencias = data });
  }
  async onEvent(e: ScannerQRCodeResult[], action?: any) {
    action.pause()
    // e && action && action.pause();
    let id: string = e[0].value
    let envio ={
      _id: '',
      participanteId: id,
      eventoId: this.personas.find(val=>val._id == id).eventoId,
      fecha: moment().format("YYYY-MM-DD"),
      status: 1
    }
    let x = await this.asistencias.find(val=> 
      val.participanteId == id &&
    moment(val.fecha).format("YYYY-MM-DD") == moment().format("YYYY-MM-DD") )
  if(x){
      this.messageService.add({severity:'error', summary: 'Falla', detail: 'Participante ya se registro hoy', life: 3000});      
    }else{
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Participante registro', life: 3000});
      this.personaService.create(envio, 1).subscribe(res=>{
        this.personaService.getAll(1).subscribe(data => {
          this.asistencias = data });
      })
    }
    setTimeout(()=>{
      action.play()
    },2000)
    await this.delay(1000)

  }  
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
