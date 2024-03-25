import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFormInputComponent } from './custom-form-input/custom-form-input.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, CustomFormInputComponent],
  exports: [CustomFormInputComponent],
})
export class FormsSharedModule {}
