<template>
    <div class="board">
        <div class="top-buttons-panel">
            <button>Start</button>
            <button>Stop</button>
        </div>
        <div class="board-container-wrapper">
            <div class="board-container">
                <Field />
            </div>
        </div>
        <div class="tools-panel">
            <button>tool1</button>
            <button>tool2</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import Field from './components/Field.vue'
</script>

<style scoped>
.board {
    display: flex;
    flex-direction: column;
    background-color: var(--color-primary-color);
    position: absolute;
    top: 50%;
    left: 50%;
    flex-direction: column;
    justify-content: center;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.board-container-wrapper {
    width: 770px;
    height: 500px;
    flex-grow: 1;
    background-color: var(--primary-brand-color-lightened-3); /* 背景色 */
    display: flex;
    align-items: center;
    justify-content: center;
}

.board-container {
    width: 90%;
    height: 90%;
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
        height: calc(100vh - 120px); /* 减去顶部和底部面板的高度 */
    }

    .top-buttons-panel, .tools-panel {
        flex-wrap: wrap;
        justify-content: center;
    }
}
</style>
