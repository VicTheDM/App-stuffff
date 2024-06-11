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
  selector: 'app-participantes-form',
  templateUrl: './personas-form.component.html',
  styleUrls: ['./personas-form.component.css'],
  providers: [ConfirmationService,MessageService,EndpointsService]
})
export class PersonasFormComponent {
  @Input() doc={
    _id                     : '',
    nombre                 : '',
    correo                 : '',
    dependencia            : '',
    asistencias            : 0,
    evento                 : '',
    asistencias_requeridas : 0,
    eventoId               : '',
    fechas                 : [],
    status                 :0
  };
  personas: Persona[];
  eventos: Eventos[]
  _id: any;
  fechas:string[] = [];
  public simpleForm     : FormGroup;

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
    nombre                  : new FormControl(''),
    correo                  : new FormControl(''),
    dependencia             : new FormControl(''),
    evento                  : new FormControl(''),
    eventoId                : new FormControl(''),
    fechas                  : new FormControl([]),
    asistencias             : new FormControl(0),
    asistencias_requeridas  : new FormControl(0),
    status                  : new FormControl(1),
  });

  this.getIdFromRoute(); 
    this.route.params.subscribe((params) => {
      this._id = params['_id'];
      if (this._id !== '0'){
        this.EndpointsService.getAll(0).subscribe(personas => {
          this.EndpointsService.getAll(1).subscribe(asistencias => {
            this.EndpointsService.getAll(2).subscribe(eventos => {
              this.eventos=eventos;
              this.personas = personas
              this.doc = personas.find(val => val._id == this._id)
              let asis = 0
              let fechasPart:any[] = []
              asistencias.forEach(element2 => {
                if (element2.participanteId == this.doc._id) {
                  asis = asis + 1
                  fechasPart.push(moment(element2.fecha).format("YYYY-MM-DD"))
                }
              });
              this.doc.evento = eventos.find(val => val._id == this.doc.eventoId).nombre
              this.doc.asistencias = asis
              this.doc.asistencias_requeridas = eventos.find(val => val._id == this.doc.eventoId).asistencias_requeridas
              this.doc.fechas = fechasPart!
              this.simpleForm.patchValue({
                _id: this.doc._id,
                nombre: this.doc.nombre,
                asistencias: this.doc.asistencias,
                correo: this.doc.correo,
                dependencia: this.doc.dependencia,
                eventoId: this.doc.eventoId,
                asistencias_requeridas: this.doc.asistencias_requeridas,
                fechas: this.doc.fechas,
                evento: this.doc.evento,
                status: this.doc.status
              })

              this.items = [
            
                {
                    label: 'Inicio',
                    icon: 'pi pi-fw pi-home',
                    routerLink:'/inicio'
                },
                {
                    label: 'Participantes',
                    icon: 'pi pi-fw pi-user',
                    routerLink:'/participantes'
                },
                {
                    label: ''+this.doc.nombre,
                    icon: 'pi pi-fw pi-pencil'
                }
            ];
            });
          });
        });
      }else{
        this.EndpointsService.getAll(2).subscribe(eventos => {
          this.eventos=eventos;
          this.doc ={
            _id: '',
            nombre: '',
            asistencias: 0,
            correo: '',
            dependencia: '',
            eventoId: '',
            asistencias_requeridas: 0,
            fechas: [],
            evento: '',
            status: 1
          }          
          this.simpleForm.patchValue({
            _id: '',
            nombre: '',
            asistencias: 0,
            correo: '',
            dependencia: '',
            eventoId: '',
            asistencias_requeridas: 0,
            fechas: [],
            evento: '',
            status: 1
          })
        });
        
      this.items = [
            
        {
            label: 'Inicio',
            icon: 'pi pi-fw pi-home',
            routerLink:'/inicio'
        },
        {
            label: 'Participantes',
            icon: 'pi pi-fw pi-user',
            routerLink:'/participantes'
        },
        {
            label: 'Nuevo participante',
            icon: 'pi pi-fw pi-pencil'
        }
    ];
      }    
    });
  }
  items: MenuItem[] | undefined;

  ngOnInit() {
    
    
  }

  changeEvent(event:any){
    this.doc.asistencias_requeridas = this.eventos.find(val => val._id == event)!.asistencias_requeridas;
    this.simpleForm.patchValue({
      asistencias_requeridas: this.doc.asistencias_requeridas
    })
  }

  getIdFromRoute() {
    
    
  }

  async fillTotal(){
    let total = this.doc
}

  addFecha(event?:any): void {
    this.doc.fechas!.push(moment().format("YYYY-MM-DD")  );
  }
  removeFecha(index: number): void {
    this.doc.fechas!.splice(index, 1)
}
changeDate(event:any, index:number){
  this.doc.fechas![index] = event
}
  async createDoc() {
    await this.EndpointsService.create(this.simpleForm.value,0).subscribe(personas => {
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Participante registrado', life: 1000});
      setTimeout(() => {
        this.location.back();
      }, 1000)
    });
  }
  updateDoc() {    
    this.EndpointsService.update(this.simpleForm.value,0).subscribe(personas => {
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Participante actualizado', life: 1000});
      setTimeout(() => {
        this.location.back();
      }, 1000)
    });
  }

  
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
