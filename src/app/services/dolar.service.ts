import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompraDolar, CompraDolarFilterDTO, DolarCotizacion } from '../models/dolar.models';

@Injectable({
  providedIn: 'root'
})
export class DolarService {

  endpoint = environment.based_endpoint + '/dolar/cotizacion';
  endpointOperaciones = environment.based_endpoint + '/compradolar';

  constructor(private http: HttpClient) { }

  getCotizacionByTipoDolar(tipoDolar: String): Observable<DolarCotizacion> {
    return this.http.get<DolarCotizacion>(this.endpoint + '/' + tipoDolar);
  }

  getDolarOficial(): Observable<DolarCotizacion> {
    return this.http.get<DolarCotizacion>(this.endpoint + '/cotizacion/Dolar Oficial');
  }

  getDolarLibre(): Observable<DolarCotizacion> {
    return this.http.get<DolarCotizacion>(this.endpoint + '/cotizacion/Dolar Blue');
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

  search(filterDTO: CompraDolarFilterDTO): Observable<CompraDolar[]> {
    return this.http.post<CompraDolar[]>(this.endpointOperaciones + '/search', filterDTO);
  }
}
