import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { DocumentosService } from 'src/app/shared/services/documentos.service';

@Component({
  selector: 'app-ptci',
  templateUrl: './ptci.component.html',
  styleUrls: ['./ptci.component.css']
})
export class PtciComponent implements OnInit {
	@Input() id: string = '';
	form!:FormGroup;
	toast: boolean = false;
	estilo: string = '';
	msg:string = '';

	get procesos(){
		return  this.form.get('procesos') as FormArray;
	}
	constructor(
		private fb:FormBuilder, 
		private doc:DocumentosService
		) {	
	 }

	crearForm(){
		this.form = this.fb.group({
			dependencia: [{value: '', disabled: true}],
			no_avance: [{value: '', disabled: true}],
			periodo_anual:[{value: '', disabled: true}],	
			procesos: this.fb.array([this.formProcesos()])
		})
	}

	formProcesos(){
		return this.fb.group({
			no: [{value: '', disabled: true}],
			proceso_prioritario: [{value: '', disabled: true}],
			accion_mejora: [{value: '', disabled: true}],
			ud_administrativa:[{value: '', disabled: true}],
			respons_aplicacion:[{value: '', disabled: true}],
			inicio: [{value: '', disabled: true}],
			termino: [{value: '', disabled: true}],
			medio_verificacion: [{value: '', disabled: true}],
			resultados_esperados: [{value: '', disabled: true}],
			estatus_proceso: [{value: '', disabled: true}],
			avance: [{value: '', disabled: true}]
		})
	}

	validar(valido:string){
		this.doc.validarDocumento(this.id, 'ptci', valido).subscribe(res => {
			if(valido === 'Aceptado'){
				this.estilo = 'bg-success';
			}
			else if(valido === 'Rechazado'){
				this.estilo = 'bg-danger';
			}
			this.msg = res;
			this.toast = true;
			setTimeout(() => {
				this.toast = false;
			}, 5000);
		})
	}

	ngOnInit(): void {
		this.crearForm();
		this.doc.getPtciPorId(this.id).subscribe(res => {
			this.form.get('dependencia')?.setValue(res[0].dependencia);
			this.form.get('no_avance')?.setValue(res[0].no_avance);
			this.form.get('periodo_anual')?.setValue(res[0].periodo_anual);
			for(let i=0; i < res.length; i++){
				if(i > 0){
					this.procesos.push(this.formProcesos());
				}
				this.procesos.controls[i].get('no')?.setValue(res[i].no);
				this.procesos.controls[i].get('proceso_prioritario')?.setValue(res[i].proceso);
				this.procesos.controls[i].get('accion_mejora')?.setValue(res[i].accion_mejora);
				this.procesos.controls[i].get('ud_administrativa')?.setValue(res[i].ud_administrativa);
				this.procesos.controls[i].get('respons_aplicacion')?.setValue(res[i].respons_aplicacion);
				this.procesos.controls[i].get('inicio')?.setValue(res[i].inicio);
				this.procesos.controls[i].get('termino')?.setValue(res[i].termino);
				this.procesos.controls[i].get('medio_verificacion')?.setValue(res[i].medio_verificacion);
				this.procesos.controls[i].get('resultados_esperados')?.setValue(res[i].resultados_esperados);
				this.procesos.controls[i].get('estatus_proceso')?.setValue(res[i].estatus_proceso);
				this.procesos.controls[i].get('avance')?.setValue(res[i].avance);
			}
		});
	}

}
