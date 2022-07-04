import {EventEmitter, Output} from "@angular/core";
import { Component } from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Coord} from "../../model/weather-data.interface";
import {Store} from "@ngrx/store";
import {addCoord} from "../../state/weather.actions";
import {selectCoords} from "../../state/weather.selectors";

@Component({
  selector: 'app-coord-form',
  templateUrl: './coord-form.component.html',
  styleUrls: ['./coord-form.component.scss']
})

export class CoordFormComponent {
  @Output() coordEvent = new EventEmitter<Coord>();
  public coordForm: FormGroup;
  constructor(private readonly fb: FormBuilder,
              private readonly store$: Store) {
    this.coordForm = this.buildForm();
  }
  private buildForm(): FormGroup {
    return this.fb.group({
      latitude: ['', [Validators.required]],
      longitude: ['',[Validators.required]]
    });
  }
  public findCity() {
    this.coordEvent.emit(this.coordForm.value)
    //console.log(this.coordForm.value)
    this.store$.dispatch(addCoord({payload: this.coordForm.value}))
    this.coordForm.reset()
  }
}
