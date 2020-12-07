// REDUCER GLOBAL DE LA APLICACION
import { ActionReducerMap } from '@ngrx/store';
import * as ui  from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as ingresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';
import * as dolar from './dolar/dolar.reducer';

export interface AppState {
   ui: ui.State,
   user: auth.State,
   ingresoEgresos: ingresoEgreso.State,
   dolar: dolar.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   user: auth.authReducer,
   ingresoEgresos: ingresoEgreso.ingresoEgresoReducer,
   dolar: dolar.dolarReducer
}