import { Input } from "@angular/core";
import { Component } from "@angular/core";
import {WeatherData} from "../../model/weather-data.interface";

@Component({
  selector: 'app-weather-condition',
  templateUrl: './weather-condition.component.html',
  styleUrls: ['./weather-condition.component.scss']
})

export class WeatherConditionComponent {
  @Input() weatherData!: WeatherData
}
