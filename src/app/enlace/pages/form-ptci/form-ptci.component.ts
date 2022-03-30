import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DocumentosService } from '../../../shared/services/documentos.service';

interface inf{
	campo: string;
	error: string;
}

@Component({
  selector: 'app-form-ptci',
  templateUrl: './form-ptci.component.html',
  styleUrls: ['./form-ptci.component.css']
})
export class FormPtciComponent implements OnInit {
	evidencia: File[] = [];
	toast:boolean = false;
	form!:FormGroup;
	fecha = new Date();
	procesos_prioritarios:any;
	errorCampo =[{campo:'dependencia', error:''},{campo:'no_avance', error:''},{campo:'periodo_anual', error:''},
		{campo:'procesos', error:''}];
	errorProceso: inf[][]=[[]];
	errorBd: string[]= [];
	instruccion: inf = {campo: '',error: ''}
	instrucciones:inf[] = [
		{
			campo: 'Dependencia/Entidad.',
			error:'Escribir el nombre completo y las siglas de la Dependencia o Entidad.'
		},
		{
			campo: 'No. de Avance.',
			error:'Indicar el número de avance al que se refiere. (1, 2 o 3).'
		},
		{
			campo: 'Periodo Anual',
			error:'Señalar el período (año) que corresponde a los trabajos a implementar.'
		},
		{
			campo: 'No.',
			error:'Número consecutivo.'
		},
		{
			campo: 'Proceso Prioritario.',
			error:'Enlistar los Procesos Prioritarios descritos en el PTCI autorizado del año en curso.'
		},
		{
			campo: 'Acciones de Mejora',
			error:'Enlistar las acciones de mejora especificadas en el PTCI del año en curso, que se van a llevar a cabo para lograr la mejora del proceso.'
		},
		{
			campo: 'Unidad Administrativa.',
			error:'Señalar el área o áreas responsables de aplicación y seguimiento de las acciones.'
		},
		{
			campo: 'Responsable de la Aplicación.',
			error:'Indicar con el nombre completo y cargo o puesto, de las personas que son responsables de la aplicación y seguimiento de la acciones, conforme a lo establecido en el PTCI autorizado del año en curso.'
		},
		{
			campo: 'Inicio y Término.',
			error:'Establecer la fecha en que iniciarán y terminarán los trabajos de la acción correspondiente, señaladas en el PTCI autorizado del año en curso.'
		},
		{
			campo: 'Medio(s) de Verificación.',
			error:'Especificar la evidencia con la que se acreditará la mejora en el proceso, especificados en el PTCI autorizado del año en curso.'
		},
		{
			campo: 'Resultados Esperados.',
			error:'Establecer el beneficio que se requiere obtener, o mejora que se persigue, la cual se estable en el PTCI autorizado del año en curso, mismos que debe ser congruente y coincidente con la mejora del proceso, de preferencia deber ser  medibles y cuantificables.'
		},
		{
			campo: 'Estatus.',
			error:'Seleccionar la situación que guarda el avance (EN PROCESO ó CONTROLADO).'
		},
		{
			campo: 'Porcentaje del Avance.',
			error:'Indicar el pocentaje de avance que el Sujeto Obligado estime llevar al cierre del cuatrimestre a reportar.'
		}
	]

	get procesos(){
		return  this.form.get('procesos') as FormArray;
	}
	errorForm(campo:number, validators:string[]){
		const nomCampo = this.errorCampo[campo].campo;
		const errors = this.form.get(nomCampo)?.errors;
		validators.forEach(validator => {
			if(validator == 'required' && errors?.['required']){	
				this.errorCampo[campo].error = `El campo es obligatorio.`;
			}
			else if(validator == 'pattern' && errors?.['pattern']){
				this.errorCampo[campo].error = `El campo solo puede contener números.`;
			}
			else if(validator == 'minLength' && errors?.['minlength']){
				let requiredLength = errors?.['minlength'].requiredLength;
				this.errorCampo[campo].error = `El campo debe contener ${requiredLength} caracteres de longitud.`;
			}
			else if(validator == 'maxLength' && errors?.['maxlength']){
				let requiredLength = errors?.['maxlength'].requiredLength;
				this.errorCampo[campo].error = `El campo debe contener ${requiredLength} caracteres de longitud.`;
			}
			else if(this.errorBd){
				let indice = this.errorBd.indexOf(nomCampo);
				this.errorCampo[campo].error = this.errorBd[indice];		
			}
		});
	}
	errorFormP(i:number, no:number, campo:string, validators:string[]){
		const errors = this.procesos?.controls[i].get(campo)?.errors;
		validators.forEach(validator => {
			if(validator == 'required' && errors?.['required']){	
				this.errorProceso[i][no] = {campo: campo, error:`El campo es obligatorio.`};
			}
			else if(validator == 'pattern' && errors?.['pattern']){
				this.errorProceso[i][no] = {campo: campo, error:`El campo solo puede contener números.`};
			}
			else if(validator == 'minLength' && errors?.['minlength']){
				let requiredLength = errors?.['minlength'].requiredLength;
				this.errorProceso[i][no] = {campo: campo, error:`El campo debe contener ${requiredLength} caracteres de longitud.`};
			}
			else if(validator == 'maxLength' && errors?.['maxlength']){
				let requiredLength = errors?.['maxlength'].requiredLength;
				this.errorProceso[i][no] = {campo: campo, error:`El campo debe contener máximo ${requiredLength} caracteres de longitud.`};
			}
			else if(validator == 'min' && errors?.['min']){
				let min = errors?.['min'].min;
				this.errorProceso[i][no] = {campo: campo, error:`El campo debe contener un número mayor o igual que que ${min}.`};
			}
			else if(validator == 'max' && errors?.['max']){
				let max = errors?.['max'].max;
				this.errorProceso[i][no] = {campo: campo, error:`El campo debe contener un número menor o igual que ${max}.`};
			}
		});
	}

	constructor(
		private fb:FormBuilder, 
		private router:Router,  
		private activatedRoute: ActivatedRoute,
		private doc:DocumentosService
		) {	
	 }

	crearForm(){
		this.form = this.fb.group({
			dependencia: ['Universidad Tecnológica de Corregidora (UTC)', Validators.required],
			no_avance: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
			periodo_anual: [ this.fecha.getFullYear(), [Validators.required, Validators.maxLength(4), Validators.minLength(4), Validators.pattern(/^[0-9]+$/)]],	
			procesos: this.fb.array([this.formProcesos()], Validators.required)
		})
	}

	formProcesos(){
		return this.fb.group({
			no: ['1',  [Validators.required, Validators.pattern(/^[0-9]+$/)]],
			proceso_prioritario: ['',  Validators.required],
			accion_mejora: ['',  Validators.required],
			ud_administrativa: ['',  Validators.required],
			respons_aplicacion: ['',  [Validators.required, Validators.maxLength(100)]],
			inicio: ['',  Validators.required],
			termino:['', Validators.required],
			medio_verificacion: ['', Validators.required],
			resultados_esperados: ['', Validators.required],
			estatus_proceso: ['', [Validators.required, Validators.maxLength(45)]],
			avance: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0), Validators.max(100)]]
		})
	}

	agregarProceso(){
		this.errorProceso.push([]);
		this.procesos.push(this.formProcesos());
		let i = this.procesos.length;
		this.procesos.controls[i-1].get('no')?.patchValue(i);

	}
	eliminarProceso(i:number){
		this.errorProceso.splice(i, 1);
		this.procesos.removeAt(i);
	}

	campoFormValido(campo:string){
		return this.form.controls[campo].errors && this.form.controls[campo].touched;
	}

	campoFormPValido(i:number, campo:string){
		return this.procesos.controls[i].get(campo)?.errors && this.procesos.controls[i].get(campo)?.touched;
	}
	selInstr(campo:number){
		this.instruccion = this.instrucciones[campo];
	}
	setEvidencia(evidencia: File[]){
		this.evidencia = evidencia;	}

	guardar(){
		if(this.form.invalid){
			this.form.markAllAsTouched();
			return;
		}

		if(this.router.url.includes('editar-ptci')) {
			this.activatedRoute.params
				.pipe(
					switchMap( ({id}) => this.doc.actualizarPtci(this.form.value, id) )
				)
				.subscribe( res => {
					if(res?.errors){
						this.errorBd = res.errors;
					}
					else{
						let formData = new FormData();
						formData.append('id_archivo', res);
						for(let i = 0; i < this.evidencia.length; i++){
							let file = this.evidencia[i];
							formData.append(`evidencias[${i}]`, file, file.name);
						}
						this.doc.agregarArchivo(formData).subscribe(res=>{
							console.log(res)
						});
						this.toast = true;
						setTimeout(() => {
							this.toast = false;
						}, 5000);
					}					
				});		
		}
		else{
			this.doc.agregarPtci(this.form.value)
			.subscribe( res => {
					if(res?.errors){
						this.errorBd = res.errors;
					}
					else{
						let formData = new FormData();
						formData.append('id_archivo', res);
						for(let i = 0; i < this.evidencia.length; i++){
							let file = this.evidencia[i];
							formData.append(`evidencias[${i}]`, file, file.name);
						}
						this.doc.agregarArchivo(formData).subscribe(res => {
							console.log(res);
						})
						this.toast = true;
						setTimeout(() => {
							this.toast = false;
						}, 5000);
					}	
				}
			)
		}
	}
	ngOnInit(): void {
		this.doc.getProcesoUd().subscribe( data =>{
				this.procesos_prioritarios = data;
			}
		)
		this.crearForm();

		if(this.router.url.includes('editar-ptci')) {
			this.activatedRoute.params
				.pipe(
					switchMap( ({id}) => this.doc.getPtciPorId(id) )
				)
				.subscribe( data => {
					this.form.get('dependencia')?.setValue(data[0].dependencia);
					this.form.get('no_avance')?.setValue(data[0].no_avance);
					this.form.get('periodo_anual')?.setValue(data[0].periodo_anual);
						for(let i=0; i < data.length; i++){
							if(i > 0){
								this.errorProceso.push([]);
								this.procesos.push(this.formProcesos());
							}
							this.procesos.controls[i].get('no')?.setValue(data[i].no);
							this.procesos.controls[i].get('proceso_prioritario')?.setValue(data[i].id_proceso_inv);
							this.procesos.controls[i].get('accion_mejora')?.setValue(data[i].accion_mejora);
							this.procesos.controls[i].get('ud_administrativa')?.setValue(data[i].ud_administrativa);
							this.procesos.controls[i].get('respons_aplicacion')?.setValue(data[i].respons_aplicacion);
							this.procesos.controls[i].get('inicio')?.setValue(data[i].inicio);
							this.procesos.controls[i].get('termino')?.setValue(data[i].termino);
							this.procesos.controls[i].get('medio_verificacion')?.setValue(data[i].medio_verificacion);
							this.procesos.controls[i].get('resultados_esperados')?.setValue(data[i].resultados_esperados);
							this.procesos.controls[i].get('estatus_proceso')?.setValue(data[i].estatus_proceso);
							this.procesos.controls[i].get('avance')?.setValue(data[i].avance);
						}
				});		
		}
	}
}
