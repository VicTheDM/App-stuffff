import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Persona } from '../../../domain/personas';
import { PersonasService } from '../../../services/personas.service';

@Component({
    selector: 'app-participantes',
    templateUrl: './personas.component.html',
    styleUrls: ['./personas.component.css'],
    providers: [ConfirmationService,MessageService, PersonasService]
})
export class PersonasComponent implements OnInit {

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

        getEvento(id:number){
            return this.eventos.find(val => val.id == id).nombre
        }
        getAsistencia(id:number){
            return this.asistencias.find(val => val.id == id).nombre
        }
    async ngOnInit() {
        await this.personaService.test().subscribe(res=>
            console.log(res))
        await this.personaService.getAll(0).subscribe(data => {
            this.personas = data
            console.log("personas: ",data)
        
        this.personaService.getAll(1).subscribe(data => {
            this.asistencias = data
            console.log("Asistencias: ",data)
        this.personaService.getAll(2).subscribe(data => {
            this.eventos = data
            console.log("Eventos: ",data)
            this.fillTotal();
        });});});
    }

    async fillTotal(){
        let total = this.personas
        for (let index = 0; index < total.length; index++) {
            const element = total[index];
            let asis = 0
            let fechasPart:any[] = []
            this.asistencias.forEach(element2 => {
                if(element2.participanteId == element.id){
                    console.log(element2.participanteId+'  '+ element.id)
                    asis = asis+1
                    fechasPart.push(element2.fecha)
                }
            });
            element.evento = this.eventos.find(val => val.id == element.eventoId).nombre
            element.asistencias = asis
            element.asistencias_requeridas = this.eventos.find(val => val.id == element.eventoId).asistencias_requeridas
            element.fechas = fechasPart
            console.log(element.nombre, element)
        }
    }
    goTo(id:number) {
        if(id==0){
            window.open(`/participantes-form/${id}`, "_blank")
          }else{
            window.open(`/participantes-form/${id}`, "_blank")
          }
    }

    deleteSelectedPersonas() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected participantes?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.personas = this.personas.filter(val => !this.selectedPersonas.includes(val));
                this.selectedPersonas = [];
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Personas Deleted', life: 3000});
            }
        });
    }

    deletePersona(persona: Persona) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + persona.nombre + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                let id:number =+persona.id!
                // this.personaService.delete(id,0).subscribe(personas => {
                //     console.log(personas)
                //   });
                this.personas = this.personas.filter(val => val.id !== persona.id);
                this.persona = {};
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Persona Deleted', life: 3000});
            }
        });
    }

    hideDialog() {
        this.personaDialog = false;
        this.submitted = false;
    }
    

}
