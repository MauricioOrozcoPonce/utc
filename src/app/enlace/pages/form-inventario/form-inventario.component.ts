import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Departamento } from 'src/app/shared/interfaces/departamento.interface';
import { DocumentosService } from 'src/app/shared/services/documentos.service';
import { switchMap } from 'rxjs';

interface inf{
	campo: string;
	error: string;
}

@Component({
  selector: 'app-form-inventario',
  templateUrl: './form-inventario.component.html',
  styleUrls: ['./form-inventario.component.css']
})
export class FormInventarioComponent implements OnInit {
	errorBd = [];
	toast:boolean = false;
	form!:FormGroup;
	fecha = new Date();
	departamentos!: Departamento[];
	instruccion: inf = {campo: '',error: ''}
	get procesos(){
		return  this.form.get('procesos') as FormArray;
	}
	instrucciones:inf[] = [
		{
			campo: 'Dependencia/Entidad.',
			error:'Escribir el nombre completo y las siglas de la Dependencia o Entidad.'
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
			error:'Enlistar todos los procesos prioritarios con los que cuenta el Sujeto Obligado.'
		},
		{
			campo: 'Tipo',
			error:'Indicar si el Proceso Prioritario es Sustantivo o Administrativo <br> <b>Sustantivos</b>. Son aquellos destinados a llevar a cabo las actividades que permitan ejecutar efectivamente la misión, objetivos estratégicos y políticas de la institución.<br><b>Administrativo</b> es una serie o una secuencia de actos regidos por un conjunto de reglas, políticas y/o actividades establecidas, con la finalidad de potenciar la eficiencia, consistencia y contabilidad de sus recursos.'
		},
		{
			campo: 'Unidad Administrativa.',
			error:'Establecer las Unidades Administrativas responsables del proceso prioritario.'
		},
		{
			campo: 'Criterios .',
			error: 'Identificar los siguientes criterios que tienen relación por cada uno de los procesos prioritarios siendo los siguietes: \n <b> I:</b> Aporta al logro de los compromisos y prioridades incluidas en el Plan Estatal de Desarrollo y programas sectoriales, regionales, institucionales, especiales y transversales;<br><b>II:</b> Contribuye al cumplimiento de la visión, misión y objetivos estratégicos de la Institución;<br><b>III:</b> Genera beneficios a la población o están relacionados con la entrega de subsidios;<br><b>IV: </b>Se encuentra relacionado con trámites y servicios que se brindan al gobernado, en especial permisos, licencias y concesiones;<br> <b>V: </b>Su ejecución permite el cumplimiento de indicadores de desempeño de programas presupuestarios o se encuentra directamente relacionado con una Matriz de Indicadores para Resultados;<br><b>VI: </b>Tiene un alto monto de recursos presupuestales asignados;<br><b>VII: </b>Es susceptible de presentar riesgos de actos contrarios a la integridad, en lo específico de corrupción;<br><b>VIII: </b>Se ejecuta con apoyo de algún sistema informático.'
		},	
	]

	errorForm(campo:string, i = -1, j = -1):string{
		let errors;
		if(i === -1){
			errors = this.form.get(campo)?.errors;
		}
		else if(j === -1){
			errors = this.procesos?.controls[i].get(campo)?.errors;			
		}
		else{
			errors = this.udAdmonArr(i)?.controls[j].get(campo)?.errors;	
		}

		if(errors?.['required']){
			return `El campo ${campo} es obligatorio.`;
		}
		else if(errors?.['pattern']){
			return `El campo ${campo} solo puede contener números.`;	
		}
		else if(errors?.['minlength']){
			let requiredLength = errors?.['minlength'].requiredLength;
			return `El campo ${campo} debe contener ${requiredLength} caracteres de longitud.`;
		}
		else if(errors?.['maxlength']){
			let requiredLength = errors?.['maxlength'].requiredLength;
			return `El campo ${campo} debe contener ${requiredLength} caracteres de longitud.`;		
		}
		return '';
	}

  	constructor(
		private fb: FormBuilder,
		private router:Router,  
		private activatedRoute: ActivatedRoute,
		private doc:DocumentosService
	) { }

	crearForm(){
		this.form = this.fb.group({
			entidad: ['Universidad Tecnológica de Corregidora (UTC)', Validators.required],
			periodo: [ this.fecha.getFullYear(), [Validators.required, Validators.maxLength(4), Validators.minLength(4), Validators.pattern(/^[0-9]+$/)]],	
			procesos: this.fb.array([this.formProcesos()], Validators.required)
		})
	}
	formProcesos(){
		return this.fb.group({
			id_proceso_inv: [],
			no: ['1',  [Validators.required, Validators.pattern(/^[0-9]+$/)]],
			proceso: ['',  Validators.required],
			tipo: ['',  Validators.required],
			unidades_administrativas: this.fb.array([this.formUdA()], Validators.required),
			crit_I: [false],
			crit_II: [false],
			crit_III: [false],
			crit_IV: [false],
			crit_V: [false],
			crit_VI: [false],
			crit_VII: [false],
			crit_VIII: [false]
		})
	}

	formUdA(){
		return this.fb.group({
			ud_administrativa: ['', Validators.required]
		})
	}

	udAdmonArr(i: number){		
		return  this.procesos.controls[i].get('unidades_administrativas') as FormArray;
	}

	agregarProceso(){
		this.procesos.push(this.formProcesos());
		let i = this.procesos.length;
		this.procesos.controls[i-1].get('no')?.patchValue(i);
	}
	eliminarProceso(i:number){
		this.procesos.removeAt(i);
	}

	agregarUdAdmon(i:number){
		this.udAdmonArr(i).push(this.formUdA())
	}

	eliminarUdAdmon(i:number, j:number){
		this.udAdmonArr(i).removeAt(j);
	}

	campoFormValido(campo:string, i = -1, j = -1){
		if(i === -1){
			return this.form.controls[campo].errors && this.form.controls[campo].touched;
		}
		else if(j === -1){
			return this.procesos.controls[i].get(campo)?.errors && this.procesos.controls[i].get(campo)?.touched;
		}
		else{
			return this.udAdmonArr(i).controls[j].get(campo)?.errors && this.udAdmonArr(i).controls[j].get(campo)?.touched;
		}
	}

	selInstr(campo:number){
		this.instruccion = this.instrucciones[campo];
	}

	guardar(){
		if(this.form.invalid){
			this.form.markAllAsTouched();
			return;
		}

		if(this.router.url.includes('editar-inventario-procesos')) {
			this.activatedRoute.params
				.pipe(
					switchMap( ({id}) => this.doc.actualizarInventarioP(this.form.value, id) )
				)
				.subscribe( res => {
					if(res?.errors){
						this.errorBd = res.errors;
					}
					else{
						this.toast = true;
						setTimeout(() => {
							this.toast = false;
						}, 5000);
					}					
				});		
		}
		else{
			this.doc.agregarInventarioP(this.form.value)
			.subscribe( res => {
					if(res?.errors){
						this.errorBd = res.errors;
					}
					else{
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
		this.crearForm();
		this.doc.getDepartamentos().subscribe(data => {
			this.departamentos = data
		})
		if(this.router.url.includes('editar-inventario-procesos')) {
			this.activatedRoute.params
				.pipe(
					switchMap( ({id}) => this.doc.getInventarioPId(id) )
				)
				.subscribe( data => {
					this.form.get('entidad')?.setValue(data[0].entidad);
					this.form.get('periodo')?.setValue(data[0].periodo);
				
					for(let i=0; i < data.length; i++){
						if(i > 0){
							this.procesos.push(this.formProcesos());
						}
						this.procesos.controls[i].get('id_proceso_inv')?.setValue(data[i].id_proceso_inv);
						this.procesos.controls[i].get('no')?.setValue(data[i].no);
						this.procesos.controls[i].get('proceso')?.setValue(data[i].proceso);
						this.procesos.controls[i].get('tipo')?.setValue(data[i].tipo);

						this.doc.getDepartamentoP(data[i].id_proceso_inv).subscribe(ud =>{
							for(let j=0; j < ud.length; j++){
								if(j > 0){
									this.udAdmonArr(i).push(this.formUdA());
								}
								this.udAdmonArr(i).controls[j].get('ud_administrativa')?.setValue(ud[j].id_departamento);
							}
						});
						this.doc.getCriterioP(data[i].id_proceso_inv).subscribe(criterios => {
							for(let j=0; j < criterios.length; j++){
								if(criterios[j].criterio == 'I'){
									this.procesos.controls[i].get('crit_I')?.setValue(true)
								}
								if(criterios[j].criterio == 'II') {
									this.procesos.controls[i].get('crit_II')?.setValue(true)
								}
								if(criterios[j].criterio == 'III'){
									this.procesos.controls[i].get('crit_III')?.setValue(true)
								}
								if(criterios[j].criterio == 'IV'){
									this.procesos.controls[i].get('crit_IV')?.setValue(true)
								}
								if(criterios[j].criterio == 'V'){
									this.procesos.controls[i].get('crit_V')?.setValue(true)
								}
								if(criterios[j].criterio == 'VI'){
									this.procesos.controls[i].get('crit_VI')?.setValue(true)
								}
								if(criterios[j].criterio == 'VII'){
									this.procesos.controls[i].get('crit_VII')?.setValue(true)
								}
								if(criterios[j].criterio == 'VIII'){
									this.procesos.controls[i].get('crit_VIII')?.setValue(true)
								}
							}
						})	
					};
				});		
		}

	}

}
