import { GAME_CONSTANTS } from './constants';

const minX = GAME_CONSTANTS.DefaultItemRadius;
const maxX = 1150 - GAME_CONSTANTS.DefaultItemRadius;
const minY = 50 + GAME_CONSTANTS.DefaultItemRadius;
const maxY = 830 - GAME_CONSTANTS.DefaultItemRadius;

// 边界检查，球员的移动将被限制在战术板内
export const clampPosition = (x: number, y: number) => {
    return {
      x: Math.max(minX, Math.min(maxX, x)),
      y: Math.max(minY, Math.min(maxY, y))
    };
  };

  // 判断坐标是否在战术板内
  export const isInsideField = (x: number, y: number) => {
    return x >= minX && x <= maxX && y >= minY && y <= maxY;
  };
