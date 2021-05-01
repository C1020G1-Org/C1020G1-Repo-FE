import { Component } from '@angular/core';

import {TokenStorageService} from "./service/auth/token-storage";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project1';
  token: any;

  constructor(private tokenStorage: TokenStorageService) {

      this.token = this.tokenStorage.getToken();

  }
}
