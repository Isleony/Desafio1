import type { Product } from './Product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export class Cart {
  items: CartItem[] = [];

  addItem(product: Product, quantity: number = 1): void {
    if (quantity <= 0) return;

    const alreadyInCart = this.items.some((item) => item.product.id === product.id);

    if (alreadyInCart) {
      const existingItem = this.items.find((item) => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      }
      return;
    }

    this.items.push({ product, quantity });
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

  getTotalItems(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  getFinalPrice(): number {
    return this.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  get totalUnits(): number {
    return this.getTotalItems();
  }

  get totalPrice(): number {
    return this.getFinalPrice();
  }
}
