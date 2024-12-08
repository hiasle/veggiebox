import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { BehaviorSubject, map, Subject, takeUntil } from 'rxjs';
import { OrderDto } from '@openapi/generated';

export type UiItem = { toggled: boolean };

export type OrderUiItem = OrderDto & UiItem;

@Component({
    selector: 'app-orders-list',
    templateUrl: './orders-list.component.html',
    styleUrl: './orders-list.component.scss',
    standalone: false
})
export class OrdersListComponent implements OnInit {
  orders$ = new BehaviorSubject<OrderUiItem[]>([]);
  destroy$ = new Subject<void>();

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.ordersService
      .getOrders()
      .pipe(
        map((orders) => {
          return orders.map((order) => {
            return { ...order, toggled: false };
          });
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((orders) => this.orders$.next(orders));
  }
}
