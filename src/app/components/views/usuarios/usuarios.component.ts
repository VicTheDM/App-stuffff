import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Persona } from '../../../domain/personas';
import { EndpointsService } from '../../../services/endpoints.service';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [ConfirmationService,MessageService, EndpointsService]
})

export class UsuariosComponent {

  personaDialog: boolean;
  usuarios =[];
  eventos: any[]=[];
  asistencias: any[]=[];
  persona: any;
  selectedUsuarios =[];
  submitted: boolean;
  statuses: any[];
  timmer          : any;
  
  items: MenuItem[] | undefined;

constructor(
  private EndpointsService: EndpointsService, 
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
              label: 'Usuarios',
              icon: 'pi pi-fw pi-user',
              routerLink:'/usuarios'
          }
      ];
      this.timmer = this.getStuff();
  }

  async getStuff(){
          await this.EndpointsService.getAll(3).subscribe((data:any) => {
              console.log(data.res)
              this.usuarios = data.res  
          });      
  }

  getEvento(id:number){
      return this.eventos.find(val => val.id == id).nombre
  }
  getAsistencia(id:number){
      return this.asistencias.find(val => val.id == id).nombre
  }

async ngOnInit() {
}


goTo(id:any) {
  if(id=='0'){
      window.open(`/usuarios-form/${id}`, "_blank")
    }else{
      window.open(`/usuarios-form/${id}`, "_blank")
    }
}

deleteselectedPersonas() {
  this.confirmationService.confirm({
      message: 'Estas seguro que deseas borrar a los usuarios?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          for (let index = 0; index < this.selectedUsuarios.length; index++) {
              const id = this.selectedUsuarios[index]._id;
              this.EndpointsService.delete(id,0).subscribe(res => {
                  this.usuarios = this.usuarios.filter(val => val._id !== id);
                  this.messageService.add({severity:'success', summary: 'Successful', detail: 'Persona Deleted', life: 3000});
                });
          }
          this.selectedUsuarios = []
      }
  });
}

removeSelection() {
this.selectedUsuarios = [];
}

deletePersona(persona: Persona) {
  this.confirmationService.confirm({
      message: 'Estas seguro que deseas borrar ' + persona.nombre + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          let id = persona._id!
          this.EndpointsService.delete(id,0).subscribe(personas => {
              this.usuarios = this.usuarios.filter(val => val._id !== persona._id);
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
