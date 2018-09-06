import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../services/data.service';
import { Vehicle } from '../models/vehicle.model';
import { Planet } from '../models/planet.model';

@Component({
  selector: 'app-planet-flight',
  templateUrl: './planet-flight.component.html',
  styleUrls: ['./planet-flight.component.scss']
})
export class PlanetFlightComponent implements OnInit {
  selectedPlanet: Planet;
  allVehicles:Vehicle[] = [];
  allPlanets: Planet[] = [];

  selectedVehicles: {vehicle: Vehicle, planet: Planet}[] = [];
  selectedForThisPlanet: Vehicle;
  maxedOut = false;
  estimatedTime = 0;

  constructor(private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit() {
    this.allPlanets = this.dataService.loadPlanets();
    
    this.dataService.getVehicles().subscribe((vehicles: Vehicle[]) => {
      this.allVehicles = [...vehicles];
    });

    this.route.params.subscribe((params: Params) => {
      this.selectedPlanet = this.allPlanets.find(pl => pl.name === params['planet']);
      const thisVehicle = [...this.selectedVehicles].find( vh => vh.planet.name === this.selectedPlanet.name);
      thisVehicle ? this.selectedForThisPlanet = {...thisVehicle.vehicle}
                  : this.selectedForThisPlanet = null;
      console.log("Selected for this", this.selectedForThisPlanet);
    });

    this.dataService.maxPlanetsSelected.subscribe((selectedPlanets) => {
      selectedPlanets.length === 0 ? this.maxedOut = true : this.maxedOut = false;
    });
  
  }

  onSelectVehicle(event, vehicle:Vehicle, planet: Planet) {
    event.preventDefault();
    console.log("incoming", vehicle, planet);
    const incomingVehicle = [...this.allVehicles].find(vh => vh.name === vehicle.name);
    console.log("Check", !this.selectedVehicles.find(v => v.planet.name=== this.selectedPlanet.name), event.target.checked);

    if ( (this.selectedVehicles.length < 4 || !event.target.checked) && 
          this.selectedPlanet.distance <= vehicle.max_distance) {
      if (!this.selectedVehicles.find(v => v.planet.name=== this.selectedPlanet.name) &&
          event.target.checked ) {
        incomingVehicle.total_no -= 1;
        this.selectedVehicles.push({vehicle: incomingVehicle, planet});
        this.calculateEstmatedTime(this.selectedPlanet.distance, incomingVehicle.speed, true);
      } else if (this.selectedVehicles.find(v => v.planet.name=== this.selectedPlanet.name) &&
          event.target.checked) {
          event.target.checked = false;
      } else if (this.selectedVehicles.find(v => v.planet.name=== this.selectedPlanet.name) &&
          !event.target.checked) {
        incomingVehicle.total_no += 1;
        const incoming = this.selectedVehicles.find(v => v.planet.name=== this.selectedPlanet.name);
        const deleted = this.selectedVehicles.splice(this.selectedVehicles.indexOf(incoming), 1);
        this.selectedForThisPlanet = null;
        this.calculateEstmatedTime(this.selectedPlanet.distance, incomingVehicle.speed, false);
      }

      const thisVehicle = this.selectedVehicles.find( vh => vh.planet.name === this.selectedPlanet.name);
      thisVehicle ? this.selectedForThisPlanet = {...thisVehicle.vehicle}
                  : this.selectedForThisPlanet = null;
    } else {
      event.target.checked = false;
    }

    this.dataService.addSelectedVehicle(this.selectedVehicles);
    this.dataService.onMaxPlanetsSelected();

  }

  calculateEstmatedTime(distance: number, speed: number, add:boolean) {
    const thisTime = distance / speed;
    if (add) {
      this.estimatedTime += thisTime;
    } else {
      this.estimatedTime -= thisTime;
    }

    this.dataService.onEstimatedTimeChanged(this.estimatedTime);
  }
}
