import { Component } from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {addCoord} from "../../state/weather.actions";

@Component({
  selector: 'app-coord-form',
  templateUrl: './coord-form.component.html',
  styleUrls: ['./coord-form.component.scss']
})

export class CoordFormComponent {
  public title = 'coordination form'
  public coordForm: FormGroup;
  constructor(private readonly fb: FormBuilder,
              private readonly store$: Store) {
    this.coordForm = this.buildForm();
  }
  private buildForm(): FormGroup {
    return this.fb.group({
      lat: ['', [Validators.required]],
      lon: ['',[Validators.required]]
    });
  }
  public findCity() {
    this.store$.dispatch(addCoord({payload: this.coordForm.value}))
    this.coordForm.reset()
  }
}
