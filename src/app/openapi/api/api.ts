export * from './customer-controller.service';
import { CustomerControllerService } from './customer-controller.service';
export * from './order-controller.service';
import { OrderControllerService } from './order-controller.service';
export * from './product-controller.service';
import { ProductControllerService } from './product-controller.service';
export const APIS = [CustomerControllerService, OrderControllerService, ProductControllerService];
