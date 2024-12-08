import { Component, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/navigation/sidebar/sidebar.component';
import { ApiModule, BASE_PATH } from './openapi';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, SidebarComponent, ApiModule],
    providers: [
        { provide: BASE_PATH, useValue: 'http://localhost:8080' },
        {
            provide: DATE_PIPE_DEFAULT_OPTIONS,
            useValue: { dateFormat: 'dd.MM.yyyy' },
        },
        { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'veggiebox-ui';
}
