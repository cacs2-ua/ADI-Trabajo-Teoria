import { Asteroid, Point } from '../types/game';
import { ASTEROID_CONFIG, CANVAS_WIDTH, CANVAS_HEIGHT } from '../config/gameConfig';
import { createAsteroidVertices } from './geometry';
import { getRandomEdgePosition, isPositionSafe } from './spawnUtils';

const createAsteroid = (
  size: number, 
  position?: Point,
  speedMultiplier: number = 1
): Asteroid => {
  const asteroidPosition = position ?? {
    x: Math.random() * CANVAS_WIDTH,
    y: Math.random() * CANVAS_HEIGHT,
  };

  const speed = (ASTEROID_CONFIG.MIN_SPEED + Math.random() * 
    (ASTEROID_CONFIG.MAX_SPEED - ASTEROID_CONFIG.MIN_SPEED)) * speedMultiplier;
  const angle = Math.random() * Math.PI * 2;

  return {
    position: asteroidPosition,
    velocity: {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
    },
    rotation: Math.random() * Math.PI * 2,
    size,
    vertices: createAsteroidVertices(size),
  };
};

export const createInitialAsteroids = (shipPosition: Point): Asteroid[] => {
  const asteroids: Asteroid[] = [];
  
  while (asteroids.length < ASTEROID_CONFIG.MIN_COUNT) {
    const position = getRandomEdgePosition();
    if (isPositionSafe(position, shipPosition)) {
      asteroids.push(createAsteroid(ASTEROID_CONFIG.INITIAL_SIZE, position));
    }
  }
  
  return asteroids;
};

export const splitAsteroid = (asteroid: Asteroid): Asteroid[] => {
  const newSize = asteroid.size === ASTEROID_CONFIG.INITIAL_SIZE 
    ? ASTEROID_CONFIG.MEDIUM_SIZE 
    : ASTEROID_CONFIG.SMALL_SIZE;

  if (newSize === ASTEROID_CONFIG.SMALL_SIZE) {
    return [
      createAsteroid(newSize, asteroid.position, ASTEROID_CONFIG.SPLIT_SPEED_MULTIPLIER),
      createAsteroid(newSize, asteroid.position, ASTEROID_CONFIG.SPLIT_SPEED_MULTIPLIER),
    ];
  }

  return [
    createAsteroid(newSize, asteroid.position, ASTEROID_CONFIG.SPLIT_SPEED_MULTIPLIER),
    createAsteroid(newSize, asteroid.position, ASTEROID_CONFIG.SPLIT_SPEED_MULTIPLIER),
    createAsteroid(newSize, asteroid.position, ASTEROID_CONFIG.SPLIT_SPEED_MULTIPLIER),
  ];
};

export const maintainAsteroidCount = (
  currentAsteroids: Asteroid[],
  shipPosition: Point
): Asteroid[] => {
  const newAsteroids = [...currentAsteroids];
  
  while (newAsteroids.length < ASTEROID_CONFIG.MIN_COUNT) {
    const position = getRandomEdgePosition();
    if (isPositionSafe(position, shipPosition)) {
      newAsteroids.push(createAsteroid(ASTEROID_CONFIG.INITIAL_SIZE, position));
    }
  }
  
  return newAsteroids;
};