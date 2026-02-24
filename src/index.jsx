import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Pickaxe, Zap, Trophy, MousePointer2, Coins } from 'lucide-react';

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

  const buyUpgrade = (cost, type) => {
    if (pi >= cost) {
      setPi(pi - cost);
      if (type === 'click') setMultiplier(multiplier + 1);
      if (type === 'auto') setAutoMiners(autoMiners + 1);
    }
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-6 bg-slate-900">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-yellow-500 mb-2">PI MINER</h1>
        <p className="text-slate-400 text-sm tracking-widest uppercase">Tap to Earn</p>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 text-center w-32">
          <Trophy className="text-yellow-500 mx-auto mb-1" size={20} />
          <p className="text-[10px] text-slate-400 uppercase">Balance</p>
          <p className="text-xl font-bold">{pi.toFixed(1)}</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 text-center w-32">
          <Zap className="text-blue-400 mx-auto mb-1" size={20} />
          <p className="text-[10px] text-slate-400 uppercase">Mining Rate</p>
          <p className="text-xl font-bold">{autoMiners}/s</p>
        </div>
      </div>

      <button 
        onClick={() => setPi(pi + multiplier)}
        className="w-48 h-48 rounded-full bg-gradient-to-tr from-yellow-600 to-yellow-400 border-8 border-yellow-200 shadow-[0_0_50px_rgba(234,179,8,0.3)] flex items-center justify-center active:scale-90 transition-transform mb-12"
      >
        <span className="text-7xl font-black text-yellow-100 select-none">π</span>
      </button>

      <div className="w-full max-w-sm space-y-3">
        <button 
          onClick={() => buyUpgrade(10 * multiplier, 'click')}
          className="w-full p-4 bg-slate-800 rounded-2xl border border-slate-700 flex justify-between items-center hover:bg-slate-750"
        >
          <div className="flex items-center gap-3">
            <MousePointer2 className="text-yellow-500" />
            <div className="text-left">
              <p className="font-bold">Power Click</p>
              <p className="text-xs text-slate-500">Increase per-tap</p>
            </div>
          </div>
          <span className="font-bold text-yellow-500">{(10 * multiplier).toFixed(0)} π</span>
        </button>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
