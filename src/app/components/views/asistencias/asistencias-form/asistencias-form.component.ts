import { Component, Input} from '@angular/core';
import { DocInit } from 'src/app/models/DocInit';
import { EndpointsService } from 'src/app/services/endpoints.service';
import { ActivatedRoute } from '@angular/router';
import { PersonasInit } from 'src/app/models/PerconasInit';
import { ConfirmationService, MessageService } from 'primeng/api';
import moment from 'moment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Persona } from '../../../../domain/personas';
import { Eventos } from '../../../../domain/eventos';
import { MenuItem } from 'primeng/api';
import { Location } from '@angular/common';

@Component({
  selector: 'app-asistencias-form',
  templateUrl: './asistencias-form.component.html',
  styleUrls: ['./asistencias-form.component.css'],
  providers: [ConfirmationService,MessageService,EndpointsService]
})
export class AsistenciasFormComponent {
  @Input() doc={
    _id                     : '',
    evento                     : '',
    fecha                     : '',
    participante                 : '',
    eventoId                    : '',
    participanteId                 : '',
    status                 :0
  };
  personas: Persona[];
  eventos: Eventos[]
  _id: any;
  fechas:string[] = [];
  public simpleForm     : FormGroup;
  asistencias: any[];

  constructor(
    private EndpointsService: EndpointsService,
    private route: ActivatedRoute, 
    private location: Location,
    private messageService: MessageService, 
    private formBuilder         : FormBuilder,

  ) {
    const today = moment().format("YYYY-MM-DD")    
  this.simpleForm = this.formBuilder.group({
    _id                      : new FormControl(''),
    participanteId           : new FormControl(''),
    eventoId                  : new FormControl(''),
    evento                  : new FormControl(''),
    participante                : new FormControl(''),
    fecha                : new FormControl(''),
    status                  : new FormControl(1),
  });

  this.getIdFromRoute(); 
    this.route.params.subscribe((params) => {
      this._id = params['_id'];
      if (this._id !== '0'){
        this.EndpointsService.getAll(1).subscribe(data => {
          this.asistencias= data;
          this.EndpointsService.getAll(2).subscribe(data2 => {
            this.eventos = data2
              this.doc = this.asistencias.find(val => val._id == this._id);              
              this.doc.evento = this.eventos.find(val => val._id == this.doc.eventoId).nombre
              this.doc.participante = this.personas.find(val => val._id == this.doc.participanteId).nombre
              this.simpleForm.patchValue({
                _id: this.doc._id,
                eventoId: this.doc.eventoId,
                participanteId: this.doc.participanteId,
                evento: this.doc.evento,
                fecha: this.doc.fecha,
                participante: this.doc.participante,
              })
            });
          });
              console.log(this.simpleForm.value)
              this.items = [
            
                {
                    label: 'Inicio',
                    icon: 'pi pi-fw pi-home',
                    routerLink:'/inicio'
                },
                {
                    label: 'Asistencias',
                    icon: 'pi pi-fw pi-user',
                    routerLink:'/eventos'
                },
                {
                    label: '',
                    icon: 'pi pi-fw pi-pencil'
                }
            ];
      }else{
          this.doc ={
            _id: '',
            eventoId: '',
            participanteId: '',
            fecha: '',
            evento: '',
            participante: '',
            status:1
          }          
          this.simpleForm.patchValue({
            _id: this.doc._id,
            eventoId: this.doc.eventoId,
            participanteId: this.doc.participanteId,
            evento: this.doc.evento,
            participante: this.doc.participante,
            fecha: this.doc.fecha,
          })
        
      this.items = [
            
        {
            label: 'Inicio',
            icon: 'pi pi-fw pi-home',
            routerLink:'/inicio'
        },
        {
            label: 'Eventos',
            icon: 'pi pi-fw pi-user',
            routerLink:'/participantes'
        },
        {
            label: 'Nuevo evento',
            icon: 'pi pi-fw pi-pencil'
        }
    ];
      }    
    });
  }
  items: MenuItem[] | undefined;

  async ngOnInit() {
    setTimeout(()=>{
        this.fillTotal();
    },1500)
}


  getIdFromRoute() {
    
    
  }

  
  changeEvent(event:any){
    this.doc.participante = this.personas.find(val => val._id == event).nombre;
    this.doc.eventoId = this.personas.find(val => val._id == event).eventoId;
    console.log(this.doc.eventoId)
    this.simpleForm.patchValue({
      paricipante: this.doc.participante,
      eventoId: this.doc.eventoId
    })
  }

  async fillTotal(){
    let total = this.doc
}

  async createDoc() {
    // let envio ={
    //   _id: '',
    //   participanteId: this.simpleForm.value.participanteId,
    //   eventoId: this.personas.find(val=>val._id == this.simpleForm.value.eventoId).eventoId,
    //   fecha: moment(this.simpleForm.value.fecha).format("YYYY-MM-DD"),
    //   status: 1
    // }
    console.log(this.simpleForm.value)
    console.log(this.simpleForm.value)
    let x = await this.asistencias.find(val=> 
      val.participanteId ==  this.simpleForm.value.participanteId &&
    moment(val.fecha).format("YYYY-MM-DD") == moment(this.simpleForm.value.fecha).format("YYYY-MM-DD") )
  if(x){
      this.messageService.add({severity:'error', summary: 'Falla', detail: 'Participante ya se registro hoy', life: 3000});      
    }else{
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Participante registro', life: 3000});
      // this.EndpointsService.create(envio, 1).subscribe(res=>{
      //   this.EndpointsService.getAll(1).subscribe(data => {
      //     this.asistencias = data });
      // })
    }
    console.log("create: ", this.simpleForm.value)
    // await this.EndpointsService.create(this.simpleForm.value,2).subscribe(personas => {
    //   this.messageService.add({severity:'success', summary: 'Successful', detail: 'Participante registrado', life: 1000});
    //   setTimeout(() => {
    //     this.location.back();
    //   }, 1000)
    // });
  }

  
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
