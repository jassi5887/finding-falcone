import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanetsComponent } from './planets/planets.component';
import { PlanetFlightComponent } from './planet-flight/planet-flight.component';
import { AuthGuard } from './services/auth-guard.service';
import { ResultComponent } from './result/result.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'planets', component: PlanetsComponent, canActivate: [AuthGuard], children: [
        { path: ':planet', component: PlanetFlightComponent }
    ]},
    { path: 'result', component: ResultComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRouting {}