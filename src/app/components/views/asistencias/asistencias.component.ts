import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Persona } from '../../../domain/personas';
import { PersonasService } from '../../../services/personas.service';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-asistencias',
    templateUrl: './asistencias.component.html',
    styleUrls: ['./asistencias.component.css'],
    providers: [ConfirmationService,MessageService, PersonasService]
})
export class AsistenciasComponent implements OnInit {

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
                label: 'Asistencias',
                icon: 'pi pi-fw pi-user'
            }
        ];
        
        this.personaService.getAll(0).subscribe(data => {
            this.personas = data         
        this.personaService.getAll(1).subscribe(data => {
            this.asistencias = data        
        this.personaService.getAll(2).subscribe(data => {
            this.eventos = data
            setTimeout(()=>{
                this.fillTotal();
            },500)

        });});});

    }

    async fillTotal(){
        let total = this.personas
        for (let index = 0; index < this.asistencias.length; index++) {
            const element = this.asistencias[index];
            element.evento = (this.eventos.find(val => val._id == element.eventoId)?.nombre || 'Evento borrado')
            element.participante = (this.personas.find(val => val._id == element.participanteId)?.nombre ||'Participante borrado' )
        }    }
    goTo(id:any) {
        if(id=='0'){
            window.open(`/asistencias-form/${id}`, "_blank")
          }else{
            window.open(`/asistencias-form/${id}`, "_blank")
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
                    this.personaService.delete(id,1).subscribe(personas => {
                        this.asistencias = this.asistencias.filter(val => val._id !== id);
                        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Asistencia Deleted', life: 3000});
                      });
                }
                this.selectedPersonas = []
            }
        });
    }
    
  removeSelection() {
    this.selectedPersonas = [];
  }

    deletePersona(asistencia: Persona) {
        this.confirmationService.confirm({
            message: 'Estas seguro que deseas borrar ' + asistencia.nombre + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                let id = asistencia._id!
                this.personaService.delete(id,1).subscribe(asistencias => {
                    this.asistencias = this.asistencias.filter(val => val._id !== asistencia._id);
                    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Asistencia Deleted', life: 3000});
                  });
            }
        });
    }

    hideDialog() {
        this.personaDialog = false;
        this.submitted = false;
    }
    

}
