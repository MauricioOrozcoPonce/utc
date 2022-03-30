import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Comentario } from 'src/app/shared/interfaces/comentario.interface';
import { DocumentosService } from '../../../../shared/services/documentos.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  id: string = '';
  tipo: string = '';
  comentarios: Comentario[] = [];
  nuevoComentario: FormControl = this.fb.control('', Validators.maxLength(280));

  constructor(
    private fb:FormBuilder, 
    private doc: DocumentosService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.tipo = this.activatedRoute.snapshot.params['tipo'];
    this.getComentarios();
  }

  getComentarios(){
    this.doc.getComentario(this.id, this.tipo).subscribe(res => {	
      this.comentarios = res
    });		
  }

  agregarComentario(){
    let comentario = this.nuevoComentario.value;
    this.doc.agregarComentario(this.id, comentario, this.tipo).subscribe(res => {
      this.getComentarios();
      this.nuevoComentario.reset();
    });
  }

}
