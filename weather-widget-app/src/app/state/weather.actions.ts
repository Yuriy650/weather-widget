import { props } from '@ngrx/store';
import { createAction } from '@ngrx/store';
import {Coord, WeatherData} from "../model/weather-data.interface";

export const addCityId = createAction(
  '[Add CityId] Add Id',
  props<{ cityId: string }>()
)
export const addCurrentLocationId = createAction(
  '[Add Location Id] Add Location Id',
  props<{ payload: string }>()
)
export const addCoord = createAction(
  '[Add Coord] Add Coord',
  props<{ payload: Coord }>()
)
export const getCitiesWeather = createAction(
  'Get Cities Weather',
  props<{ payload: WeatherData[] }>()
)
