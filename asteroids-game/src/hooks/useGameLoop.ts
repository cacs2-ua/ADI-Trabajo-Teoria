import { useState, useEffect, useCallback } from 'react';
import { GameState } from '../types/game';
import { useGameControls } from './useGameControls';
import { useGameCollisions } from './useGameCollisions';
import { useGameUpdates } from './useGameUpdates';
import { INITIAL_GAME_STATE } from '../config/initialState';

export const useGameLoop = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  
  const { handleKeyDown, handleKeyUp } = useGameControls(setGameState);
  const { checkCollisions } = useGameCollisions(setGameState);
  const { updateGameState } = useGameUpdates();

  const gameLoop = useCallback(() => {
    if (gameState.gameOver) return;
    
    setGameState(prevState => {
      const updatedState = updateGameState(prevState);
      return checkCollisions(updatedState);
    });
  }, [checkCollisions, updateGameState, gameState.gameOver]);

  useEffect(() => {
    const interval = setInterval(gameLoop, 1000 / 60);
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameLoop, handleKeyDown, handleKeyUp]);

  return gameState;
};