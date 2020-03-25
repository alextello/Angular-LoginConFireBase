import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyAoIQJ7Rb-22qSN_GXq6-HtvvumVjTxxbQ';
 // Crear nuevo usuario
 // signUp?key=[API_KEY]

 // LOGIN
 // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  constructor(private http: HttpClient) { }
  
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
    );

  }

}
