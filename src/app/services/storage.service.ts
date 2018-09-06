import { Injectable } from '@angular/core';
import { Planet } from '../models/planet.model';

@Injectable()
export class StorageService {

  storeToken(token: string) {
    localStorage.setItem('falcone-token', token);
  }

  getToken() {
    if( localStorage.getItem('falcone-token') ) {
      return localStorage.getItem('falcone-token');
    } else {
      return null;
    }
  }

  removeToken() {
    localStorage.removeItem('falcone-token');
  }
}