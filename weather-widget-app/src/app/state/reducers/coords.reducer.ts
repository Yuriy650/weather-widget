import {createReducer, on} from "@ngrx/store";
import {ICityWeatherState, initialCityWeatherState} from "../weather.state";
import {addCoord} from "../weather.actions";

export const coordReducer = createReducer(
  initialCityWeatherState,
  on(addCoord, (state: ICityWeatherState, {payload}): ICityWeatherState => ({
    ...state,
    coords: payload
  }))
)
