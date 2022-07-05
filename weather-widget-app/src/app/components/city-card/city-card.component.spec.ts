import {TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {CityCardComponent} from "./city-card.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FetchWeatherService} from "../../services/fetch-weather.service";
import { EMPTY } from "rxjs";

describe('CityCardComponent', () => {
let component: CityCardComponent;
let service: FetchWeatherService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [
        CityCardComponent
      ],
    }).compileComponents();
  });
  it('should create the city card', () => {
    const fixture = TestBed.createComponent(CityCardComponent);
    const condition = fixture.componentInstance;
    expect(condition).toBeTruthy();
  });
})
