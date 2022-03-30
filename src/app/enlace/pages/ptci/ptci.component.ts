import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PTCI } from 'src/app/shared/interfaces/ptci.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { DocumentosService } from '../../../shared/services/documentos.service';

@Component({
  selector: 'app-ptci',
  templateUrl: './ptci.component.html',
  styleUrls: ['./ptci.component.css']
})

export class PtciComponent implements OnInit {
	documentos: PTCI[]=[];
	estatus:string='';
	constructor(
			private router: Router, 
			private doc: DocumentosService
		) {
	}

	ngOnInit(): void {
		this.doc.getPtciDepartamento()
		.subscribe( docs => this.documentos = docs );		
	}

	estiloEstatus(estatus:string){
		if(estatus == 'Pendiente'){
			return 'badge badge-warning';
		}
		else if(estatus == 'Rechazado'){
			return 'badge badge-danger';
		}
		else if(estatus == 'Aceptado'){
			return 'badge badge-success';
		}
		return '';
	}
}

