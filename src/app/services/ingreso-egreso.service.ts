import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IngresoEgreso, IngresoEgresoFilterDTO } from '../models/ingresoegreso.models';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  endpoint = environment.based_endpoint + '/ingreso-egreso';

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

  listadoPaginado(page: string, size: string): Observable<any> {
    const params = new HttpParams().set('page', page)
                                   .set('size', size);
    return this.http.get<any>(this.endpoint + '/ingresos-egresos-usuario-paginados', { params: params });
  }

  search(filterDTO: IngresoEgresoFilterDTO): Observable<IngresoEgreso[]> {
    return this.http.post<IngresoEgreso[]>(this.endpoint + '/search', filterDTO);
  }
}
