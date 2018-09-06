import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Planet } from '../models/planet.model';
import { Vehicle } from '../models/vehicle.model';
import { HttpResponse } from '@angular/common/http';
import { LoaderService } from '../services/loader.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {
  planets: Planet[] = [];
  selectedPlanets: {vehicle: Vehicle, planet: Planet}[] =[];
  maxedOut = false;
  estimatedTime = 0;

  constructor(private dataService: DataService,
              private loaderService: LoaderService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataService.getPlanets().subscribe((planets: Planet[]) => {
      this.planets = planets;
      this.dataService.savePlanets(planets);
    });

    this.dataService.maxPlanetsSelected.subscribe((selectedPlanets) => {
      this.selectedPlanets = selectedPlanets;
      selectedPlanets.length === 4 ? this.maxedOut = true : this.maxedOut = false;
    });

    this.dataService.estimatedTimeChanged.subscribe((time:number) => {
      this.estimatedTime = time;
    });
  }

  onSendTroups() {
    this.loaderService.setLoadingMessage("Finding Falcone");

    this.dataService.sendTroups().subscribe((response:any) => {
      console.log("Result", response);
      if (response.status && response.status === "success") {
        this.dataService.finalResult = {
          status: "success",
          message: "Al Falcone Found",
          planet: response.planet_name
        }
      } else if (response.status && response.status === "false") {
        this.dataService.finalResult = {
          status: "failed",
          message: "You'd better find her if you want to live"
        }
      } else if(!response.status && response.error) {
        this.dataService.finalResult = {
          status: "error",
          message: "King Shan say's you were not authorized!"
        }
      }

      this.router.navigate(['/result'], {relativeTo: this.route});
    }, (error) => {
      this.dataService.finalResult = {
        status: "error",
        message: "King Shan say's you were not authorized!"
      }
      this.router.navigate(['/result'], {relativeTo: this.route});
    }) ;
  }

}
