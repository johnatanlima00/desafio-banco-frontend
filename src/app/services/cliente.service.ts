import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';

import { Cliente } from '../shared/cliente.model'
import { Injectable } from '@angular/core';
import { Conta } from '../shared/conta.model';

@Injectable()
export class ClienteService {

    constructor(private http: HttpClient){ }

    public getClienteInfo(emailCliente: string): Promise<Cliente> {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${emailCliente}`)
            .toPromise()
            .then((resposta: Cliente) => resposta)
    }

    public getContasCliente(emailCliente: string): Promise<Conta[]> {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${emailCliente}`)
            .toPromise()
            .then((resposta: Cliente) => resposta.contas)
    }
}