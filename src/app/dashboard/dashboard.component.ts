import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import  * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingresoegreso.models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  itemsSubs: Subscription; 

  constructor(private store: Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService) { }

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
      
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
    this.itemsSubs.unsubscribe();
  }

}
