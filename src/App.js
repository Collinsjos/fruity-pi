import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Trophy, Coins, Play } from 'lucide-react';

const App = () => {
  const [gameState, setGameState] = useState('menu');
  const [score] = useState(0);
  const [highScore] = useState(0);
  const [piCoins] = useState(0);

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-4">
      {/* Header Section */}
      <div className="w-full max-w-[400px] flex justify-between items-center mb-6 bg-white p-4 rounded-3xl shadow-[0_6px_0_0_#fde047] border-2 border-yellow-400">
        <div>
          <span className="text-[10px] font-bold text-gray-400 uppercase">High Score</span>
          <div className="flex items-center gap-1 text-gray-800">
            <Trophy className="text-yellow-500" size={18} />
            <span className="text-xl font-extrabold">{highScore}</span>
          </div>
        </div>
        
        <div className="bg-orange-100 px-4 py-2 rounded-2xl border-2 border-orange-200">
          <div className="flex items-center gap-2">
            <Coins className="text-orange-500" size={20} />
            <span className="text-lg font-extrabold text-orange-600">{piCoins} π</span>
          </div>
        </div>
      </div>

      {/* Game Window */}
      <div className="relative w-[360px] h-[500px] bg-sky-50 rounded-[40px] shadow-2xl border-[10px] border-white overflow-hidden">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-6 py-1 rounded-full font-bold z-10">
          {score}
        </div>

        {gameState === 'menu' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm z-20">
            <h1 className="text-4xl font-black text-purple-600 mb-8 tracking-tighter">FRUITY PI</h1>
            <button 
              onClick={() => setGameState('playing')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-full text-xl font-bold shadow-[0_5px_0_0_#4c1d95] active:translate-y-1 active:shadow-none transition-all"
            >
              <div className="flex items-center gap-2">
                <Play fill="white" size={24} />
                PLAY NOW
              </div>
            </button>
          </div>
        )}
        
        {gameState === 'playing' && (
          <div className="flex items-center justify-center h-full">
            <p className="text-sky-400 font-bold animate-pulse">Dropping Fruit...</p>
          </div>
        )}
      </div>

      <p className="mt-8 text-gray-400 text-xs font-bold uppercase tracking-widest">Pi Network Game</p>
    </div>
  );
};

// --- BOOT ---
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
