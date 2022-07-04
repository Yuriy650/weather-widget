import {Component, EventEmitter, OnChanges, OnDestroy, SimpleChanges} from "@angular/core";
import {OnInit} from "@angular/core";
import {FetchWeatherService} from "../../services/fetch-weather.service";
import {Coord, WeatherData} from "../../model/weather-data.interface";
import {Input} from "@angular/core";
import { Output } from "@angular/core";
import {Store} from "@ngrx/store";
import {selectCoords} from "../../state/weather.selectors";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss']
})
export class CityCardComponent implements OnInit, OnDestroy, OnChanges {
  @Input() coordinates: Coord = {lat: null, lon: null}
  @Input() currentId: string = '';
  @Output() citiesEvent = new EventEmitter();
  weatherData!: WeatherData;
  coords!: Coord | null;
  date: number;
  citiesArray: (string|null)[] = [];
  _subCoord = Subscription.EMPTY;
  _subCityId = Subscription.EMPTY;
  constructor(private readonly weatherService: FetchWeatherService,
              private readonly store$: Store) {
    this.getWeather()
    this.date = Date.now();
    /*this._subCoord = this.store$.select(selectCoords).subscribe(coords => {
      //this.coords = coords;
      this.getWeather(coords?.lat, coords?.lon);
    });*/
  }

 ngOnChanges(changes: SimpleChanges): void {
    this.getWeather(changes?.coordinates?.currentValue?.latitude, changes?.coordinates?.currentValue?.longitude, changes?.currentId?.currentValue);
    }
  ngOnInit() {
    this.getWeather();
    this.getPosition()
    this.getCities();
  }
  ngOnDestroy() {
    this._subCoord.unsubscribe()
  }

  public getWeather(latitude: number | null = 0 , longitude: number | null = 0, id = '') {
    if(latitude && longitude) {
      this.weatherService.getWeatherData(latitude, longitude).subscribe(data => {
        this.weatherData = data;
        this.addCity(data);
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
        this.addCity(data);
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
  public addCity(weatherData: WeatherData) {
    //console.log(this.weatherData)
    localStorage.setItem(weatherData.id, JSON.stringify(weatherData));
  }
}
