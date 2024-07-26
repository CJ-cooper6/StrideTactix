<template>
  <div ref="container">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="600" height="400">
      <!-- 绘制足球场边界 -->
      <rect x="50" y="50" width="500" height="300" fill="#4CAF50" stroke="black" stroke-width="2" />

      <!-- 绘制中圈 -->
      <circle cx="300" cy="200" r="50" fill="none" stroke="black" stroke-width="2" />

      <!-- 绘制球门 -->
      <rect x="50" y="125" width="30" height="150" fill="none" stroke="black" stroke-width="2" />
      <rect x="520" y="125" width="30" height="150" fill="none" stroke="black" stroke-width="2" />

      <!-- 绘制中线 -->
      <line x1="300" y1="50" x2="300" y2="350" stroke="black" stroke-width="2" />

      <!-- 绘制罚球点 -->
      <!-- <circle cx="300" cy="95" r="5" fill="black" />
      <circle cx="300" cy="305" r="5" fill="black" /> -->
      <!-- 渲染球员 -->
      <circle v-for="(player, index) in players" :key="index" :cx="player.x" :cy="player.y" r="10" fill="red" />
    </svg>

    <button @click="addPlayer">添加球员</button>
    <button @click="toggleFullscreen">进入全屏</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { useFullscreen } from '@vueuse/core';
import Player from '../type';

const { isFullscreen, toggle } = useFullscreen();
const players = ref<Player[]>([]);
const container = ref<HTMLElement | null>(null);


const addPlayer = () => {
  const newPlayer = new Player(Math.random() * 500 + 50, Math.random() * 300 + 50);
  players.value.push(newPlayer);
};

const toggleFullscreen = () => {
  toggle();
};
</script>

<style scoped>
</style>