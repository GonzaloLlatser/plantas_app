import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environment/environment';
import {Observable} from 'rxjs';
import {UserLoginInterface} from '../common/user-login-interface';
import {userNewInterface} from '../common/user-new-interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // Define Cte Http
  private http: HttpClient = inject(HttpClient);

  // Define Metodo GET
  usuarioLogin(usuario: UserLoginInterface): Observable<any> {
    return this.http.post<any>(environment.url_base + 'api/auth/login', usuario);
  }

  // Define Metodo POST
  usuarioCrear(usuario: userNewInterface): Observable<any> {
    return this.http.post<any>(environment.url_base + 'api/user/new', usuario);
  }

  // Define Metodo GET
  buscarUsuario(id: number): Observable<any> {
    return this.http.get<any>(environment.url_base + 'api/user/' + id);
  }

  // Define Metodo DELETE
  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete<any>(environment.url_base + 'api/user/' + id);
  }

  // Define Metodo UPDATE
  modificarUsuario(usuario: userNewInterface): Observable<any> {
    return this.http.put<any>(environment.url_base + 'api/user/' + usuario.id, usuario);
  }
}
