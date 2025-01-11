import { Point } from '../types/game';
import { SHIP_CONFIG } from '../config/gameConfig';

export const calculateNewVelocity = (
  currentVelocity: Point,
  acceleration: Point,
  friction: number = SHIP_CONFIG.FRICTION
): Point => {
  const newVelocity = {
    x: (currentVelocity.x + acceleration.x) * friction,
    y: (currentVelocity.y + acceleration.y) * friction,
  };

  const speed = Math.sqrt(newVelocity.x ** 2 + newVelocity.y ** 2);
  if (speed > SHIP_CONFIG.MAX_SPEED) {
    const ratio = SHIP_CONFIG.MAX_SPEED / speed;
    return {
      x: newVelocity.x * ratio,
      y: newVelocity.y * ratio,
    };
  }

  return newVelocity;
};