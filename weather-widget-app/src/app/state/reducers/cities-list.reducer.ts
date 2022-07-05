import {createReducer, on} from "@ngrx/store";
import {ICityWeatherState, initialCityWeatherState} from "../weather.state";
import {addCoord, getCitiesWeather} from "../weather.actions";

export const citiesListReducer = createReducer(
  initialCityWeatherState,
  on(getCitiesWeather, (state: ICityWeatherState, {payload}): ICityWeatherState => ({
    ...state,
    citiesWeather: payload
  }))
)
