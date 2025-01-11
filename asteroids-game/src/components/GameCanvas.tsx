import React, { useRef, useEffect } from 'react';
import { GameState, Point } from '../types/game';

interface GameCanvasProps {
  gameState: GameState;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ gameState }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawShip = (ctx: CanvasRenderingContext2D, ship: GameState['ship']) => {
    ctx.save();
    ctx.translate(ship.position.x, ship.position.y);
    ctx.rotate(ship.rotation);
    
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(20, 0);
    ctx.lineTo(-10, -10);
    ctx.lineTo(-10, 10);
    ctx.closePath();
    ctx.stroke();

    if (ship.thrusting) {
      ctx.beginPath();
      ctx.moveTo(-10, 0);
      ctx.lineTo(-20, 5);
      ctx.lineTo(-20, -5);
      ctx.closePath();
      ctx.stroke();
    }
    
    ctx.restore();
  };

  const drawAsteroid = (ctx: CanvasRenderingContext2D, asteroid: GameState['asteroids'][0]) => {
    ctx.save();
    ctx.translate(asteroid.position.x, asteroid.position.y);
    ctx.rotate(asteroid.rotation);
    
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(asteroid.vertices[0].x, asteroid.vertices[0].y);
    
    for (let i = 1; i < asteroid.vertices.length; i++) {
      ctx.lineTo(asteroid.vertices[i].x, asteroid.vertices[i].y);
    }
    
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  };

  const drawBullet = (ctx: CanvasRenderingContext2D, bullet: GameState['bullets'][0]) => {
    ctx.save();
    ctx.translate(bullet.position.x, bullet.position.y);
    
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(0, 0, 2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  };

  const drawScore = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText(`          SC: ${gameState.score}`, 20, 40);
  };

  const drawGameOver = (ctx: CanvasRenderingContext2D) => {
    if (gameState.gameOver) {
      ctx.fillStyle = 'white';
      ctx.font = '48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', ctx.canvas.width / 2, ctx.canvas.height / 2);
      ctx.font = '24px Arial';
      ctx.fillText('Press SPACE to restart', ctx.canvas.width / 2, ctx.canvas.height / 2 + 50);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw game objects
    drawShip(ctx, gameState.ship);
    gameState.asteroids.forEach(asteroid => drawAsteroid(ctx, asteroid));
    gameState.bullets.forEach(bullet => drawBullet(ctx, bullet));
    drawScore(ctx);
    drawGameOver(ctx);
  }, [gameState]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="border border-white"
    />
  );
};

export default GameCanvas;