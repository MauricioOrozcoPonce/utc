import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  	constructor(
    	private authService:AuthService,
		private router:Router)
	{}
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		this.authService.verificaAutenticacion().
			pipe(
				tap(autenticado => {
					if(autenticado){
						let privilegio = this.authService.auth.inf_usuario.privilegio;
						if(privilegio === 'enlace'){
							this.router.navigate(['./enlace']);
						}
						else if(privilegio === 'control'){
							this.router.navigate(['./control']);
						}
					}
				})
			);
		return true;
	}
}
