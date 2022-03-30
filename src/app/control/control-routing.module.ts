import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NoVerificadosComponent } from './pages/no-verificados/no-verificados.component';
import { ValidarComponent } from './pages/validar/validar.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		children: [
			{
        path: 'no-verificados',
        component: NoVerificadosComponent
      },
      {
        path: 'validar-documento/:tipo/:id',
        component: ValidarComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlRoutingModule { }
