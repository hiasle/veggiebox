import { Component } from '@angular/core';
import { ClientModel } from '../../../../models/client.model';
import { CommonModule } from '@angular/common';
import { CustomersService } from '../../../../services/customers.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
})
export class CustomerListComponent {
  constructor(public customerService: CustomersService) {}

  customers$ = this.customerService
    .getCustomers()
    .pipe(tap((customers) => console.log(customers)));

  customers: Array<ClientModel> = [
    {
      firstname: 'Max',
      lastname: 'Mustermann',
    },
    {
      firstname: 'Maria',
      lastname: 'Musterfrau',
    },
    {
      firstname: 'Carlo',
      lastname: 'Chamäleon',
    },
    {
      firstname: 'Donald',
      lastname: 'Duck',
    },
    {
      firstname: 'Mickey',
      lastname: 'Mouse',
    },
  ];
}
