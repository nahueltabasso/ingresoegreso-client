import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';
import { LoginDTO, UsuarioLoginDTO } from '../../models/usuario.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  loginDTO: LoginDTO = new LoginDTO();
  errorMessage: string;
  roles: string[] = [];
  usuarioLogueado: UsuarioLoginDTO = new UsuarioLoginDTO();

  constructor(private authService: AuthService, 
              private tokenStorage: TokenStorageService,
              private fb: FormBuilder,
              private router: Router) {}

  ngOnInit() {
    this.createForm();
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

    Swal.fire({
      title: 'Espere por favor',
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    this.authService.login(this.loginDTO).subscribe(data => {
      this.usuarioLogueado = data;
      this.tokenStorage.saveToken(this.usuarioLogueado.accessToken);
      this.tokenStorage.saveUser(this.usuarioLogueado);
      this.roles = this.tokenStorage.getUser().roles;
      Swal.close();
      this.router.navigate(['']);
      Swal.fire('Login', `Hola ${this.usuarioLogueado.username}, has iniciado sesión con éxito!`, 'success');
    }, (err) => {
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
