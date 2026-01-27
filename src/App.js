import React, { useState, useEffect, useRef } from 'react';
import { Play, Bomb, Shuffle, Trash2, Plus, Trophy, Coins, Volume2, VolumeX, X, Copy, Check, Info } from 'lucide-react';

const FruityPi = () => {
  // ... (Keep existing physics/game logic from your previous script)
  // [Paste your existing handleCanvasClick, updatePhysics, etc. here]

  return (
    <div className="min-h-screen bg-[#FFFAF0] flex flex-col items-center justify-center p-4 font-['Fredoka',sans-serif]">
      {/* Load Playful Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=Inter:wght@400;700;900&display=swap');
        body { background-color: #fef9c3; background-image: radial-gradient(#fde047 0.5px, transparent 0.5px); background-size: 24px 24px; }
      `}</style>

      {/* Header Section - Professional Dashboard */}
      <div className="w-full max-w-[400px] flex justify-between items-center mb-4 bg-white/80 backdrop-blur-md p-3 rounded-3xl shadow-[0_8px_0_0_#eab308] border-2 border-yellow-400">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">High Score</span>
          <div className="flex items-center gap-1">
            <Trophy className="text-yellow-500" size={16} />
            <span className="text-xl font-black text-gray-800">{highScore.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="bg-orange-100 px-4 py-1 rounded-2xl border-2 border-orange-200">
          <div className="flex items-center gap-2">
            <Coins className="text-orange-500" size={18} />
            <span className="text-lg font-black text-orange-600">{piCoins.toFixed(1)} <span className="text-sm">π</span></span>
          </div>
        </div>
      </div>

      {/* Main Game Container */}
      <div className="relative group">
        {/* Score Float */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-6 py-2 rounded-full font-black shadow-xl z-20 border-4 border-white">
          {score.toLocaleString()}
        </div>

        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          onMouseMove={handleCanvasMove}
          className="rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] cursor-none border-[12px] border-white bg-gradient-to-b from-sky-100 to-white"
          style={{ width: '360px', height: '550px' }}
        />
        
        {/* Next Fruit Indicator - Floating Bubble */}
        <div className="absolute top-10 -right-6 bg-white p-3 rounded-2xl shadow-xl border-4 border-sky-400 animate-bounce">
          <span className="text-[10px] font-bold text-sky-400 block text-center">NEXT</span>
          <span className="text-3xl">{FRUITS[nextFruit].emoji}</span>
        </div>
      </div>

      {/* Power-Up Dock - Modern Professional Style */}
      <div className="mt-8 grid grid-cols-4 gap-4 w-full max-w-[400px]">
        {Object.keys(POWERUP_INFO).map((key) => {
          const item = POWERUP_INFO[key];
          const Icon = item.icon;
          return (
            <button
              key={key}
              onClick={() => usePowerUp(key)}
              className="group relative flex flex-col items-center bg-white p-3 rounded-2xl shadow-[0_6px_0_0_#cbd5e1] hover:shadow-[0_2px_0_0_#cbd5e1] hover:translate-y-[4px] transition-all border-2 border-slate-100"
            >
              <div className={`p-2 rounded-xl bg-gradient-to-br ${item.color} text-white mb-1`}>
                <Icon size={20} />
              </div>
              <span className="text-[10px] font-bold text-gray-500 uppercase">{key}</span>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white">
                {powerUps[key]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FruityPi;
