import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { DolarService } from '../services/dolar.service';
import { CompraDolar } from '../models/dolar.models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LABEL_PAGINADOR } from '../shared/constants';

@Component({
  selector: 'app-dolar',
  templateUrl: './dolar.component.html',
  styleUrls: ['./dolar.component.css']
})
export class DolarComponent implements OnInit, OnDestroy {

  operacionesDivisas: CompraDolar[] = [];
  operacionesSubs: Subscription;
  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private store: Store<AppState>,
              private dolarService: DolarService) { }

  ngOnInit(): void {
    this.operacionesSubs = this.store.select('dolar').subscribe(data => {
      this.operacionesDivisas = data.operaciones;
      // this.iniciarPaginador(); 
    });
  }

  ngOnDestroy() {
    this.operacionesSubs.unsubscribe();
  }

  public eliminarOperacion(operacion: CompraDolar) {}
}
