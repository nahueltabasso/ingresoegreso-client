import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { DolarService } from '../services/dolar.service';
import { CompraDolar, CompraDolarFilterDTO } from '../models/dolar.models';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { LABEL_PAGINADOR } from '../shared/constants';
import Swal from 'sweetalert2';
import * as dolarActions from '../dolar/dolar.actions';
import { MatDialog } from '@angular/material/dialog';
import { AddOperacionComponent } from './add-operacion/add-operacion.component';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatAccordion } from '@angular/material/expansion';
import { EstadisticaDolarComponent } from './estadistica-dolar/estadistica-dolar.component';
import * as ui from '../shared/ui.actions';

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
  displayedColumns: string[] = ['fecha', 'cantidadDolar', 'tipoDolar', 'valorDolarPeso', 'totalPesos', 'dolarAcum', 'observacion', 'tipoOperacion', 'acciones'];
  dataSource: MatTableDataSource<CompraDolar>;
  formulario: FormGroup;
  filterDTO: CompraDolarFilterDTO = new CompraDolarFilterDTO();
  flagSearch: boolean = false;
  loading: boolean = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild(EstadisticaDolarComponent) estadisticaDolar: EstadisticaDolarComponent;

  constructor(private store: Store<AppState>,
              private dolarService: DolarService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    // this.calcularRangosPaginados();
    this.operacionesSubs = this.store.select('dolar').subscribe(data => {
      this.operacionesDivisas = data.operaciones;
      this.iniciarPaginador();
    });
    this.createForm();
    this.formulario.controls['fechaDesdeTxt'].setValue(this.transformDate(new Date()));
    this.formulario.controls['fechaHastaTxt'].setValue(this.transformDate(new Date()));
    this.filterDTO.fechaDesde = new Date();
    this.filterDTO.fechaHasta = new Date();
  }

  ngOnDestroy() {
    this.operacionesSubs.unsubscribe();
  }

  public createForm() {
    this.formulario = this.fb.group({
      tipoOperacion: ['', ],
      tipoDolar: ['', ],
      fechaDesde: ['', ],
      fechaDesdeTxt: [new Date(), ],
      fechaHasta: ['', ],
      fechaHastaTxt: [new Date(), this.lastDateValidator.bind(this)]
    });
  }

  public iniciarPaginador() {
    this.dataSource = new MatTableDataSource<CompraDolar>(this.operacionesDivisas);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = LABEL_PAGINADOR;
  }

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

  public search() {
    if (this.formulario.invalid) return;
    this.store.dispatch(ui.isLoading());
    this.store.dispatch(dolarActions.setFiltros({ filterDTO: this.filterDTO }));
    this.store.dispatch(dolarActions.setCount());
    this.dolarService.search(this.filterDTO).subscribe(data => {
      this.store.dispatch(dolarActions.setOperacionesByFiltros({ operacionesFiltradas: data }));
      this.store.dispatch(ui.stopLoading());
      this.operacionesDivisas = data;
      this.iniciarPaginador();
      if (this.operacionesDivisas.length === 0) {
        Swal.fire('Atencion', 'No se encontraron resultados de acuerdo a los filtros!', 'info');
      }
      this.flagSearch = true;
      this.estadisticaDolar.setFlagSearch(this.flagSearch);
    });
  }

  public cleanFilter() {
    this.filterDTO = new CompraDolarFilterDTO();
    this.formulario.reset();
    this.store.dispatch(dolarActions.unSetFiltros());
    this.store.dispatch(dolarActions.unSetOperacionesByFiltros());
    this.store.dispatch(dolarActions.setCount());
    this.formulario.controls['fechaDesdeTxt'].setValue(this.transformDate(new Date()));
    this.formulario.controls['fechaHastaTxt'].setValue(this.transformDate(new Date()));
    this.filterDTO.fechaDesde = new Date();
    this.filterDTO.fechaHasta = new Date();
    this.flagSearch = false;
    this.estadisticaDolar.setFlagSearch(this.flagSearch);
    this.ngOnInit();
  }

  public selectTipoOperacion(event) {
    this.filterDTO.tipoOperacion = event;
  }

  public selectTipoDolar(event) {
    this.filterDTO.tipoDolar = event;
  }

  public selectFechaDesde(type: string, event: MatDatepickerInputEvent<Date>): void {
    if (type !== 'input') {
      const date = this.transformDate(event.value);
      this.formulario.controls['fechaDesdeTxt'].setValue(date);
      this.filterDTO.fechaDesde = event.value;
    } else {
      const from = this.formulario.get('fechaDesdeTxt').value.split('/');
      const year = Number(from[2]);
      const month = Number(from[1]) - 1; 
      const day = Number(from[0]);
      const date = new Date(year, month, day);
      this.formulario.controls['fechaDesde'].setValue(date);
      this.filterDTO.fechaDesde = date;
    }
  }

  public selectFechaHasta(type: string, event: MatDatepickerInputEvent<Date>): void {
    if (type !== 'input') {
      const date = this.transformDate(event.value);
      this.formulario.controls['fechaHastaTxt'].setValue(date);
      this.filterDTO.fechaHasta = event.value;
    } else {
      const from = this.formulario.get('fechaHastaTxt').value.split('/');
      const year = Number(from[2]);
      const month = Number(from[1]) - 1;
      const day = Number(from[0]);
      const date = new Date(year, month, day);
      this.formulario.controls['fechaHasta'].setValue(date);
      if (date >= this.filterDTO.fechaDesde) {
        this.filterDTO.fechaHasta = date;
      }
    }
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

  public transformDate(date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  lastDateValidator() {
    try {
      const fechaDesde = this.filterDTO.fechaDesde;
      const fechaHasta = this.formulario.get('fechaHastaTxt').value.split('/');
      const year = Number(fechaHasta[2]);
      const month = Number(fechaHasta[1]) - 1;
      const day = Number(fechaHasta[0]);
      const fechaHastaDate = new Date(year, month, day);
      fechaHastaDate.setDate(fechaHastaDate.getDate() + 1);
      if (fechaHastaDate < fechaDesde) {
        return {
          lastDateValidator: true
        }; } else {
          return {};
        }
    } catch (e) {
      return {
        lastDateValidator: false
      };
    }
  }

  myFilterDate = (d: Date): boolean => {
    const date = this.filterDTO.fechaDesde;
    // se puede seleccionar dias desde hoy para adelante
    return d >= date;
  }
}