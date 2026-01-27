import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Trophy, Coins, Play } from 'lucide-react';

const App = () => {
  const [gameState, setGameState] = useState('menu');

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[40px] p-8 shadow-2xl border-4 border-yellow-400 text-center">
        <h1 className="text-5xl font-black text-purple-600 mb-6 tracking-tighter">FRUITY PI</h1>
        
        <div className="flex justify-around mb-8 bg-yellow-100 p-4 rounded-3xl border-2 border-yellow-200">
          <div className="text-center">
            <p className="text-[10px] font-bold text-gray-500 uppercase">Best Score</p>
            <div className="flex items-center justify-center gap-1 text-gray-800">
              <Trophy size={18} className="text-yellow-500" />
              <span className="text-xl font-black">0</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-bold text-gray-500 uppercase">Pi Wallet</p>
            <div className="flex items-center justify-center gap-1 text-orange-600">
              <Coins size={18} />
              <span className="text-xl font-black">0.0 π</span>
            </div>
          </div>
        </div>

        <div className="aspect-[3/4] bg-sky-100 rounded-[32px] mb-8 flex items-center justify-center border-4 border-dashed border-sky-200 relative overflow-hidden">
           {gameState === 'menu' ? (
             <button 
               onClick={() => setGameState('playing')}
               className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-5 rounded-full font-black text-2xl shadow-[0_6px_0_0_#4c1d95] active:translate-y-1 active:shadow-none transition-all flex items-center gap-3"
             >
               <Play fill="white" size={28} /> PLAY
             </button>
           ) : (
             <div className="text-center animate-pulse">
               <div className="text-6xl mb-4">🍎</div>
               <p className="text-sky-500 font-black">LOADING ENGINE...</p>
             </div>
           )}
        </div>

        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Powered by Pi Network</p>
      </div>
    </div>
  );
};

// This ensures the app starts even if index.js is missing
const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(<App />);
}
