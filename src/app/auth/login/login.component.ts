import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import  * as ui from 'src/app/shared/ui.actions';
import  * as auth from 'src/app/auth/auth.actions';
import Swal from 'sweetalert2';
import { LoginDTO, UsuarioLoginDTO } from '../../models/usuario.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  formulario: FormGroup;
  loginDTO: LoginDTO = new LoginDTO();
  errorMessage: string;
  roles: string[] = [];
  usuarioLogueado: UsuarioLoginDTO = new UsuarioLoginDTO();
  loading: boolean = false;
  uiSubscripcion: Subscription;
  userSubscription: Subscription;

  constructor(private authService: AuthService, 
              private tokenStorage: TokenStorageService,
              private fb: FormBuilder,
              private router: Router,
              private store: Store<AppState>) {}

  ngOnInit() {
    this.createForm();
    this.uiSubscripcion = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading;
    }); 
    this.userSubscription = this.store.select('user').subscribe(user => {});
  }

  ngOnDestroy() {
     this.uiSubscripcion.unsubscribe();
     this.userSubscription.unsubscribe();
  }

  public createForm() {
    this.formulario = this.fb.group({
      nombreUsuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public login() {
    if (this.formulario.invalid) return;
    const { nombreUsuario, password } = this.formulario.value;
    this.loginDTO.username = nombreUsuario;
    this.loginDTO.password = password;

    this.store.dispatch(ui.isLoading());

    this.authService.login(this.loginDTO).subscribe(data => {
      this.usuarioLogueado = data;
      this.tokenStorage.saveToken(this.usuarioLogueado.accessToken);
      this.tokenStorage.saveUser(this.usuarioLogueado);
      this.roles = this.tokenStorage.getUser().roles;
      
      this.store.dispatch(ui.stopLoading());
      this.store.dispatch(auth.setUser({ user: this.usuarioLogueado }));
      this.router.navigate(['']);
      Swal.fire('Login', `Hola ${this.usuarioLogueado.username}, has iniciado sesión con éxito!`, 'success');
    }, (err) => {
      this.store.dispatch(ui.stopLoading());
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message
      });
    });
  }

  public reloadPage(): void {
    window.location.reload();
  }
}
