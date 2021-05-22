import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { WebService } from 'src/app/services/web.service';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-consultar-criptomoneda',
  templateUrl: './consultar-criptomoneda.component.html',
  styleUrls: ['./consultar-criptomoneda.component.css']
})
export class ConsultarCriptomonedaComponent implements OnInit {

  formulario: FormGroup;
  cryptomoneda: string;
  moneda: string;
  cryptoList: any[] = [];
  cotizacion: any;
  loading: boolean = false;
  mostrarResultados: boolean = false;

  constructor(private webService: WebService,
              private fb: FormBuilder,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.createForm();
    this.webService.getTiposCryptomoneda().subscribe(data => {
      this.cryptoList = data.Data;
    });
  }

  public createForm() {
    this.formulario = this.fb.group({
      crytomoneda: ['', Validators.required],
      moneda: ['', Validators.required]
    });
  }

  public seleccionarCryptomoneda(event) {
    this.cryptomoneda = event.CoinInfo.Name;
  }

  public seleccionarMoneda(event) {
    this.moneda = event;
  }

  public consultarCotizacionCryptomoneda() {
    if (this.formulario.invalid) return ;
    this.store.dispatch(ui.isLoading());
    this.store.select('ui').subscribe(data => {
      this.loading = data.isLoading;
    });
    this.webService.getCotizacionCrytomoneda(this.cryptomoneda, this.moneda).subscribe(data => {
      this.mostrarResultados = true;
      this.cotizacion = data.DISPLAY[this.cryptomoneda][this.moneda];
      this.store.dispatch(ui.stopLoading());
      this.store.select('ui').subscribe(data => {
        this.loading = data.isLoading;
      });
    });
  }

  public cleanFilter() {
    this.formulario.reset();
    this.mostrarResultados = false;
    this.ngOnInit();
  }
}
