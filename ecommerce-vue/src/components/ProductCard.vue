<template>
  <div class="product-card">
    <div class="product-badge">{{ product.category.name }}</div>
    <h2 class="product-name">{{ product.name }}</h2>
    <p class="product-price">R$ {{ product.price.toFixed(2) }}</p>
    <button class="btn-add" @click="$emit('add-to-cart', product)">
      + Adicionar ao Carrinho
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Product } from '../models/Product';

export default defineComponent({
  name: 'ProductCard',

  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },

  emits: ['add-to-cart'],
});
</script>

<style scoped>
.product-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.13);
}

.product-badge {
  display: inline-block;
  background: #e8f0fe;
  color: #3b5bdb;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  align-self: flex-start;
}

.product-name {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: #1a1a2e;
}

.product-price {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: #2f9e44;
}

.btn-add {
  margin-top: auto;
  padding: 0.55rem 1rem;
  background: #3b5bdb;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-add:hover {
  background: #2f4ac4;
}
</style>
