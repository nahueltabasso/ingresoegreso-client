import { createReducer, on } from '@ngrx/store';
import { UsuarioLoginDTO } from '../models/usuario.models';
import { setUser, solicitarCambioPassword, unSetUser } from './auth.actions';

export interface State {
    user: UsuarioLoginDTO; 
    email: string;
}

export const initialState: State = {
   user: null,
   email: ''
}

const _authReducer = createReducer(initialState,
    on(setUser, (state, { user }) => ({ ...state, user: { ...user }})),
    on(unSetUser, state => ({ ...state, user: null })),
    on(solicitarCambioPassword, (state, { email }) => ({ ...state, email:  email })),
);

export function authReducer(state, action) {
    return _authReducer(state, action);
}