import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Pickaxe, Zap, Trophy, MousePointer2 } from 'lucide-react';

const App = () => {
  const [pi, setPi] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [autoMiners, setAutoMiners] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPi((prev) => prev + autoMiners);
    }, 1000);
    return () => clearInterval(timer);
  }, [autoMiners]);

  const handleMine = () => {
    setPi(pi + multiplier);
  };

  const buyUpgrade = (cost, type) => {
    if (pi >= cost) {
      setPi(pi - cost);
      if (type === 'click') setMultiplier(multiplier + 1);
      if (type === 'auto') setAutoMiners(autoMiners + 1);
    }
  };

  return (
    /* fixed inset-0 and overflow-hidden makes the page static (no bounce/scroll) */
    <div className="fixed inset-0 bg-[#0f172a] text-white flex flex-col items-center select-none overflow-hidden touch-none">
      
      {/* HEADER SECTION */}
      <div className="w-full max-w-md flex justify-between p-6 z-10">
        <div className="bg-slate-800/80 backdrop-blur-md p-3 rounded-2xl border border-slate-700 flex flex-col items-center w-[48%]">
          <Trophy className="text-yellow-500 mb-1" size={18} />
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Total Pi</span>
          <span className="text-xl font-black text-yellow-400">{pi.toFixed(0)}</span>
        </div>
        <div className="bg-slate-800/80 backdrop-blur-md p-3 rounded-2xl border border-slate-700 flex flex-col items-center w-[48%]">
          <Zap className="text-blue-400 mb-1" size={18} />
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Per Second</span>
          <span className="text-xl font-black text-blue-400">{autoMiners}</span>
        </div>
      </div>

      {/* COIN AREA - Flex-1 ensures it takes all available space between header and footer */}
      <div className="flex-1 flex items-center justify-center w-full">
        <button 
          onPointerDown={handleMine}
          className="relative active:scale-90 transition-transform cursor-pointer"
        >
          {/* Outer Glow */}
          <div className="absolute inset-0 bg-yellow-500 rounded-full blur-[60px] opacity-20"></div>
          
          {/* YOUR IMAGE */}
          <img 
            src="/coin.png" 
            alt="Pi Coin"
            className="w-64 h-64 md:w-80 md:h-80 drop-shadow-[0_0_30px_rgba(234,179,8,0.3)] relative z-10"
            draggable="false"
          />
        </button>
      </div>

      {/* UPGRADES AREA - Fixed to the bottom */}
      <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border-t border-slate-800 p-6 space-y-3 rounded-t-[2.5rem] z-20">
        <h3 className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-2">Mining Upgrades</h3>
        
        <button 
          onClick={() => buyUpgrade(10 * multiplier, 'click')}
          className={`w-full p-4 rounded-2xl border-2 flex justify-between items-center transition-all ${pi >= 10 * multiplier ? 'bg-slate-800 border-yellow-500/50' : 'bg-slate-800/30 border-slate-700/50 opacity-40'}`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500/20 p-2 rounded-lg text-yellow-500"><MousePointer2 size={20}/></div>
            <div className="text-left">
              <p className="font-bold text-sm">Super Clicker</p>
              <p className="text-[10px] text-slate-400">+{multiplier + 1} per click</p>
            </div>
          </div>
          <span className="font-bold text-yellow-500">{(10 * multiplier).toFixed(0)} π</span>
        </button>

        <button 
          onClick={() => buyUpgrade(25 + (autoMiners * 5), 'auto')}
          className={`w-full p-4 rounded-2xl border-2 flex justify-between items-center transition-all ${pi >= 25 + (autoMiners * 5) ? 'bg-slate-800 border-blue-500/50' : 'bg-slate-800/30 border-slate-700/50 opacity-40'}`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-2 rounded-lg text-blue-500"><Pickaxe size={20}/></div>
            <div className="text-left">
              <p className="font-bold text-sm">Auto-Mining Bot</p>
              <p className="text-[10px] text-slate-400">Mine 1 Pi / sec</p>
            </div>
          </div>
          <span className="font-bold text-blue-500">{(25 + (autoMiners * 5)).toFixed(0)} π</span>
        </button>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
