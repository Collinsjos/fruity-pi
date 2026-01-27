import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Trophy, Coins, Play } from 'lucide-react';

const App = () => {
  const [gameState, setGameState] = useState('menu');
  const [score] = useState(0);
  const [highScore] = useState(0);
  const [piCoins] = useState(0);

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-4 font-sans">
      {/* Header UI */}
      <div className="w-full max-w-[400px] flex justify-between items-center mb-6 bg-white p-4 rounded-3xl shadow-[0_6px_0_0_#fbbf24] border-2 border-yellow-400">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">High Score</p>
          <div className="flex items-center gap-1">
            <Trophy className="text-yellow-500" size={18} />
            <span className="text-xl font-black text-gray-800">{highScore}</span>
          </div>
        </div>
        
        <div className="bg-orange-100 px-4 py-2 rounded-2xl border-2 border-orange-200">
          <div className="flex items-center gap-2">
            <Coins className="text-orange-500" size={20} />
            <span className="text-lg font-black text-orange-600">{piCoins} <span className="text-sm">π</span></span>
          </div>
        </div>
      </div>

      {/* Game Window Container */}
      <div className="relative w-[360px] h-[520px] bg-sky-100 rounded-[40px] shadow-2xl border-[10px] border-white overflow-hidden">
        {/* Score Badge */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-6 py-1 rounded-full font-bold z-10">
          {score}
        </div>

        {gameState === 'menu' ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/30 backdrop-blur-md z-20">
            <h1 className="text-4xl font-black text-purple-600 mb-8 drop-shadow-sm">FRUITY PI</h1>
            <button 
              onClick={() => setGameState('playing')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-full text-xl font-black shadow-[0_5px_0_0_#4c1d95] active:translate-y-1 active:shadow-none transition-all"
            >
              <div className="flex items-center gap-2">
                <Play fill="white" size={24} />
                PLAY NOW
              </div>
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-b from-sky-200 to-white">
            <p className="text-sky-500 font-bold animate-pulse">Dropping Fruit...</p>
          </div>
        )}
      </div>

      <p className="mt-8 text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">Pi Ecosystem Partner</p>
    </div>
  );
};

// Rendering logic
const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}
