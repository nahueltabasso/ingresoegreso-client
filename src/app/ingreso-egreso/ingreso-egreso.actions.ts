import { createAction, props } from '@ngrx/store';
import { HistoricoIngresoEgreso } from '../models/historicoIngresoEgreso.models';
import { IngresoEgreso, IngresoEgresoFilterDTO } from '../models/ingresoegreso.models';

export const setItems = createAction(
    '[INGRESO_EGRESO] Set Items',
    props<{ items: IngresoEgreso[] }>()
);

export const unSetItems = createAction('[INGRESO_EGRESO] Un Set Items');

export const addItem = createAction(
    '[INGRESO_EGRESO] Add Item',
    props<{ item: IngresoEgreso }>()
);

export const setFiltros = createAction(
    '[INGRESO_EGRESO] Set Filtros',
    props<{ filtrosDTO: IngresoEgresoFilterDTO }>()
);

export const unSetFiltros = createAction('[INGRESO_EGRESO] Un Set Filtros');

export const setItemsByFiltros = createAction(
    '[INGRESO_EGRESO] Set Items Filtrados',
    props<{ itemsFiltrados: IngresoEgreso[] }>()
);

export const unSetItemsByFiltros = createAction('[INGRESO_EGRESO] Un Set Items Filtrados');

export const setCount = createAction('[INGRESO_EGRESO] Set Count Busquedas Items');

export const setHistorico = createAction(
    '[HISTORICO] Set Historico',
    props<{ historicoDTO: HistoricoIngresoEgreso }>()
);