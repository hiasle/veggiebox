import { Injectable, inject } from '@angular/core';
import { CustomerControllerService } from '../openapi';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private api: CustomerControllerService) {}

  public getCustomerNames(): Observable<Array<string>> {
    return this.api.getCustomerNames();
  }
}
