import { Injectable } from '@angular/core';
import { map, switchMap, Observable, share } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http'

interface SimpleWeather {
  dt_txt: string,
  main: {
    temp: number;
  }
};

export interface FlatSimpleWeather {
  dt_txt: string,
  temp: number;
};

interface OpenWeatherResponse {
  list: Array<SimpleWeather>
};

const FORECAST_UNIT_TYPE = 'metric'; // celsius
const API_KEY = 'd8e843ef0a02ac6576219921b8834d6a';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private httpClient: HttpClient) { }

  getForecast() {
    return this.getUserLocation()
      .pipe(
        map(({ latitude, longitude }) => new HttpParams()
            .set('lat', String(latitude))
            .set('lon', String(longitude))
            .set('units', FORECAST_UNIT_TYPE)
            .set('appid', API_KEY)
        ),
        switchMap(params => {
          return this.httpClient.get<OpenWeatherResponse>(`${FORECAST_URL}`, { params });
        })
      );
  }

  getWeatherForFiveDays(): Observable<Array<FlatSimpleWeather>> {
    return this.getForecast()
      .pipe(
        map(({ list }) => list.filter((weather, index) => index % 8 === 0)),
        map(weathers => weathers.map(weather => { 
          return {
            dt_txt: weather.dt_txt,
            temp: weather.main.temp
          };
        }))
      );
  }
  
  getUserLocation() {
    return new Observable<GeolocationCoordinates>(subscriber => {
      window.navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          subscriber.next(coords);
          subscriber.complete();
        },
        error => subscriber.error(error)
      );
    });
  }
}
