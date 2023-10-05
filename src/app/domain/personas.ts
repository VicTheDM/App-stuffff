export interface Persona {
    id ?:string;
    nombre ?:string;
    correo ?:string;
    dependencia ?:string;
    eventoId ?:number;
    evento ?:string;
    asistencias ?:number;
    asistencias_requeridas ?:number;
    fechas ?:any[];
    status ?:number
}