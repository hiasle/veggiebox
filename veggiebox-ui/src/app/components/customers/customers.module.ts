import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { FormTextInputComponent } from './components/form-text-input/form-text-input.component';

@NgModule({
  imports: [CommonModule, CustomersRoutingModule],
  declarations: [CustomersComponent],
})
export class CustomersModule {}
