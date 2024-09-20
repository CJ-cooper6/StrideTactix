<template>
  <div class="board">
    <Field :items="items" class="field" />
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue';
import Field from "./components/Field.vue";
import { useItems } from "./hooks/useItems";

const { items, addItem, moveItem, clearItems } = useItems();
provide('itemOperations', {
  addItem,
  moveItem,
  clearItems,
  items
});
</script>

<style scoped>
.board {
  display: flex;
  flex-direction: column;
  background-color: var(--color-primary-color);
  position: relative;
  margin: auto;
  width: 100%;
  max-width: 1200px;
}

.field {
  width: 100%;
  height: auto;
  aspect-ratio: 1200 / 750;
}

@media (max-width: 768px) {
  .board {
    padding: 5px;
  }
}
</style>
