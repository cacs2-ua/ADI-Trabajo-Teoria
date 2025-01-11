import { Point } from '../types/game';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../config/gameConfig';

const SAFE_DISTANCE = 150; // Minimum safe distance from ship

export const getRandomEdgePosition = (): Point => {
  const side = Math.floor(Math.random() * 4);
  let x, y;
  
  switch (side) {
    case 0: // top
      x = Math.random() * CANVAS_WIDTH;
      y = -SAFE_DISTANCE;
      break;
    case 1: // right
      x = CANVAS_WIDTH + SAFE_DISTANCE;
      y = Math.random() * CANVAS_HEIGHT;
      break;
    case 2: // bottom
      x = Math.random() * CANVAS_WIDTH;
      y = CANVAS_HEIGHT + SAFE_DISTANCE;
      break;
    default: // left
      x = -SAFE_DISTANCE;
      y = Math.random() * CANVAS_HEIGHT;
  }
  
  return { x, y };
};

export const isPositionSafe = (position: Point, shipPosition: Point): boolean => {
  const distance = Math.sqrt(
    Math.pow(position.x - shipPosition.x, 2) + 
    Math.pow(position.y - shipPosition.y, 2)
  );
  return distance >= SAFE_DISTANCE;
};