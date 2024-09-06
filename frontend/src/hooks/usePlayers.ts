import { ref } from 'vue';
import type { Player } from '../types/player';

export function usePlayers() {
  const players = ref<Player[]>([]);
  let nextPlayerId = 1;

  const addPlayer = (color: string, x: number, y: number) => {
    players.value.push({
      id: nextPlayerId++,
      color,
      x,
      y
    });
  };

  const movePlayer = ({ id, x, y }: { id: number, x: number, y: number }) => {
    const playerIndex = players.value.findIndex(p => p.id === id);
    if (playerIndex !== -1) {
      players.value[playerIndex].x = x;
      players.value[playerIndex].y = y;
    }
  };

  const clearPlayers = () => {
    players.value = [];
  };

  return {
    players,
    addPlayer,
    movePlayer,
    clearPlayers
  };
}