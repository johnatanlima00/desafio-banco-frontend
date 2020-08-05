import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credenciais } from '../shared/credenciais.model';
import { API_CONFIG } from '../config/api.config';
import { LocalUser } from '../shared/local_user.model';
import { StorageService } from './storage.service';
import { JwtHelperService } from "@auth0/angular-jwt";

const jwtHelper: JwtHelperService = new JwtHelperService()

@Injectable()
export class AuthService{
    constructor(private http: HttpClient, private storage: StorageService){ }

    public getToken(dadosLogin: Credenciais): Observable<any> {
        return this.http.post(`${API_CONFIG.baseUrl}/login`, dadosLogin, {
            observe: 'response',
            responseType: 'text',
        })
    }

    public refreshToken(): Observable<any> {
        return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`, {}, {
            observe: 'response',
            responseType: 'text',
        })
    }

    public successfulLogin(token: string): void {
        let tok = token.substring(7)
        let user: LocalUser = {
            token: tok,
            email: jwtHelper.decodeToken(token).sub
        }
        this.storage.setLocalUser(user)
    }

    public logout(): void {
        this.storage.setLocalUser(null)
    }
}