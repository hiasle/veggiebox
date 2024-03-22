import {CommonModule} from '@angular/common';
import {Component, OnDestroy} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {CustomerDto} from '@openapi/generated';
import {v4 as uuidv4} from 'uuid';
import {CustomersService} from '../../../../services/customers.service';
import {FormTextInputComponent} from '../form-text-input/form-text-input.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, filter, lastValueFrom, switchMap, takeUntil} from 'rxjs';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormTextInputComponent],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss',
})
export class CustomerFormComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  customer!: CustomerDto;
  submitted: boolean = false;
  existing: boolean = false;

  form = initializeForm(this.formBuilder, undefined);

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params
      .pipe(
        filter((params) => params['id'] != null),
        switchMap((params) => {
          this.existing = true;
          return this.customerService.getCustomer(params['id']);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((customer) => {
        this.form = initializeForm(this.formBuilder, customer);
      });
  }

  public async save(): Promise<void> {
    if (!this.form.valid) {
      this.submitted = true;
      return;
    }

    if (!this.existing) {
      await lastValueFrom(
        this.customerService.addCustomer({
          uuid: this.form.value.uuid ?? '',
          firstname: this.form.value.firstname ?? '',
          lastname: this.form.value.lastname ?? '',
          phone: this.form.value.phone ?? '',
        })
      );
    } else {
      await lastValueFrom(
        this.customerService.editCustomer({
          ...(this.form.value.id != null && {id: this.form.value.id}),
          uuid: this.form.value.uuid ?? '',
          firstname: this.form.value.firstname ?? '',
          lastname: this.form.value.lastname ?? '',
          phone: this.form.value.phone ?? '',
        })
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

export function initializeForm(
  fb: FormBuilder,
  customer: CustomerDto | undefined
): FormGroup<{
  id: FormControl<number | null>;
  uuid: FormControl<string | null>;
  firstname: FormControl<string | null>;
  lastname: FormControl<string | null>;
  phone: FormControl<string | null>;
}> {
  return fb.group({
    id: customer?.id ?? null,
    uuid: customer?.uuid ?? uuidv4(),
    firstname: [customer?.firstname ?? '', Validators.required],
    lastname: [customer?.lastname ?? '', Validators.required],
    phone: [customer?.phone ?? ''],
  });
}
