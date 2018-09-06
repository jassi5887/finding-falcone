import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MissionStatementComponent } from './mission-statement/mission-statement.component';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { StorageService } from './services/storage.service';
import { LoaderService } from './services/loader.service';
import { LoaderInterceptor } from './services/loader.interceptor';
import { LoaderComponent } from './loader/loader.component';
import { PlanetsComponent } from './planets/planets.component';
import { PlanetFlightComponent } from './planet-flight/planet-flight.component';
import { AppRouting } from './app-routing.module';
import { AuthGuard } from './services/auth-guard.service';
import { ResultComponent } from './result/result.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MissionStatementComponent,
    LoaderComponent,
    PlanetsComponent,
    PlanetFlightComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouting
  ],
  providers: [
    AuthService, 
    DataService, 
    StorageService, 
    LoaderService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
