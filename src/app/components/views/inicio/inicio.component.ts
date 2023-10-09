import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit {
  constructor( ) 
  { 
    
  }
  items: MenuItem[] | undefined;
        

        async ngOnInit() {
        this.items = [
            
            {
                label: 'Inicio',
                icon: 'pi pi-fw pi-home',
                routerLink:'/inicio'
            }
        ];
        }
}
