import { UsuarioDTO } from './usuario.models';

export class DolarCotizacion {
    fecha: string;
    compra: string;
    venta: string;
    origen: string;
}

export class CompraDolar {
    id: string;
    cantidadDolarCompra: number;
    valorDolarPeso: number;
    totalPesos: number;
    dolarAcumulado: number;
    observacion: string;
    tipo: string;
    createAt: Date;
    usuario: UsuarioDTO;
    tipoOperacion: string;
}
