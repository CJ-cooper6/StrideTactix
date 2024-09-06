<template>
    <div class="player-icon" draggable="true" :style="{ backgroundColor: color }" @dragstart="handleDragStart"></div>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    required: true
  }
});

const handleDragStart = (event) => {
    event.dataTransfer.setData('text/plain', props.color);
};
</script>

<style scoped>
.player-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: grab;
    margin: 5px;
}
</style>