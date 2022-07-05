import { ICityWeatherState } from "./weather.state";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectCityId = createSelector(
  createFeatureSelector('city'),
  (state: ICityWeatherState) => state?.cityId
);
export const selectCoords = createSelector(
  createFeatureSelector('coords'),
  (state: ICityWeatherState) => state?.coords
)
export const selectCitiesList = createSelector(
  createFeatureSelector('list'),
  (state: ICityWeatherState) => state?.citiesWeather
)
export const selectCurrentLocationId = createSelector(
  createFeatureSelector('locationId'),
  (state: ICityWeatherState) => state?.currentLocationId
)

