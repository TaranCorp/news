import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private httpClient: HttpClient) { }

  getForecast() {
    return this.getUserLocation()
      .pipe(
         map(coords => {
          return {
            latitude: coords.latitude,
            longitude: coords.longitude
          };
         })
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
