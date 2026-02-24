import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Pickaxe, Zap, TrendingUp, Trophy, Coins, MousePointer2 } from 'lucide-react';

const App = () => {
  const [pi, setPi] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [autoMiners, setAutoMiners] = useState(0);

  // Auto-mining logic: Gives Pi every second based on how many miners you have
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
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      {/* Stats Header */}
      <div className="w-full max-w-md flex justify-between mb-8">
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center w-1/2 mr-2">
          <Trophy className="text-yellow-500 mb-1" size={20} />
          <span className="text-xs text-slate-400 uppercase font-bold">Total Pi</span>
          <span className="text-2xl font-black text-yellow-400">{pi.toFixed(1)}</span>
        </div>
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center w-1/2 ml-2">
          <Zap className="text-blue-400 mb-1" size={20} />
          <span className="text-xs text-slate-400 uppercase font-bold">Per Second</span>
          <span className="text-2xl font-black text-blue-400">{autoMiners}</span>
        </div>
      </div>

      {/* Main Clicker Area */}
      <button 
        onClick={handleMine}
        className="relative group active:scale-95 transition-transform mb-12"
      >
        <div className="absolute inset-0 bg-yellow-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
        <div className="relative bg-gradient-to-tr from-yellow-600 to-yellow-400 w-48 h-48 rounded-full border-8 border-yellow-200 shadow-2xl flex items-center justify-center">
          <span className="text-7xl font-black text-yellow-100 select-none">π</span>
        </div>
      </button>

      {/* Upgrades Section */}
      <div className="w-full max-w-md space-y-3">
        <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest ml-1">Upgrades</h3>
        
        {/* Upgrade 1: Click Power */}
        <button 
          onClick={() => buyUpgrade(10 * multiplier, 'click')}
          className={`w-full p-4 rounded-2xl border-2 flex justify-between items-center transition-all ${pi >= 10 * multiplier ? 'bg-slate-800 border-yellow-500/50' : 'bg-slate-800/50 border-slate-700 opacity-50'}`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500/20 p-2 rounded-lg text-yellow-500"><MousePointer2 size={20}/></div>
            <div className="text-left">
              <p className="font-bold">Super Clicker</p>
              <p className="text-xs text-slate-400">+{multiplier + 1} per click</p>
            </div>
          </div>
          <span className="font-bold text-yellow-500">{(10 * multiplier).toFixed(0)} π</span>
        </button>

        {/* Upgrade 2: Auto Miner */}
        <button 
          onClick={() => buyUpgrade(25 + (autoMiners * 5), 'auto')}
          className={`w-full p-4 rounded-2xl border-2 flex justify-between items-center transition-all ${pi >= 25 + (autoMiners * 5) ? 'bg-slate-800 border-blue-500/50' : 'bg-slate-800/50 border-slate-700 opacity-50'}`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-2 rounded-lg text-blue-500"><Pickaxe size={20}/></div>
            <div className="text-left">
              <p className="font-bold">Auto-Mining Bot</p>
              <p className="text-xs text-slate-400">Mine 1 Pi / sec</p>
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
