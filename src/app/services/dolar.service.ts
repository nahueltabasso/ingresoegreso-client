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

  registrarOperacion(compraDolar: CompraDolar): Observable<CompraDolar> {
    return this.http.post<CompraDolar>(this.endpointOperaciones, compraDolar);
  }

  listarOperaciones(): Observable<CompraDolar[]> {
    // const params = new HttpParams().set('page', page)
    //                                .set('size', size);
    return this.http.get<CompraDolar[]>(this.endpointOperaciones + '/listar-operaciones');
  }
}
