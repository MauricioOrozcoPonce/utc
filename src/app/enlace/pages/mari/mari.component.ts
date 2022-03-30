import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-mari',
  templateUrl: './mari.component.html',
  styleUrls: ['./mari.component.css']
})
export class MariComponent implements OnInit {
  form!:FormGroup;
	fecha = new Date();

	get riesgos(){
		return  this.form.get('riesgos') as FormArray;
	}

	clas_riesgo = [
		'Sustantivo', 'Administrativo', 'Legal', 'Financiero', 'Presupuestal', 'Servicios', 'Seguridad',
		 'Obra Pública', 'Recursos Humanos', 'Imagen', 'TIC S', 'Salud', 'Otro'
	];
	clasificaciones = [
		'Humano', 'Financiero-Presupuestal', 'Técnico-Adminitrativo', 'TIC S','Material',
	    'Normativo', 'Entorno'
	];

	constructor(private fb:FormBuilder, private auth:AuthService) { }

	ngOnInit(): void {
		this.crearForm();
	}

	crearForm(){
		this.form = this.fb.group({
			dependencia: ['Universidad Tecnológica de Corregidora', Validators.required],
			institucion: ['Universidad Tecnológica de Corregidora', Validators.required],
			anio: [`${this.fecha.getFullYear()}`, [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],	
			titular: ['', [Validators.required, Validators.maxLength(100)]],
			coordinador:['', [Validators.required, Validators.maxLength(100)]],
			enlace:['', [Validators.required, Validators.maxLength(100)]],
			riesgos: this.fb.array([this.formRiesgo()])	
		})
	}

	formRiesgo(){
		return this.fb.group({
			no_riesgo: ['',  Validators.required],
			ud_administrativa: ['',  Validators.required],
			sel_estrategia: ['',  Validators.required],
			desc_estrategia: ['',  Validators.required],
			riesgo: ['',  Validators.required],
			nivel_decis_riesgo: ['',  Validators.required],
			sel_clasificacion:['', Validators.required],
			otro: ['', [] ],
			factores: this.fb.array([], Validators.required),
			efectos_riesgo: ['', Validators.required],
			grado_impacto: ['', Validators.required],
			probabilidad_ocurrencia: ['', Validators.required],
			estrat_riesgo: ['', Validators.required],
			grado_impacto_f: ['', Validators.required],
			probabilidad_ocurrencia_f: ['', Validators.required]
		})
	}

	formFactores(){
		return this.fb.group({
			no_factor: [ '' , Validators.required],
			desc_factor: ['', Validators.required],
			clasificacion_factor: ['', Validators.required],
			tipo_factor: ['', Validators.required],
			control: ['', Validators.required],
			desc_acciones: ['',  Validators.required],
			controles: this.fb.array([])
		})
	}

	formControles(){
		return this.fb.group({
			no_control: ['1.1.1', Validators.required],
			desc_control: ['', Validators.required],
			tipo_control: ['', Validators.required],
			documentado: ['', Validators.required],
			formalizado: ['',  Validators.required],
			aplica: ['',  Validators.required],
			efectivo: ['',  Validators.required],
		})
	}

	factoresArr(i: number){		
		return  this.riesgos.controls[i].get('factores') as FormArray;
	}
	controlesArr(i: number, j: number){		
		return  this.factoresArr(i).controls[j].get('controles') as FormArray;
	}

	agregarRiesgo(){
		this.riesgos.push(this.formRiesgo());
	}

	agregarFactor(i: number){
		this.factoresArr(i).push(this.formFactores());
		this.factoresArr(i).controls[this.factoresArr(i).length-1].get('no_factor')?.patchValue(i+1 + '.' + this.factoresArr(i).length)
	}	

	borrarFactor(i:number, j:number){
		this.factoresArr(i).removeAt(j);
	}

	agregarControl(i: number, j:number){
		this.controlesArr(i, j).push(this.formControles());
		this.controlesArr(i, j).controls[this.controlesArr(i, j).length-1].get('no_control')?.patchValue((i+1) + '.'+ (j+1) +'.'+ this.controlesArr(i,j).length)
	}	

	borrarControl(i:number, j:number, k:number){
		this.controlesArr(i, j).removeAt(k);
	}

	guardar(){

	}
	
	tiene_control(i:number, j:number){
		if (this.factoresArr(i).controls[j].get('control')?.value === 'Si'){
			this.factoresArr(i).controls[j].get('controles')?.setValidators(Validators.required);
			return true;
		}
		else{
			return false;
		}		
	}

	otraClasificacion(i: number){
		if (this.riesgos.controls[i].get('sel_clasificacion')?.value === 'Otro'){
			this.riesgos.controls[i].get('otro')?.addValidators([Validators.required, Validators.maxLength(45)])
			return true;
		}
		else{
			return false;
		}	
	}
}
