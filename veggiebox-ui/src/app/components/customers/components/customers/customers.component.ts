import { Component } from '@angular/core';
import { ClientModel } from '../../../../models/client.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent {
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
