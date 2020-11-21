import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { UsuarioLoginDTO } from 'src/app/models/usuario.models';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  usuarioLogueado: UsuarioLoginDTO = new UsuarioLoginDTO();

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.userSubs = this.store.select('user').subscribe(data => {
      this.usuarioLogueado = data.user;
    });
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }

  public logout() {
    this.authService.logout().subscribe(data => {
      this.tokenStorage.signOut();
      window.location.reload();
      this.router.navigate(['/login']);
    });
  }
}
