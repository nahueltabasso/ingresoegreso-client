import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingresoegreso.models';

export const setItems = createAction(
    '[INGRESO_EGRESO] Set Items',
    props<{ items: IngresoEgreso[] }>()
);

export const unSetItems = createAction('[INGRESO_EGRESO] Un Set Items');

export const addItem = createAction(
    '[INGRESO_EGRESO] Add Item',
    props<{ item: IngresoEgreso }>()
);