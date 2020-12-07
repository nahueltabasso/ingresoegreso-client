import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import  * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';
import { DolarService } from '../services/dolar.service';
import { CompraDolar, DolarCotizacion } from '../models/dolar.models';
import * as dolarActions from '../dolar/dolar.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  itemsSubs: Subscription; 
  operacionesSub: Subscription;
  dolarList: DolarCotizacion[] = [];
  operaciones: CompraDolar[] = [];
  
  constructor(private store: Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService,
              private dolarService: DolarService) { }

  ngOnInit() {
    this.userSubs = this.store.select('user')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(data => {
        this.itemsSubs = this.ingresoEgresoService.getItemsUsuariosLogueado().subscribe(items => {
          this.store.dispatch(ingresoEgresoActions.setItems({ items: items }))
        });
      });

    this.dolarService.getDolarLibre().subscribe(dolarOficial => {
      this.dolarList.push(dolarOficial);
      this.dolarService.getDolarLibre().subscribe(dolarLibre => {
        this.dolarList.push(dolarLibre);
        this.dolarService.getDolarBcoSantander().subscribe(dolarBcoSantander => {
          this.dolarList.push(dolarBcoSantander);
          this.store.dispatch(dolarActions.setTiposDolar({ dolarList : this.dolarList }));
        });
      });
    });  
  
    this.operacionesSub = this.dolarService.listarOperaciones().subscribe(data => {
      console.log(data);
      data.forEach(d => this.operaciones.push(d));
      this.store.dispatch(dolarActions.setOperaciones({ operaciones: this.operaciones }));
    });
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
    this.itemsSubs.unsubscribe();
    this.operacionesSub.unsubscribe();
  }

}
