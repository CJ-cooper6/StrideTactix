<template>
  <ItemComponent
    v-for="item in toolItems"
    :item="item"
    @pointerdown="startDragNewItem(item.color, $event)"
  />
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { GAME_CONSTANTS } from "../constants";
import ItemComponent from "./Item.vue";

// @ts-ignore
const { addItem } = inject("itemOperations");

const toolItems = [
  {color: 'red', x: 40, y: 20, r: GAME_CONSTANTS.DefaultItemRadius},
  {color: 'blue', x: 90, y: 20, r: GAME_CONSTANTS.DefaultItemRadius},
  {color: 'yellow', x: 140, y: 20, r: GAME_CONSTANTS.DefaultItemRadius}
];

const startDragNewItem = (color: string, event: PointerEvent) => {
  const svg = (event.currentTarget as SVGElement).closest('svg');
  if (!svg) return;

  const stopDrag = (moveEvent: PointerEvent) => {
    const point = svg.createSVGPoint();
    point.x = moveEvent.clientX;
    point.y = moveEvent.clientY;
    const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());
    addItem(color, svgPoint.x, svgPoint.y);
    svg.removeEventListener('pointerup', stopDrag);
    svg.removeEventListener('pointercancel', stopDrag);
  };

  svg.setPointerCapture(event.pointerId);
  svg.addEventListener('pointerup', stopDrag);
  svg.addEventListener('pointercancel', stopDrag);
};
</script>
