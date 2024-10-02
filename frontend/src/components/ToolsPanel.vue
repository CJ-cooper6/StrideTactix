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
import { isInsideField } from "../utils";

// @ts-ignore
const { addItem, draggingItem, removeDraggingItem, setDraggingItem} = inject("itemOperations");

const toolItems = [
  {color: 'red', x: 10, y: 20, r: GAME_CONSTANTS.DefaultItemRadius},
  {color: 'blue', x: 60, y: 20, r: GAME_CONSTANTS.DefaultItemRadius},
  {color: 'yellow', x: 110, y: 20, r: GAME_CONSTANTS.DefaultItemRadius}
];



const startDragNewItem = (color: string, event: PointerEvent) => {
  const svg = (event.currentTarget as SVGElement).closest('svg');
  if (!svg) return;

  // 将位置信息转换为 SVG 的坐标系
  const getTransformedPoint = (moveEvent: PointerEvent) => {
    const point = svg.createSVGPoint();
    point.x = moveEvent.clientX;
    point.y = moveEvent.clientY;
    const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());
    return { x: svgPoint.x, y: svgPoint.y };
  };

  const svgPoint = getTransformedPoint(event);
  setDraggingItem({
    color,
    x: svgPoint.x,
    y: svgPoint.y,
    r: GAME_CONSTANTS.DefaultItemRadius
  });

  const stopDrag = (moveEvent: PointerEvent) => {
    const { x, y } = getTransformedPoint(moveEvent);
    if (isInsideField(x,y)) {
      addItem(color, x, y);
    }
    removeDraggingItem();
    svg.removeEventListener('pointerup', stopDrag);
    svg.removeEventListener('pointercancel', stopDrag);
  };

  const moveDrag = (moveEvent: PointerEvent) => {
    if (draggingItem.value) {
      const { x, y } = getTransformedPoint(moveEvent);
      draggingItem.value.x = x;
      draggingItem.value.y = y;
    }
  };

  svg.setPointerCapture(event.pointerId);
  svg.addEventListener('pointermove', moveDrag);
  svg.addEventListener('pointerup', stopDrag);
  svg.addEventListener('pointercancel', stopDrag);
};
</script>
