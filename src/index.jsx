import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Zap, Trophy, Users, CheckSquare, 
  Rocket, BarChart3, BatteryCharging, Hand, Flame 
} from 'lucide-react';

const App = () => {
  const [balance, setBalance] = useState(0);
  const [activeTab, setActiveTab] = useState('tap');
  const [tapValue, setTapValue] = useState(1);
  const [multitapLevel, setMultitapLevel] = useState(1);
  const [maxEnergy, setMaxEnergy] = useState(500);
  const [energyLevel, setEnergyLevel] = useState(1);
  const [energy, setEnergy] = useState(500);
  const [tankCharges, setTankCharges] = useState(3);
  const [guruCharges, setGuruCharges] = useState(3);
  const [isGuruActive, setIsGuruActive] = useState(false);
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setEnergy((prev) => (prev < maxEnergy ? prev + 1 : prev));
    }, 1000);
    return () => clearInterval(timer);
  }, [maxEnergy]);

  const handlePointerDown = (e) => {
    if (energy > 0 || isGuruActive) {
      const earned = isGuruActive ? tapValue * 5 : tapValue;
      setBalance(prev => prev + earned);
      if (!isGuruActive) setEnergy(prev => prev - 1);

      const newClick = { id: Date.now(), x: e.clientX, y: e.clientY, val: earned };
      setClicks(prev => [...prev, newClick]);
      setTimeout(() => setClicks(prev => prev.filter(c => c.id !== newClick.id)), 1000);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto relative text-white font-sans select-none overflow-hidden" style={{ backgroundColor: '#593B8B' }}>
      
      <style>{`
        @keyframes floatUpAndFade {
          0% { opacity: 1; transform: translateY(0px) scale(1); }
          100% { opacity: 0; transform: translateY(-100px) scale(1.5); }
        }
        .animate-float { animation: floatUpAndFade 1s ease-out forwards; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

      {/* FLOATING CLICK TEXT */}
      {clicks.map((click) => (
        <div key={click.id} className="absolute text-3xl font-black z-50 animate-float pointer-events-none"
             style={{ left: click.x - 20, top: click.y - 40, color: isGuruActive ? '#FBB44A' : 'white' }}>
          +{click.val}
        </div>
      ))}

      {/* MAIN CONTENT (Scrollable) */}
      <div className="flex-1 overflow-y-auto pb-40 scrollbar-hide px-6">
        
        {activeTab === 'tap' && (
          <div className="flex flex-col items-center mt-8 h-full">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full shadow-[0_0_15px_#FBB44A]" style={{ backgroundColor: '#FBB44A' }}></div>
              <h1 className="text-5xl font-black text-white">{balance.toLocaleString()}</h1>
            </div>
            
            <div className="flex items-center gap-1 text-white/60 text-sm mb-8">
              <Trophy size={14} style={{ color: '#FBB44A' }} />
              <span>Bronze {'>'}</span>
            </div>

            {/* THE COIN SECTION */}
            <div className="flex-1 flex items-center justify-center w-full relative min-h-[300px]">
              {isGuruActive && (
                <div className="absolute inset-0 rounded-full blur-[100px] opacity-20 pointer-events-none" style={{ backgroundColor: '#FBB44A' }}></div>
              )}
              <img src="/coin.png" onPointerDown={handlePointerDown}
                   className="w-64 h-64 active:scale-95 transition-transform drop-shadow-2xl cursor-pointer relative z-10" alt="Pi" draggable="false" />
            </div>

            {/* ENERGY BAR - Using Casablanca for progress */}
            <div className="w-full mt-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-1 font-bold">
                  <Zap size={18} style={{ color: '#FBB44A', fill: '#FBB44A' }} className={isGuruActive ? "animate-pulse" : ""} />
                  <span className="text-lg"> {isGuruActive ? "ULTRA BOOST" : `${energy} / ${maxEnergy}`} </span>
                </div>
              </div>
              <div className="w-full h-3 bg-black/30 rounded-full border border-white/10 p-0.5">
                <div className="h-full transition-all duration-300 rounded-full" 
                     style={{ width: isGuruActive ? '100%' : `${(energy / maxEnergy) * 100}%`, backgroundColor: '#FBB44A' }}></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'boost' && (
          <div className="pt-8">
            <div className="flex flex-col items-center mb-8">
              <p className="text-white/60 text-sm mb-2">Your Balance</p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#FBB44A' }}></div>
                <h1 className="text-3xl font-bold">{balance.toLocaleString()}</h1>
              </div>
            </div>

            <h3 className="font-bold mb-4 opacity-80 uppercase text-xs tracking-widest">Daily Boosters</h3>
            <div className="grid grid-cols-2 gap-3 mb-8">
              <button onClick={() => { if(guruCharges > 0 && !isGuruActive) { setIsGuruActive(true); setGuruCharges(c => c-1); setTimeout(()=>setIsGuruActive(false), 20000); }}}
                      disabled={guruCharges === 0 || isGuruActive}
                      className="bg-black/20 p-4 rounded-2xl flex items-center gap-3 active:scale-95 disabled:opacity-40 border border-white/5">
                <Flame style={{ color: '#FBB44A' }} size={24} />
                <div className="text-left"><p className="font-bold text-sm">Guru</p><p className="text-xs opacity-60">{guruCharges}/3</p></div>
              </button>
              <button onClick={() => { if(tankCharges > 0) { setEnergy(maxEnergy); setTankCharges(c => c-1); }}}
                      disabled={tankCharges === 0}
                      className="bg-black/20 p-4 rounded-2xl flex items-center gap-3 active:scale-95 disabled:opacity-40 border border-white/5">
                <BatteryCharging style={{ color: '#FBB44A' }} size={24} />
                <div className="text-left"><p className="font-bold text-sm">Full Tank</p><p className="text-xs opacity-60">{tankCharges}/3</p></div>
              </button>
            </div>

            <h3 className="font-bold mb-4 opacity-80 uppercase text-xs tracking-widest">Upgrades</h3>
            <div className="space-y-3">
              <UpgradeBtn icon={<Hand size={20}/>} label="Multitap" level={multitapLevel} cost={multitapLevel * 2000} canBuy={balance >= multitapLevel * 2000} onClick={() => { if(balance >= multitapLevel * 2000) { setBalance(b => b - multitapLevel*2000); setTapValue(v => v+1); setMultitapLevel(l => l+1); }}} />
              <UpgradeBtn icon={<BatteryCharging size={20}/>} label="Energy Limit" level={energyLevel} cost={energyLevel * 2000} canBuy={balance >= energyLevel * 2000} onClick={() => { if(balance >= energyLevel * 2000) { setBalance(b => b - energyLevel*2000); setMaxEnergy(m => m+500); setEnergyLevel(l => l+1); }}} />
            </div>
          </div>
        )}
      </div>

      {/* FLOATING ROUNDED MENU BAR */}
      <div className="absolute bottom-6 left-4 right-4 max-w-md mx-auto z-50 px-2">
        <div className="bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 p-2 rounded-[2.5rem] flex justify-around items-center shadow-2xl">
          <NavBtn icon={<Users size={20}/>} label="Ref" />
          <NavBtn icon={<CheckSquare size={20}/>} label="Task" />
          
          <button onClick={() => setActiveTab('tap')} 
                  className={`flex-1 py-2 rounded-[1.5rem] flex flex-col items-center transition-all ${activeTab === 'tap' ? 'text-[#593B8B]' : 'text-white/40'}`}
                  style={{ backgroundColor: activeTab === 'tap' ? '#FBB44A' : 'transparent' }}>
            <div className="w-4 h-4 rounded-full mb-0.5" style={{ backgroundColor: activeTab === 'tap' ? '#593B8B' : 'rgba(255,255,255,0.2)' }} />
            <span className="text-[10px] font-black uppercase">Tap</span>
          </button>

          <button onClick={() => setActiveTab('boost')} 
                  className={`flex-1 py-2 rounded-[1.5rem] flex flex-col items-center transition-all ${activeTab === 'boost' ? 'text-[#593B8B]' : 'text-white/40'}`}
                  style={{ backgroundColor: activeTab === 'boost' ? '#FBB44A' : 'transparent' }}>
            <Rocket size={20} />
            <span className="text-[10px] font-black uppercase">Boost</span>
          </button>

          <NavBtn icon={<BarChart3 size={20}/>} label="Stats" />
        </div>
      </div>
    </div>
  );
};

// HELPER COMPONENTS
const NavBtn = ({ icon, label }) => (
  <div className="flex flex-col items-center text-white/40 flex-1 py-1 hover:text-white transition-colors cursor-pointer">
    {icon} <span className="text-[10px] mt-1 font-medium">{label}</span>
  </div>
);

const UpgradeBtn = ({ icon, label, level, cost, canBuy, onClick }) => (
  <button onClick={onClick} className={`w-full p-4 rounded-2xl flex justify-between items-center transition-all bg-black/20 border border-white/5 ${!canBuy && 'opacity-50'}`}>
    <div className="flex gap-4 items-center">
      <div className="p-2 rounded-xl bg-white/5" style={{ color: '#FBB44A' }}>{icon}</div>
      <div className="text-left">
        <p className="font-bold text-sm">{label}</p>
        <p className="text-xs text-white/40">Level {level} • {cost.toLocaleString()} Pi</p>
      </div>
    </div>
    <span className="text-white/20 font-bold">{'>'}</span>
  </button>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
