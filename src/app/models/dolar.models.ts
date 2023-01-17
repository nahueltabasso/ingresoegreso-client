import { UsuarioDTO } from './usuario.models';

export class DolarCotizacion {
    compra: string;
    venta: string;
    agencia: string;
    nombre: string;
    variacion: string;
    ventaCero: string;
    decimales: string;
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

export class CompraDolarFilterDTO {
    tipoOperacion: string;
    tipoDolar: string;
    fechaDesde: Date;
    fechaHasta: Date;
}

export class EstadisticaDolar {
    ingresosDolarOficial: number;
    ingresosDolarLibre: number;
    egresosDolar: number;
    countIngresosOficial: number;
    countIngresosLibre: number;
    countEgresos: number;
    totalIngresosDolar: number;
    totalEgresosDolar: number;
    totalOperaciones: number;
}