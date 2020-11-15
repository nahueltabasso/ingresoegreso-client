import { UsuarioDTO } from './usuario.models';

export class IngresoEgreso {
    id: string;
    descripcion: string;
    monto: number;
    tipo: string;
    createAt: Date;
    usuario: UsuarioDTO;
}