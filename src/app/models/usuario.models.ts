export class UsuarioLoginDTO {
    id: string;
    username: string;
    nombre: string;
    apellido: string;
    email: string;
    accessToken: string;
    type: string;
    roles: string[];
}

export class LoginDTO {
    username: string;
    password: string;
}

export class UsuarioDTO {
    username: string;
    password: string;
    email: string;
    nombre: string;
    apellido: string;
    roles: string[];
    recaptcha: string;
}

