import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingresoegreso.models';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

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

  // Doughnut
  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[]];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('ingresoEgresos').subscribe(data => {
      this.generarEstadistica(data.items);
    });
  }

  public generarEstadistica(items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0;
    this.totalEgresos = 0;
    this.totalIngresos = 0;

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
