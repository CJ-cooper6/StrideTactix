<template>
  <div class="board">
    <Field :players="players" @move-player="movePlayer" @add-player="addPlayer" @clear="clearPlayers" class="field" />
  </div>
</template>

<script setup lang="ts">
import Field from "./components/Field.vue";
import { usePlayers } from "./hooks/usePlayers";

const { players, addPlayer, movePlayer, clearPlayers } = usePlayers();
</script>

<style scoped>
.board {
  display: flex;
  flex-direction: column;
  background-color: var(--color-primary-color);
  position: relative;
  margin: auto;

  .field {
    width: 1200px;
    height: 750px;
  }
}


@media (max-width: 768px) {
  .board {
    width: 100%;
    height: auto;
  }

  .board .field {
    max-width: 400px;
    max-height: 500px;
    margin: auto;
  }
}
</style>
