import { UsuarioDTO } from "./usuario.models";

export class HistoricoIngresoEgreso {
    id: string;
    montoTotalIngreso: number;
    montoTotalEgreso: number;
    montoTotalIngresoDolar: number;
    montoTotalEgresoDolar: number;
    montoTotalDolarOficial: number;
    montoTotalDolarLibre: number;
    itemsTotalIngreso: number;
    itemsTotalEgreso: number;
    createAt: Date;
    fechaUltimaModificacion: Date;
    usuario: UsuarioDTO;
}