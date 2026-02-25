import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Pickaxe, Zap, Trophy, MousePointer2, Users, CheckSquare, Rocket, BarChart3, X } from 'lucide-react';

const App = () => {
  const [pi, setPi] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [autoMiners, setAutoMiners] = useState(0);
  const [activeTab, setActiveTab] = useState('tap');
  const [showBotModal, setShowBotModal] = useState(true); // Shows the Tap Bot pop-up on load

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
      
      {/* 1. HEADER */}
      <div className="w-full max-w-md flex justify-between p-3 z-10 shrink-0">
        <div className="bg-black/20 backdrop-blur-md p-2 rounded-2xl border border-white/10 flex flex-col items-center w-[48%]">
          <Trophy className="text-[#FBB44A] mb-1" size={14} />
          <span className="text-[8px] text-white/60 uppercase font-bold tracking-tight">Total Pi</span>
          <span className="text-base font-black text-[#FBB44A]">{pi.toFixed(0)}</span>
        </div>
        <div className="bg-black/20 backdrop-blur-md p-2 rounded-2xl border border-white/10 flex flex-col items-center w-[48%]">
          <Zap className="text-[#FBB44A] mb-1" size={14} />
          <span className="text-[8px] text-white/60 uppercase font-bold tracking-tight">Per Second</span>
          <span className="text-base font-black text-[#FBB44A]">{autoMiners}</span>
        </div>
      </div>

      {/* 2. SCROLLABLE CONTENT AREA */}
      <div className="flex-1 w-full max-w-md overflow-y-auto no-scrollbar touch-auto px-6 pb-40 pt-2">
        
        {activeTab === 'tap' ? (
          <>
            {/* COIN SECTION */}
            <div className="flex flex-col items-center justify-center min-h-[220px] my-4">
              <button onPointerDown={handleMine} className="relative active:scale-90 transition-transform">
                <div className="absolute inset-0 bg-[#FBB44A] rounded-full blur-[40px] opacity-20"></div>
                <img src="/coin.png" className="w-40 h-40 object-contain drop-shadow-2xl relative z-10" alt="Pi" draggable="false" />
              </button>
            </div>

            {/* ENERGY BAR */}
            <div className="w-full mb-6">
              <div className="flex justify-between items-end mb-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <Zap size={16} className="text-[#FBB44A] fill-[#FBB44A]" />
                  <span className="text-base text-white">4500 / 4500</span>
                </div>
                <span className="text-xs text-white/60 font-medium">Bronze &gt;</span>
              </div>
              <div className="w-full h-2.5 bg-black/30 rounded-full border border-white/10 p-0.5">
                <div className="h-full bg-[#FBB44A] rounded-full w-[90%] shadow-[0_0_10px_rgba(251,180,74,0.3)]"></div>
              </div>
            </div>
          </>
        ) : (
          <div className="py-4 space-y-4">
            <h2 className="text-xl font-black text-center mb-6">Boosters</h2>
            <div className="grid grid-cols-2 gap-3">
               <div className="bg-black/20 p-4 rounded-2xl border border-white/10 flex flex-col items-center text-center">
                  <Zap className="text-[#FBB44A] mb-2" />
                  <p className="text-xs font-bold">Full Tank</p>
                  <p className="text-[10px] text-white/50">3/3 available</p>
               </div>
               <div className="bg-black/20 p-4 rounded-2xl border border-white/10 flex flex-col items-center text-center">
                  <Rocket className="text-[#FBB44A] mb-2" />
                  <p className="text-xs font-bold">Tapping Guru</p>
                  <p className="text-[10px] text-white/50">3/3 available</p>
               </div>
            </div>
          </div>
        )}

        {/* UPGRADES LIST (Always visible or shared) */}
        <div className="w-full space-y-2 mt-4">
          <h3 className="text-white/60 font-bold text-[10px] uppercase tracking-widest ml-1">Mining Upgrades</h3>
          <button 
            onClick={() => buyUpgrade(10 * multiplier, 'click')} 
            className="w-full p-3 rounded-2xl bg-[#FBB44A] text-[#593B8B] flex justify-between items-center shadow-lg active:scale-95 transition-transform"
          >
             <div className="flex items-center gap-3">
               <div className="bg-[#593B8B]/10 p-1.5 rounded-lg"><MousePointer2 size={18} className="text-[#593B8B]"/></div>
               <div className="text-left leading-tight">
                 <p className="font-extrabold text-sm uppercase">Multitap</p>
                 <p className="text-[10px] opacity-70 font-bold">Level {multiplier}</p>
               </div>
             </div>
             <span className="font-black text-sm">{(10 * multiplier).toFixed(0)}</span>
          </button>
        </div>
      </div>

      {/* 3. TAP BOT MODAL (Pop-up from your photo) */}
      {showBotModal && (
        <div className="absolute inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#2a2a2a] rounded-[2.5rem] p-8 flex flex-col items-center text-center relative border border-white/10 animate-in fade-in slide-in-from-bottom-10">
            <button onClick={() => setShowBotModal(false)} className="absolute top-6 right-6 text-white/40"><X /></button>
            <div className="w-24 h-24 bg-[#593B8B] rounded-3xl flex items-center justify-center mb-6 shadow-2xl border border-[#FBB44A]/30">
               <div className="text-5xl">🤖</div>
            </div>
            <h2 className="text-3xl font-black mb-2">Tap Bot</h2>
            <p className="text-white/60 text-sm mb-6 px-4">While you were asleep, your Tap Bot earned some Pi for you ❤️</p>
            <div className="flex items-center gap-2 mb-8">
               <div className="w-6 h-6 rounded-full bg-[#FBB44A]" />
               <span className="text-2xl font-black text-[#FBB44A]">145,550</span>
            </div>
            <button 
              onClick={() => { setPi(pi + 145550); setShowBotModal(false); }}
              className="w-full py-4 bg-gradient-to-r from-[#593B8B] to-[#8A348E] rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-transform"
            >
              Get it!
            </button>
          </div>
        </div>
      )}

      {/* 4. FLOATING ROUNDED MENU */}
      <div className="absolute bottom-6 left-4 right-4 max-w-md mx-auto z-50">
        <div className="bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 p-2 rounded-[2.5rem] flex justify-around items-center shadow-2xl">
          <MenuBtn icon={<Users size={20}/>} label="Ref" />
          <MenuBtn icon={<CheckSquare size={20}/>} label="Task" />
          
          <button 
            onClick={() => setActiveTab('tap')}
            className={`${activeTab === 'tap' ? 'bg-[#FBB44A] text-[#593B8B]' : 'text-white/40'} px-5 py-2 rounded-[1.5rem] flex flex-col items-center transition-all flex-1`}
          >
            <div className={`w-4 h-4 rounded-full mb-0.5 ${activeTab === 'tap' ? 'bg-[#593B8B]' : 'bg-white/20'}`} />
            <span className="text-[10px] font-black uppercase">Tap</span>
          </button>

          <button 
            onClick={() => setActiveTab('boost')}
            className={`${activeTab === 'boost' ? 'bg-[#FBB44A] text-[#593B8B]' : 'text-white/40'} px-5 py-2 rounded-[1.5rem] flex flex-col items-center transition-all flex-1`}
          >
            <Rocket size={20} className="mb-0.5" />
            <span className="text-[10px] font-black uppercase">Boost</span>
          </button>

          <MenuBtn icon={<BarChart3 size={20}/>} label="Stats" />
        </div>
      </div>
    </div>
  );
};

// Simple helper for inactive buttons
const MenuBtn = ({ icon, label }) => (
  <div className="flex flex-col items-center text-white/40 flex-1 py-1">
    {icon}
    <span className="text-[10px] mt-1 font-medium">{label}</span>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

 return (
  <div className="fixed inset-0 bg-[#593B8B] text-white flex flex-col items-center select-none overflow-hidden touch-none font-sans">
    
    {/* 1. HEADER - Tightened for mobile space */}
    <div className="w-full max-w-md flex justify-between p-3 z-10 shrink-0">
      <div className="bg-black/20 backdrop-blur-md p-2 rounded-2xl border border-white/10 flex flex-col items-center w-[48%]">
        <Trophy className="text-[#FBB44A] mb-1" size={14} />
        <span className="text-[8px] text-white/60 uppercase font-bold tracking-tight">Total Pi</span>
        <span className="text-base font-black text-[#FBB44A]">{pi.toFixed(0)}</span>
      </div>
      <div className="bg-black/20 backdrop-blur-md p-2 rounded-2xl border border-white/10 flex flex-col items-center w-[48%]">
        <Zap className="text-[#FBB44A] mb-1" size={14} />
        <span className="text-[8px] text-white/60 uppercase font-bold tracking-tight">Per Second</span>
        <span className="text-base font-black text-[#FBB44A]">{autoMiners}</span>
      </div>
    </div>

    {/* 2. SCROLLABLE CONTENT AREA */}
    {/* pb-40 ensures the content "ends" way before the menu starts */}
    <div className="flex-1 w-full max-w-md overflow-y-auto no-scrollbar touch-auto px-6 pb-40 pt-2">
      
      {/* COIN SECTION - Centered and scaled down */}
      <div className="flex flex-col items-center justify-center min-h-[220px] my-4">
        <button onPointerDown={handleMine} className="relative active:scale-90 transition-transform">
          <div className="absolute inset-0 bg-[#FBB44A] rounded-full blur-[40px] opacity-20"></div>
          <img 
            src="/coin.png" 
            className="w-40 h-40 object-contain drop-shadow-2xl relative z-10" 
            alt="Pi" 
            draggable="false" 
          />
        </button>
      </div>

      {/* ENERGY BAR - Positioned higher */}
      <div className="w-full mb-6">
        <div className="flex justify-between items-end mb-1">
          <div className="flex items-center gap-1.5 font-bold">
            <Zap size={16} className="text-[#FBB44A] fill-[#FBB44A]" />
            <span className="text-base text-white">4500 / 4500</span>
          </div>
          <span className="text-xs text-white/60 font-medium">Bronze &gt;</span>
        </div>
        <div className="w-full h-2.5 bg-black/30 rounded-full border border-white/10 p-0.5">
          <div className="h-full bg-[#FBB44A] rounded-full w-[90%] shadow-[0_0_10px_rgba(251,180,74,0.3)]"></div>
        </div>
      </div>

      {/* UPGRADES - Using Casablanca #FBB44A */}
      <div className="w-full space-y-2">
        <h3 className="text-white/60 font-bold text-[10px] uppercase tracking-widest ml-1">Mining Upgrades</h3>
        
        <button 
          onClick={() => buyUpgrade(10 * multiplier, 'click')} 
          className="w-full p-3 rounded-2xl bg-[#FBB44A] text-[#593B8B] flex justify-between items-center shadow-lg active:scale-95 transition-transform"
        >
           <div className="flex items-center gap-3">
             <div className="bg-[#593B8B]/10 p-1.5 rounded-lg">
               <MousePointer2 size={18} className="text-[#593B8B]"/>
             </div>
             <div className="text-left leading-tight">
               <p className="font-extrabold text-sm uppercase">Multitap</p>
               <p className="text-[10px] opacity-70 font-bold">Level {multiplier}</p>
             </div>
           </div>
           <span className="font-black text-sm">{(10 * multiplier).toFixed(0)}</span>
        </button>
      </div>
    </div>

    {/* 3. FLOATING ROUNDED MENU HOLDER */}
    {/* Added rounded-[2.5rem] and shadow-2xl to ensure it looks like a pill */}
    <div className="absolute bottom-6 left-4 right-4 max-w-md mx-auto z-50">
      <div className="bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 p-2 rounded-[2.5rem] flex justify-around items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        <div className="flex flex-col items-center text-white/40 hover:text-[#FBB44A] transition-colors flex-1">
          <Users size={20} />
          <span className="text-[10px] mt-1 font-medium">Ref</span>
        </div>

        <div className="flex flex-col items-center text-white/40 hover:text-[#FBB44A] transition-colors flex-1">
          <CheckSquare size={20} />
          <span className="text-[10px] mt-1 font-medium">Task</span>
        </div>
        
        {/* Active Tap Pill */}
        <div className="bg-[#FBB44A] px-5 py-2 rounded-[1.5rem] flex flex-col items-center shadow-[0_0_15px_rgba(251,180,74,0.3)] flex-1 mx-1">
          <div className="w-4 h-4 rounded-full bg-[#593B8B] mb-0.5" />
          <span className="text-[10px] text-[#593B8B] font-black uppercase">Tap</span>
        </div>
        
        <div className="flex flex-col items-center text-white/40 hover:text-[#FBB44A] transition-colors flex-1">
          <Rocket size={20} />
          <span className="text-[10px] mt-1 font-medium">Boost</span>
        </div>

        <div className="flex flex-col items-center text-white/40 hover:text-[#FBB44A] transition-colors flex-1">
          <BarChart3 size={20} />
          <span className="text-[10px] mt-1 font-medium">Stats</span>
        </div>
      </div>
    </div>
  </div>
);
