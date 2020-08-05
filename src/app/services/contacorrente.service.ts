import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Conta } from '../shared/conta.model'
import { API_CONFIG } from '../config/api.config'

@Injectable()
export class ContaCorrenteService {
    constructor(private http: HttpClient){ }

    public atualizarSaldo(obj: Conta): Observable<any> {
        return this.http.put(`${API_CONFIG.baseUrl}/contas/${obj.id}`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }
}