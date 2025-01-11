import React from 'react';
import { Rocket } from 'lucide-react';
import GameCanvas from './components/GameCanvas';
import { useGameLoop } from './hooks/useGameLoop';

function App() {
  const gameState = useGameLoop();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <div className="mb-8 flex items-center gap-4">
        <Rocket className="w-8 h-8" />
        <h1 className="text-4xl font-bold">Asteroids</h1>
      </div>
      
      <GameCanvas gameState={gameState} />
      
      <div className="mt-8 text-center">
        <h2 className="text-xl mb-4">Controls</h2>
        <ul className="space-y-2">
          <li>← → Arrow keys to rotate</li>
          <li>↑ Arrow key for thrust</li>
          <li>Space to shoot</li>
        </ul>
      </div>
    </div>
  );
}

export default App;