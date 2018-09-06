import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  message = '';
  status;

  constructor(private dataService: DataService,
              private storageService: StorageService,
              private authService: AuthService,
              private loaderService: LoaderService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if ( this.dataService.finalResult["status"] === "success" ) {
      this.status = "success";
      this.message = `${this.dataService.finalResult["message"]} on ${this.dataService.finalResult["planet"]}`;
    }

    if ( this.dataService.finalResult["status"] === "failed" ) {
      this.status = "failed";
      this.message = `${this.dataService.finalResult["message"]}`;
    }

    if ( this.dataService.finalResult["status"] === "error" ) {
      this.status = "error";
      this.message = `${this.dataService.finalResult["message"]}`;
    }
  }

  reAuthorize() {
    this.storageService.removeToken();
    this.loaderService.setLoadingMessage("Authorizing Mission");
    this.authService.authorize();
  }

  findAgain() {
    this.router.navigate(['/planets'], {relativeTo: this.route});
  }

}
