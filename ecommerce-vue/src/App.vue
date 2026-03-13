<template>
  <div id="app">
    <!-- ── Header ── -->
    <header class="app-header">
      <h1>🛒 Vue Shop</h1>
      <div class="cart-badge">
        Carrinho
        <span class="badge">{{ cart.totalUnits }}</span>
      </div>
    </header>

    <main class="app-main">
      <!-- ── Product Grid ── -->
      <section class="products-section">
        <h2 class="section-title">Produtos</h2>
        <div class="products-grid">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            @add-to-cart="addToCart"
          />
        </div>
      </section>

      <!-- ── Cart Summary ── -->
      <aside class="cart-section">
        <h2 class="section-title">Resumo do Carrinho</h2>

        <div class="cart-totals">
          <div class="total-row">
            <span>Total de itens:</span>
            <strong>{{ cart.totalUnits }}</strong>
          </div>
          <div class="total-row">
            <span>Preço Final:</span>
            <strong class="price-final">R$ {{ cart.totalPrice.toFixed(2) }}</strong>
          </div>
        </div>

        <!-- Cart items table -->
        <div v-if="cart.items.length > 0" class="cart-items">
          <h3>Itens no carrinho</h3>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Qtd</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cart.items" :key="item.product.id">
                <td>{{ item.product.name }}</td>
                <td class="qty-cell">
                  <button class="btn-qty" @click="removeUnit(item.product.id)">−</button>
                  {{ item.quantity }}
                  <button class="btn-qty" @click="addToCart(item.product)">+</button>
                </td>
                <td>R$ {{ (item.product.price * item.quantity).toFixed(2) }}</td>
                <td>
                  <button class="btn-remove" @click="removeItem(item.product.id)" title="Remover item">
                    🗑
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p v-else class="empty-cart">Seu carrinho está vazio.</p>
      </aside>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductCard from './components/ProductCard.vue';
import type { Product } from './models/Product';
import { Cart } from './models/Cart';

export default defineComponent({
  name: 'App',

  components: { ProductCard },

  data() {
    return {
      cart: new Cart(),
      products: [
        {
          id: 1,
          name: 'Notebook Gamer Pro',
          price: 4999.99,
          category: { id: 1, title: 'Informática' },
        },
        {
          id: 2,
          name: 'Teclado Mecânico RGB',
          price: 349.9,
          category: { id: 1, title: 'Informática' },
        },
        {
          id: 3,
          name: 'Mouse Sem Fio',
          price: 189.9,
          category: { id: 1, title: 'Informática' },
        },
        {
          id: 4,
          name: 'Tênis Running Ultra',
          price: 299.0,
          category: { id: 2, title: 'Esportes' },
        },
        {
          id: 5,
          name: 'Mochila Resistente 30L',
          price: 159.9,
          category: { id: 3, title: 'Acessórios' },
        },
        {
          id: 6,
          name: 'Fone Bluetooth Over-Ear',
          price: 429.0,
          category: { id: 4, title: 'Áudio' },
        },
      ] as Product[],
    };
  },

  methods: {
    addToCart(product: Product): void {
      this.cart.addItem(product);
      // Spread to trigger Vue reactivity on the array reference
      this.cart.items = [...this.cart.items];
    },

    removeUnit(productId: number): void {
      this.cart.removeUnit(productId);
      this.cart.items = [...this.cart.items];
    },

    removeItem(productId: number): void {
      this.cart.removeItem(productId);
      this.cart.items = [...this.cart.items];
    },
  },
});
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #ececec;
  color: #333;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ── Header ── */
.app-header {
  background: #1a1a2e;
  color: #fff;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
}

.app-header h1 {
  font-size: 1.4rem;
  letter-spacing: 0.02em;
}

.cart-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.95rem;
}

.badge {
  background: #3b5bdb;
  color: #fff;
  border-radius: 999px;
  padding: 0.15rem 0.6rem;
  font-size: 0.85rem;
  min-width: 1.6rem;
  text-align: center;
}

/* ── Layout ── */
.app-main {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 2rem;
  padding: 2rem;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
}

@media (max-width: 900px) {
  .app-main {
    grid-template-columns: 1fr;
  }
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  color: #1a1a2e;
}

/* ── Products ── */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.25rem;
}

/* ── Cart Sidebar ── */
.cart-section {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 14px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  align-self: start;
  position: sticky;
  top: 80px;
}

.cart-totals {
  background: #f8f9ff;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.total-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
}

.price-final {
  color: #2f9e44;
  font-size: 1.05rem;
}

/* ── Cart Table ── */
.cart-items h3 {
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
  color: #555;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

th {
  text-align: left;
  padding: 0.4rem 0.5rem;
  border-bottom: 2px solid #e0e0e0;
  color: #666;
  font-weight: 600;
}

td {
  padding: 0.5rem 0.5rem;
  border-bottom: 1px solid #f0f0f0;
  vertical-align: middle;
}

.qty-cell {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.btn-qty {
  background: #e8f0fe;
  color: #3b5bdb;
  border: none;
  border-radius: 6px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-qty:hover {
  background: #c5d3f8;
}

.btn-remove {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  opacity: 0.6;
  transition: opacity 0.15s;
}

.btn-remove:hover {
  opacity: 1;
}

.empty-cart {
  text-align: center;
  color: #aaa;
  font-size: 0.9rem;
  padding: 1rem 0;
}
</style>
