import { Injectable } from '@angular/core';
import { OrderControllerService, OrderDto } from '@openapi/generated';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private controller: OrderControllerService) {}

  public getOrders() {
    return this.controller.getOrders();
  }

  public async addOrder(order: OrderDto) {
    return await lastValueFrom(this.controller.addOrder(order));
  }
}
