import { Component, Input} from '@angular/core';
import { DocInit } from 'src/app/models/DocInit';
import { PersonasService } from 'src/app/services/personas.service';
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
  selector: 'app-eventos-form',
  templateUrl: './eventos-form.component.html',
  styleUrls: ['./eventos-form.component.css'],
  providers: [ConfirmationService,MessageService,PersonasService]
})
export class EventosFormComponent {
  @Input() doc={
    _id                     : '',
    nombre                 : '',
    asistencias_requeridas : 0,
    status                 :0
  };
  personas: Persona[];
  eventos: Eventos[]
  _id: any;
  fechas:string[] = [];
  public simpleForm     : FormGroup;

  constructor(
    private personaService: PersonasService,
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
            this.personaService.getAll(2).subscribe(eventos => {
              this.eventos=eventos;
              this.doc = eventos.find(val => val._id == this._id)
              this.simpleForm.patchValue({
                _id: this.doc._id,
                nombre: this.doc.nombre,
                asistencias_requeridas: this.doc.asistencias_requeridas,
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
                    routerLink:'/eventos'
                },
                {
                    label: ''+this.doc.nombre,
                    icon: 'pi pi-fw pi-pencil'
                }
            ];
            });
      }else{
        this.personaService.getAll(2).subscribe(eventos => {
          this.eventos=eventos;
          this.doc ={
            _id: '',
            nombre: '',
            asistencias_requeridas: 0,
            status: 1
          }          
          this.simpleForm.patchValue({
            _id: '',
            nombre: '',
            asistencias_requeridas: 0,
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

  async createDoc() {
    await this.personaService.create(this.simpleForm.value,2).subscribe(personas => {
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Participante registrado', life: 1000});
      setTimeout(() => {
        this.location.back();
      }, 1000)
    });
  }
  updateDoc() {    
    this.personaService.update(this.simpleForm.value,2).subscribe(personas => {
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
