import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';

import { RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TopoComponent } from './components/topo/topo.component';
import { SaldoComponent } from './components/saldo/saldo.component';
import { DepositoComponent } from './components/deposito/deposito.component';
import { SaqueComponent } from './components/saque/saque.component';
import { DetalheComponent } from './components/detalhe/detalhe.component';

import { ErrorInterceptorProvider } from './interceptors/error-interceptor';
import { AuthInterceptorProvider } from './interceptors/auth-interceptor';

import { ClienteService } from './services/cliente.service'
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';

import { NgxMaskModule, IConfig } from 'ngx-mask'


const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    TopoComponent,
    SaldoComponent,
    DepositoComponent,
    SaqueComponent,
    DetalheComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot(ROUTES),
    NgxMaskModule.forRoot(maskConfigFunction)
  ],
  providers: [
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    ClienteService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
