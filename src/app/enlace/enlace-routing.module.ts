import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioDeProcesosComponent } from './pages/inventario-de-procesos/inventario-de-procesos.component';
import { PtciComponent } from './pages/ptci/ptci.component';
import { MariComponent } from './pages/mari/mari.component';
import { HomeComponent } from './pages/home/home.component';
import { FormPtciComponent } from './pages/form-ptci/form-ptci.component';
import { FormInventarioComponent } from './pages/form-inventario/form-inventario.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		children: [
			{
				path: 'inventario-procesos',
				component: InventarioDeProcesosComponent
			},
			{
				path: 'crear-inventario-procesos',
				component: FormInventarioComponent,
			},
			{
				path: 'editar-inventario-procesos/:id',
				component: FormInventarioComponent,
			},
			{
				path: 'ptci',
				component: PtciComponent,
			},
			{
				path: 'crear-ptci',
				component: FormPtciComponent,
			},
			{
				path: 'editar-ptci/:id',
				component: FormPtciComponent,
			},
			{
				path: 'mari',
				component: MariComponent
			},
			{
				path: '**',
				redirectTo: ''
			}
		]
	  }
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class EnlaceRoutingModule{ }
