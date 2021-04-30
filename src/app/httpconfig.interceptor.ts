import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {AppConfig } from './app-config';
@Injectable()
export class HttpconfigInterceptor implements HttpInterceptor {
	loader: any;
	isShowingLoader = false;


	constructor(
		public appConfig: AppConfig,
		) { }


	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const accessToken = JSON.parse(localStorage.getItem('access_token'));
		if (accessToken) {
			// eslint-disable-next-line max-len
			request = request.clone({ headers: request.headers.set('Authorization', accessToken.token_type+' ' + accessToken.access_token) });
			request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });

		}else{
			// eslint-disable-next-line max-len
			request = request.clone({ headers: request.headers.set('Authorization', 'Basic ' + this.appConfig.API_KEY) });
			request = request.clone({ headers: request.headers.set('Content-Type', 'application/x-www-form-urlencoded') });
			request = request.clone({ headers: request.headers.set('basiq-version', '2.0') });
		}


		// this.showLoader();
		return next.handle(request).pipe(
			map((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {
				}
				return event;
			}),
			catchError((error: HttpErrorResponse) => {
				let errorMsg = '';
				if (error.error instanceof ErrorEvent) {
					errorMsg = `Error: ${error.error.message}`;

				}
				else {
					console.log('this is server side error');
					errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
				}
				console.log(errorMsg);
				return throwError(errorMsg);
			})
		);
	}
}
