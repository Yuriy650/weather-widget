import { props } from '@ngrx/store';
import { createAction } from '@ngrx/store';
import {Coord, WeatherData} from "../model/weather-data.interface";

export const addCityId = createAction(
  '[Add CityId] Add Id',
  props<{ cityId: string }>()
)

export const addCoord = createAction(
  '[Add Coord] Add Coord',
  props<{ coord: Coord }>()
)

export const getCitiesWeather = createAction(
  'Get Cities Weather',
  props<{ payload: WeatherData[] }>()
)
