// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { Subscription } from 'rxjs';
// import { AppState } from 'src/app/app.reducer';
// import { IngresoEgreso } from 'src/app/models/ingresoegreso.models';
// import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
// import Swal from 'sweetalert2';
// import * as ingresoEgresoActions from '../ingreso-egreso.actions';

// @Component({
//   selector: 'app-detalle',
//   templateUrl: './detalle.component.html',
//   styles: []
// })
// export class DetalleComponent implements OnInit, OnDestroy {

//   ingresosEgresos: IngresoEgreso[] = [];
//   itemsSubs: Subscription;

//   constructor(private store: Store<AppState>,
//               private ingresoEgresoService: IngresoEgresoService) { }

//   ngOnInit() {
//     this.itemsSubs = this.store.select('ingresoEgresos').subscribe(data => {
//       this.ingresosEgresos = data.items;
//     });
//   }

//   ngOnDestroy() {
//     this.itemsSubs.unsubscribe();
//   }

//   public eliminarItem(item: IngresoEgreso) {
//     this.ingresoEgresoService.eliminarItem(item.id).subscribe(data => {
//       Swal.fire('Eliminado', 'Item eliminado con exito!', 'success');
//       this.ingresosEgresos = this.ingresosEgresos.filter(i => i.id != item.id);
//       this.store.dispatch(ingresoEgresoActions.setItems({ items: this.ingresosEgresos }));
//       this.ngOnInit();
//     }, (err) => {
//       Swal.fire('Error', 'Ocurrio un error en el servidor!', 'error');
//     });
//   }

// }

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
  itemsSubs: Subscription;
  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private store: Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.calcularRangosPaginados() 
  }

  ngOnDestroy() {
    // this.itemsSubs.unsubscribe();
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
