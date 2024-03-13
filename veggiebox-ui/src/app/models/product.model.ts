export interface ProductModel {
  id?: number;
  uuid?: string;
  name: string;
  description?: string;
  unit: 'kilogramm' | 'liter' | 'flasche' | 'kiste';
  price: number;
}
