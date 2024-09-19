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
      <circle
        v-for="player in players"
        :key="player.id"
        :cx="player.x"
        :cy="player.y"
        :r="20"
        :fill="player.color"
        @mousedown="startDrag(player.id, $event)"
      />
    </g>
  

    <!-- 操作按钮 -->
    <g id="control-buttons" transform="translate(75, 10)"@click="clear">
      <rect width="100" height="40" rx="5" fill="#2196F3"/>
      <text x="50" y="25" text-anchor="middle" fill="white" dominant-baseline="middle">全部清除</text>
    </g>

    <!-- 工具面板 -->
    <g id="tools-panel" transform="translate(65, 850)">
      <circle
        v-for="(color, index) in ['red', 'blue', 'green']"
        :key="color"
        :cx="40 + index * 50"
        :cy="20"
        r="15"
        :fill="color"
        @mousedown="startDragNewPlayer('red', $event)"
      />
    </g>
    
    </svg>
</template>
<script setup lang="ts">
import  { type Player } from "../types/player";

const props = defineProps({
  players: {
    type: Array as () => Player[],
    default: () => []
  }
});

const emit = defineEmits(['move-player', 'add-player', 'clear']);
const startDrag = (id: number, event: MouseEvent) => {
  console.log("startDrag");
  const svg = (event.currentTarget as SVGElement).closest('svg');
  if (!svg) return;

  const movePlayer = (moveEvent: MouseEvent) => {
    const point = svg.createSVGPoint();
    point.x = moveEvent.clientX;
    point.y = moveEvent.clientY;
    const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());
    emit('move-player', { id, x: svgPoint.x, y: svgPoint.y});
  };

  const stopDrag = () => {
    document.removeEventListener('mousemove', movePlayer);
    document.removeEventListener('mouseup', stopDrag);
  };
  
  //开始拖动时，添加 mousemove 和 mouseup 事件的监听器，以便在鼠标移动时更新球员的位置，并在鼠标松开时停止拖动。
  document.addEventListener('mousemove', movePlayer);
  document.addEventListener('mouseup', stopDrag);
};

const startDragNewPlayer = (color: string, event: MouseEvent) => {
  const svg = (event.currentTarget as SVGElement).closest('svg');
  if (!svg) return;

  const stopDrag = (moveEvent: MouseEvent) => {
    const point = svg.createSVGPoint();
    point.x = moveEvent.clientX;
    point.y = moveEvent.clientY;
    const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());
    emit('add-player', color, svgPoint.x,  svgPoint.y);
    document.removeEventListener('mouseup', stopDrag);
  };
  document.addEventListener('mouseup', stopDrag);
};

const clear = () => {
  emit('clear');
};
</script>

<style>
#field {
  transition: all 0.5s ease;
}
.player {
  position: absolute;
  cursor: pointer;
}
.lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.bottom-tools {
  display: flex;
  width: 840px;
  height: auto;
}
</style>
