import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SensorTypeComponent } from './sensor-type/sensor-type.component';
//import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, },
    { path: 'sensorType', component: SensorTypeComponent },
    //{ path: '**', component: NotFoundComponent }
];
