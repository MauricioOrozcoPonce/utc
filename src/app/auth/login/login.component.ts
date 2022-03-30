import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
	errors ={
		'correo': '',
		'contrasenia':''
	}
	get correoErrors(): string{
		const errors = this.loginForm.get('correo')?.errors;
		if (errors?.['required']){
			return 'El campo correo es obligatorio.';
		}
		else if(errors?.['email']){
			return 'El campo correo debe contener un email válido.';
		}
		else if(this.errors.correo.length > 0){
			return this.errors.correo;
		}
		return '';
	}

	get passwordErrors(): string{
		const errors = this.loginForm.get('contrasenia')?.errors;
	
		if (errors?.['required']){
			return 'El campo contraseña es obligatorio.';
		}
		else if(this.loginForm.get('contrasenia')?.hasError('minlength')){
			return 'El campo contraseña debe contener al menos 8 caracteres de longitud.';
		}
		else if(this.errors.contrasenia.length > 0){
			return this.errors.contrasenia;
		}
		return '';
	}

	loginForm: FormGroup = this.fb.group({
		correo: ['', [Validators.required, Validators.email]],
		contrasenia: ['', [Validators.required, Validators.minLength(8)]]
	})

	constructor(
			private router: Router, 
			private authService: AuthService,
			private fb:FormBuilder
		) {
	}
	ngOnInit(): void {
	}

	login() {
		if(this.loginForm.invalid){
			this.loginForm.markAllAsTouched();
		}
		
		this.authService.login(this.loginForm.value)
		.subscribe( res => {
				if ( res.inf_usuario?.correo ) {
					if(res.inf_usuario.privilegio === 'enlace'){
						this.router.navigate(['./enlace']);		
					}
					else if(res.inf_usuario.privilegio === 'control'){
						this.router.navigate(['./enlace']);	
					}
				}
				else{
					this.errors = res.errors;
				}
			}
		)
	}
	campoValido(campo:string){
		return this.loginForm.controls[campo].errors && this.loginForm.controls[campo].touched;
	}

	bdValido(campo:string){
		if(campo === 'correo'){
			if(this.errors.correo?.length > 0){
				return true;
			}
		}
		else if(campo === 'contrasenia'){
			if(this.errors.contrasenia?.length > 0){
				return true;
			}
		}
		return false;
	}
}
