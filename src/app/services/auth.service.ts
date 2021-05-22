import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.reducer';
import { LoginDTO, PasswordDTO, UsuarioDTO, UsuarioLoginDTO } from '../models/usuario.models';
import { TokenStorageService } from './token-storage.service';
import * as auth from '../auth/auth.actions';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint = environment.based_endpoint + '/auth';
  endpointPassword = environment.based_endpoint + '/password';

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorageService,
              private store: Store<AppState>) {}

  login(loginDTO: LoginDTO): Observable<UsuarioLoginDTO> {
    return this.http.post<UsuarioLoginDTO>(this.endpoint + '/signin', loginDTO);
  }

  register(usuario: UsuarioDTO): Observable<String> {
    return this.http.post<String>(this.endpoint + '/signup', usuario);
  }

  logout(): Observable<String> {
    return this.http.post<String>(this.endpoint + '/logout', null);
  } 

  isAuthenticated(): boolean {
    const token = this.tokenStorage.getToken();
    if (token) return true;
    return false;
  }

  forgotPassword(email: string, telefono: string): Observable<any> {
    return this.http.post<any>(this.endpointPassword + '/forgotpassword?email=' + email + "&telefono=" + telefono, null);
  }

  resetPassword(passwordDTO: PasswordDTO): Observable<any> {
    return this.http.post<any>(this.endpointPassword + '/resetpassword', passwordDTO);
  }
}
 