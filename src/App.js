return (
  <div className="fixed inset-0 bg-[#0f172a] text-white flex flex-col items-center select-none overflow-hidden touch-none">
    
    {/* HEADER */}
    <div className="w-full max-w-md flex justify-between p-6 z-10 shrink-0">
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

    {/* SCROLLABLE AREA: Added pb-32 so content isn't hidden by the menu */}
    <div className="flex-1 w-full max-w-md overflow-y-auto overflow-x-hidden px-6 pb-32 pt-4 no-scrollbar touch-auto">
      
      {/* COIN SECTION */}
      <div className="flex flex-col items-center justify-center min-h-[300px] mb-8">
        <button onPointerDown={handleMine} className="relative active:scale-90 transition-transform">
          <div className="absolute inset-0 bg-yellow-500 rounded-full blur-[60px] opacity-20"></div>
          <img src="/coin.png" className="w-64 h-64 drop-shadow-2xl relative z-10" alt="Pi" draggable="false" />
        </button>
      </div>

      {/* UPGRADES SECTION */}
      <div className="space-y-3">
        <h3 className="text-slate-500 font-bold text-[10px] uppercase tracking-widest ml-1">Upgrades</h3>
        
        {/* Super Clicker */}
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
          <span className="font-bold text-yellow-500">{(10 * multiplier).toFixed(0)}</span>
        </button>

        {/* Auto Miner */}
        <button 
          onClick={() => buyUpgrade(25 + (autoMiners * 5), 'auto')}
          className={`w-full p-4 rounded-2xl border-2 flex justify-between items-center transition-all ${pi >= 25 + (autoMiners * 5) ? 'bg-slate-800 border-blue-500/50' : 'bg-slate-800/30 border-slate-700/50 opacity-40'}`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-2 rounded-lg text-blue-500"><Pickaxe size={20}/></div>
            <div className="text-left">
              <p className="font-bold text-sm">Auto-Mining Bot</p>
              <p className="text-[10px] text-slate-400">Mine 1 Pi/sec</p>
            </div>
          </div>
          <span className="font-bold text-blue-500">{(25 + (autoMiners * 5)).toFixed(0)}</span>
        </button>
      </div>
    </div>

    {/* FLOATING ROUNDED MENU BAR */}
    <div className="absolute bottom-6 left-6 right-6 max-w-md mx-auto z-50">
      <div className="bg-[#1e1e1e]/90 backdrop-blur-lg border border-slate-700 p-2 rounded-[2rem] flex justify-around items-center shadow-2xl">
        <NavItem icon={<Users size={20}/>} label="Ref" />
        <NavItem icon={<CheckSquare size={20}/>} label="Task" />
        <NavItem icon={<div className="w-5 h-5 rounded-full bg-yellow-500 border-2 border-[#1e1e1e]"/>} label="Tap" active />
        <NavItem icon={<Rocket size={20}/>} label="Boost" />
        <NavItem icon={<BarChart3 size={20}/>} label="Stats" />
      </div>
    </div>

  </div>
);
