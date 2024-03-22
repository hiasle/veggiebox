import { CommonModule } from '@angular/common';
import { Component, forwardRef, model } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-form-text-input',
  templateUrl: './form-text-input.component.html',
  styleUrl: './form-text-input.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormTextInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormTextInputComponent),
      multi: true,
    },
  ],
})
export class FormTextInputComponent implements ControlValueAccessor {
  value_: string = '';

  errors: ValidationErrors | null = null;

  constructor() {}

  onChange: any = () => {
    console.log('onChange');
  };
  onTouch: any = () => {
    console.log('onTouch');
  };

  set value(val: string) {
    // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
    this.value_ = val;
    this.onChange(val);
    this.onTouch(val);
  }

  // this method sets the value programmatically
  writeValue(value: string) {
    this.value = value;
  }

  // upon UI element value changes, this method gets triggered
  registerOnChange(fn: string) {
    this.onChange = fn;
  }

  // upon touching the element, this method gets triggered
  registerOnTouched(fn: string) {
    this.onTouch = fn;
  }

  public validate(control: FormControl): ValidationErrors | null {
    this.errors = control.errors;
    console.log(
      `Control status [${control.status}] and value [${control.value}]`
    );
    return control.errors;
  }
}
