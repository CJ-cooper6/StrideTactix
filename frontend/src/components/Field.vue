<template>
    <svg
      id="field"
      width="100%" height="100%" viewBox="0 0 1050 680"
     
      preserveAspectRatio="xMidYMid meet"
    >
    
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

      <circle cx="525" cy="340" r="4" fill="white" />

      <g id="players">
      <circle
        v-for="player in players"
        :key="player.id"
        :cx="player.x"
        :cy="player.y"
        :r="playerRadius"
        :fill="player.color"
        @mousedown="startDrag(player.id, $event)"
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

const emit = defineEmits(['movePlayer']);
const startDrag = (id: number, event: MouseEvent) => {
  const svg = (event.currentTarget as SVGElement).closest('svg');
  if (!svg) return;

  const movePlayer = (moveEvent: MouseEvent) => {
    const rect = svg.getBoundingClientRect();
    const x = moveEvent.clientX - rect.left;
    const y = moveEvent.clientY - rect.top;
    emit('movePlayer', { id, x, y });
  };

  const stopDrag = () => {
    document.removeEventListener('mousemove', movePlayer);
    document.removeEventListener('mouseup', stopDrag);
  };

  document.addEventListener('mousemove', movePlayer);
  document.addEventListener('mouseup', stopDrag);
};
const playerRadius = 20;
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
