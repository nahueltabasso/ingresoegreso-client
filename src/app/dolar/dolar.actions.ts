import { createAction, props } from '@ngrx/store';
import { CompraDolar, DolarCotizacion } from '../models/dolar.models';

export const setTiposDolar = createAction(
    '[DOLAR_ACTION] Set Tipos de Dolar',
    props<{ dolarList: DolarCotizacion[] }>()
);

export const unSetTiposDolar = createAction('[DOLAR_ACTION] Un Set Tipos de Dolar');

export const setOperaciones = createAction(
    '[DOLAR_ACTION] Set Operaciones',
    props<{ operaciones: CompraDolar[] }>()
);

export const unSetOperaciones = createAction('[DOLAR_ACTION] Un Set Operaciones');

export const addOperacion = createAction(
    '[DOLAR_ACTION] Add Operacion',
    props<{ operacion: CompraDolar }>()
);
