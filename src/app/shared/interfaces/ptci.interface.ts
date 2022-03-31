export interface PTCI{
    id_ptci: number;
	no_avance: number;	
    periodo_anual: number;
	estatus: string;
	id_departamento: number;
    departamento: string,
	id_empleado: number;
    nombre: string;
    apellido_p: string;
    apellido_m: string;
    procesos: Proceso[]
}

export interface Proceso{
    dependencia:string;
    id_ptci: number;
	no_avance: number;	
    periodo_anual: number;
	estatus: string;
	id_departamento: number;
	id_empleado: number;
    nombre: string;
    apellido_p: string;
    apellido_m: string;
    no: string;
    id_proceso_inv: string;
    proceso: string;
    accion_mejora: string;
    ud_administrativa: string;
    respons_aplicacion: string;
    inicio: string;
    termino: string;
    medio_verificacion: string;
    resultados_esperados: string;
    estatus_proceso: string;
    avance: string;
}



