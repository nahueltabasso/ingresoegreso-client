import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { CompraDolar, EstadisticaDolar } from 'src/app/models/dolar.models';
import { DOLAR_LIBRE } from 'src/app/shared/constants';
import * as dolarActions from '../dolar.actions';

@Component({
  selector: 'app-estadistica-dolar',
  templateUrl: './estadistica-dolar.component.html',
  styleUrls: ['./estadistica-dolar.component.css']
})
export class EstadisticaDolarComponent implements OnInit {

  ingresosDolarOficial: number = 0;
  ingresosDolarLibre: number = 0;
  egresosDolar: number = 0;
  countIngresosOficial: number = 0;
  countIngresosLibre: number = 0;
  countEgresos: number = 0;
  totalIngresosDolar: number = 0;
  totalEgresosDolar: number = 0;
  flagSearch: boolean = false;
  estadisticas: EstadisticaDolar = new EstadisticaDolar();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('dolar').subscribe(data => {
      this.generarEstadisticas(data.operaciones);
    });
  }

  public setFlagSearch(flag: boolean) {
    this.flagSearch = flag;
    if (this.flagSearch) {
      this.store.select('dolar').subscribe(data => {
        this.generarEstadisticas(data.operacionesByFiltros);
      });
    } else {
      this.store.select('dolar').subscribe(data => {
        this.generarEstadisticas(data.operaciones);
      });
    }
  }

  public generarEstadisticas(operaciones: CompraDolar[]) {
    this.ingresosDolarOficial = 0;
    this.ingresosDolarLibre = 0;
    this.egresosDolar = 0;
    this.totalIngresosDolar = 0;
    this.totalEgresosDolar = 0;
    this.countEgresos = 0;
    this.countIngresosLibre = 0;
    this.countIngresosOficial = 0;
    this.estadisticas = new EstadisticaDolar();
    for (const o of operaciones) {
      if (o.tipoOperacion === 'INGRESO') {
        if (o.tipo === DOLAR_LIBRE) {
          this.ingresosDolarLibre = this.ingresosDolarLibre + o.cantidadDolarCompra;
          this.countIngresosLibre++;
        } else {
          this.ingresosDolarOficial = this.ingresosDolarOficial + o.cantidadDolarCompra;
          this.countIngresosOficial++;
        }
      } else {
        this.egresosDolar = this.egresosDolar + o.cantidadDolarCompra;
        this.countEgresos++;
      }
    }
    this.totalIngresosDolar = this.ingresosDolarOficial + this.ingresosDolarLibre;
    this.totalEgresosDolar = this.egresosDolar;
    this.estadisticas.ingresosDolarLibre = this.ingresosDolarLibre;
    this.estadisticas.ingresosDolarOficial = this.ingresosDolarOficial;
    this.estadisticas.countIngresosLibre = this.countIngresosLibre;
    this.estadisticas.countIngresosOficial = this.countIngresosOficial;
    this.estadisticas.egresosDolar = this.egresosDolar;
    this.estadisticas.countEgresos = this.countEgresos;
    this.estadisticas.totalOperaciones = this.mostrarTotalOperaciones();
    // this.store.dispatch(dolarActions.setEstadisticasDolar({ estadisticas: this.estadisticas }));
  }

  public mostrarTotalOperaciones() {
    return this.countIngresosLibre + this.countIngresosOficial;
  }

}
