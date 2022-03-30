import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Evidencia } from 'src/app/shared/interfaces/evidencia.interface';
import { environment } from 'src/environments/environment';
import { DocumentosService } from '../../../shared/services/documentos.service';


@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent implements OnInit {
	@Output() onNewFile: EventEmitter<any[]> = new EventEmitter();
	baseUrl: string = `${environment.baseUrl}assets/evidencia/`;

	archivos:File[] = [];
	evidencias:Evidencia[] = [];

	constructor(
		private router:Router,  
		private activatedRoute: ActivatedRoute,
		private doc:DocumentosService,		
	) { }

	ngOnInit(): void {
		if(this.router.url.includes('editar-ptci')) {
			this.activatedRoute.params.pipe(
				switchMap( ({id}) => this.doc.evidenciasPtciId(id) )
			)
			.subscribe(res => {
				this.evidencias = res
			});		
		}
	}
	cargarArchivo(event:any){	
		let evidencia = event.target.files[0];
		if(evidencia != null){
			this.archivos.push(evidencia);
			this.onNewFile.emit(this.archivos);
		}
	}
	borrarArchivo(i:number){
		this.archivos.splice(i,1);
	}
	borrarEvidencia(i:number, id:string){
		this.evidencias.splice(i, 1);
		let archivo = this.evidencias[i].archivo;
		this.doc.eliminarEvidenciaId(id, archivo).subscribe(res =>{
			console.log(res)
		})
	}
}
