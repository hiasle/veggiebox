import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomerDto } from '@openapi/generated';
import { v4 as uuidv4 } from 'uuid';
import { CustomersService } from '../../../../services/customers.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { FormsSharedModule } from '@shared/forms';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsSharedModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss',
})
export class CustomerFormComponent {
  form!: FormGroup;

  @Input()
  set customer(customer: CustomerDto) {
    console.log('Customer initialized: ', customer);
    this.create = customer == null;
    this.initializeForm(customer);
  }

  create: boolean = true;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomersService,
    private router: Router,
  ) {}

  public async save(): Promise<void> {
    if (!this.form.valid) {
      this.submitted = true;
      return;
    }

    if (this.create) {
      await lastValueFrom(
        this.customerService.addCustomer({ ...this.form.value }),
      );
    } else {
      await lastValueFrom(
        this.customerService.editCustomer({ ...this.form.value }),
      );
    }
    this.reset();
    this.router.navigate(['kaeufer/list']);
  }

  public reset(): void {
    this.submitted = false;
    this.form.reset();
    this.form.patchValue({
      ...this.form.value,
      uuid: uuidv4(),
    });
  }

  private initializeForm(customer: CustomerDto) {
    this.form = this.fb.group({
      id: new FormControl(customer?.id ?? null),
      uuid: new FormControl(uuidv4()),
      firstname: new FormControl(customer?.firstname ?? null, [
        Validators.required,
      ]),
      lastname: new FormControl(customer?.lastname ?? null, [
        Validators.required,
      ]),
      phone: new FormControl(customer?.phone ?? null),
    });
    console.log('Form initialized with value: ', this.form.value);
    console.log('Form initialized with create: ', this.create);
  }
}
