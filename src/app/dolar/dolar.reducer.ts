import { createReducer, on } from '@ngrx/store';
import { setOperaciones, setTiposDolar, unSetTiposDolar, unSetOperaciones, addOperacion, setFiltros, unSetFiltros, setOperacionesByFiltros, unSetOperacionesByFiltros, setCount, setEstadisticasDolar } from './dolar.actions';
import { CompraDolar, CompraDolarFilterDTO, DolarCotizacion, EstadisticaDolar } from '../models/dolar.models';

export interface State {
    dolarList: DolarCotizacion[]; 
    operaciones: CompraDolar[];
    operacionesByFiltros: CompraDolar[];
    filtrosActuales: CompraDolarFilterDTO;
    count: number;
    estadisticas: EstadisticaDolar;
}

export const initialState: State = {
   dolarList: [],
   operaciones: [],
   operacionesByFiltros: [],
   filtrosActuales: null,
   count: 0,
   estadisticas: null,
}

const _dolarReducer = createReducer(initialState,
    
    on(setTiposDolar, (state, { dolarList }) => ({ ...state, dolarList: [...dolarList]})),
    on(unSetTiposDolar, state => ({ ...state, dolarList: [] })),
    on(setOperaciones, (state, { operaciones }) => ({ ...state, operaciones: [...operaciones]})),
    on(unSetOperaciones, state => ({ ...state, operaciones: [] })),
    on(addOperacion, (state, { operacion }) => ({
        ...state,
        operaciones: [ ...state.operaciones, operacion ]})),
    on(setFiltros, (state, { filterDTO }) => ({ ...state, filtrosActuales: filterDTO})),
    on(unSetFiltros, state => ({ ...state, filtrosActuales: null })),
    on(setOperacionesByFiltros, (state, { operacionesFiltradas}) => ({ ...state, operacionesByFiltros: [...operacionesFiltradas]})),
    on(unSetOperacionesByFiltros, state => ({ ...state, operacionesByFiltros: [] })),
    on(setCount, state => ({ 
        ...state, 
        count: state.count + 1})),
    on(setEstadisticasDolar, (state, { estadisticas }) => ({ ...state, estadisticas: estadisticas}))
);

export function dolarReducer(state, action) {
    return _dolarReducer(state, action);
}