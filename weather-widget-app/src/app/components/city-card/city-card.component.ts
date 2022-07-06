import {Component, OnDestroy} from "@angular/core";
import {OnInit} from "@angular/core";
import {FetchWeatherService} from "../../services/fetch-weather.service";
import {Coord, WeatherData} from "../../model/weather-data.interface";
import {Store} from "@ngrx/store";
import {selectCityId, selectCoords, selectCurrentLocationId} from "../../state/weather.selectors";
import {Subscription} from "rxjs";
import {addCurrentLocationId, getCitiesWeather} from "../../state/weather.actions";

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss']
})
export class CityCardComponent implements OnInit, OnDestroy {
  weatherData!: WeatherData;
  coords!: Coord | null;
  date: number;
  citiesArray: (string|null)[] = [];
  _subCoord = Subscription.EMPTY;
  _subCityId = Subscription.EMPTY;
  geoLocationId!: string;
  constructor(private readonly weatherService: FetchWeatherService,
              private readonly store$: Store) {
    this.date = Date.now();
    this.findByCoord();
    this.selectById();
    this.getPosition()
  }
  ngOnInit() {
    this.getPosition()
    this.getCities()
  }
  ngOnDestroy() {
    this._subCoord.unsubscribe();
    this._subCityId.unsubscribe()
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
    // @ts-ignore
    this.citiesArray = values.map(item => JSON.parse(item));
    this.store$.select(selectCurrentLocationId).subscribe(id => {
      this.geoLocationId = id;
      // @ts-ignore
      const citiesList = this.citiesArray.reduce((acc: WeatherData[], element: WeatherData) => {
        if (element.id === id) {
          return [element, ...acc];
        }
        return [...acc, element];
      }, []);
      // @ts-ignore
      this.store$.dispatch(getCitiesWeather({payload: citiesList}))
    })
  }
  public getPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = Math.round(position.coords.latitude);
      const lon = Math.round(position.coords.longitude);
      this.weatherService.getWeatherData(lat, lon).subscribe(data => {
        this.weatherData = data;
        this.geoLocationId = this.weatherData.id;
        this.store$.dispatch(addCurrentLocationId({payload: this.geoLocationId}))
        this.addCity(data);
      })
    });
  }
  public addCity(weatherData: WeatherData) {
    localStorage.setItem(weatherData.id, JSON.stringify(weatherData));
  }
  public findByCoord() {
    this._subCoord = this.store$.select(selectCoords).subscribe(coords => {
      this.coords = coords;
      if(coords?.lat && coords?.lon) {
        this.weatherService.getWeatherData(coords.lat, coords.lon).subscribe(data => {
          this.weatherData = data;
          this.addCity(data);
          this.getCities()
        })
      }
    });
  }
  public selectById() {
    this._subCityId = this.store$.select(selectCityId).subscribe(id => {
      if(id) this.getCurrentCityWeather(id)
    })
  }
}
