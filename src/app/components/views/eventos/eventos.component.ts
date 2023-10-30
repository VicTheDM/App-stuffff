import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Persona } from '../../../domain/personas';
import { PersonasService } from '../../../services/personas.service';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-eventos',
    templateUrl: './eventos.component.html',
    styleUrls: ['./eventos.component.css'],
    providers: [ConfirmationService,MessageService, PersonasService]
})
export class EventosComponent implements OnInit {

    personaDialog: boolean;
    personas: Persona[];
    eventos: any[];
    asistencias: any[];
    persona: Persona;
    selectedPersonas: Persona[]=[];
    submitted: boolean;
    statuses: any[];

    constructor(
        private personaService: PersonasService, 
        private messageService: MessageService, 
        private confirmationService: ConfirmationService
        ) 
        { 
            
        }
        items: MenuItem[] | undefined;

    async ngOnInit() {
        this.items = [
            
            {
                label: 'Inicio',
                icon: 'pi pi-fw pi-home',
                routerLink:'/inicio'
            },
            {
                label: 'Events',
                icon: 'pi pi-fw pi-user',
                routerLink:'/eventos'
            }
        ];
        this.personaService.getAll(2).subscribe(data => {
            this.eventos = data
            this.fillTotal();
        });
    }

    async fillTotal(){
        let total = this.personas
    }
    goTo(id:any) {
        if(id=='0'){
            window.open(`/eventos-form/${id}`, "_blank")
          }else{
            window.open(`/eventos-form/${id}`, "_blank")
          }
    }

    deleteSelectedPersonas() {
        this.confirmationService.confirm({
            message: 'Estas seguro que deseas borrar a los eventos?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.personas = this.personas.filter(val => !this.selectedPersonas.includes(val));
                this.selectedPersonas = [];
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Participante borrado de registro', life: 3000});
            }
        });
    }

    deletePersona(evento: Persona) {
        this.confirmationService.confirm({
            message: 'Estas seguro que deseas borrar ' + evento.nombre + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                let id = evento._id!
                this.personaService.delete(id,2).subscribe(eventos => {
                    this.eventos = this.eventos.filter(val => val._id !== evento._id);
                    this.persona = {};
                    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Evento Deleted', life: 3000});
                  });
            }
        });
    }

    hideDialog() {
        this.personaDialog = false;
        this.submitted = false;
    }
    

}
