import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  faHouse,
  faAppleWhole,
  faBasketShopping,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { SidebarButtonComponent } from '../sidebar-button/sidebar-button.component';
import { RouterModule } from '@angular/router';
@Component({
    selector: 'app-sidebar',
    imports: [CommonModule, RouterModule, SidebarButtonComponent],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  faHouse = faHouse;
  faApple = faAppleWhole;
  faBasket = faBasketShopping;
  faUsers = faUserGroup;
}
