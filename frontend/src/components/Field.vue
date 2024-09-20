<template>
    <svg
      id="field"
      width="100%" height="100%" viewBox="0 0 1300 900"
     
      preserveAspectRatio="xMidYMid meet"
    >
    <!-- 背景一 -->
    <rect width="1280" height="880" fill="none" />
     <!-- 背景二 -->
     <rect width="1150" height="780" transform="translate(65, 50)" fill="var(--primary-brand-color-lightened-2)" />
    
     <!-- 球场 -->
     <g transform="translate(115, 100)">
      <!-- 场地元素 -->
      <rect x="0" y="0" width="1050" height="680" fill="var(--primary-color)" />
      <!-- 草坪纹理 -->
      <path d="M0 0 H87.5 V680 H0 V0
        M175 0 H262.5 V680 H175 V0
        M350 0 H437.5 V680 H350 V0
        M525 0 H612.5 V680 H525 V0
        M700 0 H787.5 V680 H700 V0
        M875 0 H962.5 V680 H875 V0
        M1050 0 H1050 V680 H1050 V0" 
        fill="#72A653" stroke="none" stroke-linecap="square" />
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
    <g id="control-buttons" transform="translate(65, 10)"@click="clear">
      <rect width="100" height="40" rx="5" fill="#2196F3"/>
      <text x="50" y="25" text-anchor="middle" fill="white" dominant-baseline="middle" class="no-select">全部清除</text>
    </g>
    
    <!-- 工具面板 -->
    <g id="tools-panel" transform="translate(75, 830)">
    <ToolsPanel />
  </g>
    </svg>
</template>
<script setup lang="ts">
import { inject } from 'vue';
import ItemComponent from "./Item.vue";
import ToolsPanel from "./ToolsPanel.vue";
import type { Item } from '@/types/item';

// @ts-ignore
const { items, moveItem, clearItems } = inject('itemOperations');

const startDrag = (item: Item, event: PointerEvent) => {
  const svg = (event.currentTarget as SVGElement).closest('svg');
  if (!svg) return;

  const handleMoveItem = (moveEvent: PointerEvent) => {
    const point = svg.createSVGPoint();
    point.x = moveEvent.clientX;
    point.y = moveEvent.clientY;
    const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());
    if (item.id !== undefined) {
      moveItem({ id: item.id, x: svgPoint.x, y: svgPoint.y });
    }
  };

  const stopDrag = () => {
    svg.removeEventListener('pointermove', handleMoveItem);
    svg.removeEventListener('pointerup', stopDrag);
    svg.removeEventListener('pointercancel', stopDrag);
  };
  
  svg.setPointerCapture(event.pointerId);
  svg.addEventListener('pointermove', handleMoveItem);
  svg.addEventListener('pointerup', stopDrag);
  svg.addEventListener('pointercancel', stopDrag);
};

const clear = () => {
  clearItems();
};
</script>

<style>
#field {
  transition: all 0.5s ease;
  touch-action: none; /* 防止浏览器默认的触摸行为 */

  .no-select {
    user-select: none;
  }
}
</style>
