import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CityCardComponent} from "./components/city-card/city-card.component";
import {WeatherConditionComponent} from "./components/weather-condition/weather-condition.component";
import {CitiesListComponent} from "./components/cities-list/cities-list.component";
import {OverlayModule} from "@angular/cdk/overlay";
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CoordFormComponent} from "./components/coord-form/coord-form.component";
import {StoreModule} from "@ngrx/store";
import {coordReducer} from "./state/reducers/coords.reducer";
import {cityReducer} from "./state/reducers/city.reducer";

@NgModule({
  declarations: [
    AppComponent,
    CityCardComponent,
    WeatherConditionComponent,
    CitiesListComponent,
    CoordFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    OverlayModule,
    ScrollingModule,
    StoreModule.forRoot({
      city: cityReducer,
      coords: coordReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
