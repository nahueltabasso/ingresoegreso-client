import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HistoricoIngresoEgreso } from '../models/historicoIngresoEgreso.models';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

  endpoint = environment.based_endpoint + '/historico';
  
  constructor(private http: HttpClient) {}

  getHistorico(): Observable<HistoricoIngresoEgreso> {
    return this.http.get<HistoricoIngresoEgreso>(this.endpoint);
  } 
}
