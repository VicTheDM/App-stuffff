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
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css'],
  providers: [ConfirmationService,MessageService,EndpointsService]
})
export class UsuariosFormComponent {
  @Input() doc={
    _id           : '',
    nombre        : '',
    correo        : '',
    dependencia   : '',
    status        : 0,
    password      : '',
    userName      : ''
  };
  personas: Persona[];
  eventos: Eventos[]
  _id: any;
  fechas:string[] = [];
  items: MenuItem[] | undefined;
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
    _id                     : new FormControl(''),
    userName                : new FormControl(''),
    nombre                  : new FormControl(''),
    correo                  : new FormControl(''),
    dependencia             : new FormControl(''),
    password                : new FormControl(''),
    status                  : new FormControl(1),
  });

    this.route.params.subscribe((params) => {
      this._id = params['_id'];
      if (this._id !== '0'){
            this.EndpointsService.getById(3,this._id ).subscribe((usuario:any) => {
              this.doc = usuario.res
              this.simpleForm.patchValue({
                _id           : this.doc._id,
                nombre        : this.doc.nombre,
                correo        : this.doc.correo,
                dependencia   : this.doc.dependencia,
                status        : this.doc.status,
                userName      : this.doc.userName,
                password      : ''
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
      }else{
          this.doc ={
            _id           : '',
            nombre        : '',
            correo        : '',
            dependencia   : '',
            status        : 1,
            userName      : '',
            password      : ''
          }          
          this.simpleForm.patchValue({
            _id           : '',
            nombre        : '',
            correo        : '',
            dependencia   : '',
            status        : 1,
            userName      : '',
            password      : ''
          })
        
      this.items = [
            
        {
            label: 'Inicio',
            icon: 'pi pi-fw pi-home',
            routerLink:'/inicio'
        },
        {
            label: 'Usuarios',
            icon: 'pi pi-fw pi-user',
            routerLink:'/usuarios'
        },
        {
            label: 'Nuevo Usuario',
            icon: 'pi pi-fw pi-pencil'
        }
    ];
      }    
    });
  }

  ngOnInit() {
    
    
  }


  async fillTotal(){
    let total = this.doc
}

  async createDoc() {
    await this.EndpointsService.create(this.simpleForm.value,3).subscribe(personas => {
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Participante registrado', life: 1000});
      setTimeout(() => {
        this.location.back();
      }, 1000)
    });
  }
  updateDoc() {    
    if(this.simpleForm.value.password == ('' || null)){
      delete this.simpleForm.value['password'];
    }
    this.EndpointsService.update(this.simpleForm.value, 3).subscribe(personas => {
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
