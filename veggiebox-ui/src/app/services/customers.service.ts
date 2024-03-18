import { Injectable, inject } from '@angular/core';
import { Customer, CustomerControllerService } from '../openapi';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private api: CustomerControllerService) {}

  public getCustomerNames(): Observable<Array<string>> {
    return this.api.getCustomerNames();
  }

  public getCustomers(): Observable<Array<Customer>> {
    return this.api.getCustomers();
  }
}
