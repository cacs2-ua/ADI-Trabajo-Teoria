export interface Point {
  x: number;
  y: number;
}

export interface GameObject {
  position: Point;
  velocity: Point;
  rotation: number;
  size: number;
}

export interface Ship extends GameObject {
  thrusting: boolean;
  rotatingLeft: boolean;
  rotatingRight: boolean;
  canShoot: boolean;
}

export interface Asteroid extends GameObject {
  vertices: Point[];
}

export interface Bullet extends GameObject {
  lifespan: number;
}

export interface GameState {
  ship: Ship;
  asteroids: Asteroid[];
  bullets: Bullet[];
  score: number;
  gameOver: boolean;
}