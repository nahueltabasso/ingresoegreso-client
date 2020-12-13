import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingresoegreso.models';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import { LABEL_PAGINADOR } from 'src/app/shared/constants';
import Swal from 'sweetalert2';
import * as ingresoEgresoActions from '../ingreso-egreso.actions';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];
  dataSource: MatTableDataSource<IngresoEgreso>;
  itemsSubs: Subscription;
  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 5;
  displayedColumns: string[] = ['fecha', 'descripcion', 'monto', 'tipo', 'acciones']

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private store: Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    // Una forma de Realizar el paginado
    // this.calcularRangosPaginados();
    // Otra Forma de realizar el paginado obteniendo los datos del store y usando material
    this.itemsSubs = this.store.select("ingresoEgresos").subscribe(data => {
      this.ingresosEgresos = data.items;
      this.iniciarPaginador();
    }); 
  }

  ngOnDestroy() {
    this.itemsSubs.unsubscribe();
  }

  public iniciarPaginador() {
    this.dataSource = new MatTableDataSource<IngresoEgreso>(this.ingresosEgresos);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = LABEL_PAGINADOR;
  }

  public paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.calcularRangosPaginados();
  }

  private calcularRangosPaginados() {
    this.ingresoEgresoService.listadoPaginado(this.paginaActual.toString(), this.totalPorPagina.toString()).subscribe(data => {
      this.ingresosEgresos = data.content as IngresoEgreso[];
      this.totalRegistros = data.totalElements as number;
      this.paginator._intl.itemsPerPageLabel = LABEL_PAGINADOR;
    });
  }

  public eliminarItem(item: IngresoEgreso) {
    this.ingresoEgresoService.eliminarItem(item.id).subscribe(data => {
      Swal.fire('Eliminado', 'Item eliminado con exito!', 'success');
      this.ingresosEgresos = this.ingresosEgresos.filter(i => i.id != item.id);
      this.store.dispatch(ingresoEgresoActions.setItems({ items: this.ingresosEgresos }));
      this.ngOnInit();
    }, (err) => {
      Swal.fire('Error', 'Ocurrio un error en el servidor!', 'error');
    });
  }

}
