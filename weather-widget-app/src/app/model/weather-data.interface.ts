export interface Coord {
  lon: number | null;
  lat: number | null
}
export interface Weather {
  id: number;
  main: string;
  description: string
}
export interface Main {
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number
}
export interface Wind {
  speed: number;
  deg: number
}
export interface Clouds {
  all: number
}
export interface Sys {
  type: number;
  id: number;
  message: number;
  country: string;
  sunrise: number;
  sunset: number
}
export interface WeatherData {
coord: Coord;
weather: Weather[];
base: string;
main: Main;
visibility: number;
wind: Wind;
clouds: Clouds;
dt: number;
sys: Sys;
id: string;
name: string;
cod: number
}
