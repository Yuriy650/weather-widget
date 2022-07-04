import {Component, EventEmitter, OnChanges, SimpleChanges} from "@angular/core";
import {OnInit} from "@angular/core";
import {FetchWeatherService} from "../../services/fetch-weather.service";
import {Coord, WeatherData} from "../../model/weather-data.interface";
import {Input} from "@angular/core";
import { Output } from "@angular/core";

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss']
})
export class CityCardComponent implements OnInit, OnChanges {
  @Input() coordinates: Coord = {lat: null, lon: null}
  @Input() currentId: string = '';
  @Output() citiesEvent = new EventEmitter();
  weatherData!: WeatherData;
  date: number;
  citiesArray: (string|null)[] = [];

  constructor(private readonly weatherService: FetchWeatherService) {
    this.getWeather();

    this.date = Date.now()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getWeather(changes?.coordinates?.currentValue?.latitude, changes?.coordinates?.currentValue?.longitude, changes?.currentId?.currentValue);
    }
  ngOnInit() {
    this.getPosition()
    this.getCities();
  }
  public getWeather(latitude = 0, longitude=0, id = '') {
    if(latitude && longitude) {
      this.weatherService.getWeatherData(latitude, longitude).subscribe(data => {
        this.weatherData = data;
        this.addCity();
        this.getCities()
      })
    } else if (id) {
      this.getCurrentCityWeather(id)
    }
    else {
      this.getPosition()
    }
  }
  public getPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = Math.round(position.coords.latitude);
      const lon = Math.round(position.coords.longitude);
      this.weatherService.getWeatherData(lat, lon).subscribe(data => {
        this.weatherData = data;
        this.addCity();
      })
    });
  }
  public getCurrentCityWeather(id: string) {
    // @ts-ignore
    this.weatherData = JSON.parse(localStorage.getItem(id))
  }
  public getCities() {
    let values = [],
      keys = Object.keys(localStorage),
      i = keys.length;
    while (i--) {
      values.push(localStorage.getItem(keys[i]));
    }
    console.log('cities', values)
    this.citiesArray = values;
    this.citiesEvent.emit(this.citiesArray)
  }
  public addCity() {
    localStorage.setItem(this.weatherData.id, JSON.stringify(this.weatherData));
  }
}
