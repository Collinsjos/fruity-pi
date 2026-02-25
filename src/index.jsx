import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Zap, Trophy, Users, CheckSquare, 
  Rocket, BarChart3, BatteryCharging, Hand, Flame 
} from 'lucide-react';

const App = () => {
  // --- CORE STATE ---
  const [balance, setBalance] = useState(0); // Starts at 0
  const [activeTab, setActiveTab] = useState('tap'); // 'tap' or 'boost'
  
  // --- UPGRADES ---
  const [tapValue, setTapValue] = useState(1);
  const [multitapLevel, setMultitapLevel] = useState(1);
  
  const [maxEnergy, setMaxEnergy] = useState(500);
  const [energyLevel, setEnergyLevel] = useState(1);
  const [energy, setEnergy] = useState(500);

  // --- BOOSTERS ---
  const [tankCharges, setTankCharges] = useState(3);
  const [guruCharges, setGuruCharges] = useState(3);
  const [isGuruActive, setIsGuruActive] = useState(false);

  // --- ANIMATIONS ---
  const [clicks, setClicks] = useState([]);

  // Energy regeneration (1 per second)
  useEffect(() => {
    const timer = setInterval(() => {
      setEnergy((prev) => (prev < maxEnergy ? prev + 1 : prev));
    }, 1000);
    return () => clearInterval(timer);
  }, [maxEnergy]);

  // --- INTERACTION LOGIC ---
  const handlePointerDown = (e) => {
    // If we have energy OR Guru is active (which freezes energy)
    if (energy > 0 || isGuruActive) {
      // Guru gives a 5x multiplier!
      const earned = isGuruActive ? tapValue * 5 : tapValue;
      
      setBalance(prev => prev + earned);
      
      // Deplete energy only if Guru is NOT active
      if (!isGuruActive) {
        setEnergy(prev => prev - 1);
      }

      // Floating Text Logic
      // We use the exact screen coordinates of the tap
      const newClick = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        val: earned
      };
      setClicks(prev => [...prev, newClick]);

      // Remove the floating text after 1 second
      setTimeout(() => {
        setClicks(prev => prev.filter(click => click.id !== newClick.id));
      }, 1000);
    }
  };

  // --- BOOSTER ACTIONS ---
  const activateFullTank = () => {
    if (tankCharges > 0) {
      setEnergy(maxEnergy);
      setTankCharges(prev => prev - 1);
    }
  };

  const activateTappingGuru = () => {
    if (guruCharges > 0 && !isGuruActive) {
      setIsGuruActive(true);
      setGuruCharges(prev => prev - 1);
      
      // Guru lasts for 20 seconds
      setTimeout(() => {
        setIsGuruActive(false);
      }, 20000);
    }
  };

  // --- UPGRADE ACTIONS ---
  const buyMultitap = () => {
    const cost = multitapLevel * 2000;
    if (balance >= cost) {
      setBalance(prev => prev - cost);
      setTapValue(prev => prev + 1);
      setMultitapLevel(prev => prev + 1);
    }
  };

  const buyEnergyLimit = () => {
    const cost = energyLevel * 2000;
    if (balance >= cost) {
      setBalance(prev => prev - cost);
      setMaxEnergy(prev => prev + 500);
      setEnergyLevel(prev => prev + 1);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto relative bg-[#252525] text-white font-sans select-none overflow-hidden">
      
      {/* INLINE STYLES FOR FLOATING ANIMATION */}
      <style>{`
        @keyframes floatUpAndFade {
          0% { opacity: 1; transform: translateY(0px) scale(1); }
          100% { opacity: 0; transform: translateY(-100px) scale(1.5); }
        }
        .animate-float {
          animation: floatUpAndFade 1s ease-out forwards;
        }
        /* Custom scrollbar hide */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* --- FLOATING CLICK TEXTS --- */}
      {clicks.map((click) => (
        <div 
          key={click.id}
          className="absolute text-3xl font-black text-white pointer-events-none z-50 animate-float drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]"
          style={{
            left: click.x - 20, // offset to center on finger
            top: click.y - 40,
            color: isGuruActive ? '#FBB44A' : 'white' // Turns orange during Guru!
          }}
        >
          +{click.val}
        </div>
      ))}

      {/* --- HEADER --- */}
      <div className="flex justify-between items-center p-4">
        <button className="text-gray-400 text-sm">Cancel</button>
        <div className="flex flex-col items-center">
          <span className="font-bold text-sm">PiSwap</span>
          <span className="text-xs text-gray-400">bot</span>
        </div>
        <button className="text-gray-400 text-xl">⋯</button>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        
        {/* --- TAP SCREEN --- */}
        {activeTab === 'tap' && (
          <div className="flex flex-col items-center px-4 mt-8 h-full">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#FBB44A] shadow-[0_0_15px_#FBB44A]"></div>
              <h1 className="text-5xl font-black">{balance.toLocaleString()}</h1>
            </div>
            
            <div className="flex items-center gap-1 text-gray-400 text-sm mb-12">
              <Trophy size={14} color="#FBB44A" />
              <span>Bronze {'>'}</span>
            </div>

            {/* THE COIN */}
            {/* THE COIN */}
            <div className="flex-1 flex items-center justify-center w-full relative">
              
              {/* GURU ACTIVE FIRE EFFECT */}
              {isGuruActive && (
                <div className="absolute inset-0 bg-[#FBB44A] blur-[100px] opacity-20 rounded-full pointer-events-none"></div>
              )}

              {/* COIN IMAGE */}
              <img 
                src="./coin.png" 
                onPointerDown={handlePointerDown}
                className="w-72 h-72 active:scale-95 transition-transform drop-shadow-2xl cursor-pointer select-none"
                alt="Pi Coin" 
                draggable="false"
              />
            </div>

            {/* ENERGY BAR */}
            <div className="w-full mt-auto mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-1 font-bold">
                  <Zap size={18} color={isGuruActive ? "#FBB44A" : "#8A348E"} className={isGuruActive ? "animate-ping" : ""} />
                  <span>
                    {isGuruActive ? "INFINITY" : energy} / {maxEnergy}
                  </span>
                </div>
              </div>
              <div className="w-full h-3 bg-[#593B8B] rounded-full overflow-hidden border border-[#8A348E]/50">
                <div 
                  className={`h-full transition-all duration-300 ${isGuruActive ? 'bg-gradient-to-r from-yellow-400 to-red-500' : 'bg-gradient-to-r from-[#8A348E] to-[#FBB44A]'}`}
                  style={{ width: isGuruActive ? '100%' : `${(energy / maxEnergy) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* --- BOOST SCREEN --- */}
        {activeTab === 'boost' && (
          <div className="p-4">
            <div className="flex flex-col items-center mb-8 mt-4">
              <p className="text-gray-400 text-sm mb-2">Your Share balance</p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#FBB44A]"></div>
                <h1 className="text-3xl font-bold">{balance.toLocaleString()}</h1>
              </div>
            </div>

            <h3 className="font-bold mb-3">Your daily boosters:</h3>
            <div className="grid grid-cols-2 gap-3 mb-8">
              
              {/* TAPPING GURU BOOSTER */}
              <button 
                onClick={activateTappingGuru}
                disabled={guruCharges === 0 || isGuruActive}
                className="bg-[#593B8B] p-4 rounded-2xl flex items-center gap-3 active:scale-95 transition-transform disabled:opacity-50"
              >
                <Flame color={guruCharges > 0 ? "#FBB44A" : "gray"} size={28} />
                <div className="text-left">
                  <p className="font-bold text-sm">Taping Guru</p>
                  <p className="text-xs text-gray-300">{guruCharges}/3</p>
                </div>
              </button>

              {/* FULL TANK BOOSTER */}
              <button 
                onClick={activateFullTank}
                disabled={tankCharges === 0}
                className="bg-[#593B8B] p-4 rounded-2xl flex items-center gap-3 active:scale-95 transition-transform disabled:opacity-50"
              >
                <BatteryCharging color={tankCharges > 0 ? "#FBB44A" : "gray"} size={28} />
                <div className="text-left">
                  <p className="font-bold text-sm">Full Tank</p>
                  <p className="text-xs text-gray-300">{tankCharges}/3</p>
                </div>
              </button>
            </div>

            <h3 className="font-bold mb-3">Boosters (Upgrades):</h3>
            <div className="space-y-3">
              
              {/* MULTITAP UPGRADE */}
              <button 
                onClick={buyMultitap}
                className={`w-full p-4 rounded-2xl flex justify-between items-center transition-all ${balance >= multitapLevel * 2000 ? 'bg-[#593B8B] active:scale-95' : 'bg-[#593B8B]/50 opacity-70'}`}
              >
                <div className="flex gap-3 items-center">
                  <Hand color="#FBB44A" size={28} />
                  <div className="text-left">
                    <p className="font-bold text-sm">Multitap</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-[#FBB44A] inline-block"></span>
                      {multitapLevel * 2000} | Level {multitapLevel}
                    </p>
                  </div>
                </div>
                <span className="text-gray-400">{'>'}</span>
              </button>
              
              {/* ENERGY LIMIT UPGRADE */}
              <button 
                onClick={buyEnergyLimit}
                className={`w-full p-4 rounded-2xl flex justify-between items-center transition-all ${balance >= energyLevel * 2000 ? 'bg-[#593B8B] active:scale-95' : 'bg-[#593B8B]/50 opacity-70'}`}
              >
                <div className="flex gap-3 items-center">
                  <BatteryCharging color="#4A90E2" size={28} />
                  <div className="text-left">
                    <p className="font-bold text-sm">Energy Limit</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-[#FBB44A] inline-block"></span>
                      {energyLevel * 2000} | Level {energyLevel}
                    </p>
                  </div>
                </div>
                <span className="text-gray-400">{'>'}</span>
              </button>

            </div>
          </div>
        )}
      </div>

      {/* --- BOTTOM NAVIGATION BAR --- */}
      <div className="absolute bottom-4 left-4 right-4 bg-[#1e1e1e] rounded-2xl p-2 flex justify-between border border-[#593B8B] z-40">
        <button className="flex flex-col items-center flex-1 py-2 text-gray-500 hover:text-white">
          <Users size={20} className="mb-1" />
          <span className="text-[10px]">Ref</span>
        </button>
        <button className="flex flex-col items-center flex-1 py-2 text-gray-500 hover:text-white">
          <CheckSquare size={20} className="mb-1" />
          <span className="text-[10px]">Task</span>
        </button>
        <button 
          onClick={() => setActiveTab('tap')}
          className={`flex flex-col items-center flex-1 py-2 rounded-xl transition-colors ${activeTab === 'tap' ? 'bg-[#593B8B] text-white shadow-lg' : 'text-gray-500'}`}
        >
          <div className={`w-5 h-5 rounded-full bg-[#FBB44A] mb-1 border-2 border-[#1e1e1e] ${activeTab === 'tap' ? 'animate-pulse' : ''}`}></div>
          <span className="text-[10px]">Tap</span>
        </button>
        <button 
          onClick={() => setActiveTab('boost')}
          className={`flex flex-col items-center flex-1 py-2 rounded-xl transition-colors ${activeTab === 'boost' ? 'bg-[#593B8B] text-white shadow-lg' : 'text-gray-500'}`}
        >
          <Rocket size={20} className="mb-1" />
          <span className="text-[10px]">Boost</span>
        </button>
        <button className="flex flex-col items-center flex-1 py-2 text-gray-500 hover:text-white">
          <BarChart3 size={20} className="mb-1" />
          <span className="text-[10px]">Stats</span>
        </button>
      </div>

    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
