import {ICityWeatherState, initialCityWeatherState} from "./weather.state";
import {createSelector, MemoizedSelector} from "@ngrx/store";


export const selectId = (state: ICityWeatherState) =>
  state?.cityId;


export const selectCityId: MemoizedSelector<object, string> = createSelector(
  // @ts-ignore
  initialCityWeatherState,
  selectId
);
/*
export const selectCityId = createSelector(
  (state: ICityWeatherState) => state.cityId,
)
*/
