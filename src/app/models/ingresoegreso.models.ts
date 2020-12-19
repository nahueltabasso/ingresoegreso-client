import { UsuarioDTO } from './usuario.models';

export class IngresoEgreso {
    id: string;
    descripcion: string;
    monto: number;
    tipo: string;
    createAt: Date;
    usuario: UsuarioDTO;
}

export class IngresoEgresoFilterDTO {
    tipo: string;
    anio: number;
    mes: number;
}

export class Mes {
    nroMes: number;
    mes: string;
}