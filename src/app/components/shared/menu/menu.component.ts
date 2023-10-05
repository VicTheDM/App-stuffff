import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent  implements OnInit{
  visibleSidebar = false;
  public fecha                    : any;

  public nombre                   : string = 'Pepe';
  public rol                      : string = 'Jefe';

  public isCollapsed               = true;
  public isCollapsed2              = true;
  public isCollapsed3              = true;
  public isCollapsed4              = true;
  public isCollapsed5              = true;
  public isCollapsed9              = true;
  public SECTIONS : any = {
    "documentos": true,
    "perfil": true,
    "reportes": true,
    "reportesUsuario": true,
    "reportesDocumentos": true,
    "reportesGeneral": true,
    "correo": true,
    "participantes": true,
  };
  constructor(
    private primengConfig: PrimeNGConfig
    ) {
    this.fecha = new Date().toLocaleString();

  }
  avatar() {
    const
      avatarDefault = 'https://img.icons8.com/windows/56/ffffff/user.png',
      avatar        = avatarDefault;
      // localStorage['userAvatar'] ? localStorage['userAvatar'] : 
    return avatar;
  }

  
  ngOnInit() {
    this.primengConfig.ripple = true;
    setTimeout(() => {
        // const permitions = this.UserL.permissions;
        this.SECTIONS = { //Si la sentencia no se cumple se muestra como se haya programado
          "documentos": true,
          "perfil": true,
          "reportes": true,
          "reportesUsuario": true,
          "reportesDocumentos": true,
          "reportesGeneral": true,
          "correo": true,
          "participantes": true,
        }
      }, 1000);
  }
}
