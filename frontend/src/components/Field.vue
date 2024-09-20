<template>
    <svg
      id="field"
      width="100%" height="100%" viewBox="0 0 1300 900"
     
      preserveAspectRatio="xMidYMid meet"
    >
     <!-- 背景一 -->
     <rect width="1300" height="900" fill="var(--primary-brand-color-lightened-5)" />
     <!-- 背景二 -->
     <rect width="1170" height="800" transform="translate(65, 50)" fill="var(--primary-brand-color-lightened-3)" />
    
     <!-- 球场 -->
     <g transform="translate(125, 120)">
      <!-- 场地元素 -->
      <rect x="0" y="0" width="1050" height="680" fill="var(--primary-brand-color-lightened-3)" />
      <!-- 白线 -->
      <rect x="0" y="0" width="1050" height="680" fill="none" stroke="white" stroke-width="2" />
      <!-- 中线 -->
      <line x1="525" y1="0" x2="525" y2="680" stroke="white" stroke-width="2" />
      <!-- 中圈 -->
      <circle cx="525" cy="340" r="90" fill="none" stroke="white" stroke-width="2" />
      <!-- 球门区 -->
      <rect x="0" y="275" width="55" height="130" fill="none" stroke="white" stroke-width="2" />
      <rect x="995" y="275" width="55" height="130" fill="none" stroke="white" stroke-width="2" />
      <!-- 罚球区 -->
      <rect x="0" y="173" width="162" height="334" fill="none" stroke="white" stroke-width="2" />
      <rect x="888" y="173" width="162" height="334" fill="none" stroke="white" stroke-width="2" />
      <!-- 点球点 -->
      <circle cx="121" cy="340" r="2" fill="white" />
      <circle cx="929" cy="340" r="2" fill="white" />
      <!-- 中圈点 -->
      <circle cx="525" cy="340" r="4" fill="white" />
    </g>

    <!-- 球员 -->
    <g id="players">
      <ItemComponent
      v-for="item in items"
        :key="item.id"
        :item="item"
        @pointerdown="startDrag(item, $event)"
      />
    </g>

    <!-- 操作按钮 -->
    <g id="control-buttons" transform="translate(75, 10)"@click="clear">
      <rect width="100" height="40" rx="5" fill="#2196F3"/>
      <text x="50" y="25" text-anchor="middle" fill="white" dominant-baseline="middle">全部清除</text>
    </g>

    <!-- 工具面板 -->
    <g id="tools-panel" transform="translate(65, 850)">
      <ItemComponent
      v-for="item in toolItems"
        :item="item"
        @pointerdown="startDragNewItem(item.color, $event)"
      />
    </g>
    </svg>
</template>
<script setup lang="ts">
import  { type Item } from "../types/item";
import ItemComponent from "./Item.vue";

const props = defineProps({
  items: {
    type: Array as () => Item[],
    default: () => []
  }
});
const toolItems = [{color: 'red', x: 40, y: 20, r: 15},{color: 'blue', x: 90, y: 20, r: 15},{color: 'green', x: 140, y: 20, r: 15}];

const emit = defineEmits(['move-item', 'add-item', 'clear']);
const startDrag = (item: Item, event: PointerEvent) => {
  const svg = (event.currentTarget as SVGElement).closest('svg');
  if (!svg) return;

  const handlemoveItem = (moveEvent: PointerEvent) => {
    const point = svg.createSVGPoint();
    point.x = moveEvent.clientX;
    point.y = moveEvent.clientY;
    const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());
    if (item.id !== undefined) {
      emit('move-item', { id: item.id, x: svgPoint.x, y: svgPoint.y});
    }
  };

  const stopDrag = () => {
    svg.removeEventListener('pointermove', handlemoveItem);
    svg.removeEventListener('pointerup', stopDrag);
    svg.removeEventListener('pointercancel', stopDrag);
  };
  
  svg.setPointerCapture(event.pointerId);
  svg.addEventListener('pointermove', handlemoveItem);
  svg.addEventListener('pointerup', stopDrag);
  svg.addEventListener('pointercancel', stopDrag);
};

const startDragNewItem = (color: string, event: PointerEvent) => {
  const svg = (event.currentTarget as SVGElement).closest('svg');
  if (!svg) return;

  const stopDrag = (moveEvent: PointerEvent) => {
    const point = svg.createSVGPoint();
    point.x = moveEvent.clientX;
    point.y = moveEvent.clientY;
    const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());
    emit('add-item', color, svgPoint.x, svgPoint.y);
    svg.removeEventListener('pointerup', stopDrag);
    svg.removeEventListener('pointercancel', stopDrag);
  };

  svg.setPointerCapture(event.pointerId);
  svg.addEventListener('pointerup', stopDrag);
  svg.addEventListener('pointercancel', stopDrag);
};

const clear = () => {
  emit('clear');
};
</script>

<style>
#field {
  transition: all 0.5s ease;
  touch-action: none; /* 防止浏览器默认的触摸行为 */
}
</style>
