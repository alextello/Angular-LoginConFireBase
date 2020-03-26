import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyAoIQJ7Rb-22qSN_GXq6-HtvvumVjTxxbQ';
  userToken: string;

  constructor(private http: HttpClient) {
    this.leerToken();
  }
  
  logout() {

  }

  login(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    
    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apiKey}`,
      authData
    ).pipe(
      map((resp: any) => {
        console.log('Entro en mapa de RXJS');
        this.guardarToken(resp.idToken);
        return resp;
      })
    );
  }

  nuevoUsuario(usuario: UsuarioModel) {
    
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    
    return this.http.post(
      `${this.url}signUp?key=${this.apiKey}`,
      authData
    ).pipe(
      map((resp: any) => {
        console.log('Entro en mapa de RXJS');
        this.guardarToken(resp.idToken);
        return resp;
      })
    );

  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  leerToken() {
    if(localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutenticado(): boolean {
    return this.userToken.length > 2;
  }

}
