import {Coord, WeatherData} from "../model/weather-data.interface";

export interface ICityWeatherState {
  cityId: string;
  coords: Coord | null
  citiesWeather: WeatherData[]
}

export const initialCityWeatherState: ICityWeatherState = {
  cityId: '',
  coords: null,
  citiesWeather: []
}
