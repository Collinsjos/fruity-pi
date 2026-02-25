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
  <div className="fixed inset-0 bg-[#0f172a] text-white flex flex-col items-center select-none overflow-hidden touch-none font-sans">
    
    {/* HEADER SECTION */}
    <div className="w-full max-w-md flex justify-between p-4 z-10 shrink-0">
      <div className="bg-slate-800/80 backdrop-blur-md p-2 rounded-2xl border border-slate-700 flex flex-col items-center w-[48%]">
        <Trophy className="text-yellow-500 mb-1" size={16} />
        <span className="text-[9px] text-slate-400 uppercase font-bold tracking-tight">Total Pi</span>
        <span className="text-lg font-black text-yellow-400">{pi.toFixed(0)}</span>
      </div>
      <div className="bg-slate-800/80 backdrop-blur-md p-2 rounded-2xl border border-slate-700 flex flex-col items-center w-[48%]">
        <Zap className="text-blue-400 mb-1" size={16} />
        <span className="text-[9px] text-slate-400 uppercase font-bold tracking-tight">Per Second</span>
        <span className="text-lg font-black text-blue-400">{autoMiners}</span>
      </div>
    </div>

    {/* MAIN CONTENT AREA */}
    <div className="flex-1 w-full max-w-md flex flex-col items-center justify-between px-6 pb-32 overflow-y-auto no-scrollbar touch-auto">
      
      {/* COIN SECTION (Reduced Size) */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <button onPointerDown={handleMine} className="relative active:scale-90 transition-transform">
          <div className="absolute inset-0 bg-yellow-500 rounded-full blur-[50px] opacity-15"></div>
          <img 
            src="/coin.png" 
            className="w-40 h-32 md:w-32 md:h-40 drop-shadow-2xl relative z-10" 
            alt="Pi" 
            draggable="false" 
          />
        </button>
      </div>

      {/* ENERGY BAR SECTION (Now clearly visible) */}
      <div className="w-full mb-8">
        <div className="flex justify-between items-end mb-2">
          <div className="flex items-center gap-1.5 font-bold">
            <Zap size={18} className="text-yellow-500 fill-yellow-500" />
            <span className="text-lg">4500 / 4500</span>
          </div>
          <span className="text-sm text-slate-400 font-medium">Bronze &gt;</span>
        </div>
        <div className="w-full h-3.5 bg-slate-800 rounded-full border border-slate-700 p-0.5">
          <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full w-[90%] shadow-[0_0_10px_rgba(234,179,8,0.4)]"></div>
        </div>
      </div>

      {/* UPGRADES LIST (Scrollable) */}
      <div className="w-full space-y-2">
        <h3 className="text-slate-500 font-bold text-[10px] uppercase tracking-widest ml-1">Mining Upgrades</h3>
        {/* Click Upgrade */}
        <button onClick={() => buyUpgrade(10 * multiplier, 'click')} className="w-full p-3 rounded-2xl bg-slate-800/50 border border-slate-700 flex justify-between items-center">
           <div className="flex items-center gap-3">
             <MousePointer2 className="text-yellow-500" size={18}/>
             <div className="text-left leading-tight">
               <p className="font-bold text-sm">Multitap</p>
               <p className="text-[10px] text-slate-400">Level {multiplier}</p>
             </div>
           </div>
           <span className="font-bold text-yellow-500 text-sm">{(10 * multiplier).toFixed(0)}</span>
        </button>
      </div>
    </div>

    {/* ROUNDED FLOATING MENU HOLDER */}
    <div className="absolute bottom-6 left-4 right-4 max-w-md mx-auto z-50">
      <div className="bg-[#1e1e1e]/95 backdrop-blur-xl border border-white/10 p-2 rounded-[2.5rem] flex justify-around items-center shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col items-center text-slate-500 hover:text-white transition-colors py-1">
          <Users size={20} />
          <span className="text-[10px] mt-1">Ref</span>
        </div>
        <div className="flex flex-col items-center text-slate-500 hover:text-white transition-colors py-1">
          <CheckSquare size={20} />
          <span className="text-[10px] mt-1">Task</span>
        </div>
        {/* Active Tap Tab */}
        <div className="bg-slate-700/50 px-5 py-2 rounded-2xl flex flex-col items-center border border-white/5">
          <div className="w-5 h-5 rounded-full bg-yellow-500 shadow-[0_0_8px_#eab308]" />
          <span className="text-[10px] mt-1 text-white font-medium">Tap</span>
        </div>
        <div className="flex flex-col items-center text-slate-500 hover:text-white transition-colors py-1">
          <Rocket size={20} />
          <span className="text-[10px] mt-1">Boost</span>
        </div>
        <div className="flex flex-col items-center text-slate-500 hover:text-white transition-colors py-1">
          <BarChart3 size={20} />
          <span className="text-[10px] mt-1">Stats</span>
        </div>
      </div>
    </div>
  </div>
);
