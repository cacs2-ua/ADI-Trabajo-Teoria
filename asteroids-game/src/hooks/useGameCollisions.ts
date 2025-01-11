import { useCallback } from 'react';
import { GameState, Asteroid } from '../types/game';
import { checkCollision } from '../utils/geometry';
import { splitAsteroid } from '../utils/asteroidManager';
import { ASTEROID_CONFIG } from '../config/gameConfig';

export const useGameCollisions = (setGameState: React.Dispatch<React.SetStateAction<GameState>>) => {
  const checkCollisions = useCallback((state: GameState): GameState => {
    const { ship, asteroids, bullets } = state;
    let newAsteroids = [...asteroids];
    let newBullets = [...bullets];
    let score = state.score;
    let gameOver = state.gameOver;

    // Check ship-asteroid collisions
    if (!gameOver) {
      for (const asteroid of asteroids) {
        if (checkCollision(ship.position, ship.size, asteroid.position, asteroid.size)) {
          gameOver = true;
          break;
        }
      }
    }

    // Check bullet-asteroid collisions
    bullets.forEach((bullet, bulletIndex) => {
      asteroids.forEach((asteroid, asteroidIndex) => {
        if (checkCollision(bullet.position, bullet.size, asteroid.position, asteroid.size)) {
          // Mark bullet for removal
          newBullets[bulletIndex] = { ...bullet, lifespan: 0 };
          
          // Split asteroid or remove it
          if (asteroid.size > ASTEROID_CONFIG.SMALL_SIZE) {
            const splitAsteroids = splitAsteroid(asteroid);
            newAsteroids = [
              ...newAsteroids.slice(0, asteroidIndex),
              ...splitAsteroids,
              ...newAsteroids.slice(asteroidIndex + 1)
            ];
            score += asteroid.size === ASTEROID_CONFIG.INITIAL_SIZE ? 
              ASTEROID_CONFIG.POINTS.LARGE : ASTEROID_CONFIG.POINTS.MEDIUM;
          } else {
            newAsteroids = [
              ...newAsteroids.slice(0, asteroidIndex),
              ...newAsteroids.slice(asteroidIndex + 1)
            ];
            score += ASTEROID_CONFIG.POINTS.SMALL;
          }
        }
      });
    });

    return {
      ...state,
      asteroids: newAsteroids,
      bullets: newBullets,
      score,
      gameOver
    };
  }, []);

  return { checkCollisions };
};