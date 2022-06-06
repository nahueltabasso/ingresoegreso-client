import { createReducer, on } from '@ngrx/store';
import { HistoricoIngresoEgreso } from '../models/historicoIngresoEgreso.models';
import { IngresoEgreso, IngresoEgresoFilterDTO } from '../models/ingresoegreso.models';
import { addItem, setCount, setFiltros, setItems, setItemsByFiltros, unSetFiltros, unSetItems, setHistorico } from './ingreso-egreso.actions';

export interface State {
    items: IngresoEgreso[];
    itemsByFiltros: IngresoEgreso[];
    historico: HistoricoIngresoEgreso;
    filtrosActuales: IngresoEgresoFilterDTO;
    count: number; 
}

export const initialState: State = {
   items: [],
   itemsByFiltros: [],
   historico: null,
   filtrosActuales: null,
   count: 0,
}

const _ingresoEgresoReducer = createReducer(initialState,

    on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
    on(unSetItems, state => ({...state, items: [] })),
    on(addItem, (state, { item }) => ({
        ...state, 
        items: [ item, ...state.items ]})),
    on(setFiltros, (state, { filtrosDTO }) => ({ ...state, filtrosActuales: filtrosDTO })), 
    on(unSetFiltros, state => ({ ...state, filtrosActuales: null })),
    on(setItemsByFiltros, (state, { itemsFiltrados }) => ({ ...state, itemsByFiltros: [...itemsFiltrados] })),
    on(unSetFiltros, state => ({ ...state, itemsByFiltros: [] })),
    on(setCount, state => ({
        ...state,
        count: state.count + 1
    })),
    on(setHistorico, (state, { historicoDTO }) => ({ ...state, historico: historicoDTO }))
);

export function ingresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}