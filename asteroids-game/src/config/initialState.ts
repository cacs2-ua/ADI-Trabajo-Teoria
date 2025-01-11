import { GameState } from '../types/game';
import { CANVAS_WIDTH, CANVAS_HEIGHT, SHIP_CONFIG } from './gameConfig';
import { createInitialAsteroids } from '../utils/asteroidManager';

const INITIAL_SHIP_POSITION = {
  x: CANVAS_WIDTH / 2,
  y: CANVAS_HEIGHT / 2,
};

export const INITIAL_GAME_STATE: GameState = {
  ship: {
    position: { ...INITIAL_SHIP_POSITION },
    velocity: { x: 0, y: 0 },
    rotation: 0,
    size: SHIP_CONFIG.SIZE,
    thrusting: false,
    rotatingLeft: false,
    rotatingRight: false,
    canShoot: true,
  },
  asteroids: createInitialAsteroids(INITIAL_SHIP_POSITION),
  bullets: [],
  score: 0,
  gameOver: false,
};