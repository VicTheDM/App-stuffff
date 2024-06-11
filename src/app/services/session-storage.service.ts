import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionLogin } from "../models/session";
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  private salt = CryptoJS.enc.Utf8.parse(environment.saltScret); // Utiliza un salt único y seguro.
  private passphrase = environment.keyCripto;


  public currentSession: SessionLogin = new SessionLogin();
  public expiredDate: Date;
  private refreshToken = {
    token: "",
    expiresIn: 0
  };

  constructor(private router: Router) {}

  // Genera una clave a partir de la contraseña
  private generateKey() {
    return CryptoJS.PBKDF2(this.passphrase, this.salt, {
      keySize: 256 / 32,
      iterations: 1000
    });
  }

  // Método para cifrar los datos
  encrypt(data: string): string {
    const key = this.generateKey();
    const iv = CryptoJS.lib.WordArray.random(128 / 8); // Genera un IV aleatorio para cada cifrado.
    const encrypted = CryptoJS.AES.encrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    // Combina el IV con el texto cifrado para un manejo más fácil
    return iv.toString(CryptoJS.enc.Hex) + encrypted.toString();
  }

  // Método para descifrar los datos
  decrypt(data: string): string {
    const key = this.generateKey();
    // Extrae el IV, que es los primeros 32 caracteres hexadecimales
    const iv = CryptoJS.enc.Hex.parse(data.substr(0, 32));
    // El texto cifrado real es todo después del IV
    const encrypted = data.substr(32);
    
    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return CryptoJS.enc.Utf8.stringify(decrypted);
  }
  // Guarda la sesión actual en sessionStorage usando "encriptación"
  saveCurrentSession(session: SessionLogin): void {
    this.currentSession = session;
    const encryptedSession = this.encrypt(JSON.stringify(session));
    localStorage.setItem('currentSession', encryptedSession);
  }

  // Lee la sesión actual de sessionStorage y "desencripta" los datos
  getCurrentSession(): SessionLogin | null {
    const encryptedSessionData = localStorage.getItem('currentSession');
    if (!encryptedSessionData) return null;
    const sessionData = this.decrypt(encryptedSessionData);
    return JSON.parse(sessionData);
  }

  // Elimina la sesión actual de sessionStorage
  removeCurrentSession(): void {
    localStorage.removeItem('currentSession');
    this.currentSession = new SessionLogin();
  }

  // Guarda el token de actualización usando "encriptación"
  saveRefreshToken(token: string, expiresIn: number): void {
    this.refreshToken.token = token;
    this.refreshToken.expiresIn = expiresIn;
    const encryptedToken = this.encrypt(JSON.stringify(this.refreshToken));
    localStorage.setItem('refreshToken', encryptedToken);
  }

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  }

  getCurrentToken(): string {
    const session = this.getCurrentSession();
    try { // El problema se encuentra que al ser undefined no devuelve ningun valor
      return (session && session.accessToken.token) ? session.accessToken.token : null;
    } catch (error) {
    }
    return null;
  }

  // Lee el token de actualización de sessionStorage y "desencripta" los datos
  getRefreshToken(): { token: string; expiresIn: number } | null {
    const encryptedTokenData = localStorage.getItem('refreshToken');
    if (!encryptedTokenData) return null;
    const tokenData = this.decrypt(encryptedTokenData);
    return JSON.parse(tokenData);
  }


  // Elimina el token de actualización de sessionStorage
  removeRefreshToken(): void {
    localStorage.removeItem('refreshToken');
    this.refreshToken = { token: "", expiresIn: 0 };
  }

  // Navega a la página de login
  private navigateToLogin(): void {
    window.location.href = '/login';
  }

  logout(): void{
    this.removeCurrentSession();
    this.removeRefreshToken();
    setTimeout(()=>{
      this.navigateToLogin();
    },750)  
  }

  isJwtExpired(): boolean{
    const jwt = this.getCurrentToken();
    const b64 = jwt.split(".")[1];
    const sdata = atob(b64);
    const data = JSON.parse(sdata);
    const expiredDate = new Date(data.exp * 1000)
    const now = new Date();

    return expiredDate < now;
  }

}
