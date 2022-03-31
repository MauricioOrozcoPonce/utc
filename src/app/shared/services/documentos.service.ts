import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proceso, PTCI } from '../interfaces/ptci.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { Criterio, Inv, Proceso_P } from '../interfaces/inventario.interface';
import { Departamento } from '../interfaces/departamento.interface';
import { Evidencia } from '../interfaces/evidencia.interface';
import { Comentario } from '../interfaces/comentario.interface';
import { control, factor, MARI, riesgo } from '../interfaces/mari.interface';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, private auth:AuthService) { }

  agregarMari(mari:MARI){
    let data = {
      'mari': mari,
      'auth': this.auth.auth
    }
    return this.http.post<number|any>(`${ this.baseUrl }/documentos/mari`, data );
  }
  
  getMari(): Observable<MARI[]> {
    return this.http.post<MARI[]>(`${ this.baseUrl }/documentos/mari_departamento`, this.auth.auth);
  }

  getMariPendiente(){
    return this.http.post<MARI[]>(`${ this.baseUrl }documentos/mari_pendiente`, this.auth.auth);
  }
  
  actualizarMari(mari: MARI, id:string){
    let data = {
      'mari': mari,
      'auth': this.auth.auth
    }
    return this.http.post<number|any>(`${ this.baseUrl }/documentos/mari_update/${id}`, data );
  }
  
  getMariPorId(id_mari:string){
    let data = {
      'id_mari': id_mari,
      'auth': this.auth.auth
    }
    return this.http.post<riesgo[]>(`${ this.baseUrl }/documentos/mari_id`,  data);
  }
  
  getFactorPorId(id_riesgo:number){
    let data = {
      'id_riesgo': id_riesgo,
      'auth': this.auth.auth
    }
    return this.http.post<factor[]>(`${ this.baseUrl }/documentos/factor_id`,  data);
  }
  
  getControlPorId(id_factor:number){
    let data = {
      'id_factor': id_factor,
      'auth': this.auth.auth
    }
    return this.http.post<control[]>(`${ this.baseUrl }/documentos/control_id`, data);
  }





  getProcesoUd(){
    return this.http.post<any[]>(`${ this.baseUrl }documentos/proceso_ud`, this.auth.auth);
  }

  getDepartamentos():Observable<Departamento[]>{
    return this.http.post<Departamento[]>(`${ this.baseUrl }/Departamento/departamentos`, this.auth.auth);
  }

  getPtciDepartamento(): Observable<PTCI[]> {
      return this.http.post<PTCI[]>(`${ this.baseUrl }documentos/ptci_departamento`, this.auth.auth);
  }
  getPtciPorId(id:string){
    let data = {
      'id_ptci': id,
      'auth': this.auth.auth
    }
    return this.http.post<Proceso[]>(`${ this.baseUrl }documentos/ptci_id`,  data);
  }
  agregarPtci(ptci:PTCI){
    let data = {
      'ptci': ptci,
      'auth': this.auth.auth
    }
    return this.http.post<number|any>(`${ this.baseUrl }documentos/ptci_insert`, data );
  }
  actualizarPtci(ptci: PTCI, id:string){
    let data = {
      'ptci': ptci,
      'auth': this.auth.auth
    }
    return this.http.post<number|any>(`${ this.baseUrl }documentos/ptci_update/${id}`, data );
  }

  getInventarioP(): Observable<Inv[]>{
    return this.http.post<Inv[]>(`${ this.baseUrl }documentos/inventario_procesos`, this.auth.auth);
  }
  getInventarioPId(id:string){
    let data = {
      'id_inventario': id,
      'auth': this.auth.auth
    }
    return this.http.post<Proceso_P[]>(`${ this.baseUrl }documentos/inventario_procesos_id`,  data);
  }
  getDepartamentoP(id: number){
    let data = {
      'id_proceso': id,
      'auth': this.auth.auth
    }
    return this.http.post<Departamento[]>(`${ this.baseUrl }documentos/departamento_p`,  data);
  }
  getCriterioP(id: number){
    let data = {
      'id_proceso': id,
      'auth': this.auth.auth
    }
    return this.http.post<Criterio[]>(`${ this.baseUrl }documentos/criterio_p`,  data);
  }
  agregarInventarioP(inventario:any){
    let data = {
      'inventario': inventario,
      'auth': this.auth.auth
    }
    return this.http.post<number|any>(`${ this.baseUrl }documentos/inventario_procesos_insert`, data );
  }
  actualizarInventarioP(inventario:any, id:string){
    let data = {
      'inventario': inventario,
      'auth': this.auth.auth
    }
    return this.http.post<any>(`${ this.baseUrl }documentos/inventario_procesos_update/${id}`, data );
  }

  agregarArchivo(archivos: any) {
    return this.http.post<any>(`${this.baseUrl}documentos/evidencia_insert`, archivos);
  }
  evidenciasPtciId(id:number){
    let data = {
      'id_archivo': id,
      'auth': this.auth.auth
    }
    return this.http.post<Evidencia[]>(`${ this.baseUrl }documentos/evidencias_ptci_id`,  data);
  }
  eliminarEvidenciaId(id:string , archivo:string){
    let data = {
      'id_evidencia': id,
      'archivo':archivo,
      'auth': this.auth.auth
    }
    return this.http.post<any>(`${ this.baseUrl }documentos/borrar_evidencia_id`,  data);
  }
  getPtciPendiente(){
    return this.http.post<PTCI[]>(`${ this.baseUrl }documentos/ptci_pendiente`, this.auth.auth);
  }
  getComentario(id: string, tipo: string){
    let data = {
      'id_archivo': id,
      'tipo_archivo':tipo,
      'auth': this.auth.auth
    }
    return this.http.post<Comentario[]>(`${ this.baseUrl }documentos/comentario_id_archivo`, data);
  }
  agregarComentario(id:string, comentario:string, tipo: string){
    let data = {
      'id_archivo': id,
      'tipo_archivo':tipo,
      'comentario':comentario,
      'auth': this.auth.auth
    }
    return this.http.post<Comentario[]>(`${ this.baseUrl }documentos/comentario_insert`, data);
  }
  validarDocumento(id:string, tipo:string, estatus:string){
    let data = {
      'id_archivo': id,
      'tipo_archivo': tipo,
      'estatus': estatus,
      'auth': this.auth.auth
    }
    return this.http.post<string>(`${ this.baseUrl }documentos/update_estatus_documento`, data);
  }
}
