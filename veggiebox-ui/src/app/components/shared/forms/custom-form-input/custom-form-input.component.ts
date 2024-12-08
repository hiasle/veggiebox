import { CommonModule } from '@angular/common';
import { Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';

export type InputType = 'text' | 'number' | 'textarea';

@Component({
    selector: 'custom-form-input',
    templateUrl: './custom-form-input.component.html',
    styleUrl: './custom-form-input.component.scss',
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CustomFormInputComponent),
            multi: true,
        },
    ]
})
export class CustomFormInputComponent implements OnInit, ControlValueAccessor {
  @Input()
  showValidationErrorsInstant = false;

  @Input()
  labelText: string = 'TBD';

  @Input()
  inputType: InputType = 'text';

  @Input()
  withLabel: boolean = true;

  formControl!: FormControl;

  constructor(private injector: Injector) {}

  ngOnInit(): void {
    const ngControl = this.injector.get(NgControl);
    if (ngControl instanceof FormControlName) {
      this.formControl = this.injector
        .get(FormGroupDirective)
        .getControl(ngControl);
    } else {
      this.formControl = (ngControl as FormControlDirective)
        .form as FormControl;
    }
  }

  onChange: any = () => {};

  onTouch: any = () => {};

  writeValue(value: any) {
    this.onChange(value);
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
}
