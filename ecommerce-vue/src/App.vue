<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 via-cyan-50 to-emerald-100 px-4 py-6 text-slate-800 transition-colors dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 dark:text-slate-100 sm:px-8">
    <ConfirmDialog />

    <div class="mx-auto max-w-7xl space-y-6">
      <header class="rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur dark:bg-slate-800/70">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-3xl font-black tracking-tight">Vue Shop Prime</h1>
            <p class="text-sm text-slate-500 dark:text-slate-300">PrimeVue + Tailwind com carrinho reativo</p>
          </div>

          <div class="flex items-center gap-3">
            <Tag severity="info" :value="`Itens: ${cart.getTotalItems()}`" />
            <Button
              :label="isDarkMode ? 'Tema Claro' : 'Tema Escuro'"
              :icon="isDarkMode ? 'pi pi-sun' : 'pi pi-moon'"
              outlined
              @click="toggleDarkMode"
            />
          </div>
        </div>
      </header>

      <main class="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <section class="xl:col-span-2">
          <h2 class="mb-4 text-xl font-extrabold">Produtos</h2>
          <div class="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
            <ProductCard
              v-for="product in products"
              :key="product.id"
              :product="product"
              @add-to-cart="addToCart"
            />
          </div>
        </section>

        <aside>
          <Card class="rounded-2xl shadow-lg">
            <template #title>
              <div class="flex items-center justify-between">
                <span class="text-xl font-black">Carrinho</span>
                <Button
                  label="Limpar"
                  icon="pi pi-trash"
                  size="small"
                  severity="danger"
                  text
                  :disabled="cart.items.length === 0"
                  @click="confirmRemoveAll"
                />
              </div>
            </template>

            <template #content>
              <div class="mb-4 rounded-xl bg-slate-100 p-4 dark:bg-slate-700/40">
                <div class="flex items-center justify-between text-sm">
                  <span>Total de itens</span>
                  <strong>{{ cart.getTotalItems() }}</strong>
                </div>
                <div class="mt-2 flex items-center justify-between text-base font-bold">
                  <span>Total final</span>
                  <span class="text-emerald-600 dark:text-emerald-400">R$ {{ cart.getFinalPrice().toFixed(2) }}</span>
                </div>
              </div>

              <div v-if="cart.items.length === 0">
                <Card class="border border-dashed border-slate-300 dark:border-slate-600">
                  <template #content>
                    <div class="flex flex-col items-center gap-2 p-6 text-center text-slate-500 dark:text-slate-300">
                      <i class="pi pi-shopping-cart text-2xl"></i>
                      <p class="font-semibold">Seu carrinho está vazio</p>
                      <p class="text-sm">Adicione produtos para começar a compra.</p>
                    </div>
                  </template>
                </Card>
              </div>

              <DataView v-else :value="cart.items" data-key="product.id" layout="list">
                <template #list="slotProps">
                  <div class="space-y-3">
                    <div
                      v-for="item in slotProps.items"
                      :key="item.product.id"
                      class="rounded-xl border border-slate-200 p-3 dark:border-slate-700"
                    >
                      <div class="flex items-start justify-between gap-3">
                        <div>
                          <p class="font-bold">{{ item.product.name }}</p>
                          <p class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">{{ item.product.category.name }}</p>
                          <p class="mt-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                            Subtotal: R$ {{ (item.product.price * item.quantity).toFixed(2) }}
                          </p>
                        </div>
                        <Button
                          icon="pi pi-times"
                          rounded
                          text
                          severity="danger"
                          aria-label="Remover item"
                          @click="removeItem(item.product.id)"
                        />
                      </div>

                      <div class="mt-3">
                        <InputNumber
                          :model-value="item.quantity"
                          show-buttons
                          :min="0"
                          :step="1"
                          input-class="w-20 text-center"
                          decrement-button-class="p-button-secondary"
                          increment-button-class="p-button-secondary"
                          @update:model-value="updateItemQuantity(item.product.id, $event)"
                        />
                      </div>
                    </div>
                  </div>
                </template>
              </DataView>
            </template>
          </Card>
        </aside>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductCard from './components/ProductCard.vue';
import type { Product } from './models/Product';
import { Cart } from './models/Cart';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import DataView from 'primevue/dataview';
import InputNumber from 'primevue/inputnumber';
import ConfirmDialog from 'primevue/confirmdialog';

export default defineComponent({
  name: 'App',

  components: {
    ProductCard,
    Card,
    Button,
    Tag,
    DataView,
    InputNumber,
    ConfirmDialog,
  },

  data() {
    return {
      isDarkMode: false,
      cart: new Cart(),
      products: [
        {
          id: 1,
          name: 'Notebook Gamer Pro',
          price: 4999.99,
          category: { id: 1, name: 'Informática' },
        },
        {
          id: 2,
          name: 'Teclado Mecânico RGB',
          price: 349.9,
          category: { id: 1, name: 'Informática' },
        },
        {
          id: 3,
          name: 'Mouse Sem Fio',
          price: 189.9,
          category: { id: 1, name: 'Informática' },
        },
        {
          id: 4,
          name: 'Tênis Running Ultra',
          price: 299.0,
          category: { id: 2, name: 'Esportes' },
        },
        {
          id: 5,
          name: 'Mochila Resistente 30L',
          price: 159.9,
          category: { id: 3, name: 'Acessórios' },
        },
        {
          id: 6,
          name: 'Fone Bluetooth Over-Ear',
          price: 429.0,
          category: { id: 4, name: 'Áudio' },
        },
      ] as Product[],
    };
  },

  methods: {
    addToCart(product: Product): void {
      this.cart.addItem(product);
      this.cart.items = [...this.cart.items];
    },

    removeItem(productId: number): void {
      this.cart.removeItem(productId);
      this.cart.items = [...this.cart.items];
    },

    updateItemQuantity(productId: number, quantity: number | null): void {
      const normalizedQuantity = Math.max(0, Math.trunc(quantity ?? 0));

      if (normalizedQuantity === 0) {
        this.removeItem(productId);
        return;
      }

      const item = this.cart.items.find((cartItem) => cartItem.product.id === productId);
      if (!item) return;

      item.quantity = normalizedQuantity;
      this.cart.items = [...this.cart.items];
    },

    confirmRemoveAll(): void {
      const confirm = this.$confirm;

      confirm.require({
        message: 'Deseja remover todos os itens do carrinho?',
        header: 'Confirmação',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim, limpar',
        rejectLabel: 'Cancelar',
        accept: () => {
          this.cart.items = [];
        },
      });
    },

    toggleDarkMode(): void {
      this.isDarkMode = !this.isDarkMode;

      if (this.isDarkMode) {
        document.documentElement.classList.add('dark');
        return;
      }

      document.documentElement.classList.remove('dark');
    },
  },
});
</script>
