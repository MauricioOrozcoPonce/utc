import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentosService } from '../../../shared/services/documentos.service';

@Component({
  selector: 'app-validar',
  templateUrl: './validar.component.html',
  styleUrls: ['./validar.component.css']
})
export class ValidarComponent implements OnInit {
  id: string = '';
  tipo: string = '';
  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private doc: DocumentosService 
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.tipo = this.activatedRoute.snapshot.params['tipo'];
  }

}
