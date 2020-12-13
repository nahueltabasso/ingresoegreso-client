import { createReducer, on } from '@ngrx/store';
import { setOperaciones, setTiposDolar, unSetTiposDolar, unSetOperaciones, addOperacion } from './dolar.actions';
import { CompraDolar, DolarCotizacion } from '../models/dolar.models';

export interface State {
    dolarList: DolarCotizacion[]; 
    operaciones: CompraDolar[];
}

export const initialState: State = {
   dolarList: [],
   operaciones: [],
}

const _dolarReducer = createReducer(initialState,
    
    on(setTiposDolar, (state, { dolarList }) => ({ ...state, dolarList: [...dolarList]})),
    on(unSetTiposDolar, state => ({ ...state, dolarList: [] })),
    on(setOperaciones, (state, { operaciones }) => ({ ...state, operaciones: [...operaciones]})),
    on(unSetOperaciones, state => ({ ...state, operaciones: [] })),
    on(addOperacion, (state, { operacion }) => ({
        ...state,
        operaciones: [ ...state.operaciones, operacion ]}))
);

export function dolarReducer(state, action) {
    return _dolarReducer(state, action);
}