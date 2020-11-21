import { createReducer, on } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingresoegreso.models';
import { addItem, setItems, unSetItems } from './ingreso-egreso.actions';

export interface State {
    items: IngresoEgreso[]; 
}

export const initialState: State = {
   items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,

    on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
    on(unSetItems, state => ({...state, items: [] })),
    on(addItem, (state, { item }) => ({
        ...state, 
        items: [ ...state.items, item]}))
);

export function ingresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}