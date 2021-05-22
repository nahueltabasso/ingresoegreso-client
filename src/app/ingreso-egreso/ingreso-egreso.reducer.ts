import { createReducer, on } from '@ngrx/store';
import { count } from 'rxjs/operators';
import { IngresoEgreso, IngresoEgresoFilterDTO } from '../models/ingresoegreso.models';
import { addItem, setCount, setFiltros, setItems, setItemsByFiltros, unSetFiltros, unSetItems } from './ingreso-egreso.actions';

export interface State {
    items: IngresoEgreso[];
    itemsByFiltros: IngresoEgreso[];
    filtrosActuales: IngresoEgresoFilterDTO;
    count: number; 
}

export const initialState: State = {
   items: [],
   itemsByFiltros: [],
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
);

export function ingresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}