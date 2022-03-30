import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { Login } from '../interfaces/login.interface';

@Injectable({
  	providedIn: 'root'
})
export class AuthService {
	private baseUrl: string = environment.baseUrl;
	private _auth: Auth | undefined ;

	get auth(): Auth {
		return { ...this._auth! }
	}

	constructor(
		private http: HttpClient,
	) { }

	login(usuario: Login): Observable<Auth> {
		return this.http.post<Auth>(`${ this.baseUrl }Auth/login`, usuario).
		pipe(
			tap(auth => this._auth = auth),
			tap(auth => localStorage.setItem('token', auth.token )
			)
		);
	}
	
	logout() {
		this._auth = undefined;
	}

	verificaAutenticacion():Observable<boolean>{
		if(!localStorage.getItem('token')){
			return of(false);
		}
		let token = {'token':localStorage.getItem('token')};
		if(token.token === 'undefined' || token === undefined){
			return of(false);
		}
		return this.http.post<Auth>(`${ this.baseUrl }Auth/valida_token`, token).
		pipe(
			map( auth => {
				if(auth.inf_usuario?.id_usuario){
					this._auth = auth;					
					return true;
				}
				return false;
			})
		);
	}
}
