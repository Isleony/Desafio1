<template>
  <Card class="rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
    <template #content>
      <div class="flex flex-col gap-4 p-4">
        <span class="w-fit rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
          {{ product.category.name }}
        </span>
        <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100">
          {{ product.name }}
        </h3>
        <p class="text-2xl font-black text-emerald-600 dark:text-emerald-400">
          R$ {{ product.price.toFixed(2) }}
        </p>
        <Button
          label="Adicionar ao carrinho"
          icon="pi pi-cart-plus"
          class="mt-2"
          severity="contrast"
          @click="$emit('add-to-cart', product)"
        />
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import type { Product } from '../models/Product';

export default defineComponent({
  name: 'ProductCard',

  components: {
    Card,
    Button,
  },

  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },

  emits: ['add-to-cart'],
});
</script>
