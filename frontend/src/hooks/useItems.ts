import { ref } from 'vue';
import type { Item } from '../types/item';
import { GAME_CONSTANTS } from '../constants';
export function useItems() {
  const items = ref<Item[]>([]);
  const draggingItem = ref<Item | null>(null);
  let nextItemId = 1;

  const addItem = (color: string, x: number, y: number, r: number = GAME_CONSTANTS.DefaultItemRadius) => {
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

  const setDraggingItem = (item: Item | null) => {
    draggingItem.value = item;
  };

  const removeDraggingItem = () => {
    draggingItem.value = null;
  };

  return {
    items,
    setDraggingItem,
    addItem,
    moveItem,
    clearItems,
    draggingItem,
    removeDraggingItem
  };
}