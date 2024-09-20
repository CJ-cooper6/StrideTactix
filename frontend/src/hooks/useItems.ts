import { ref } from 'vue';
import type { Item } from '../types/item';

export function useItems() {
  const items = ref<Item[]>([]);
  let nextItemId = 1;

  const addItem = (color: string, x: number, y: number, r: number = 15) => {
    items.value.push({
      id: nextItemId++,
      color,
      x,
      y,
      r
    });
  };

  const moveItem = ({ id, x, y }: { id: number, x: number, y: number }) => {
    const itemIndex = items.value.findIndex(p => p.id === id);
    if (itemIndex !== -1) {
      items.value[itemIndex].x = x;
      items.value[itemIndex].y = y;
    }
  };

  const clearItems = () => {
    items.value = [];
  };

  return {
    items,
    addItem,
    moveItem,
    clearItems
  };
}