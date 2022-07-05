import {Input, OnChanges, OnDestroy} from "@angular/core";
import { EventEmitter } from "@angular/core";
import { ViewChild } from "@angular/core";
import { Output } from "@angular/core";
import {Component} from "@angular/core";
import {WeatherData} from "../../model/weather-data.interface";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {ScrollingModule} from '@angular/cdk/scrolling';
import {Store} from "@ngrx/store";
import {addCityId} from "../../state/weather.actions";
import {selectCitiesList, selectCityId, selectCurrentLocationId} from "../../state/weather.selectors";
import {Observable, Subscription} from "rxjs";
import { SimpleChanges } from "@angular/core";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.scss']
})

export class CitiesListComponent implements OnChanges, OnDestroy {
  @ViewChild('scrollRef')
  public scrollbarRef!: CdkVirtualScrollViewport;
  public scrolledFromLeft: number;
  public cities: WeatherData[] = [];
  public geoId = '';
  public _citiesList = Subscription.EMPTY;
  public _geoId = Subscription.EMPTY;
  public geoId$: Observable<string>
  constructor(private readonly store$: Store) {
    this.scrolledFromLeft = 0;
    this._citiesList = this.store$.select(selectCitiesList).subscribe(cities => this.cities = cities);
    this.geoId$ = this.store$.select(selectCurrentLocationId)
  }
  ngOnChanges(changes: SimpleChanges) {
    this._citiesList.unsubscribe()
  }
  ngOnDestroy() {
    this._citiesList.unsubscribe();
    this._geoId.unsubscribe()
  }

  public getCurrentCity(city: WeatherData) {
    this.store$.dispatch(addCityId({cityId: city.id}))
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

  public removeCity(id: string | undefined) {
    if(id) {
      localStorage.removeItem(id)
     this.cities = this.cities.filter(item => item.id !== id)
    }
  }
}
