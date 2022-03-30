export interface Auth {
   token: string;
   inf_usuario: userData;
   errors: errorsMsg
}
 
 interface userData{
   id_empleado: string;
   nombre: string;
   apellido_p: string;
   apellido_m: string;
   estatus: number;
   id_usuario: number;
   departamento: string;
   id_departamento: string;
   correo: string
   privilegio: string;
} 

interface errorsMsg{
   correo: string;
   contrasenia: string;
}