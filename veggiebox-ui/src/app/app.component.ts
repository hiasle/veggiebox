import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/navigation/sidebar/sidebar.component';
import { ApiModule, BASE_PATH } from './openapi';
import { CustomersService } from './services/customers.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, ApiModule],
  providers: [{ provide: BASE_PATH, useValue: 'http://localhost:8080' }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'veggiebox-ui';

  customersService = inject(CustomersService);

  ngOnInit(): void {
    this.customersService
      .getCustomerNames()
      .subscribe((names) => console.log(names));
  }
}
