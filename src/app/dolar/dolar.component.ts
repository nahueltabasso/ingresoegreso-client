import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { DolarService } from '../services/dolar.service';
import { CompraDolar } from '../models/dolar.models';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { LABEL_PAGINADOR } from '../shared/constants';
import Swal from 'sweetalert2';
import * as dolarActions from '../dolar/dolar.actions';
import { MatDialog } from '@angular/material/dialog';
import { AddOperacionComponent } from './add-operacion/add-operacion.component';

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
              private dolarService: DolarService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.calcularRangosPaginados();
  }

  ngOnDestroy() {}

  public paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.calcularRangosPaginados();
  }

  private calcularRangosPaginados() {
    this.dolarService.listarOperacionesPaginadas(this.paginaActual.toString(), this.totalPorPagina.toString()).subscribe(data => {
      this.operacionesDivisas = data.content as CompraDolar[];
      this.totalRegistros = data.totalElements as number;
      this.paginator._intl.itemsPerPageLabel = LABEL_PAGINADOR;
    });
  }

  public eliminarOperacion(operacion: CompraDolar) {
    this.dolarService.eliminarOperacion(operacion.id).subscribe(data => {
      Swal.fire('Eliminado', 'Operacion eliminada con exito!', 'success');
      this.operacionesDivisas = this.operacionesDivisas.filter(o => o.id != operacion.id);
      this.store.dispatch(dolarActions.setOperaciones({ operaciones: this.operacionesDivisas }));
      this.ngOnInit();
    }, (err) => {
      Swal.fire('Error', 'Ocurrio un error en el servidor!', 'error');
    });
  }

  public nuevaOperacion() {
    const modalRef = this.dialog.open(AddOperacionComponent, {
      width: '700px',
    });
    modalRef.afterClosed().subscribe(data => {

    });
  }
}