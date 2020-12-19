import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso, IngresoEgresoFilterDTO, Mes } from 'src/app/models/ingresoegreso.models';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import { LABEL_PAGINADOR, MESES_ANIO, MESES_STRING } from 'src/app/shared/constants';
import Swal from 'sweetalert2';
import * as ingresoEgresoActions from '../ingreso-egreso.actions';
import * as ui from '../../shared/ui.actions';

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
  displayedColumns: string[] = ['fecha', 'descripcion', 'monto', 'tipo', 'acciones'];
  formulario: FormGroup;
  filterDTO: IngresoEgresoFilterDTO = new IngresoEgresoFilterDTO();
  mesesAnio: Mes[] = MESES_ANIO;
  meses: string[] = MESES_STRING;
  aniosArray: number[] = [];
  loading: boolean = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private store: Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService,
              private fb: FormBuilder) { }

  ngOnInit() {
    // Una forma de Realizar el paginado
    // this.calcularRangosPaginados();
    // Otra Forma de realizar el paginado obteniendo los datos del store y usando material
    this.itemsSubs = this.store.select("ingresoEgresos").subscribe(data => {
      this.ingresosEgresos = data.items;
      this.iniciarPaginador();
    });
    this.createForm();
    let date = new Date();
    let anioActual = date.getFullYear();
    // Completamos el array de los años (SOLO 5 AÑOS MOSTRAMOS EN EL COMBO)
    this.aniosArray.push(anioActual);
    for (let i = 0; i < 4; i++) {
      anioActual--;
      this.aniosArray.push(anioActual);
    }
    let mes: Mes[] = []
    // Obtenemos el mes de la fecha actual
    mes = this.mesesAnio.filter(m => m.nroMes === date.getMonth()+1);
    this.formulario.controls['anio'].setValue(date.getFullYear());
    this.formulario.controls['mes'].setValue(mes[0].mes);
    this.filterDTO.anio = date.getFullYear();
    this.filterDTO.mes = mes[0].nroMes;
  }

  ngOnDestroy() {
    this.itemsSubs.unsubscribe();
  }

  public createForm() {
    this.formulario = this.fb.group({
      anio: ['', ],
      mes: ['', ],
      tipo: ['', ]
    });
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

  public selectAnio(event) {
    this.filterDTO.anio = event;
  }

  public selectMes(event) {
    this.filterDTO.mes = event;
  }

  public selectTipo(event) {
    this.filterDTO.tipo = event;
  }

  public search() {
    if (this.formulario.invalid) return;
    this.store.dispatch(ui.isLoading());
    this.store.dispatch(ingresoEgresoActions.setFiltros({ filtrosDTO: this.filterDTO }));
    this.store.dispatch(ingresoEgresoActions.setCount());
    this.ingresoEgresoService.search(this.filterDTO).subscribe(data => {
      this.store.dispatch(ingresoEgresoActions.setItemsByFiltros({ itemsFiltrados: data }));
      this.store.dispatch(ui.stopLoading());
      this.ingresosEgresos = data;
      this.iniciarPaginador();
      if (this.ingresosEgresos.length === 0) {
        Swal.fire('Atencion', 'No se encontraron resultados de acuerdo a los filtros!', 'info');
      }
    });
  }

  public cleanFilter() {
    this.filterDTO = new IngresoEgresoFilterDTO();
    this.formulario.reset();
    this.store.dispatch(ingresoEgresoActions.unSetFiltros());
    this.store.dispatch(ingresoEgresoActions.unSetItemsByFiltros());
    const date = new Date();
    let mes: Mes[] = []
    mes = this.mesesAnio.filter(m => m.nroMes === date.getMonth()+1);
    this.formulario.controls['anio'].setValue(date.getFullYear());
    this.formulario.controls['mes'].setValue(mes[0].mes);
    this.filterDTO.anio = date.getFullYear();
    this.filterDTO.mes = mes[0].nroMes;
    this.ngOnInit();
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
