import {Component} from '@angular/core';
import {Coord, WeatherData} from "./model/weather-data.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'weather-widget-app';
  public coordinates: Coord;
  public currentId: string = '';
  public citiesArray: WeatherData[] = []
  constructor() {

    this.coordinates = {lat: null, lon: null}
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
    this.coordinates = coord
  }
}
