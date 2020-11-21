import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingresoegreso.models';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { MIN_MONTO, PATTERN_ONLYNUMBER } from '../shared/constants';
import * as ui from '../shared/ui.actions';
import * as ingresoEgresoActions from './ingreso-egreso.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  formulario: FormGroup;
  tipo: string = 'INGRESO';
  ingresoEgreso: IngresoEgreso = new IngresoEgreso();
  loading: boolean = false;
  loadingSubs: Subscription;

  constructor(private ingresoEgresoService: IngresoEgresoService,
              private fb: FormBuilder,
              private store: Store<AppState>) {}

  ngOnInit() {
    this.createForm();
    this.loadingSubs = this.store.select('ui').subscribe(data => {
      this.loading = data.isLoading;
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  public createForm() {
    this.formulario = this.fb.group({
      descripcion: ['', Validators.compose([Validators.required])],
      monto: ['', Validators.compose([Validators.required, Validators.min(MIN_MONTO), Validators.pattern(PATTERN_ONLYNUMBER)])],
    });
  }

  public registrar() {
    if (this.formulario.invalid) return;

    this.store.dispatch(ui.isLoading());

    const { descripcion, monto } = this.formulario.value;
    this.ingresoEgreso.descripcion = descripcion;
    this.ingresoEgreso.monto = monto;
    this.ingresoEgreso.tipo = this.tipo;
    this.ingresoEgresoService.registrarIngresoEgreso(this.ingresoEgreso).subscribe(data=> {
      Swal.fire('Registro creado', 'Registro guardado con exito!', 'success');
      this.store.dispatch(ui.stopLoading());
      this.ingresoEgreso = data;
      this.store.dispatch(ingresoEgresoActions.addItem({ item: this.ingresoEgreso }));
      this.formulario.reset();
    }, (err) => {
      this.store.dispatch(ui.stopLoading());
      console.log(err);
      Swal.fire('Error', err.message, 'error');
    });
  }
}
