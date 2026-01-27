import React, { useState, useEffect, useRef } from 'react';
// We use simple Lucide imports to avoid bundle errors
import * as Lucide from 'lucide-react';

export default function App() {
  const [gameState, setGameState] = useState('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [piCoins, setPiCoins] = useState(0);

  // Safety: If Lucide fails to load, the app won't crash
  const Trophy = Lucide.Trophy || (() => '🏆');
  const Coins = Lucide.Coins || (() => '🪙');
  const Play = Lucide.Play || (() => '▶️');

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border-4 border-yellow-400 text-center">
        <h1 className="text-4xl font-black text-purple-600 mb-2">FRUITY PI</h1>
        
        <div className="flex justify-around mb-6 bg-yellow-100 p-4 rounded-2xl">
          <div>
            <p className="text-xs font-bold text-gray-500">BEST</p>
            <div className="flex items-center gap-1">
              <Trophy size={16} className="text-yellow-500" />
              <span className="font-bold">{highScore}</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500">PI EARNED</p>
            <div className="flex items-center gap-1">
              <Coins size={16} className="text-orange-500" />
              <span className="font-bold">{piCoins}</span>
            </div>
          </div>
        </div>

        <div className="aspect-[3/4] bg-sky-100 rounded-2xl mb-6 flex items-center justify-center border-4 border-dashed border-sky-200">
           {gameState === 'menu' ? (
             <button 
               onClick={() => setGameState('playing')}
               className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-black text-xl flex items-center gap-2 transition-transform hover:scale-105"
             >
               <Play fill="white" /> PLAY
             </button>
           ) : (
             <p className="text-sky-400 font-bold">Game Engine Loading...</p>
           )}
        </div>

        <p className="text-gray-400 text-sm">Merge fruits to earn Real Pi!</p>
      </div>
    </div>
  );
}
