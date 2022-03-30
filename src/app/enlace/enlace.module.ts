import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { EnlaceRoutingModule } from './enlace-routing.module';
import { InventarioDeProcesosComponent } from './pages/inventario-de-procesos/inventario-de-procesos.component';
import { PtciComponent } from './pages/ptci/ptci.component';
import { MariComponent } from './pages/mari/mari.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { TopbarComponent } from './shared/components/topbar/topbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PricipalComponent } from './pages/pricipal/pricipal.component';
import { FormPtciComponent } from './pages/form-ptci/form-ptci.component';
import { FormInventarioComponent } from './pages/form-inventario/form-inventario.component';
import { ArchivosComponent } from './shared/archivos/archivos.component';



@NgModule({
  declarations: [
    InventarioDeProcesosComponent,
    PtciComponent,
    MariComponent,
    SidebarComponent,
    TopbarComponent,
    HomeComponent,
    PricipalComponent,
    FormPtciComponent,
    FormInventarioComponent,
    ArchivosComponent
  ],
  imports: [
    CommonModule,
    EnlaceRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EnlaceModule { }
