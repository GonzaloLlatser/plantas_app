import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserLoginInterface} from '../common/user-login-interface';
import {Observable} from 'rxjs';
import {environment} from '../environment/environment';
import {PlantasInterface} from '../common/plantas-interface';

@Injectable({
  providedIn: 'root'
})
export class PlantasService {
  // Define Cte Http
  private http: HttpClient = inject(HttpClient);

  // Define CRUD
  todasLasPlantasUsuario(id: Number): Observable<PlantasInterface[]> {
    return this.http.get<PlantasInterface[]>(environment.url_base + 'api/plantas/usuario/' + id);
  }

  constructor() {
  }
}
