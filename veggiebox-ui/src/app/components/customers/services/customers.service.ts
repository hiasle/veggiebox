import { Injectable, inject } from '@angular/core';
import { CustomerControllerService, CustomerDto } from '@openapi/generated';
import { Observable, lastValueFrom, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private api: CustomerControllerService) {}

  public getCustomerNames(): Observable<Array<CustomerDto>> {
    return this.api.getCustomers();
  }

  public getCustomers(): Observable<Array<CustomerDto>> {
    return this.api.getCustomers();
  }

  public getCustomer(id: number): Observable<CustomerDto> {
    return this.api.getCustomer(id);
  }

  public addCustomer(customer: CustomerDto): Observable<CustomerDto> {
    return this.api.addCustomer(customer);
  }

  public editCustomer(customer: CustomerDto): Observable<CustomerDto> {
    return this.api.editCustomer(customer.id ?? 0, customer);
  }

  public deleteCustomer(customer: CustomerDto): Observable<void> {
    return this.api.deleteCustomer(customer.id ?? 0);
  }
}
