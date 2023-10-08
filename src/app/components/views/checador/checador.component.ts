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

@Component({
  selector: 'app-checador',
  templateUrl: './checador.component.html',
  styleUrls: ['./checador.component.css'],
  providers: [PersonasService]

})
export class ChecadorComponent {
  public qrCodeStr: string = '2';
  @ViewChild('action') action!: NgxScannerQrcodeComponent;
  personas: any[];
  asistencias: any[];
  constructor(
    private personaService: PersonasService, 
    private qrcode: NgxScannerQrcodeService
    ) {
    this.qrCodeStr = '6';
    this.personaService.getAll(0).subscribe(data => {
      this.personas = data });

    this.personaService.getAll(1).subscribe(data => {
      this.asistencias = data });
  }
  async onEvent(e: ScannerQRCodeResult[], action?: any) {
    action.pause()
    // e && action && action.pause();
    let id: number = +e[0].value
    let envio ={
      id: 0,
      participanteId: id,
      eventoId: this.personas.find(val=>val.id == id).eventoId,
      fecha: moment().format("YYYY-MM-DD"),
      status: 1
    }
  if(this.asistencias.find(val=> 
    val.participanteId == id &&
  moment(val.fecha).format("YYYY-MM-DD") == moment().format("YYYY-MM-DD") )){
      console.log("Ya registrado para hoy")
    }else{
      this.personaService.create(envio, 1).subscribe(res=>{
        this.asistencias = res
        console.log(res)
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
