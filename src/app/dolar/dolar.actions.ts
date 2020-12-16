import { createAction, props } from '@ngrx/store';
import { CompraDolar, CompraDolarFilterDTO, DolarCotizacion } from '../models/dolar.models';

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

export const setFiltros = createAction(
    '[DOLAR_ACTION] Set Filtros',
    props<{ filterDTO: CompraDolarFilterDTO }>()
);

export const unSetFiltros = createAction('[DOLAR_ACTION] Un Set Filtros');

export const setOperacionesByFiltros = createAction(
    '[DOLAR_ACTION] Set Operaciones Filtradas',
    props<{ operacionesFiltradas: CompraDolar[] }>()
);

export const unSetOperacionesByFiltros = createAction('[DOLAR_ACTION] Un Set Operaciones Filtradas');

export const setCount = createAction('[DOLAR_ACTION] Set Count Busquedas');