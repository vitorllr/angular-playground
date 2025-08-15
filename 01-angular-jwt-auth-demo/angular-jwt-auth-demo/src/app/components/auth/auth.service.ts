import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';

  constructor(private http: HttpClient) { }

  callLoginApi(credentials: any) {
    return this.http.post(`${environment.apiUrl}/auth/login`, credentials);
  }
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }
  isAuthenticated() {
    return !!this.getToken();
  }
  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }
}
