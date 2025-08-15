import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(user: { email: string; username: string; password: string }) {
    return this.http.post(`${environment.apiUrl}/users`, user);
  }

  getUsers() {
    return this.http.get(`${environment.apiUrl}/users`);
  }
}
