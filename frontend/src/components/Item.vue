<template>
  <circle
    :cx="item.x"
    :cy="item.y"
    :r="item.r"
    :fill="item.color"
  ></circle>
</template>

<script setup lang="ts">
import { type Item } from "../types/item";
const props = defineProps({
  item: {
    type: Object as () => Item,
    required: true,
  },
});
</script>

<style scoped>
circle {
  cursor: pointer;
}
</style>