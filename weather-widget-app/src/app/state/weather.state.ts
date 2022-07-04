import {Coord, WeatherData} from "../model/weather-data.interface";

export interface ICityWeatherState {
  cityId: string;
  coord: Coord | null
  citiesWeather: WeatherData[]
}

export const initialCityWeatherState: ICityWeatherState = {
  cityId: '',
  coord: null,
  citiesWeather: []
}
