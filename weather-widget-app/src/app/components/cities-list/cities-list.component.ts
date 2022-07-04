import { Input } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { ViewChild } from "@angular/core";
import { Output } from "@angular/core";
import {Component} from "@angular/core";
import {WeatherData} from "../../model/weather-data.interface";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {ScrollingModule} from '@angular/cdk/scrolling';
import {Store} from "@ngrx/store";
import {addCityId} from "../../state/weather.actions";
import {selectCityId} from "../../state/weather.selectors";
import {ICityWeatherState} from "../../state/weather.state";

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.scss']
})

export class CitiesListComponent {
  @ViewChild('scrollRef')
  public scrollbarRef!: CdkVirtualScrollViewport;
  public scrolledFromLeft: number;

  @Input() cities!: WeatherData[];
  @Output() cityIdEvent = new EventEmitter<string>();
  constructor(private readonly store$: Store) {
    this.scrolledFromLeft = 0;
    this.store$.select(selectCityId).subscribe(id=>console.log(id))

  }
  public getCurrentCity(city: WeatherData) {
    this.store$.dispatch(addCityId({cityId: city.id}))
    this.cityIdEvent.emit(city.id)
  }
  public onScroll($event: any): void {
    this.scrolledFromLeft = $event.target.scrollLeft;
  }
  public async scrollCities(): Promise<void> {
    await this.scrollbarRef.scrollTo({
      left: this.scrolledFromLeft + 160,
      behavior: 'smooth',
    });
  }

  public async scrollCitiesBack(): Promise<void> {
    await this.scrollbarRef.scrollTo({
      left: this.scrolledFromLeft - 160,
      behavior: 'smooth',
    });
  }
}
