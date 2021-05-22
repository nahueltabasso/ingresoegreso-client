import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { CompraDolar, DolarCotizacion } from 'src/app/models/dolar.models';
import { DolarService } from 'src/app/services/dolar.service';
import { DOLAR_LIBRE, DOLAR_OFICIAL, PATTERN_ONLYNUMBER } from 'src/app/shared/constants';
import Swal from 'sweetalert2';
import * as ui from '../../shared/ui.actions';
import * as dolarActions from '../../dolar/dolar.actions';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-operacion',
  templateUrl: './add-operacion.component.html',
  styleUrls: ['./add-operacion.component.css']
})
export class AddOperacionComponent implements OnInit {

  formulario: FormGroup;
  tipo: string = 'INGRESO';
  operacion: CompraDolar = new CompraDolar();
  loading: boolean = false;
  loadingSubs: Subscription;
  dolarCotizacion: DolarCotizacion;
  mostrarValorDolarPeso: boolean = false;

  constructor(private dolarService: DolarService,
              private fb: FormBuilder,
              private store: Store<AppState>,
              public dialogRef: MatDialogRef<AddOperacionComponent>) { }

  ngOnInit(): void {
    this.createForm();
    this.formulario.controls['valorDolarPeso'].disable();
    this.formulario.controls['cantidadDolarCompra'].disable();
    this.formulario.controls['totalPesos'].disable();
    this.formulario.controls['tipoDolar'].disable();
  }

//  ngOnDestroy() {}

  public createForm() {
    this.formulario = this.fb.group({
      cantidadDolarCompra: ['', Validators.compose([Validators.required, Validators.pattern(PATTERN_ONLYNUMBER)])],
      tipoDolar: ['', Validators.required],
      valorDolarPeso: ['', Validators.compose([Validators.required, Validators.pattern(PATTERN_ONLYNUMBER)])],
      totalPesos: ['', Validators.required],
      observacion: ['', Validators.required],
      tipoOperacion: ['', Validators.required]
    })
  }

  public seleccionarTipoOperacion(event) {
    this.operacion.tipoOperacion = event;
    this.formulario.controls['tipoDolar'].enable();
  }

  public seleccionarTipoDolar(event) {
    console.log(event)
    if (event === 'Otro') {
      this.formulario.controls['valorDolarPeso'].enable();
      this.formulario.controls['valorDolarPeso'].setValue(0);
      this.mostrarValorDolarPeso = true;
      this.operacion.tipo = DOLAR_LIBRE;
      return ;
    }

    if (event === 'dolarblue') {
      this.operacion.tipo = DOLAR_LIBRE;
    } else {
      this.operacion.tipo = DOLAR_OFICIAL;
    }

    this.dolarService.getTipoDolar(event).subscribe(data => {
      this.dolarCotizacion = data;
      if (this.operacion.tipoOperacion === 'INGRESO') {
        this.formulario.controls['valorDolarPeso'].setValue(this.dolarCotizacion.venta);
        this.formulario.controls['cantidadDolarCompra'].enable();
        this.operacion.valorDolarPeso = Number(this.dolarCotizacion.venta);
      } else {
        this.formulario.controls['valorDolarPeso'].setValue(this.dolarCotizacion.compra);
        this.formulario.controls['cantidadDolarCompra'].enable();
        this.operacion.valorDolarPeso = Number(this.dolarCotizacion.compra);
      }
      this.mostrarValorDolarPeso = true;
    });
  }

  public onChangeValorDolarPeso() {
    this.operacion.valorDolarPeso = this.formulario.controls['valorDolarPeso'].value;
    this.formulario.controls['cantidadDolarCompra'].enable();
  }

  public onChangeCantidadU$D() {
    this.operacion.cantidadDolarCompra = this.formulario.controls['cantidadDolarCompra'].value;
    this.calcularTotalPesos(this.operacion.cantidadDolarCompra, this.operacion.valorDolarPeso);
  }

  private calcularTotalPesos(cantidad: number, valorDolar: number) {
    this.operacion.totalPesos = cantidad * valorDolar;
    this.formulario.controls['totalPesos'].setValue(this.operacion.totalPesos);
  }

  public onChangeObservacion() {
    this.operacion.observacion = this.formulario.controls['observacion'].value;
  }

  public registrar() {
    if (this.formulario.invalid) return;

    this.store.dispatch(ui.isLoading());
    this.dolarService.registrarOperacion(this.operacion).subscribe(data=> {
      Swal.fire('Registro creado', 'Registro guardado con exito!', 'success');
      this.store.dispatch(ui.stopLoading());
      this.operacion = data;
      this.store.dispatch(dolarActions.addOperacion({ operacion: this.operacion }));
      this.formulario.reset();
      this.dialogRef.close();
    }, (err) => {
      this.store.dispatch(ui.stopLoading());
      Swal.fire('Error', err.message, 'error');
    });
  }

  public close() {
    this.dialogRef.close();
  }
}
