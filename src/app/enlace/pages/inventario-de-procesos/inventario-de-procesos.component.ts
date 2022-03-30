import { Component, OnInit } from '@angular/core';
import { Inv } from 'src/app/shared/interfaces/inventario.interface';
import { DocumentosService } from 'src/app/shared/services/documentos.service';

@Component({
  selector: 'app-inventario-de-procesos',
  templateUrl: './inventario-de-procesos.component.html',
  styleUrls: ['./inventario-de-procesos.component.css']
})
export class InventarioDeProcesosComponent implements OnInit {
	documentos: Inv[]=[];
	constructor(private doc:DocumentosService) { }
	ngOnInit(): void {
		this.doc.getInventarioP()
		.subscribe( docs => this.documentos = docs );
	}

	estiloEstatus(estatus:number){
		if(estatus == 0){
			return 'badge badge-warning';
		}
		else if(estatus == 1){
			return 'badge badge-success';
		} 
		return '';
	}
}
