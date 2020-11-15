import { createReducer, on } from '@ngrx/store';
import { UsuarioLoginDTO } from '../models/usuario.models';
import { setUser, unSetUser } from './auth.actions';

export interface State {
    user: UsuarioLoginDTO; 
}

export const initialState: State = {
   user: null,
}

const _authReducer = createReducer(initialState,
    on(setUser, (state, { user }) => ({ ...state, user: { ...user }})),
    on(unSetUser, state => ({ ...state, user: null })),
);

export function authReducer(state, action) {
    return _authReducer(state, action);
}