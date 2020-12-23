import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { UsuarioDTO } from 'src/app/models/usuario.models';
import { AuthService } from 'src/app/services/auth.service';
import { MAX_NOMBRE_APELLIDO, MIN_NOMBRE_APELLIDO, MIN_PASSWORD, MIN_USERNAME, PATTERN_ONLYLETTERS } from 'src/app/shared/constants';
import  * as ui from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  formulario: FormGroup;
  usuario: UsuarioDTO = new UsuarioDTO();
  uiSubscription: Subscription;
  loading: boolean = false;
  flagRecaptcha: boolean = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private store: Store<AppState>,
              private router: Router) {}

  ngOnInit() {
    this.createForm();
    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading;
    }); 
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
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

  public resolved(captchaResponse: string) {
    this.usuario.recaptcha = captchaResponse;
    this.flagRecaptcha = true;
  }

  public registrarNuevoUsuario() {
    if (this.formulario.invalid) return;
    const { nombre, apellido, nombreUsuario, email, password } = this.formulario.value;
    this.usuario.nombre = nombre;
    this.usuario.apellido = apellido;
    this.usuario.username = nombreUsuario;
    this.usuario.email = email;
    this.store.dispatch(ui.isLoading())
    this.authService.register(this.usuario).subscribe(data => {
      this.store.dispatch(ui.stopLoading())
      Swal.fire('Registro', 'Usuario registrado con exito!', 'success');
      this.router.navigate(['/login']);
    }, (err) => {
      this.store.dispatch(ui.stopLoading())
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message
      });
    });
  }
}
