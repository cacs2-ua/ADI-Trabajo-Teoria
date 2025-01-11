import { useCallback } from 'react';
import { GameState } from '../types/game';
import { SHIP_CONFIG } from '../config/gameConfig';
import { createBullet } from '../utils/bulletManager';
import { INITIAL_GAME_STATE } from '../config/initialState';

export const useGameControls = (setGameState: React.Dispatch<React.SetStateAction<GameState>>) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.repeat) return;

    setGameState(prevState => {
      if (prevState.gameOver && event.code === 'Space') {
        return { ...INITIAL_GAME_STATE };
      }

      switch (event.code) {
        case 'ArrowLeft':
          return {
            ...prevState,
            ship: { ...prevState.ship, rotatingLeft: true }
          };
        case 'ArrowRight':
          return {
            ...prevState,
            ship: { ...prevState.ship, rotatingRight: true }
          };
        case 'ArrowUp':
          return {
            ...prevState,
            ship: { ...prevState.ship, thrusting: true }
          };
        case 'Space':
          if (prevState.ship.canShoot && prevState.bullets.length < SHIP_CONFIG.MAX_BULLETS) {
            const newBullet = createBullet(prevState.ship);
            return {
              ...prevState,
              bullets: [...prevState.bullets, newBullet],
              ship: {
                ...prevState.ship,
                canShoot: false
              }
            };
          }
          return prevState;
        default:
          return prevState;
      }
    });
  }, [setGameState]);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    setGameState(prevState => {
      switch (event.code) {
        case 'ArrowLeft':
          return {
            ...prevState,
            ship: { ...prevState.ship, rotatingLeft: false }
          };
        case 'ArrowRight':
          return {
            ...prevState,
            ship: { ...prevState.ship, rotatingRight: false }
          };
        case 'ArrowUp':
          return {
            ...prevState,
            ship: { ...prevState.ship, thrusting: false }
          };
        case 'Space':
          return {
            ...prevState,
            ship: { ...prevState.ship, canShoot: true }
          };
        default:
          return prevState;
      }
    });
  }, [setGameState]);

  return { handleKeyDown, handleKeyUp };
};