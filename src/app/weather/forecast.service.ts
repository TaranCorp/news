import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor() { }

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
