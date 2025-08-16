import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private tokenKey = 'token';

  private authStateSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  authState$ = this.authStateSubject.asObservable();

constructor(private http: HttpClient) {
    window.addEventListener('storage', (e) => {
      if (e.key === this.tokenKey) {
        this.authStateSubject.next(this.isAuthenticated());
      }
    });
  }
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }
  isAuthenticated() {
    return !!this.getToken();
  }
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, credentials).pipe(
      tap((res) => {
        const token = res.token ?? res.access_token;
        if (token) {
          this.saveToken(token);
          this.authStateSubject.next(true);
        }
      })
    );
  }
  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    this.authStateSubject.next(true);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.authStateSubject.next(false);
  }
}
