import {TestBed} from "@angular/core/testing";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import { StoreModule } from "@ngrx/store";
import {CoordFormComponent} from "./coord-form.component";

describe('CoordFormComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        StoreModule.forRoot({})
      ],
      declarations: [
        CoordFormComponent
      ],
    }).compileComponents();
  });
  it('should create the coord form', () => {
    const fixture = TestBed.createComponent(CoordFormComponent);
    const condition = fixture.componentInstance;
    expect(condition).toBeTruthy();
  });
  it(`should have as title form`, () => {
    const fixture = TestBed.createComponent(CoordFormComponent);
    const condition = fixture.componentInstance;
    expect(condition.title).toContain('form');
  });
  it('should create form with two controls', () => {
    const fixture = TestBed.createComponent(CoordFormComponent);
    const condition = fixture.componentInstance;
    expect(condition.coordForm.contains('lat')).toBeTruthy()
    expect(condition.coordForm.contains('lon')).toBeTruthy()
  })
  it('should controls required', () => {
    const fixture = TestBed.createComponent(CoordFormComponent);
    const condition = fixture.componentInstance;
    const control = condition.coordForm.get('lat')
    control?.setValue('')
    expect(control?.valid).toBeFalsy()
  })

});
