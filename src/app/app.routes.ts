import { Routes } from '@angular/router'

import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component'
import { SaldoComponent } from './components/saldo/saldo.component'
import { SaqueComponent } from './components/saque/saque.component'
import { DepositoComponent } from './components/deposito/deposito.component'
import { DetalheComponent } from './components/detalhe/detalhe.component'


export const ROUTES: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: LoginComponent },
    { path: 'home/:id', component: HomeComponent, 
        children: [
            { path: '', component: DetalheComponent },
            { path: 'detalhe', component: DetalheComponent },
            { path: 'saldo', component: SaldoComponent },
            { path: 'deposito', component: DepositoComponent },
            { path: 'saque', component: SaqueComponent }
        ] 
    }
]