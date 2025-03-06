import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environment/environment';
import {Observable} from 'rxjs';
import {UserLoginInterface} from '../common/user-login-interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // Define Cte Http
  private http: HttpClient = inject(HttpClient);

  // Define CRUD
  usuarioLogin(usuario: UserLoginInterface): Observable<any> {
    return this.http.post<any>(environment.url_base + 'login', usuario);
  }

  constructor() {
  }
}
