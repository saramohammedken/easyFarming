import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SensorTypeComponent } from '../sensor-type/sensor-type.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SensorReadingComponent } from '../sensor-reading/sensor-reading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SensorTypeComponent,
    SensorReadingComponent,
    RouterModule,
    NgbNavModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  active = 1;

}
