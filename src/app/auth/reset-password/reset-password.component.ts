import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router, UrlTree } from '@angular/router';
import { PasswordDTO } from 'src/app/models/usuario.models';
import { AuthService } from 'src/app/services/auth.service';
import  * as auth from 'src/app/auth/auth.actions';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { validEqualsPasswords } from 'src/app/shared/constants';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  path: UrlTree;
  flagToken: boolean;
  passwordDTO: PasswordDTO = new PasswordDTO(); 
  formulario: FormGroup;
  formularioReset: FormGroup;
  emailUsuario: string;

  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.path = this.router.parseUrl(this.router.url);
    this.passwordDTO.token = this.path.queryParams['token'];
    if (this.passwordDTO.token != '' && this.passwordDTO.token != null && this.passwordDTO.token != undefined) {
      this.flagToken = true;
    } else {
      this.flagToken = false;
    }
    this.createForm();
  }

  public createForm() {
    this.formulario = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
    this.formularioReset = this.fb.group({
      oldPass: ['', Validators.required],
      newPass: ['', Validators.required],
      confirmPass: ['', Validators.required]
    }, {
      validators: validEqualsPasswords
    });
  }

  public solicitarCambioPassword() {
    if (this.formulario.invalid) return;

    const { email } = this.formulario.value;
    this.emailUsuario = email;
    console.log("llega")
    this.store.dispatch(auth.solicitarCambioPassword({ email: this.emailUsuario }));
    this.authService.forgotPassword(this.emailUsuario).subscribe(data => {
      console.log(data);
      if (data.error === null) {
        Swal.fire('Listo!', 'Se te ha enviado un correo a tu casilla con los pasos a seguir!', 'success');
      } else {
        Swal.fire('Error!', 'Ha ocurrido un error!', 'error');
      }
    });
  }

  public resetPassword() {
    if (this.formularioReset.invalid) return;

    const { oldPass, newPass, confirmPass } = this.formularioReset.value;
    this.passwordDTO.oldPassword = oldPass;
    this.passwordDTO.newPassword = newPass;
    this.passwordDTO.confirmNewPassword = confirmPass;
    console.log(this.passwordDTO);
    this.authService.resetPassword(this.passwordDTO).subscribe(data => {
      Swal.fire('Hecho', data.message, 'success');
      this.router.navigate(['/login']);
    }, (err) => {
      Swal.fire('Error', err.error.message, 'error');
    });
  }

  public checkPassword(): boolean {
    return this.formularioReset.hasError('notEquals') &&
           this.formularioReset.get('newPass').dirty &&
           this.formularioReset.get('confirmPass').dirty;
  }

}
