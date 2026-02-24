import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Zap, Trophy, Users, CheckSquare, 
  Rocket, BarChart3, Bot, BatteryCharging, Hand 
} from 'lucide-react';

const App = () => {
  const [balance, setBalance] = useState(3425514);
  const [energy, setEnergy] = useState(4000);
  const [maxEnergy, setMaxEnergy] = useState(4000);
  const [activeTab, setActiveTab] = useState('tap'); // 'tap' or 'boost'
  const [showBotModal, setShowBotModal] = useState(true);

  // Colors based on your Pi Network palette
  const colors = {
    casablanca: '#FBB44A', // Yellow/Orange
    vividViolet: '#8A348E', // Purple button
    gigas: '#593B8B',       // Deep Purple backgrounds
    mineShaft: '#252525'    // Dark Grey/Black Main bg
  };

  // Energy regeneration
  useEffect(() => {
    const timer = setInterval(() => {
      setEnergy((prev) => (prev < maxEnergy ? prev + 1 : prev));
    }, 1000);
    return () => clearInterval(timer);
  }, [maxEnergy]);

  const handleTap = (e) => {
    if (energy > 0) {
      setBalance(balance + 1);
      setEnergy(energy - 1);
      
      // Optional: Add floating text animation logic here later
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto relative bg-[#252525] font-sans">
      
      {/* --- TOP HEADER --- */}
      <div className="flex justify-between items-center p-4">
        <button className="text-gray-400 text-sm">Cancel</button>
        <div className="flex flex-col items-center">
          <span className="font-bold text-sm">PiSwap</span>
          <span className="text-xs text-gray-400">bot</span>
        </div>
        <button className="text-gray-400 text-xl">⋯</button>
      </div>

      {/* --- BOT EARNINGS MODAL (Matches your screenshot) --- */}
      {showBotModal && (
        <div className="absolute inset-0 z-50 bg-black/80 flex flex-col items-center justify-end p-4 pb-24 backdrop-blur-sm">
          <div className="bg-[#252525] border border-[#593B8B] w-full rounded-[2rem] p-6 flex flex-col items-center shadow-2xl">
            <button onClick={() => setShowBotModal(false)} className="self-end text-gray-400 mb-4">✕</button>
            <div className="w-24 h-24 bg-[#593B8B] rounded-3xl flex items-center justify-center mb-6 border-4 border-[#8A348E]">
              <Bot size={48} color="#FBB44A" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Tap Bot</h2>
            <p className="text-center text-gray-400 text-sm mb-6">
              While you were asleep, your Tap Bot earned some Shares for you ❤️
            </p>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-6 h-6 rounded-full bg-[#FBB44A]"></div>
              <span className="text-3xl font-bold">145 550</span>
            </div>
            <button 
              onClick={() => {
                setBalance(balance + 145550);
                setShowBotModal(false);
              }}
              className="w-full py-4 rounded-full text-white font-bold text-lg bg-gradient-to-r from-[#8A348E] to-[#593B8B] hover:opacity-90 active:scale-95 transition-all"
            >
              Get it!
            </button>
          </div>
        </div>
      )}

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        
        {/* TAB: TAP */}
        {activeTab === 'tap' && (
          <div className="flex flex-col items-center px-4 mt-8 h-full">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#FBB44A]"></div>
              <h1 className="text-5xl font-black">{balance.toLocaleString()}</h1>
            </div>
            
            <div className="flex items-center gap-1 text-gray-400 text-sm mb-12">
              <Trophy size={14} color="#FBB44A" />
              <span>Grandmaster {'>'}</span>
            </div>

            {/* The Big Pi Coin */}
            <div className="flex-1 flex items-center justify-center w-full">
              <button 
                onClick={handleTap}
                className="relative group w-64 h-64 rounded-full bg-gradient-to-b from-[#FBB44A] to-orange-500 shadow-[0_0_50px_rgba(251,180,74,0.3)] active:scale-95 transition-transform duration-75 flex items-center justify-center border-4 border-yellow-200"
              >
                <span className="text-9xl font-black text-white drop-shadow-md select-none">π</span>
              </button>
            </div>

            {/* Energy Bar */}
            <div className="w-full mt-auto mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-1 font-bold">
                  <Zap size={18} color="#FBB44A" />
                  <span>{energy} / {maxEnergy}</span>
                </div>
              </div>
              <div className="w-full h-3 bg-[#593B8B] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#8A348E] to-[#FBB44A] transition-all duration-300"
                  style={{ width: `${(energy / maxEnergy) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: BOOST */}
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
              <div className="bg-[#593B8B] p-4 rounded-2xl flex items-center gap-3">
                <Zap color="#FBB44A" size={24} />
                <div>
                  <p className="font-bold text-sm">Taping Guru</p>
                  <p className="text-xs text-gray-300">3/3</p>
                </div>
              </div>
              <div className="bg-[#593B8B] p-4 rounded-2xl flex items-center gap-3">
                <BatteryCharging color="#FBB44A" size={24} />
                <div>
                  <p className="font-bold text-sm">Full Tank</p>
                  <p className="text-xs text-gray-300">3/3</p>
                </div>
              </div>
            </div>

            <h3 className="font-bold mb-3">Boosters:</h3>
            <div className="space-y-3">
              <div className="bg-[#593B8B]/50 p-4 rounded-2xl flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <Hand color="#FBB44A" size={28} />
                  <div>
                    <p className="font-bold text-sm">Multitap</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-[#FBB44A] inline-block"></span>
                      300 000 | 12 level
                    </p>
                  </div>
                </div>
                <span className="text-gray-400">{'>'}</span>
              </div>
              
              <div className="bg-[#593B8B]/50 p-4 rounded-2xl flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <BatteryCharging color="#4A90E2" size={28} />
                  <div>
                    <p className="font-bold text-sm">Energy Limit</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-[#FBB44A] inline-block"></span>
                      25 000 | 8 level
                    </p>
                  </div>
                </div>
                <span className="text-gray-400">{'>'}</span>
              </div>

              <div className="bg-[#593B8B]/30 p-4 rounded-2xl flex justify-between items-center opacity-60">
                <div className="flex gap-3 items-center">
                  <Bot color="#9ca3af" size={28} />
                  <div>
                    <p className="font-bold text-sm">Tap Bot</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-gray-500 inline-block"></span>
                      200 000
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- BOTTOM NAVIGATION BAR --- */}
      <div className="absolute bottom-4 left-4 right-4 bg-[#1e1e1e] rounded-2xl p-2 flex justify-between border border-[#593B8B]">
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
          className={`flex flex-col items-center flex-1 py-2 rounded-xl transition-colors ${activeTab === 'tap' ? 'bg-[#593B8B] text-white' : 'text-gray-500'}`}
        >
          <div className="w-5 h-5 rounded-full bg-[#FBB44A] mb-1 border-2 border-[#1e1e1e]"></div>
          <span className="text-[10px]">Tap</span>
        </button>
        <button 
          onClick={() => setActiveTab('boost')}
          className={`flex flex-col items-center flex-1 py-2 rounded-xl transition-colors ${activeTab === 'boost' ? 'bg-[#593B8B] text-white' : 'text-gray-500'}`}
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
