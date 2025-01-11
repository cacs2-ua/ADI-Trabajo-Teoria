import { Point } from '../types/game';

export const wrapPosition = (position: Point, canvasWidth: number, canvasHeight: number): Point => {
  return {
    x: ((position.x % canvasWidth) + canvasWidth) % canvasWidth,
    y: ((position.y % canvasHeight) + canvasHeight) % canvasHeight,
  };
};

export const createAsteroidVertices = (size: number): Point[] => {
  const vertices: Point[] = [];
  const numVertices = Math.floor(Math.random() * 4) + 7;
  
  for (let i = 0; i < numVertices; i++) {
    const angle = (i * 2 * Math.PI) / numVertices;
    const variance = Math.random() * (size * 0.4) - (size * 0.2);
    const radius = size + variance;
    
    vertices.push({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    });
  }
  
  return vertices;
};

export const checkCollision = (obj1: Point, size1: number, obj2: Point, size2: number): boolean => {
  const distance = Math.sqrt(
    Math.pow(obj2.x - obj1.x, 2) + Math.pow(obj2.y - obj1.y, 2)
  );
  return distance < (size1 + size2);
};