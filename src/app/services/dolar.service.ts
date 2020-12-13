import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_ENDPOINT } from '../config/app';
import { CompraDolar, DolarCotizacion } from '../models/dolar.models';

@Injectable({
  providedIn: 'root'
})
export class DolarService {

  endpoint = BASE_ENDPOINT + '/dolar';
  endpointOperaciones = BASE_ENDPOINT + '/compradolar';

  constructor(private http: HttpClient) { }

  getDolarOficial(): Observable<DolarCotizacion> {
    return this.http.get<DolarCotizacion>(this.endpoint + '/dolaroficial');
  }

  getDolarLibre(): Observable<DolarCotizacion> {
    return this.http.get<DolarCotizacion>(this.endpoint + '/dolarblue');
  }

  getDolarBcoSantander(): Observable<DolarCotizacion> {
    return this.http.get<DolarCotizacion>(this.endpoint + '/dolarsantander')
  }

  getTipoDolar(tipo: string): Observable<DolarCotizacion> {
    return this.http.get<DolarCotizacion>(this.endpoint + '/dolarcotizacion/' + tipo);
  }

  registrarOperacion(compraDolar: CompraDolar): Observable<CompraDolar> {
    return this.http.post<CompraDolar>(this.endpointOperaciones, compraDolar);
  }

  listarOperacionesPaginadas(page: string, size: string): Observable<any> {
    const params = new HttpParams().set('page', page)
                                   .set('size', size);
    return this.http.get<any>(this.endpointOperaciones + '/listar-operaciones-paginadas', { params: params });
  }

  listarOperaciones(): Observable<CompraDolar[]> {
    return this.http.get<CompraDolar[]>(this.endpointOperaciones + '/listar-operaciones');
  }

  eliminarOperacion(id: string): Observable<void> {
    return this.http.delete<void>(this.endpointOperaciones + '/eliminar/' + id);
  }
}
