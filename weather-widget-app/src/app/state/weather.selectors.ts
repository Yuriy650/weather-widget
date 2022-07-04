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

