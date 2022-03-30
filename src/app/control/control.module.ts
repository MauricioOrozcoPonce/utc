import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlRoutingModule } from './control-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { TopbarComponent } from './shared/components/topbar/topbar.component';
import { NoVerificadosComponent } from './pages/no-verificados/no-verificados.component';
import { ValidarComponent } from './pages/validar/validar.component';
import { PtciComponent } from './pages/ptci/ptci.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MariComponent } from './pages/mari/mari.component';
import { ArchivosComponent } from './shared/components/archivos/archivos.component';
import { ComentariosComponent } from './shared/components/comentarios/comentarios.component';


@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    TopbarComponent,
    NoVerificadosComponent,
    ValidarComponent,
    PtciComponent,
    MariComponent,
    ArchivosComponent,
    ComentariosComponent
  ],
  imports: [
    CommonModule,
    ControlRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ControlModule { }
