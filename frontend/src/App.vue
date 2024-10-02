<template>
  <div class="board">
    <Field :items="items" class="field" />
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue';
import Field from "./components/Field.vue";
import { useItems } from "./hooks/useItems";

const { items, addItem, moveItem, clearItems, draggingItem, setDraggingItem, removeDraggingItem } = useItems();
provide('itemOperations', {
  addItem,
  moveItem,
  clearItems,
  items,
  draggingItem,
  setDraggingItem,
  removeDraggingItem
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
  aspect-ratio: 1150 / 900;
}

@media (max-width: 768px) {
  .board {
    padding: 0;
    touch-action: none;
  }
}

@media (max-height: 500px){
  .board {
    width: 50%;
    touch-action: none;
  }
}
</style>
