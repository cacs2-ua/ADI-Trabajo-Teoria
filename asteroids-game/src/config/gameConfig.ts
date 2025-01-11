export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;
export const FPS = 60;

export const SHIP_CONFIG = {
  SIZE: 20,
  ROTATION_SPEED: 0.1,
  THRUST_POWER: 0.2,     // Reduced from 0.7 to 0.4 for slower acceleration
  MAX_SPEED: 6,          // Reduced from 8 to 6 for lower top speed
  FRICTION: 0.985,       // Increased friction from 0.99 to 0.985 for more drag
  MAX_BULLETS: 100,        // Maximum number of bullets allowed
  SHOOT_COOLDOWN: 0,     // Frames to wait before allowing to shoot again
};

export const ASTEROID_CONFIG = {
  MIN_COUNT: 5,
  INITIAL_SIZE: 40,
  MEDIUM_SIZE: 25,
  SMALL_SIZE: 15,
  MIN_SPEED: 1,
  MAX_SPEED: 3,
  SPLIT_SPEED_MULTIPLIER: 1.3,
  POINTS: {
    LARGE: 100,
    MEDIUM: 150,
    SMALL: 200,
  },
};

export const BULLET_CONFIG = {
  SIZE: 2,
  SPEED: 12,
  LIFESPAN: 60,
};