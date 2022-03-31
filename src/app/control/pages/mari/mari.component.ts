import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DocumentosService } from '../../../shared/services/documentos.service';

@Component({
  selector: 'app-mari',
  templateUrl: './mari.component.html',
  styleUrls: ['./mari.component.css']
})
export class MariComponent implements OnInit {
  @Input() id: string = '';
  toast: boolean = false;
	form!:FormGroup;
	fecha = new Date();
  otros=[{}];
  estilo :string = '';
  msg: string = '';
	get riesgos(){
		return  this.form.get('riesgos') as FormArray;
	}

	constructor(private fb:FormBuilder, private doc:DocumentosService) { }

	ngOnInit(): void {
    this.crearForm();
		this.doc.getMariPorId(this.id).subscribe(res => {
			this.form.get('dependencia')?.setValue(res[0].dependencia);
			this.form.get('institucion')?.setValue(res[0].institucion);
			this.form.get('anio')?.setValue(res[0].anio);
      this.form.get('titular')?.setValue(res[0].titular);
      this.form.get('coordinador')?.setValue(res[0].coordinador);
      this.form.get('enlace')?.setValue(res[0].enlace);
			for(let i=0; i < res.length; i++){
				if(i > 0){
					this.riesgos.push(this.formRiesgo());
			  }
		    this.riesgos.controls[i].get('no_riesgo')?.setValue(res[i].no_riesgo);
        this.riesgos.controls[i].get('ud_administrativa')?.setValue(res[i].ud_administrativa);
        this.riesgos.controls[i].get('sel_estrategia')?.setValue(res[i].sel_estrategia);
        this.riesgos.controls[i].get('desc_estrategia')?.setValue(res[i].desc_estrategia);
        this.riesgos.controls[i].get('riesgo')?.setValue(res[i].riesgo);
        this.riesgos.controls[i].get('nivel_decis_riesgo')?.setValue(res[i].nivel_decis_riesgo);
        this.riesgos.controls[i].get('sel_clasificacion')?.setValue(res[i].sel_clasificacion);
        (res[i].sel_clasificacion === 'Otro') ? this.otros[i] = true: this.otros[i] = false;  
        this.riesgos.controls[i].get('otro')?.setValue(res[i].otro);     
        this.riesgos.controls[i].get('efectos_riesgo')?.setValue(res[i].efectos_riesgo);
        this.riesgos.controls[i].get('grado_impacto')?.setValue(res[i].grado_impacto);
        this.riesgos.controls[i].get('probabilidad_ocurrencia')?.setValue(res[i].probabilidad_ocurrencia);
        this.riesgos.controls[i].get('estrat_riesgo')?.setValue(res[i].estrat_riesgo);
        this.riesgos.controls[i].get('grado_impacto_f')?.setValue(res[i].grado_impacto_f);
        this.riesgos.controls[i].get('probabilidad_ocurrencia_f')?.setValue(res[i].probabilidad_ocurrencia_f);

        this.doc.getFactorPorId(res[i].id_riesgo_institucional).subscribe(factores => {
          for(let j = 0; j < factores.length; j++){
            if(j > 0){
              this.factoresArr(i).push(this.formFactores());
            }
            this.factoresArr(i).controls[j].get('no_factor')?.setValue(factores[j].no_factor);
            this.factoresArr(i).controls[j].get('desc_factor')?.setValue(factores[j].desc_factor);
            this.factoresArr(i).controls[j].get('clasificacion_factor')?.setValue(factores[j].clasificacion_factor);
            this.factoresArr(i).controls[j].get('tipo_factor')?.setValue(factores[j].tipo_factor);
            this.factoresArr(i).controls[j].get('control')?.setValue(factores[j].control);
            this.factoresArr(i).controls[j].get('desc_acciones')?.setValue(factores[j].desc_acciones);

            if(factores[j].control == 1){
              this.doc.getControlPorId(factores[j].id_factor).subscribe(controles => {
                for(let k = 0; k < controles.length; k++){
                  this.controlesArr(i, j).push(this.formControles());
                  this.controlesArr(i, j).controls[k].get('no_control')?.setValue(controles[k].no_control);
                  this.controlesArr(i, j).controls[k].get('desc_control')?.setValue(controles[k].desc_control);
                  this.controlesArr(i, j).controls[k].get('tipo_control')?.setValue(controles[k].tipo_control);
                  this.controlesArr(i, j).controls[k].get('documentado')?.setValue(controles[k].documentado);
                  this.controlesArr(i, j).controls[k].get('formalizado')?.setValue(controles[k].formalizado);
                  this.controlesArr(i, j).controls[k].get('aplica')?.setValue(controles[k].aplica);
                  this.controlesArr(i, j).controls[k].get('efectivo')?.setValue(controles[k].efectivo);
                }           
              });
            }
          }
        })
		  }
		});
	}

	crearForm(){
		this.form = this.fb.group({
			dependencia: [{value: '', disabled: true}],
			institucion: [{value: '', disabled: true}],
			anio: [{value: '', disabled: true}],	
			titular: [{value: '', disabled: true}],
			coordinador:[{value: '', disabled: true}],
			enlace:[{value: '', disabled: true}],
			riesgos: this.fb.array([this.formRiesgo()])	
		})
	}

	formRiesgo(){
		return this.fb.group({
			no_riesgo: [{value: '', disabled: true}],
			ud_administrativa: [{value: '', disabled: true}],
			sel_estrategia: [{value: '', disabled: true}],
			desc_estrategia: [{value: '', disabled: true}],
			riesgo: [{value: '', disabled: true}],
			nivel_decis_riesgo: [{value: '', disabled: true}],
			sel_clasificacion:[{value: '', disabled: true}],
			otro: [{value: '', disabled: true}],
			factores: this.fb.array([this.formFactores()]),
			efectos_riesgo: [{value: '', disabled: true}],
			grado_impacto: [{value: '', disabled: true}],
			probabilidad_ocurrencia: [{value: '', disabled: true}],
			estrat_riesgo: [{value: '', disabled: true}],
			grado_impacto_f: [{value: '', disabled: true}],
			probabilidad_ocurrencia_f: [{value: '', disabled: true}]
		})
	}

	formFactores(){
		return this.fb.group({
			no_factor: [{value: '', disabled: true}],
			desc_factor: [{value: '', disabled: true}],
			clasificacion_factor: [{value: '', disabled: true}],
			tipo_factor: [{value: '', disabled: true}],
			control: [{value: '', disabled: true}],
			desc_acciones: [{value: '', disabled: true}],
			controles: this.fb.array([])
		})
	}

	formControles(){
		return this.fb.group({
			no_control: [{value: '', disabled: true}],
			desc_control: [{value: '', disabled: true}],
			tipo_control: [{value: '', disabled: true}],
			documentado: [{value: '', disabled: true}],
			formalizado: [{value: '', disabled: true}],
			aplica: [{value: '', disabled: true}],
			efectivo: [{value: '', disabled: true}],
		})
	}

	factoresArr(i: number){		
		return  this.riesgos.controls[i].get('factores') as FormArray;
	}
	controlesArr(i: number, j: number){		
		return  this.factoresArr(i).controls[j].get('controles') as FormArray;
	}

  validar(valido:string){
		this.doc.validarDocumento(this.id, 'mari', valido).subscribe(res => {
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

}
