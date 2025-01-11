import { useCallback } from 'react';
import { GameState } from '../types/game';
import { wrapPosition } from '../utils/geometry';
import { calculateNewVelocity } from '../utils/physics';
import { maintainAsteroidCount } from '../utils/asteroidManager';
import { CANVAS_WIDTH, CANVAS_HEIGHT, SHIP_CONFIG } from '../config/gameConfig';

export const useGameUpdates = () => {
  const updateGameState = useCallback((state: GameState): GameState => {
    const { ship, asteroids, bullets } = state;

    // Update ship position and rotation
    const shipRotation = ship.rotation + 
      (ship.rotatingLeft ? -SHIP_CONFIG.ROTATION_SPEED : 0) +
      (ship.rotatingRight ? SHIP_CONFIG.ROTATION_SPEED : 0);

    let shipVelocity = ship.velocity;
    if (ship.thrusting) {
      const acceleration = {
        x: Math.cos(shipRotation) * SHIP_CONFIG.THRUST_POWER,
        y: Math.sin(shipRotation) * SHIP_CONFIG.THRUST_POWER
      };
      shipVelocity = calculateNewVelocity(ship.velocity, acceleration);
    }

    const shipPosition = wrapPosition({
      x: ship.position.x + shipVelocity.x,
      y: ship.position.y + shipVelocity.y
    }, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Update bullets
    const updatedBullets = bullets
      .map(bullet => ({
        ...bullet,
        position: wrapPosition({
          x: bullet.position.x + bullet.velocity.x,
          y: bullet.position.y + bullet.velocity.y
        }, CANVAS_WIDTH, CANVAS_HEIGHT),
        lifespan: bullet.lifespan - 1
      }))
      .filter(bullet => bullet.lifespan > 0);

    // Update asteroids
    const updatedAsteroids = asteroids.map(asteroid => ({
      ...asteroid,
      position: wrapPosition({
        x: asteroid.position.x + asteroid.velocity.x,
        y: asteroid.position.y + asteroid.velocity.y
      }, CANVAS_WIDTH, CANVAS_HEIGHT),
      rotation: asteroid.rotation + 0.02
    }));

    // Maintain minimum asteroid count
    const maintainedAsteroids = maintainAsteroidCount(updatedAsteroids, shipPosition);

    return {
      ...state,
      ship: {
        ...ship,
        position: shipPosition,
        velocity: shipVelocity,
        rotation: shipRotation,
      },
      bullets: updatedBullets,
      asteroids: maintainedAsteroids
    };
  }, []);

  return { updateGameState };
};