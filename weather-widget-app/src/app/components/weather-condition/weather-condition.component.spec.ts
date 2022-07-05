import {TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {WeatherConditionComponent} from "./weather-condition.component";

describe('WeatherConditionComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        WeatherConditionComponent
      ],
    }).compileComponents();
  });

  it('should create the weather condition', () => {
    const fixture = TestBed.createComponent(WeatherConditionComponent);
    const condition = fixture.componentInstance;
    expect(condition).toBeTruthy();
  });

  it(`should have as title 'Weather condition'`, () => {
    const fixture = TestBed.createComponent(WeatherConditionComponent);
    const condition = fixture.componentInstance;
    expect(condition.title).toContain('condition');
  });
});
