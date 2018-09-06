import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-mission-statement',
  templateUrl: './mission-statement.component.html',
  styleUrls: ['./mission-statement.component.scss']
})
export class MissionStatementComponent implements OnInit {

  constructor(private authService: AuthService,
              private loaderService: LoaderService) { }

  ngOnInit() {
    
  }

  getAuth() {
    this.loaderService.setLoadingMessage("Authorizing Mission");
    this.authService.authorize();
  }

}
