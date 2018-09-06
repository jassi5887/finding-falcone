import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoaderService {
  private flightStatus = false;
  private loadMessage = "loading...";

  inFlight = new Subject<{}>();

  setFlightStatus(status: boolean) {
    this.flightStatus = status;
    this.inFlight.next({status, message: this.loadMessage});
  }

  getFlightStatus() {
    return this.flightStatus;
  }

  setLoadingMessage(message: string) {
    this.loadMessage = message;
  }
}