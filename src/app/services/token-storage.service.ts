import { Injectable } from '@angular/core';
import { UsuarioLoginDTO } from '../models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  TOKEN_KEY = 'auth-token';
  USER_KEY = 'auth-user';

  constructor() {}

  signOut(): void {
    window.sessionStorage.clear();
  }
  
  saveToken(token: string): void {
    window.sessionStorage.removeItem(this.TOKEN_KEY);
    window.sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  saveUser(user): void {
    window.sessionStorage.removeItem(this.USER_KEY);
    window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): any {
    return JSON.parse(sessionStorage.getItem(this.USER_KEY));
  }

}
