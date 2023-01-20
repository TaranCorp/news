import { Component } from '@angular/core';
import { FlatSimpleWeather, ForecastService } from '../forecast.service';
import { delay, Observable } from 'rxjs';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent {
  weather$: Observable<Array<FlatSimpleWeather>>;

  constructor(private forecastService: ForecastService) {}

  ngOnInit() {
    this.weather$ = this.forecastService.getWeatherForFiveDays();
  }
}
