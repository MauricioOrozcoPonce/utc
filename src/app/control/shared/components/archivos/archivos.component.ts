import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Evidencia } from 'src/app/shared/interfaces/evidencia.interface';
import { DocumentosService } from 'src/app/shared/services/documentos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent implements OnInit {
    baseUrl: string = `${environment.baseUrl}assets/evidencia/`;
	evidencias:Evidencia[] = [];

	constructor(
		private router:Router,  
		private activatedRoute: ActivatedRoute,
		private doc:DocumentosService,		
	) { }

	ngOnInit(): void {
		if(this.router.url.includes('ptci')) {
			this.activatedRoute.params.pipe(
				switchMap( ({id}) => this.doc.evidenciasPtciId(id) )
			)
			.subscribe(res => {
				this.evidencias = res
			});		
		}
	}
}
