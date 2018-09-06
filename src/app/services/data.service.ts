import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Subject } from 'rxjs/Subject';
import { LoaderService } from './loader.service';
import { Planet } from '../models/planet.model';
import { Vehicle } from '../models/vehicle.model';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class DataService {
  private token:string;
  authorized = new Subject<string>();

  private tokenApi = "https://findfalcone.herokuapp.com/token";
  private planetsApi = "https://findfalcone.herokuapp.com/planets";
  private vehiclesApi = "https://findfalcone.herokuapp.com/vehicles";
  private sendTroupesApi = "https://findfalcone.herokuapp.com/find";

  private options = {
    headers: new HttpHeaders({
      "Accept": "application/json",
      "Content-Type": "application/json"
    })
  };

  planets: Planet[] = [];

  vehicles: Vehicle[] = [];
  selectedVehicles: {vehicle: Vehicle, planet: Planet }[];
  maxPlanetsSelected = new Subject<{vehicle: Vehicle, planet: Planet }[]>();
  estimatedTimeChanged = new Subject<number>();
  reset = new Subject<boolean>();
  finalResult = {};

  constructor(private http: HttpClient,
              private storageService: StorageService,
              private loaderService: LoaderService,
              private router: Router,
              private route: ActivatedRoute) {}

  getToken() {
    let token = this.storageService.getToken();
    if (!token) {
      this.http.post(this.tokenApi, {} ,this.options).subscribe((tk: HttpResponse<any>) => {
        token = tk['token'];
        this.token = token;
        this.storageService.storeToken(token);
        this.authorized.next(this.token);
      });
    } else {
      this.token = token;
      this.authorized.next(this.token);
    }
  }

  isAuthorized() {
    const token = localStorage.getItem('falcone-token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  getPlanets() {
    this.loaderService.setLoadingMessage("Retreiving Planets");
    return this.http.get(this.planetsApi, this.options);
  }

  savePlanets(planets: Planet[]) {
    this.planets = planets;
  }

  getVehicles() {
    this.loaderService.setLoadingMessage("Retreiving Vehicles");
    return this.http.get(this.vehiclesApi, this.options);
  }

  loadPlanets() {
    return this.planets.slice();
  }

  saveVehicles(vehicles: Vehicle[]) {
    this.vehicles = vehicles;
  }

  loadVehicles() {
    return this.vehicles.slice();
  }

  addSelectedVehicle(data:{vehicle: Vehicle, planet: Planet }[]) {
    this.selectedVehicles = data;
  }

  onMaxPlanetsSelected() {
    this.maxPlanetsSelected.next(this.selectedVehicles);
  }

  onEstimatedTimeChanged(time: number) {
    this.estimatedTimeChanged.next(time);
  }

  sendTroups() {
    const selectedPlanets = [];
    const selectedVehicles = [];
    
    this.selectedVehicles.forEach((sV) => {
      selectedPlanets.push(sV.planet.name);
      selectedVehicles.push(sV.vehicle.name);
    });

    const payload = {
      "token": this.storageService.getToken(),
      "planet_names": selectedPlanets,
      "vehicle_names": selectedVehicles
    };

    return this.http.post(this.sendTroupesApi, payload, this.options);
  }

  onReset() {
    this.storageService.removeToken();
    this.vehicles = [];
    this.selectedVehicles = [];
    this.finalResult = {};
    this.reset.next(true);
    this.router.navigate(['/'], {relativeTo: this.route});
  }
}