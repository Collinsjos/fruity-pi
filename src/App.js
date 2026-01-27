import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
// We import the icons individually to ensure Vite finds them
import { Trophy, Coins, Play } from 'lucide-react';

const App = () => {
  const [gameState, setGameState] = useState('menu');
  const [score] = useState(0);
  const [highScore] = useState(0);
  const [piCoins] = useState(0);

  return (
    <div className="min-h-screen bg-[#FFFAF0] flex flex-col items-center justify-center p-4 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;700&display=swap');
        body { font-family: 'Fredoka', sans-serif; }
      `}</style>

      {/* Top UI Bar */}
      <div className="w-full max-w-[400px] flex justify-between items-center mb-6 bg-white p-4 rounded-3xl shadow-[0_8px_0_0_#fde047] border-2 border-yellow-400">
        <div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">High Score</span>
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

      {/* Main Game Window */}
      <div className="relative w-[360px] h-[500px] bg-gradient-to-b from-sky-100 to-white rounded-[40px] shadow-2xl border-[10px] border-white overflow-hidden">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-6 py-2 rounded-full font-black shadow-lg z-10">
          {score}
        </div>

        {gameState === 'menu' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-md z-20">
            <h1 className="text-4xl font-black text-purple-600 mb-8 drop-shadow-md">FRUITY PI</h1>
            <button 
              onClick={() => setGameState('playing')}
              className="group bg-purple-600 hover:bg-purple-700 text-white px-12 py-5 rounded-full text-2xl font-black shadow-[0_6px_0_0_#4c1d95] transition-all hover:translate-y-1 hover:shadow-[0_2px_0_0_#4c1d95]"
            >
              <div className="flex items-center gap-3">
                <Play fill="white" size={28} />
                PLAY NOW
              </div>
            </button>
          </div>
        )}
        
        {gameState === 'playing' && (
          <div className="flex items-center justify-center h-full">
            <p className="text-sky-400 font-bold animate-pulse">Ready to drop fruits...</p>
          </div>
        )}
      </div>

      <p className="mt-8 text-gray-400 text-sm font-medium">Built for Pi Network • Secured with Vercel</p>
    </div>
  );
};

// --- THE BOOT CODE ---
// This tells the browser to take the 'App' component above 
// and put it into the <div id="root"> in your index.html
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
