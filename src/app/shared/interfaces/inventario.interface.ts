export interface Inv{
    id_inventario: number;
    entidad: string;
    periodo: string;
    estatus: number;
    nombre: string;
    apellido_p: string;
    apellido_m: string;
}
export interface Proceso_P{
    id_inventario: number;
    entidad: string;
    periodo: string;
    estatus: number;
    nombre: string;
    apellido_p: string;
    apellido_m: string;
    id_proceso_inv: number;
    no: number;
    proceso: string;
    tipo: string;
}
export interface Criterio{
    id_criterio: number;
    id_proceso:  number;
    criterio: string;
}


