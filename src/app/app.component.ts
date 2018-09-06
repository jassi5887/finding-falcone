import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoaderService } from './services/loader.service';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuthorized = false;
  showLoader = false;
  loaderMessage = "loading...";

  constructor(private authService: AuthService,
              private loaderService: LoaderService,
              private router: Router,
              private dataService: DataService,
              private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.isAuthorized = this.authService.isAuthorized();

    this.isAuthorized ? this.router.navigate(['/planets']) : '';

    this.authService.authorized.subscribe((auth) => {
      auth ? this.isAuthorized = true : this.isAuthorized = false;
      this.router.navigate(['/planets']);
    });

    this.dataService.reset.subscribe(() => {
      this.isAuthorized = false;
    });

    this.showLoader = this.loaderService.getFlightStatus();
    this.loaderService.inFlight.subscribe((response: {status, message}) => {
      console.log("RESPONSE: ", response);
      this.showLoader = response.status;
      this.loaderMessage = response.message;
      this.ref.detectChanges();
    });
  }

}
