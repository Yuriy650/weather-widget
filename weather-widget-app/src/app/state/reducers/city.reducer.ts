import { createReducer, on } from "@ngrx/store";
import {ICityWeatherState, initialCityWeatherState} from "../weather.state";
import {addCityId} from "../weather.actions";

export const cityReducer = createReducer(
  initialCityWeatherState,
  on(addCityId, (state: ICityWeatherState, {cityId}): ICityWeatherState => ({
    ...state,
    cityId
  })
)
)

