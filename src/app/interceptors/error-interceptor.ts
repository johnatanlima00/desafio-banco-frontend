import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';

import swal from 'sweetalert2'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private storage: StorageService){ }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
              // do nothing for now
          }
          return event;
      }),
      catchError((error) => {
        let errorObj = error
        if(errorObj.error){
          errorObj = errorObj.error
        }
        if(!errorObj.status){
          errorObj = JSON.parse(errorObj)
        } 

        switch(errorObj.status){
          case 401:
            this.handle401();
            break;
          
          case 403:
            this.handle403();
            break;

          case 404:
            this.handle404(errorObj.message);
            break;

          case 422:
            this.handle422(errorObj);
            break;

          default:
            this.handleDefaultError(errorObj)
        }
         
        return throwError(errorObj);
      }) as any
    );
  }

  async handle401() {
    await swal.fire('Falha de Autenticação', 'Email ou senha incorretos', 'error')
  }

  async handle403() {
    await swal.fire('Falha de Autenticação', 'Usuário não autorizado', 'error')
      .then(() => {
        this.storage.setLocalUser(null)
        window.location.reload()
      })
  }

  async handle404(message) {
    await swal.fire('Não Encontrado', message, 'error')
  }

  async handle422(errorObj) {
    await swal.fire('Falha na Validação', errorObj.errors.map(errors => '<br/> Campo ' + errors.fieldName + ' - ' + errors.message), 'error')
  }

  async handleDefaultError(errorObj) {
    await swal.fire('Erro ' + errorObj.status + ': ' + errorObj.error, errorObj.message, 'error')
  }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}