import {createReducer, on} from "@ngrx/store";
import {ICityWeatherState, initialCityWeatherState} from "../weather.state";
import {addCityId, addCurrentLocationId} from "../weather.actions";

export const locationIdReducer = createReducer(
  initialCityWeatherState,
  on(addCurrentLocationId, (state: ICityWeatherState, {payload}): ICityWeatherState => ({
      ...state,
      currentLocationId: payload
    })
  )
)
