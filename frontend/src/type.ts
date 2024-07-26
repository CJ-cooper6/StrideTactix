export default class Player {
    x: number;
    y: number;
    isDragging: boolean = false;
  
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  
    updatePosition(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  }
  