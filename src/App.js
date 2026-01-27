import React, { useState, useEffect, useRef } from 'react';
import { Play, Bomb, Shuffle, Trash2, Plus, Trophy, Coins, Volume2, VolumeX, X, Copy, Check } from 'lucide-react';

const FruityPi = () => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('menu');
  const [score, setScore] = useState(0);
  const [canvasSize, setCanvasSize] = useState({ width: 360, height: 550 });
  const [highScore, setHighScore] = useState(0);
  const [piCoins, setPiCoins] = useState(0);
  const [nextFruit, setNextFruit] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [combo, setCombo] = useState(0);
  const [powerUps, setPowerUps] = useState({ bomb: 3, pickNext: 2, popItem: 2, refillTilt: 1 });

  const gameRef = useRef({ fruits: [], mouseX: 180, animationId: null, isDropping: false, particles: [] });

  const FRUITS = [
    { name: 'Cherry', emoji: '🍒', radius: 18 },
    { name: 'Strawberry', emoji: '🍓', radius: 24 },
    { name: 'Lemon', emoji: '🍋', radius: 30 },
    { name: 'Orange', emoji: '🍊', radius: 36 },
    { name: 'Apple', emoji: '🍎', radius: 42 },
    { name: 'Kiwi', emoji: '🥝', radius: 48 },
    { name: 'Grapes', emoji: '🍇', radius: 54 },
    { name: 'Mango', emoji: '🥭', radius: 60 },
    { name: 'Peach', emoji: '🍑', radius: 66 },
    { name: 'Coconut', emoji: '🥥', radius: 72 },
    { name: 'Watermelon', emoji: '🍉', radius: 80 }
  ];

  const POWERUP_INFO = {
    bomb: { name: 'Bomb', icon: Bomb, color: 'from-red-400 to-red-600' },
    pickNext: { name: 'Pick', icon: Shuffle, color: 'from-blue-400 to-blue-600' },
    popItem: { name: 'Pop', icon: Trash2, color: 'from-yellow-400 to-yellow-600' },
    refillTilt: { name: 'Refill', icon: Plus, color: 'from-green-400 to-green-600' }
  };

  // Basic Placeholder Functions to prevent errors
  const handleCanvasClick = () => {};
  const handleCanvasMove = () => {};
  const usePowerUp = (type) => { console.log("Using", type); };

  return (
    <div className="min-h-screen bg-[#FFFAF0] flex flex-col items-center justify-center p-4 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;700&display=swap');
        * { font-family: 'Fredoka', sans-serif; }
      `}</style>

      {/* Top Bar */}
      <div className="w-full max-w-[400px] flex justify-between items-center mb-4 bg-white p-3 rounded-3xl shadow-lg border-2 border-yellow-400">
        <div>
          <span className="text-[10px] font-bold text-gray-400 uppercase">High Score</span>
          <div className="flex items-center gap-1">
            <Trophy className="text-yellow-500" size={16} />
            <span className="text-xl font-black text-gray-800">{highScore}</span>
          </div>
        </div>
        <div className="bg-orange-100 px-4 py-1 rounded-2xl border-2 border-orange-200">
          <div className="flex items-center gap-2">
            <Coins className="text-orange-500" size={18} />
            <span className="text-lg font-black text-orange-600">{piCoins} π</span>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-6 py-2 rounded-full font-black shadow-xl z-20 border-4 border-white">
          {score}
        </div>
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          onMouseMove={handleCanvasMove}
          className="rounded-[40px] shadow-2xl border-[12px] border-white bg-sky-50"
          width={canvasSize.width}
          height={canvasSize.height}
        />
        {gameState === 'menu' && (
           <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-[30px]">
              <button 
                onClick={() => setGameState('playing')}
                className="bg-purple-600 text-white px-10 py-5 rounded-full text-2xl font-black shadow-xl hover:scale-105 transition-transform"
              >
                PLAY NOW
              </button>
           </div>
        )}
      </div>

      {/* Power-Ups */}
      <div className="mt-8 grid grid-cols-4 gap-4 w-full max-w-[400px]">
        {Object.keys(POWERUP_INFO).map((key) => {
          const item = POWERUP_INFO[key];
          const Icon = item.icon;
          return (
            <button key={key} onClick={() => usePowerUp(key)} className="relative flex flex-col items-center bg-white p-3 rounded-2xl shadow-md border-2 border-slate-100">
              <div className={`p-2 rounded-xl bg-gradient-to-br ${item.color} text-white mb-1`}>
                <Icon size={20} />
              </div>
              <span className="text-[10px] font-bold text-gray-500 uppercase">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FruityPi;
