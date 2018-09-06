import { Injectable, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Subject } from "rxjs/Subject";


@Injectable()
export class AuthService {
  is_authorized: boolean = false;
  private token = null;
  authorized = new Subject<boolean>();

  constructor(private dataService: DataService) {
    this.dataService.authorized.subscribe((token) => {
      this.token = token;
      this.authorized.next(this.token ? true : false);
      this.token ? this.is_authorized = true : this.is_authorized = false;
    });
  }

  authorize() {
    const auth = this.dataService.getToken();
  }

  isAuthorized() {
    return this.dataService.isAuthorized();
  }

  getToken() {
    return this.token;
  }

}