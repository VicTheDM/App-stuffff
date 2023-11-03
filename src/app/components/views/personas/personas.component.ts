import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Persona } from '../../../domain/personas';
import { PersonasService } from '../../../services/personas.service';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-participantes',
    templateUrl: './personas.component.html',
    styleUrls: ['./personas.component.scss'],
    providers: [ConfirmationService,MessageService, PersonasService]
})
export class PersonasComponent implements OnInit {

    personaDialog: boolean;
    personas: Persona[]=[];
    eventos: any[]=[];
    asistencias: any[]=[];
    persona: Persona;
    selectedPersonas: Persona[]=[];
    submitted: boolean;
    statuses: any[];
    timmer          : any;

    constructor(
        private personaService: PersonasService, 
        private messageService: MessageService, 
        private confirmationService: ConfirmationService
        ) 
        { 
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
                }
            ];
            this.timmer = this.getStuff();
        }

        async getStuff(){
                await this.personaService.getAll(0).subscribe(data => {
                    this.personas = data                    
                    setTimeout(()=>{
                        this.fillTotal();
                    },500)
                });
                await this.personaService.getAll(1).subscribe(data => {
                    this.asistencias = data
                });
                await this.personaService.getAll(2).subscribe(data => {
                    this.eventos = data
                });       
        }

        getEvento(id:number){
            return this.eventos.find(val => val.id == id).nombre
        }
        getAsistencia(id:number){
            return this.asistencias.find(val => val.id == id).nombre
        }
        items: MenuItem[] | undefined;

    async ngOnInit() {
    }

    async fillTotal(){
        if(this.personas.length == 0 || this.eventos.length == 0){
            setTimeout(()=>{
                this.fillTotal();
            },500)
        }
        for (let index = 0; index < this.personas.length; index++) {
            const element = this.personas[index];
            let asis = 0
            let fechasPart:any[] = []
            this.asistencias.forEach(element2 => {
                if(element2.participanteId == element._id){
                    asis = asis+1
                    fechasPart.push(element2.fecha)
                }
            });
            element.evento = this.eventos.find(val => val._id == element.eventoId).nombre
            element.asistencias = asis
            element.asistencias_requeridas = this.eventos.find(val => val._id == element.eventoId).asistencias_requeridas
            element.fechas = fechasPart
        }
    }
    goTo(id:any) {
        if(id=='0'){
            window.open(`/participantes-form/${id}`, "_blank")
          }else{
            window.open(`/participantes-form/${id}`, "_blank")
          }
    }

    deleteselectedPersonas() {
        this.confirmationService.confirm({
            message: 'Estas seguro que deseas borrar a los participantes?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                for (let index = 0; index < this.selectedPersonas.length; index++) {
                    const id = this.selectedPersonas[index]._id;
                    this.personaService.delete(id,0).subscribe(personas => {
                        this.personas = this.personas.filter(val => val._id !== id);
                        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Persona Deleted', life: 3000});
                      });
                }
                this.selectedPersonas = []
            }
        });
    }
    
  removeSelection() {
    this.selectedPersonas = [];
  }

    deletePersona(persona: Persona) {
        this.confirmationService.confirm({
            message: 'Estas seguro que deseas borrar ' + persona.nombre + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                let id = persona._id!
                this.personaService.delete(id,0).subscribe(personas => {
                    this.personas = this.personas.filter(val => val._id !== persona._id);
                    this.persona = {};
                    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Persona Deleted', life: 3000});
                  });
            }
        });
    }

    hideDialog() {
        this.personaDialog = false;
        this.submitted = false;
    }

    Print(){
        window.print();
    }
    

}
