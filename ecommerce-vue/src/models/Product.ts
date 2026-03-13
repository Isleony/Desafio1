import type { Category } from './Category';

export interface ProductProps {
  id: number;
  name: string;
  price: number;
  category: Category;
}

export class Product implements ProductProps {
  id: number;
  name: string;
  price: number;
  category: Category;

  constructor(id: number, name: string, price: number, category: Category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
  }
}
