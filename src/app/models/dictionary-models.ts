export interface AgentesModel {
  id: number;
  nombre: string;
  nombreCompleto: string;
  numeroEmpleado: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  corporacionId:number;
  idUsuarioCreacion: number;
  nombreUsuarioCreacion: string;
  idUsuarioActualizacion: number;
  usuarioActualizo: string;
  fechaDeCreacion: Date;
  fechaDeActualizacion: Date;
  status: number;
  fK_TurnoId: number;
  fK_UnidadId: number;
  fK_RadioId: number;
  fK_TabletResourceId: number;
  fK_TabletHistoricoId: number;
  fK_TabletId: number;
}
export interface GuardiasModel {
  id: number;
  nombre: string;
  nombreCompleto: string;
  numeroEmpleado: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  corporacionId:number;
  idUsuarioCreacion: number;
  nombreUsuarioCreacion: string;
  idUsuarioActualizacion: number;
  usuarioActualizo: string;
  fechaDeCreacion: Date;
  fechaDeActualizacion: Date;
  status: number;
  fK_TurnoId: number;
  fK_UnidadId: number;
  fK_RadioId: number;
  fK_TabletResourceId: number;
  fK_TabletHistoricoId: number;
  fK_TabletId: number;
}

export interface AlcoholModel extends narrativeToSave {
  id : number;
  conclusiones : string;
  comentarios : string;
  presencia : number;
  estatus : string;
  especificaciones : string;
  nombreUsuarioCreacion  : string;
  idUsuarioCreacion  : number;
  idUsuarioActualizacion  : number;
  usuarioActualizo  : string;
  fechaDeCreacion  : Date;
  fechaDeActualizacion  : Date;
  status : number;
  folio : number;
  file :number[];
}
export interface ArmasModel extends narrativeToSave {
  id: number;
  presencia: string;
  tipoArma: string;
  calibre: string;
  marca: string;
  modelo: string;
  matricula: string;
  matriculaCanon: string;
  cantidad: string;
  observaciones: string;
  conclusiones: string;
  nombreUsuarioCreacion: string;
  idUsuarioCreacion: number;
  idUsuarioActualizacion: number;
  usuarioActualizo: string;
  fechaDeCreacion: Date;
  fechaDeActualizacion: Date;
  status: number;
  folio: number;
  file :number[];
}

export interface CamarasModel {
  id: number;
  estatus: string;
  ciudadana: boolean;
  lat: string;
  long: string;
  marca: string;
  modelo: string;
  tipo: string;
  icono: string;
  icon: {
    url:string;
    scaledSize:google.maps.Size;
  };
  color: string;
  nombre: string;
  ubicacion: string;
  referencia: string;
  identificador: string;
  pmi: string;
  username: string;
  password: string;
  timestamp: string;
  nonce: string;
  dns: string;
  direccionIp: string;
  corporacionId: number;
  idZona: number;
  zonaNombre: string;
  idUsuarioCreacion: number;
  nombreUsuarioCreacion: string;
  idUsuarioActualizacion: string;
  usuarioActualizo: string;
  fechaDeCreacion: string;
  fechaDeActualizacion: string;
  status: number;
  createdAt: string;
  createdBy: string;
  createdByUserName: string;
  updatedAt: string;
  updatedBy: string;
  deletedAt: string;
  deletedBy: string;
  active: boolean;
}

export interface CarreteraModel {
  id: number;
  destino: string;
  origen: string;
  kilometraje: string;
  idUsuarioCreacion: number;
  nombreUsuarioCreacion: string;
  idUsuarioActualizacion: number;
  usuarioActualizo: string;
  fechaDeCreacion: Date;
  fechaDeActualizacion: Date;
  status: number;
  folio: number;
}

export interface CordenadasModel {
  id: number;
  lat: number;
  lng: number;
}

export interface ColoresModel {
  id : number;
  nombre : string; 
  descripcion : string; 
  status : number;
}

export interface CorporationsModel {
    id: number;
    nombre: string;
    alias: string;
    logotipo: string;
    descripcion: string;
    tipo: string;
    sector: string;
    idServicio: number;
    servicio: ServiciosModel;
    status: number;
    createdByUserName: string;
    createdAt: Date | string;
    createdBy: string;
    updatedAt: Date | string;
    updatedBy: string;
    deletedAt: Date | string;
    deletedBy: string;
    active: boolean;
}

export interface DrogasModel extends narrativeToSave {
  id: number;
  conclusiones: string;
  presencia: number;
  cantidad: number;
  tipoDroga: string;
  estatus: string;
  unidadMedida: string;
  localizacion: string;
  nombreUsuarioCreacion: string;
  idUsuarioCreacion: number;
  idUsuarioActualizacion: number;
  usuarioActualizo: string;
  fechaDeCreacion: Date;
  fechaDeActualizacion: Date;
  status: number;
  folio: number;
  file :number[];
}

interface narrativeToSave {
  saved?: boolean;
  index_collapse?: boolean;
}

export interface EventoNarrativaModel {
  id: number;
  narrativa: string;
  idUsuarioCreacion: number;
  nombreUsuarioCreacion: string;
  origen: string;
  idUsuarioActualizacion: number;
  usuarioActualizo: string;
  fechaDeCreacion: Date;
  fechaDeActualizacion: Date;
  status: number;
  folio: number;
  corporacionId: number;
  corporacionName: string;
  corporacionAlias: string;
  createdAt: Date;
  createdBy: string;
  createdByUserName: string;
  updatedAt: Date;
  updatedBy: string;
  deletedAt: Date;
  deletedBy: string;
  active: boolean;
  evidencias: string[];
  evidenciasIds: number[];
}

export interface EventosAsociadosModelModel {
  id: number;
  folioHijo: number;
  idUsuarioCreacion: number;
  nombreUsuarioCreacion: string;
  idUsuarioActualizacion: number;
  usuarioActualizo: string;
  fechaDeCreacion: Date;
  fechaDeActualizacion: Date;
  status: number;
  folio: number;
}

export interface EventoServiciosModel {
  id: number;
  narrativa: string[];
  idUsuarioCreacion: number;
  nombreUsuarioCreacion: string;
  idUsuarioActualizacion: number;
  usuarioActualizo: string;
  fechaDeCreacion: Date;
  fechaDeActualizacion: Date;
  status: number;
  folio: number;
  fK_ServicioId: number;
}

export interface EventosHistorialesModel {
  id: number;
  folio: number;
  incidencia: string;
  fecha_creacion: string;
  estatus: string;
}

export interface EventosHistorialModel {
  id: number;
  motivoTerminado: string;
  corporacionId: number;
  folio: number;
  latitud: string;
  longitud: string;
  origen: string;
  telefono: string;
  referencia: string;
  prioridad: string;
  colonia: string;
  calle: string;
  codigoPostal: string;
  cruzeFronterizo: string;
  destino: string;
  direccion: string;
  entreCalles: string;
  estado: string;
  estatus: string;
  municipio: string;
  kilometraje: string; 
  numeroInterior: string;
  numeroExterior: string;
  motivoCancelacion: string;
  incidencia: string;
  servicios: string[];
  nombre: string;
  sexo: string;
  apellido_materno: string;
  apellido_paterno: string;
  edad: number;
  idUsuarioCreacion : number;
  nombreUsuarioCreacion : string;
  idUsuarioActualizacion : number;
  usuarioActualizo : string;
  fechaDeCreacion : Date;
  fechaDeActualizacion : Date;
  // Tiempo en el que el evento se podra ya no reactivar
  tiempoReactivacionEvento: Date;
  canActivateEvent: boolean;
  fK_CarreteraId: number;
  fK_ServiciosId: number;
  fK_ArmasId: number;
  fK_VehiculosId: number;
  fK_ObjetosSospechososId: number;
  fK_AlcoholId: number;
  fK_PersonasId: number;
  fK_DrogasId: number;
  foliosAsociados: number;
  comentarios: string;
  idZona: number;
  zonaNombre: string;
  // Default Data For Log
  createdAt: Date;
  createdBy: string;
  createdByUserName: string;
  updatedAt?: Date;
  updatedBy: string;
  deletedAt?: Date;
  deletedBy: string;
  status: number;
  active: boolean;
  inclusivo : string;
}

export interface BitacoraEventosModel {
  pageNumber    : number;
  pageSize      : number;
  totalPages    : number;
  totalRecords  : number;
  data          : EventosHistorialModel[];
  succeeded     : boolean,
  errors        : string,
  message       : string
}

export interface EventosModel {
  id: number;
  descripcion: string;
  latitud: number;
  origen: string;
  telefono: string;
  referencia: string;
  prioridad: string;
  colonia: string;
  calle: string;
  codigoPostal: string;
  cruzeFronterizo: string;
  destino: string;
  direccion: string;
  entreCalles: string;
  estado: string;
  estatus: string;
  municipio: string;
  kilometraje: string;
  numeroInterior: string;
  numeroExterior: string;
  idUsuarioCreacion: number;
  nombreUsuarioCreacion: string;
  idUsuarioActualizacion: number;
  usuarioActualizo: string;
  fechaDeCreacion: Date;
  fechaDeActualizacion: Date;
  status: number;
}

export interface EventoTiempoVidaModel {
  id: number;
  nombre: string;
  estatus: string;
  fecha: string;
  idUsuarioCreacion: number;
  nombreUsuarioCreacion: string;
  idUsuarioActualizacion: number;
  usuarioActualizo: string;
  fechaDeCreacion: Date;
  fechaDeActualizacion: Date;
  status: number;
  folio: number;
}

export interface EventoTiempoVidaModel {
  id: number;
  nombre: string;
  estatus: string;
  fecha: string;
  idUsuarioCreacion: number;
  nombreUsuarioCreacion: string;
  idUsuarioActualizacion: number;
  usuarioActualizo: string;
  fechaDeCreacion: Date;
  fechaDeActualizacion: Date;
  status: number;
  folio: number;
}

export interface GruposUsuariosModel {
  id: number;
  fK_GrupoId: number;
  fK_UsuarioId: number;
  idUsuarioCreacion: number;
  nombreUsuarioCreacion: string;
  idUsuarioActualizacion: number;
  usuarioActualizo: string;
  fechaDeCreacion: Date;
  fechaDeActualizacion: Date;
  status: number;
}

export interface HistoriaNarrativaModel {
  folio: string;
  id: string;
  fecha_de_creacion: string;
  nombre_usuario_de_creacion: string;
  narrativa: string;
  especificaciones: string;
  comentario: string;
  origen: string;
  tipo: string;
}

export interface IncidenciasModel {
  id: number;
  nombreClave: string;
  codigo: string;
  descripcion: string;
  codigoFecha: string;
  incidencia: string;
  prioridad: string;
  subTipo: string;
  tipo: string;
  versionCodigo: string;
  protocolo: string[];
  servicios: string[];
  idUsuarioCreacion: number;
  nombreUsuarioCreacion: string;
  idUsuarioActualizacion: number;
  usuarioActualizo: string;
  fechaDeCreacion: Date;
  fechaDeActualizacion: Date;
  status: number;
  fK_ListaServicioId: number;
}

export interface ObjetosSospechososModel extends narrativeToSave {
  id: number;
  conclusiones: string;
  especificaciones: string;
  presencia: string;
  selector: number;
  titulo: string;
  nombreUsuarioCreacion: string;
  idUsuarioCreacion: number;
  idUsuarioActualizacion: number;
  usuarioActualizo: string;
  fechaDeCreacion: Date;
  fechaDeActualizacion: Date;
  status: number;
  folio: number;
  byte: number[];
}

export interface PerfilesModel {
  id: number;
  fK_PermisosId: number;
  fK_PerfilId: number;
  nombre: string;
  descripcion: string;
  idUsuarioCreacion: number;
  nombreUsuarioCreacion: string;
  idUsuarioActualizacion: number;
  usuarioActualizo: string;
  fechaDeCreacion: Date;
  fechaDeActualizacion: Date;
  status: number;
}

export interface PerfilesPermisosModel {
  id: number;
  fK_PerfilId: number;
  fK_PermisoId: number;
  idUsuarioCreacion: number;
  nombreUsuarioCreacion: string;
  idUsuarioActualizacion: number;
  usuarioActualizo: string;
  fechaDeCreacion: Date;
  fechaDeActualizacion: Date;
  status: number;
}

export interface PermisosGruposModel {
  id: number;
  idUsuarioCreacion: number;
  nombreUsuarioCreacion: string;
  idUsuarioActualizacion: number;
  usuarioActualizo: string;
  fechaDeCreacion: Date;
  fechaDeActualizacion: Date;
  status: number;
  fK_GrupoId: number;
  fK_PermisoId: number;
}

export interface PermisosModel {
  id: number;
  nombre: string;
  descripcion: string;
  idUsuarioCreacion: number;
  nombreUsuarioCreacion: string;
  idUsuarioActualizacion: number;
  usuarioActualizo: string;
  fechaDeCreacion: Date;
  fechaDeActualizacion: Date;
  status: number;
  fK_ListaGruposId: number;
  fK_ListaUsuariosId: number;
  fK_ListaPerfilesId: number;
}

export interface PersonasModel extends narrativeToSave {
  id: number;
  rolPersona: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  sexo: string;
  edad: number;
  edadConcepto: string;
  nacionalidad: string;
  correo: string;
  celular: number;
  condicion: string;
  etnia: string;
  playeraColor: string;
  gorrraColor: string;
  lentesColor: string;
  sombreroColor: string;
  pantalonColor: string;
  zapatosColor: string;
  descripcion: string;
  idUsuarioCreacion: number;
  nombreUsuarioCreacion: string;
  idUsuarioActualizacion: number;
  usuarioActualizo: string;
  fechaDeCreacion: Date;
  fechaDeActualizacion: Date;
  status: number;
  folio: number;
  file :number[];
}

export interface ProtocoloModel {
  id: number;
  pregunta: string;
  status: number;
  user_created: number;
  date_created: string;
  date_updated: string;
  user_updated: number;
  selector: number;
}

export interface RadiosModel {
  id: number;
  agenteAsignado: string;
  bateria: number;
  bateriaEstado: string;
  bateriaModelo: string;
  bateriaSerie: string;
  bateriaTipo: string;
  cargador: number;
  cargadorModelo: string;
  cargadorSerie: string;
  cargadorTipo: string;
  configuracionTwp: string;
  contratoPedido: string;
  funda: number;
  fundaModelo: string;
  fundaResumen: string;
  fundaSerie: string;
  fundaTipo: string;
  marca: string;
  modelo: string;
  numeroSerie: string;
  observaciones: string;
  placas: number;
  rfsi: string;
  serieCabezal: string;
  serieElectronica: string;
  serieFisica: number;
  serieGps: number;
  serieMicro: string;
  idUsuarioCreacion: number;
  nombreUsuarioCreacion: string;
  idUsuarioActualizacion: number;
  usuarioActualizo: string;
  fechaDeCreacion: Date;
  fechaDeActualizacion: Date;
  status: number;
  fK_AgenteId: number;
}

export interface ServicioIncidenciaModel {
  id: number;
  pregunta: string;
  status: number;
  user_created: number;
  date_created: string;
  date_updated: string;
  user_updated: number;
  selector: number;
}

export interface ServiciosModel {
  id: number;
  codigo: string;
  nombre: string;
  obligatorio: boolean;
  idUsuarioCreacion: number;
  nombreUsuarioCreacion: string;
  idUsuarioActualizacion: number;
  usuarioActualizo: string;
  fechaDeCreacion: Date;
  fechaDeActualizacion: Date;
  status: number;
  fK_IncidenciaId: number;
  createdByUserName: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  deletedAt: Date;
  deletedBy: string;
  active: boolean;
}

export interface TabletHistoricoModel {
  id: number;
  estatusId: number;
  dispositivoId: number;
  imei: string;
  numeroSerie: string;
  modeloNombre: string;
  modeloNumero: string;
  idUsuarioAsignada: string;
  distritos: string;
  bateriaCargando: string;
  nivelBateria: string;
  evento: string;
  localizacionGps: string;
  lat: string;
  long: string;
  unidad: string;
  nombreUsuario: string;
  idUsuarioCreacion: number;
  nombreUsuarioCreacion: string;
  idUsuarioActualizacion: number;
  usuarioActualizo: string;
  fechaDeCreacion: Date;
  fechaDeActualizacion: Date;
  status: number;
  fK_AgenteId: number;
  fK_ZonaId: number;
}

export interface TabletResourcesModel {
  id: number;
  estatusId: number;
  dispositivoId: string;
  imei: string;
  numeroSerie: string;
  modeloNombre: string;
  modeloNumero: string;
  distritos: string;
  bateriaCargando: string;
  nivelBateria: string;
  evento: string;
  localizacionGps: string;
  lat: string;
  long: string;
  unidad: string;
  nombreUsuario: string;
  idUsuarioCreacion: number;
  nombreUsuarioCreacion: string;
  idUsuarioActualizacion: number;
  usuarioActualizo: string;
  fechaDeCreacion: Date;
  fechaDeActualizacion: Date;
  status: number;
  fK_AgenteId: number;
  fK_ZonaId: number;
}

export interface TabletsModel {
  id: number;
  estatusId: string;
  imei: string;
  marca: string;
  modelo: string;
  numeroModelo: string;
  numeroSerie: string;
  idUsuarioCreacion: number;
  nombreUsuarioCreacion: string;
  idUsuarioActualizacion: number;
  usuarioActualizo: string;
  fechaDeCreacion: Date;
  fechaDeActualizacion: Date;
  status: number;
  fK_AgenteId: number;
}

export interface TurnosModel {
  id: number;
  nombre: string;
  horaInicio: string;
  horaFinal: string;
  idUsuarioCreacion: number;
  nombreUsuarioCreacion: string;
  idUsuarioActualizacion: number;
  usuarioActualizo: string;
  fechaDeCreacion: Date;
  fechaDeActualizacion: Date;
  status: number;
  fK_AgenteId: number;
}

export interface UnidadesModel {
  id: number;
  marcas: string;
  modelo: string;
  tipo: string;
  color: string;
  numeroEconomico: string;
  idUsuarioCreacion: number;
  nombreUsuarioCreacion: string;
  idUsuarioActualizacion: number;
  usuarioActualizo: string;
  fechaDeCreacion: Date;
  fechaDeActualizacion: Date;
  status: number;
  fK_AgenteId: number;
}

export interface UserModel{
  userId?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  secondLastName?: string;
  accessToken?: {
      token?: string;
      expiresIn?: number;
      status?: number
  };
  permissions?:  PermissionUserModel[];
  claimsAssign?: [];
  roleName?: string;
  locations?: [];
  allCorporations?: boolean;
  corporations?: [];
  employeeId?: number;
  idCorporacion?: number;
  userType?: string;
  aspNetUsersLocations?: null;
  aspNetUsersCorporations?: null;
  aspNetUsersZones?: null;
}
interface PermissionUserModel {
  groupName: string;
  name: string;
  description: string;
  permission: number;
}
export interface UsuariosModel {
  id: number;
  nombre: string;
  nombreUsuario: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  contrasena: string;
  idUsuarioCreacion: number;
  nombreUsuarioCreacion: string;
  idUsuarioActualizacion: number;
  usuarioActualizo: string;
  fechaDeCreacion: Date;
  fechaDeActualizacion: Date;
  status: number;
  // listaGrupos: GruposUsuarios[];
  // listaPermisos: UsuariosPermisos[];
}

export interface UsuariosPermisosModel {
  id: number;
  origen: string;
  idUsuarioCreacion: number;
  nombreUsuarioCreacion: string;
  idUsuarioActualizacion: number;
  usuarioActualizo: string;
  fechaDeCreacion: Date;
  fechaDeActualizacion: Date;
  status: number;
  fK_UsuarioId: number;
  fK_PermisoId: number;
  fK_GrupoId: number;
  fK_PerfilId: number;
}

export interface VehiculosModel extends narrativeToSave {
  alertas                 : number;
  apellidoMaterno         : string;
  apellidoPaterno         : string;
  boardStatus             : string;
  byte                    : number[];
  color                   : string;
  extranjera              : string;
  fechaDeActualizacion    : Date;
  fechaDeCreacion         : Date;
  folio                   : number;
  id                      : number;
  idUsuarioActualizacion  : number;
  idUsuarioCreacion       : number;
  lpr?                    : boolean;
  marca                   : string;
  modelo                  : string;
  nombrePropietario       : string;
  nombreUsuarioCreacion   : string;
  numeroSerie             : string;
  observaciones           : string;
  placas                  : string;
  preview_mark?           : string;
  rolVehiculo             : string;
  status                  : number;
  submarca                : string;
  tipo                    : string;
  usuarioActualizo        : string;
  year                    : number;
}

export type VehiculosLpr = Omit<VehiculosModel, 'saved' | 'index_collapse'>

export interface ZonasModel {
  id: number;
  nombre: string;
  color: string;
  borde: string;
  area: string[];
  idUsuarioCreacion: number;
  nombreUsuarioCreacion: string;
  idUsuarioActualizacion: number;
  usuarioActualizo: string;
  fechaDeCreacion: Date;
  fechaDeActualizacion: Date;
  status: number;
  fK_TabletHistoricoId: number;
  fK_TabletResourceId: number;
}

export interface ReportesModel {
  data              : ReporteCalleData[]
  promedios: {
    aceptada        : string;
    atencion        : string;
    omitir          : string;
    predespacho     : string;
    sitio           : string;
    terminar        : string;
  };
  totales: {
    aceptadas       : number;
    atencion        : number;
    improcedente    : number;
    omitir          : number;
    predespacho     : number;
    procedente      : number;
    sitio           : number;
    terminar        : number;
    total           : number;
  };
  totales_grafica: {
    improcedente    : number;
    omitir          : number;
    procedente      : number;
    total           : number;
  };
}


export interface UnidadHistorico {
    id: number;
    estatusId: number;
    estatusIdStr: string;
    dispositivoId: string;
    imei: string;
    numeroSerie: string;
    modeloNombre: string;
    modeloNumero: string;
    idUsuarioAsignada: number;
    distritos: string;
    bateriaCargando: string;
    nivelBateria: string;
    evento: string;
    localizacionGps: string;
    lat: number;
    lng: number;
    long: string;
    unidad: string;
    nombreUsuario: string;
    idUsuarioCreacion: number;
    nombreUsuarioCreacion: string;
    idUsuarioActualizacion: number;
    usuarioActualizo: string;
    fechaDeCreacion: string;
    fechaDeActualizacion: string;
    status: number;
    fK_AgenteId: number;
    fK_ZonaId: number;
    createdAt: string;
    createdBy: string;
    createdByUserName: string;
    updatedAt: string;
    updatedBy: string;
    deletedAt: string;
    deletedBy: string;
    active: boolean;
    corporacionId: number;
    icon: string;
}

export interface DetenidoModel {
  Id                  : number;
  IdPadre             : string;
  IdBiometrico        : string;
  IdTemporal          : string;
  Biometrico          : string;
  Nombre              : string;
  ApellidoUno         : string;
  ApellidoDos         : string;
  Alias               : string;
  Sexo                : string;
  EstadoCivil         : string;
  Nacionalidad        : string;
  Ocupacion           : string;
  FechaNacimiento     : string;
  Edad                : string;
  Etnia               : string;
  Estudios            : string;
  Originario          : string;
  Idioma              : string;
  NombrePadre         : string;
  NombreMadre         : string;
  Calle               : string;
  NumExt              : string;
  NumInt              : string;
  EntreCalles         : string;
  Colonia             : string;
  CodigoPostal        : string;
  Localidad           : string;
  Municipio           : string;
  Entidad             : string;
  OrdenAprehension    : number;
  IdEvento            : number;
  MotivoDetencion     : string;
  Modulo              : string;
  Estatus             : string;
  File                : string;
  IdFoto              : number;
  OrdenTraslado       : string;
  Status              : number;
}

export interface RecursosUbicacion {
  id: number;
  corporacionId: number;
  zonaId: number;
  ip: string;
  identificador: string;
  descripcion: string;
  tipo: number;
  estatus: string;
  icono: string;
  icon: {
    url:string;
    scaledSize:google.maps.Size;
  };
  latitud: string;
  longitud: string;
  status: number;
}

export interface recursoArrayArray {
  recurso: RecursosUbicacion
}

export interface UnitUpdate{
  status: number; 
  idLlamada: number, 
  ids: number[] 
}

export interface DashboardStatus {
  date_start : string;
  date_end   : string;
  zona       : number
  estatus    : number;
}

export interface setTabletResources { 
  fK_ZonaId?: number; 
  ids?: number[] 
}

export interface ReporteCalle{
  startDate     : string;
  endDate       : string;
  horaInicio    : string;
  horaFin       : string;
  descripcion   : string;
  incidencia    : number;
  prioridad     : number;
  estatus       : number;
  id            : number;
  telefono      : number;
  calle         : string;
  colonia       : string;
  ciudad        : string;
  corporacionId : number;
}

export type ReporteCalleOp = Partial<ReporteCalle>

interface ReporteCalleData {
  folio: number;
  corporacion_id: number;
  corporacion: string;
  corporacionalias: string;
  servicioNombre: string;
  servicioCodigo: string;
  telefono: string;
  direccion: string;
  latitud: string;
  longitud: string;
  incidencia: string;
  motivo_cancelacion: string;
  estatus: string;
  prioridad: string;
  creacion: string;
  predespacho: string;
  tiempopredespacho: string;
  aceptada: string;
  tiempoaceptada: string;
  ensitio: string;
  tiempositio: string;
  terminado: string;
  tiempoatencion: string;
  tiempoterminar: string;
  omitido: string;
  tiempoomitir: string;
  motivo_terminado: string;
  a1: string;
  a2: string;
  a3: string;
  lat: number;
  lng: number;
  titulo: string;
  icon: {
      url: string;
      scaledSize:google.maps.Size;
  }
  zona: string;
  zona_nombre: string;
  origen: string;
  nombre: string;
  usuarioCreacion: string;
}

export interface report {
  id: number;
  nombre: string;
  descripcion: string;
  status: number;
  user_created: number;
  date_created: string;
  date_updated: string;
  user_updated: number;
  tabla: string;
  columnas: string[];
  fecha_inicio: Date;
  fecha_fin: Date;
  limite_filar: number;
  datos: boolean;
  permitir_descargar: boolean;
  fecha_vencimiento: Date;
  vencimiento: boolean;
  reporte_publico: boolean;
  notificaciones: boolean;
  tipo_grafico: string;
}

/**
 * @author Adrian Navarro
 * @version 1.0.0
 * @description El siguiente tipo es una interface dinamica, la cual remplaza el "any", sin embargo no debes usarlo siempre
 * inclusive puedes crear propiedades nuevas que sean temporales en el caso de respues dinamicas, mas abajo encontraras un ejemplo 
 * @type {MyObjType}  - Interface dinamica
 * ------------------------------------- Ejemplo de uso en otro componente --------------------------------------
 * const myObj: MyObjType = {
 * dynamicProp: {
 *     // dynamicProp puede tener cualquier número de propiedades con cualquier valor
 *     foo: 42,
 *     bar: "hello",
 *     baz: true,
 *     // ...
 *   }
 * }
 */
export type MyObjType = {
  dynamicProp: Record<string, unknown>;
}