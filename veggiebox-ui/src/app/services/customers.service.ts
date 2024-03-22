import { Injectable, inject } from '@angular/core';
import { Customer, CustomerControllerService } from '../openapi';
import {Observable, lastValueFrom, map, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private api: CustomerControllerService) {}

  public getCustomerNames(): Observable<Array<Customer>> {
    return this.api.getCustomers();
  }

  public getCustomers(): Observable<Array<Customer>> {
    return this.api.getCustomers();
  }

  public getCustomer(id: number): Observable<Customer> {
    return this.api.getCustomer(id);
  }

  public addCustomer(customer: Customer): Observable<Customer> {
    return this.api.addCustomer(customer);
  }

  public editCustomer(customer: Customer): Observable<Customer> {
    return this.api.editCustomer(customer.id ?? 0, customer);
  }

  public deleteCustomer(customer: Customer): Observable<void> {
    return this.api.deleteCustomer(customer.id ?? 0);
  }
}
