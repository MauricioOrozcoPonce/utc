import { Component, OnInit } from '@angular/core';
import { MARI } from 'src/app/shared/interfaces/mari.interface';
import { PTCI } from 'src/app/shared/interfaces/ptci.interface';
import { DocumentosService } from 'src/app/shared/services/documentos.service';

@Component({
  selector: 'app-no-verificados',
  templateUrl: './no-verificados.component.html',
  styleUrls: ['./no-verificados.component.css']
})
export class NoVerificadosComponent implements OnInit {
  ptci: PTCI[]=[];
  mari: MARI[]=[];

  constructor(private doc: DocumentosService) { }

  ngOnInit(): void {
    this.doc.getPtciPendiente().subscribe(res => {
      this.ptci = res;
    });
    this.doc.getMariPendiente().subscribe(res => {
      this.mari = res;
    });
  }

}
