import { Component } from '@angular/core';
import { ForecastService } from '../forecast.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent {
  position;

  constructor(private forecastService: ForecastService) {}

  ngOnInit() {
    this.forecastService.getUserLocation().subscribe(position => {
      this.position = position;
      console.log(position);
    });
  }
}
