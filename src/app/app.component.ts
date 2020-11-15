import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  isLoggedIn: boolean = false;
  username: string;

  constructor(private tokenStorage: TokenStorageService) {}

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      const usuario = this.tokenStorage.getUser();
      this.username = usuario.username;
    }
  }
}
