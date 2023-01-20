import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ForecastComponent } from './forecast/forecast.component';



@NgModule({
  declarations: [
    ForecastComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [
    ForecastComponent
  ]
})
export class WeatherModule { }
