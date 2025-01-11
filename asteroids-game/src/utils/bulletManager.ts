import { Bullet, Ship } from '../types/game';
import { BULLET_CONFIG } from '../config/gameConfig';

export const createBullet = (ship: Ship): Bullet => {
  const angle = ship.rotation;
  return {
    position: { ...ship.position },
    velocity: {
      x: Math.cos(angle) * BULLET_CONFIG.SPEED + ship.velocity.x,
      y: Math.sin(angle) * BULLET_CONFIG.SPEED + ship.velocity.y
    },
    rotation: angle,
    size: BULLET_CONFIG.SIZE,
    lifespan: BULLET_CONFIG.LIFESPAN
  };
};