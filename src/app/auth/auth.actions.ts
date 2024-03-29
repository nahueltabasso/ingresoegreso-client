import { createAction, props } from '@ngrx/store';
import { UsuarioLoginDTO } from '../models/usuario.models';

export const setUser = createAction(
    '[AUTH Component] setUser',
    props<{ user: UsuarioLoginDTO }>()
);

export const unSetUser = createAction(
    '[AUTH Component] unSetUser'
);

export const solicitarCambioPassword = createAction(
    '[AUTH Component] Solicitar Cambio de Password',
    props<{ email: string }>()
);