<template>
    <svg
      id="soccer-field"
      width="100%" height="100%" viewBox="0 0 770 500"
      preserveAspectRatio="xMidYMid meet"
    >
      <!-- 球场外框 -->
      <rect x="0" y="0" width="770" height="500" fill="var(--primary-color)" />
      
      <!-- 白线 -->
      <rect x="10" y="10" width="750" height="480" fill="none" stroke="white" stroke-width="2" />
      
      <!-- 中线 -->
      <line x1="385" y1="10" x2="385" y2="490" stroke="white" stroke-width="2" />
      
      <!-- 中圈 -->
      <circle cx="385" cy="250" r="65" fill="none" stroke="white" stroke-width="2" />
      
      <!-- 球门区 -->
      <rect x="10" y="204" width="39" height="92" fill="none" stroke="white" stroke-width="2" />
      <rect x="721" y="204" width="39" height="92" fill="none" stroke="white" stroke-width="2" />
      
      <!-- 罚球区 -->
      <rect x="10" y="131" width="117" height="238" fill="none" stroke="white" stroke-width="2" />
      <rect x="643" y="131" width="117" height="238" fill="none" stroke="white" stroke-width="2" />
      
      <!-- 点球点 -->
      <circle cx="88" cy="250" r="2" fill="white" />
      <circle cx="682" cy="250" r="2" fill="white" />
    </svg>
</template>
<script setup>
import { reactive, ref } from "vue";

const players = ref([
  { number: 0, color: "red" },
  { number: 0, color: "blue" },
  { number: 0, color: "green" },
]);
const tools = reactive({ lines: [], texts: [] });
const selectedTool = ref(null);
const draggingPlayer = ref(null);
const newLine = ref(null);
</script>

<style>
#soccer-field {
  transition: all 0.5s ease;
}
.tactic-board {
  position: relative;
  width: 800px;
  height: 600px;
  border: 1px solid #000;
}
.field {
  position: relative;
  width: 100%;
  height: 100%;
  background: green;
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
