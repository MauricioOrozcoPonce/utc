export interface MARI {
    id_mari: number;
    nombre: string;
    apellido_p:string;
    apellido_m:string;
    anio: number;
    estatus: string;
    titular: string;
    coordinador: string;
    enlace: string;  
    id_departamento: number;
	id_empleado: number;
    dependencia:string;
    departamento: string;
    riesgos: riesgo[];
}

export interface riesgo {
    dependencia: string;
    institucion: string;
    titular: string;
    coordinador: string;
    anio: number;
    enlace: string;
    id_riesgo_institucional: number;
    no_riesgo: number;
    ud_administrativa: string;
    sel_estrategia: string;
    desc_estrategia: string;
    riesgo: string;
    nivel_decis_riesgo: string;
    sel_clasificacion: string;
    otro: string;
    efectos_riesgo: string;
    grado_impacto: number;
    probabilidad_ocurrencia: number;
    estrat_riesgo: string;
    grado_impacto_f: number;
    probabilidad_ocurrencia_f: number;
    id_mari: number;
    factores: factor[];
    no_factor: number;
}

export interface factor {
    id_factor:number;
    no_factor: string;
    desc_factor: string;
    clasificacion_factor: string;
    tipo_factor: string;
    control: number;
    desc_acciones: string;
    controles: control[];
    id_riesgo_institucional: number;
   
}

export interface control {
    id_factor:number;
    no_control: string;
    desc_control: string;
    tipo_control: string;
    documentado: number;
    formalizado: number;
    aplica: number;
    efectivo: number;
    id_control:number;
}