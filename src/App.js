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
  <div className="fixed inset-0 bg-[#593B8B] text-white flex flex-col items-center select-none overflow-hidden touch-none font-sans">
    
    {/* HEADER SECTION */}
    <div className="w-full max-w-md flex justify-between p-4 z-10 shrink-0">
      {/* Total Pi Box */}
      <div className="bg-black/20 backdrop-blur-md p-2 rounded-2xl border border-white/10 flex flex-col items-center w-[48%]">
        <Trophy className="text-[#FBB44A] mb-1" size={16} />
        <span className="text-[9px] text-white/60 uppercase font-bold tracking-tight">Total Pi</span>
        <span className="text-lg font-black text-[#FBB44A]">{pi.toFixed(0)}</span>
      </div>
      
      {/* Per Second Box */}
      <div className="bg-black/20 backdrop-blur-md p-2 rounded-2xl border border-white/10 flex flex-col items-center w-[48%]">
        <Zap className="text-[#FBB44A] mb-1" size={16} />
        <span className="text-[9px] text-white/60 uppercase font-bold tracking-tight">Per Second</span>
        <span className="text-lg font-black text-[#FBB44A]">{autoMiners}</span>
      </div>
    </div>

    {/* MAIN CONTENT AREA */}
    <div className="flex-1 w-full max-w-md flex flex-col items-center justify-between px-6 pb-32 overflow-y-auto no-scrollbar touch-auto">
      
      {/* COIN SECTION (Manually Sized) */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <button onPointerDown={handleMine} className="relative active:scale-90 transition-transform">
          {/* Subtle Casablanca Glow behind coin */}
          <div className="absolute inset-0 bg-[#FBB44A] rounded-full blur-[50px] opacity-20"></div>
          <img 
            src="/coin.png" 
            className="w-44 h-44 drop-shadow-2xl relative z-10" 
            alt="Pi" 
            draggable="false" 
          />
        </button>
      </div>

      {/* ENERGY BAR SECTION */}
      <div className="w-full mb-6">
        <div className="flex justify-between items-end mb-2">
          <div className="flex items-center gap-1.5 font-bold">
            <Zap size={18} className="text-[#FBB44A] fill-[#FBB44A]" />
            <span className="text-lg text-white">4500 / 4500</span>
          </div>
          <span className="text-sm text-white/60 font-medium">Bronze &gt;</span>
        </div>
        <div className="w-full h-3 bg-black/30 rounded-full border border-white/10 p-0.5">
          {/* Progress bar using Casablanca #FBB44A */}
          <div className="h-full bg-[#FBB44A] rounded-full w-[90%] shadow-[0_0_10px_rgba(251,180,74,0.3)]"></div>
        </div>
      </div>

      {/* UPGRADES LIST */}
      <div className="w-full space-y-2">
        <h3 className="text-white/60 font-bold text-[10px] uppercase tracking-widest ml-1">Mining Upgrades</h3>
        
        {/* Multitap Upgrade Button (Casablanca #FBB44A) */}
        <button 
          onClick={() => buyUpgrade(10 * multiplier, 'click')} 
          className="w-full p-3 rounded-2xl bg-[#FBB44A] text-[#593B8B] flex justify-between items-center shadow-lg active:scale-95 transition-transform"
        >
           <div className="flex items-center gap-3">
             <MousePointer2 size={18} className="fill-[#593B8B]"/>
             <div className="text-left leading-tight">
               <p className="font-extrabold text-sm uppercase">Multitap</p>
               <p className="text-[10px] opacity-80 font-bold">Level {multiplier}</p>
             </div>
           </div>
           <span className="font-black text-sm">{(10 * multiplier).toFixed(0)}</span>
        </button>
      </div>
    </div>

    {/* ROUNDED FLOATING MENU HOLDER */}
    <div className="absolute bottom-6 left-4 right-4 max-w-md mx-auto z-50">
      <div className="bg-black/30 backdrop-blur-xl border border-white/10 p-2 rounded-[2.5rem] flex justify-around items-center shadow-2xl">
        <div className="flex flex-col items-center text-white/50 hover:text-[#FBB44A] transition-colors py-1">
          <Users size={20} />
          <span className="text-[10px] mt-1">Ref</span>
        </div>
        <div className="flex flex-col items-center text-white/50 hover:text-[#FBB44A] transition-colors py-1">
          <CheckSquare size={20} />
          <span className="text-[10px] mt-1">Task</span>
        </div>
        
        {/* Active Tap Tab using Casablanca #FBB44A */}
        <div className="bg-[#FBB44A] px-5 py-2 rounded-2xl flex flex-col items-center shadow-[0_0_15px_rgba(251,180,74,0.2)]">
          <div className="w-5 h-5 rounded-full bg-[#593B8B]" />
          <span className="text-[10px] mt-1 text-[#593B8B] font-black uppercase">Tap</span>
        </div>
        
        <div className="flex flex-col items-center text-white/50 hover:text-[#FBB44A] transition-colors py-1">
          <Rocket size={20} />
          <span className="text-[10px] mt-1">Boost</span>
        </div>
        <div className="flex flex-col items-center text-white/50 hover:text-[#FBB44A] transition-colors py-1">
          <BarChart3 size={20} />
          <span className="text-[10px] mt-1">Stats</span>
        </div>
      </div>
    </div>
  </div>
);
