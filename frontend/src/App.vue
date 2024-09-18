<template>
    <div class="board">
        <div class="top-buttons-panel">
            <button @click="clear">全部清除</button>
        </div>
        <div
            class="board-container-wrapper"
        >
            <div class="board-container" @dragover="onDragOver" @drop="onDrop">
                <Field :players="players" @move-player="movePlayer"/>
            </div>
        </div>
        <div class="tools-panel">
            <Player v-for="color in ['red', 'blue', 'green']" :key="color" :color="color" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Field from './components/Field.vue';
import Player from './components/Player.vue';
import { usePlayers } from './hooks/usePlayers';


const { players, addPlayer, movePlayer, clearPlayers } = usePlayers();

const onDragOver = (event: DragEvent) => {
    event.preventDefault();
};

const onDrop = (event: DragEvent) => {
    event.preventDefault();
    const color = event.dataTransfer?.getData('text/plain') ?? '';
    const svg = document.getElementById('field') as unknown as SVGSVGElement;
    if (!svg) return;

    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());
    
    addPlayer(color, svgPoint.x, svgPoint.y);
};

const clear = () => {
    clearPlayers();
};
</script>

<style scoped>
.board {
    display: flex;
    flex-direction: column;
    background-color: var(--color-primary-color);
    position: relative;
    margin: auto;
}

.board-container-wrapper {
    width: 1050px;
    height: 680px;
    flex-grow: 1;
    background-color: var(--primary-brand-color-lightened-3);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
}

.board-container {
    width: 100%;
    height: 100%;
}

.top-buttons-panel, .tools-panel {
    padding: 10px;
    display: flex;
    flex-direction: row;
}

@media (max-width: 768px) {
    .board {
        width: 100%;
        height: 100vh;
        position: static;
        transform: none;
        top: 0;
        left: 0;
    }

    .board-container-wrapper {
        width: 100%;
        height: calc(100vh - 120px);
    }

    .top-buttons-panel, .tools-panel {
        flex-wrap: wrap;
        justify-content: center;
    }
}
</style>
