import type { Product } from './Product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export class Cart {
  items: CartItem[] = [];

  addItem(product: Product): void {
    const existing = this.items.find((item) => item.product.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.items.push({ product, quantity: 1 });
    }
  }

  removeUnit(productId: number): void {
    const index = this.items.findIndex((item) => item.product.id === productId);
    if (index === -1) return;
    if (this.items[index].quantity > 1) {
      this.items[index].quantity--;
    } else {
      this.items.splice(index, 1);
    }
  }

  removeItem(productId: number): void {
    const index = this.items.findIndex((item) => item.product.id === productId);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  get totalUnits(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalPrice(): number {
    return this.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }
}
