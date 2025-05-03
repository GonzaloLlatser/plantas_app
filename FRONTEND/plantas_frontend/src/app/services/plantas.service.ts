import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environment/environment';
import {PlantasInterface, PlantasInterfaceByBackend, RespuestaInterface} from '../common/plantas-interface';

@Injectable({
  providedIn: 'root'
})
export class PlantasService {
  // Define Cte Http
  private http: HttpClient = inject(HttpClient);

  // Define Metodo GET ALL
  todasLasPlantasUsuario(id: Number): Observable<any> {
    return this.http.get<any>(environment.url_base + 'api/plantas/usuario/' + id);
  }

  // Define Metodo POST
  crearNuevaPlanta(planta: {
    id: any;
    nombre: any;
    fechaAdquisicion: string;
    fechaUltimoRiego: string;
    fechaProximoRiego: string;
    fechaPoda: string;
    ubicacion: any;
    tipoPlanta: any;
    notas: any
  }): Observable<any> {
    return this.http.post<any>(environment.url_base + 'api/plantas/new', planta);
  }

  // Define Metodo GET
  unaPlanta(id: number): Observable<any> {
    return this.http.get<any>(environment.url_base + 'api/plantas/' + id);
  }

  // Define Metodo POST
  guardarPlanta(planta: {
    id: any;
    nombre: any;
    fechaAdquisicion: string;
    fechaUltimoRiego: string;
    fechaProximoRiego: string;
    fechaPoda: string;
    ubicacion: any;
    tipoPlanta: any;
    notas: any
  }): Observable<any> {
    return this.http.put<any>(environment.url_base + 'api/plantas/modificar/' + planta.id, planta);
  }

  // Define Metodo DELETE
  eliminarPlanta(idPlanta: number) {
    return this.http.delete(environment.url_base + 'api/plantas/' + idPlanta);
  }
}
