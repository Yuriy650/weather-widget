import {Component, OnDestroy} from '@angular/core';
import {Coord, WeatherData} from "./model/weather-data.interface";
import {selectCoords} from "./state/weather.selectors";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy {
  title = 'weather-widget-app';
  public coordinates: Coord;
  public currentId: string = '';
  public citiesArray: WeatherData[] = [];
  //private _subCoords = Subscription.EMPTY;

  constructor(private readonly store$: Store) {
    this.coordinates = {lat: null, lon: null}
  }

  ngOnDestroy() {
    //this._subCoords.unsubscribe()
  }

  public getCities(cities: any) {
    console.log(cities)
    // @ts-ignore
    this.citiesArray = cities.map(item => JSON.parse(item))
  }

  public getCurrentCityId(id: string) {
    this.currentId = id
  }

  public getCoordinates(coord: Coord) {
    console.log(coord)
    this.coordinates = coord
  }
}
