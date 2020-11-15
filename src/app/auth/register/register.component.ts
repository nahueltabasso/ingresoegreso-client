import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioDTO } from 'src/app/models/usuario.models';
import { AuthService } from 'src/app/services/auth.service';
import { MAX_NOMBRE_APELLIDO, MIN_NOMBRE_APELLIDO, MIN_PASSWORD, MIN_USERNAME, PATTERN_ONLYLETTERS } from 'src/app/shared/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  formulario: FormGroup;
  usuario: UsuarioDTO = new UsuarioDTO();

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.createForm();
  }

  public createForm() {
    this.formulario = this.fb.group({
      nombre: ['', Validators.compose([Validators.required, Validators.pattern(PATTERN_ONLYLETTERS), Validators.min(MIN_NOMBRE_APELLIDO), Validators.max(MAX_NOMBRE_APELLIDO)])],
      apellido: ['', Validators.compose([Validators.required, Validators.pattern(PATTERN_ONLYLETTERS), Validators.min(MIN_NOMBRE_APELLIDO), Validators.max(MAX_NOMBRE_APELLIDO)])],
      nombreUsuario: ['', Validators.required, Validators.min(MIN_USERNAME)],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required, Validators.min(MIN_PASSWORD)]
    });
  }
  
  public inputPassword() {
    this.usuario.password = this.formulario.controls['password'].value;
  }

  public registrarNuevoUsuario() {
    if (this.formulario.invalid) return;
    const { nombre, apellido, nombreUsuario, email, password } = this.formulario.value;
    this.usuario.nombre = nombre;
    this.usuario.apellido = apellido;
    this.usuario.username = nombreUsuario;
    this.usuario.email = email;
    this.authService.register(this.usuario).subscribe(data => {
      console.log(data);
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message
      });
    });
  }
}
