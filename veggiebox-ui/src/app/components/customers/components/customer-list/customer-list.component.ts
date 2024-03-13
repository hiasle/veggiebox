import { Component } from '@angular/core';
import { ClientModel } from '../../../../models/client.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
})
export class CustomerListComponent {
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
