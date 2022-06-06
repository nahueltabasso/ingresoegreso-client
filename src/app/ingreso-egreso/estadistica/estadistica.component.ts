import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingresoegreso.models';
import { MultiDataSet, Label } from 'ng2-charts';
import { HistoricoIngresoEgreso } from 'src/app/models/historicoIngresoEgreso.models';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  ingresos: number = 0;
  egresos: number = 0;
  totalIngresos: number = 0;
  totalEgresos: number = 0;
  historico: HistoricoIngresoEgreso = new HistoricoIngresoEgreso();

  // Doughnut
  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[]];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('ingresoEgresos').subscribe(data => {
      this.historico = data.historico;
      setTimeout(() => {
        this.generarEstadistica(data.items);        
      }, 4000);
    });
  }

  public generarEstadistica(items: IngresoEgreso[]) {
    this.ingresos = this.historico.itemsTotalIngreso;
    this.egresos = this.historico.itemsTotalEgreso;
    this.totalEgresos = this.historico.montoTotalEgreso;
    this.totalIngresos = this.historico.montoTotalIngreso;

    for (const item of items) {
      if (item.tipo === 'INGRESO') {
        this.totalIngresos = this.totalIngresos + item.monto;
        this.ingresos++;
      } else {
        this.totalEgresos = this.totalEgresos + item.monto;
        this.egresos++;
      }
    }

    this.doughnutChartData = [[this.totalIngresos, this.totalEgresos]];
  }

}
