import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Mes } from "../models/ingresoegreso.models";

// EXPRESIONES REGULARES 
export const PATTERN_ONLYLETTERS = '^[a-zA-Z\s]*$';
export const PATTERN_ONLYNUMBER = '^[0-9]*$';

// LABEL PAGINADOR
export const LABEL_PAGINADOR = 'Registro por pagina';

// LONGITUDES DE STRING
export const MIN_NOMBRE_APELLIDO = 3;
export const MAX_NOMBRE_APELLIDO = 30;
export const MIN_USERNAME = 6;
export const MIN_PASSWORD = 8;
export const MIN_MONTO = 0;

export const DOLAR_OFICIAL = 'OFICIAL';
export const DOLAR_LIBRE = 'LIBRE';

export const MESES_ANIO: Mes[] = [
    {nroMes: 1,mes: 'ENERO'},
    {nroMes: 2,mes: 'FEBRERO'},
    {nroMes: 3,mes: 'MARZO'},
    {nroMes: 4,mes: 'ABRIL'},
    {nroMes: 5,mes: 'MAYO'},
    {nroMes: 6,mes: 'JUNIO'},
    {nroMes: 7,mes: 'JULIO'},
    {nroMes: 8,mes: 'AGOSTO'},
    {nroMes: 9,mes: 'SEPTIEMBRE'},
    {nroMes: 10,mes: 'OCTUBRE'},
    {nroMes: 11,mes: 'NOVIEMBRE'},
    {nroMes: 12,mes: 'DICIEMBRE'}
];

export const MESES_STRING = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];

export const validEqualsPasswords: ValidatorFn = (
    control: FormGroup
): ValidationErrors | null => {
    const password = control.get("newPass");
    const confirmPassword = control.get("confirmPass");

    return password.value === confirmPassword.value ? null : { notEquals: true }
}