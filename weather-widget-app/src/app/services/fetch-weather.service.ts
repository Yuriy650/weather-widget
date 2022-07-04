import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {WeatherData} from "../model/weather-data.interface";


@Injectable({providedIn: "root"})

export class FetchWeatherService {

  constructor(private http: HttpClient) {

  }
  getWeatherData(lat: number, lon: number): Observable<WeatherData> {
    return this.http.get<WeatherData>(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`)
  }

}
