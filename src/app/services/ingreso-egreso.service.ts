import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_ENDPOINT } from '../config/app';
import { IngresoEgreso } from '../models/ingresoegreso.models';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  endpoint = BASE_ENDPOINT + '/ingreso-egreso';

  constructor(private http: HttpClient) {}

  registrarIngresoEgreso(ingresoEgreso: IngresoEgreso): Observable<IngresoEgreso> {
    return this.http.post<IngresoEgreso>(this.endpoint, ingresoEgreso);
  }

  getItemsUsuariosLogueado(): Observable<IngresoEgreso[]> {
    return this.http.get<IngresoEgreso[]>(this.endpoint + '/ingresos-egresos-usuario');
  }

  eliminarItem(id: string): Observable<void> {
    return this.http.delete<void>(this.endpoint + '/eliminar/' + id); 
  }
}
