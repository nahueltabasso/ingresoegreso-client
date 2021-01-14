import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http: HttpClient) { }

  getTiposCryptomoneda(): Observable<any> {
    return this.http.get<any>('https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=10&tsym=USD');
  }

  getCotizacionCrytomoneda(cryptomoneda: string, moneda: string): Observable<any> {
    return this.http.get<any>( `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptomoneda}&tsyms=${moneda}`);
  }
}
