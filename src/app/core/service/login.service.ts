import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn = false;
  token = "";
  email = "";
  password = "";
  userId = "";
  roles:string[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('/login', { email , password }).pipe(
      map(resp => {
        this.processLoginResponse(resp, email, password);
        return resp;
      })
    )
  }

  signup(email: string, password: string): Observable<any> {
    return this.http.post<any>('/signup', { email , password }).pipe(
      map(resp => {
        return resp;
      })
    )
  }

  processLoginResponse(data: any, email: string, password: string) {
    this.loggedIn = true;
    this.token = data.token;
    this.email = email;
    this.password = password;
    localStorage.setItem('token', data.token);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    let payload = this.parseJwt(this.token);
    this.roles = payload.roller;
    this.userId = payload.kullanicilarId;
  }

  userHasRole(rol: string): boolean {
    return this.roles.findIndex(r => r === rol) != -1;
  }

  parseJwt (token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  relogin():Observable<any> {
    return this.login(this.email, this.password);
  }
  
  logout() {
    this.loggedIn = false;
    this.token = "";
    this.email = "";
    this.password = "";
    this.userId = "";
    this.roles = [];
    localStorage.clear();
  }
}
