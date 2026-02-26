import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Zap, Trophy, Users, CheckSquare, 
  Rocket, User, BatteryCharging, Hand, Flame, X, Copy, Check, ExternalLink 
} from 'lucide-react';
import { auth, db, signInAnonymously, onAuthStateChanged, doc, getDoc, setDoc } from './firebase.js';

const TASKS = [
  { id: 'telegram', title: 'Join Telegram', reward: 10000, link: 'https://t.me/your_telegram_channel', icon: '✈️' },
  { id: 'twitter', title: 'Follow Twitter', reward: 5000, link: 'https://twitter.com/your_twitter', icon: '🐦' },
  { id: 'youtube', title: 'Subscribe YouTube', reward: 5000, link: 'https://youtube.com/@your_channel', icon: '▶️' },
  { id: 'instagram', title: 'Follow Instagram', reward: 5000, link: 'https://instagram.com/your_profile', icon: '📸' },
  { id: 'discord', title: 'Join Discord', reward: 5000, link: 'https://discord.gg/your_invite', icon: '💬' },
];

const App = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

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
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [withdrawError, setWithdrawError] = useState('');
  const [taskStatus, setTaskStatus] = useState({});
  const [taskTimers, setTaskTimers] = useState({});
  const [showRefillModal, setShowRefillModal] = useState(false);
  const [refillCopied, setRefillCopied] = useState(false);
  const [refillCountdown, setRefillCountdown] = useState(null);
  const [refillTriggered, setRefillTriggered] = useState(false);
  const [dailyCheckIn, setDailyCheckIn] = useState(false);
  const [lastCheckInDate, setLastCheckInDate] = useState('');

  const SITE_URL = 'https://pi-coin-two.vercel.app/';
  const REFILL_WALLET = 'GAEOJMBWANRHFLZYBJCYNY4YN7IWDHRKGU6EOIQS6D3ZNEL3DYDAOPL4';
  const piCoinsEarned = parseFloat((balance * 0.001).toFixed(1));
  const MIN_WITHDRAWAL = 100;
  const canWithdraw = piCoinsEarned >= MIN_WITHDRAWAL;

  // ─── FIREBASE: Sign in anonymously on mount ───────────────────────────────
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        await loadPlayerData(user.uid);
      } else {
        await signInAnonymously(auth);
      }
    });
    return () => unsubscribe();
  }, []);

  // ─── FIREBASE: Load player data from Firestore ────────────────────────────
  const loadPlayerData = async (uid) => {
    try {
      const ref = doc(db, 'players', uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setBalance(data.balance || 0);
        setTapValue(data.tapValue || 1);
        setMultitapLevel(data.multitapLevel || 1);
        setMaxEnergy(data.maxEnergy || 500);
        setEnergyLevel(data.energyLevel || 1);
        setTankCharges(data.tankCharges ?? 3);
        setGuruCharges(data.guruCharges ?? 3);
        setTaskStatus(data.taskStatus || {});
        setLastCheckInDate(data.lastCheckInDate || '');
        const today = new Date().toDateString();
        setDailyCheckIn(data.lastCheckInDate === today);
        setShowIntroModal(false);
      } else {
        setShowIntroModal(true);
        await savePlayerData(uid, getDefaultState());
      }
    } catch (err) {
      console.error('Error loading player data:', err);
    } finally {
      setLoading(false);
    }
  };

  // ─── FIREBASE: Save player data to Firestore ──────────────────────────────
  const savePlayerData = async (uid, data) => {
    try {
      const ref = doc(db, 'players', uid || userId);
      await setDoc(ref, data, { merge: true });
    } catch (err) {
      console.error('Error saving player data:', err);
    }
  };

  const getDefaultState = () => ({
    balance: 0,
    tapValue: 1,
    multitapLevel: 1,
    maxEnergy: 500,
    energyLevel: 1,
    tankCharges: 3,
    guruCharges: 3,
    taskStatus: {},
    lastCheckInDate: '',
    createdAt: new Date().toISOString(),
  });

  // ─── AUTO-SAVE whenever key state changes ─────────────────────────────────
  useEffect(() => {
    if (!userId || loading) return;
    const timeout = setTimeout(() => {
      savePlayerData(userId, {
        balance,
        tapValue,
        multitapLevel,
        maxEnergy,
        energyLevel,
        tankCharges,
        guruCharges,
        taskStatus,
        lastCheckInDate,
      });
    }, 1500);
    return () => clearTimeout(timeout);
  }, [balance, tapValue, multitapLevel, maxEnergy, energyLevel, tankCharges, guruCharges, taskStatus, lastCheckInDate, userId]);

  // ─── Energy regeneration ──────────────────────────────────────────────────
  useEffect(() => {
    const timer = setInterval(() => {
      setEnergy((prev) => (prev < maxEnergy ? prev + 1 : prev));
    }, 1000);
    return () => clearInterval(timer);
  }, [maxEnergy]);

  // ─── Refill countdown ─────────────────────────────────────────────────────
  useEffect(() => {
    if (refillCountdown === null) return;
    if (refillCountdown <= 0) {
      setTankCharges(3);
      setGuruCharges(3);
      setRefillCountdown(null);
      setRefillTriggered(false);
      setShowRefillModal(false);
      return;
    }
    const t = setTimeout(() => setRefillCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [refillCountdown]);

  // ─── Tap handler ──────────────────────────────────────────────────────────
  const handlePointerDown = (e) => {
    if (energy > 0 || isGuruActive) {
      const earned = isGuruActive ? tapValue * 5 : tapValue;
      setBalance(prev => prev + earned);
      if (!isGuruActive) setEnergy(prev => prev - 1);

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX || e.touches?.[0]?.clientX || rect.left + rect.width / 2;
      const y = e.clientY || e.touches?.[0]?.clientY || rect.top + rect.height / 2;

      const newClick = { id: Date.now(), x, y, val: earned };
      setClicks(prev => [...prev, newClick]);
      setTimeout(() => setClicks(prev => prev.filter(c => c.id !== newClick.id)), 1000);
    }
  };

  const activateGuru = () => {
    if (guruCharges > 0 && !isGuruActive) {
      setIsGuruActive(true);
      setGuruCharges(c => c - 1);
      setTimeout(() => setIsGuruActive(false), 20000);
    }
  };

  const activateTank = () => {
    if (tankCharges > 0) {
      setEnergy(maxEnergy);
      setTankCharges(c => c - 1);
    }
  };

  const upgradeMultitap = () => {
    const cost = multitapLevel * 2000;
    if (balance >= cost) {
      setBalance(b => b - cost);
      setTapValue(v => v + 1);
      setMultitapLevel(l => l + 1);
    }
  };

  const upgradeEnergy = () => {
    const cost = energyLevel * 2000;
    if (balance >= cost) {
      setBalance(b => b - cost);
      setMaxEnergy(m => m + 500);
      setEnergyLevel(l => l + 1);
    }
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(SITE_URL);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDailyCheckIn = () => {
    const today = new Date().toDateString();
    if (lastCheckInDate !== today) {
      setBalance(prev => prev + 1000);
      setDailyCheckIn(true);
      setLastCheckInDate(today);
    }
  };

  const handleTaskClick = (task) => {
    if (taskStatus[task.id] === 'done' || taskStatus[task.id] === 'pending') return;
    window.open(task.link, '_blank');
    setTaskStatus(prev => ({ ...prev, [task.id]: 'pending' }));
    setTaskTimers(prev => ({ ...prev, [task.id]: 10 }));

    const interval = setInterval(() => {
      setTaskTimers(prev => {
        const next = (prev[task.id] || 10) - 1;
        if (next <= 0) {
          clearInterval(interval);
          setBalance(b => b + task.reward);
          setTaskStatus(s => ({ ...s, [task.id]: 'done' }));
          return { ...prev, [task.id]: 0 };
        }
        return { ...prev, [task.id]: next };
      });
    }, 1000);
  };

  const handleRefillClick = () => {
    if (refillTriggered) return;
    setShowRefillModal(true);
  };

  const handleRefillConfirm = () => {
    setRefillTriggered(true);
    setRefillCountdown(20);
  };

  const copyRefillWallet = () => {
    navigator.clipboard.writeText(REFILL_WALLET);
    setRefillCopied(true);
    setTimeout(() => setRefillCopied(false), 2000);
  };

  const handleWithdraw = () => {
    setWithdrawError('');
    if (!canWithdraw) {
      setWithdrawError(`Minimum withdrawal is ${MIN_WITHDRAWAL} Pi. You need ${(MIN_WITHDRAWAL - piCoinsEarned).toFixed(1)} more Pi.`);
      return;
    }
    if (!walletAddress.trim()) {
      setWithdrawError('Please enter your Pi wallet address.');
      return;
    }
  };

  const openWithdrawModal = () => {
    setWithdrawError('');
    setShowWithdrawModal(true);
  };

  // ─── LOADING SCREEN ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen" style={{ backgroundColor: '#270657' }}>
        <img src="/coin.png" alt="Pi" className="w-24 h-24 mb-6 animate-bounce" />
        <p className="text-white font-black text-xl mb-2">PiSwap</p>
        <p className="text-white/40 text-sm">Loading your progress...</p>
        <div className="mt-6 w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-[#FBB44A] rounded-full animate-pulse w-3/4" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto relative text-white font-sans select-none overflow-hidden" style={{ backgroundColor: '#270657' }}>

      <style>{`
        @keyframes floatUpAndFade {
          0% { opacity: 1; transform: translateY(0px) scale(1); }
          100% { opacity: 0; transform: translateY(-100px) scale(1.5); }
        }
        .animate-float { animation: floatUpAndFade 1s ease-out forwards; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        .spin-slow { animation: spin-slow 2s linear infinite; }
      `}</style>

      {/* FLOATING CLICK TEXT */}
      {clicks.map((click) => (
        <div key={click.id} className="absolute text-3xl font-black z-50 animate-float pointer-events-none"
             style={{ left: click.x - 20, top: click.y - 40, color: isGuruActive ? '#FBB44A' : 'white' }}>
          +{click.val}
        </div>
      ))}

      {/* REFILL BOOSTER MODAL */}
      {showRefillModal && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#1e1e2e] rounded-[2.5rem] p-7 flex flex-col relative border border-white/10">
            <button onClick={() => { if (!refillTriggered) setShowRefillModal(false); }} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors">
              <X size={24} />
            </button>
            <div className="text-center mb-5">
              <div className="text-4xl mb-2">⚡</div>
              <h2 className="text-2xl font-black text-[#FBB44A]">Refill Booster</h2>
              <p className="text-white/50 text-sm mt-1">Send 10 Pi to refill all daily boosters</p>
            </div>
            <div className="bg-black/40 border border-white/10 rounded-2xl p-4 mb-4">
              <p className="text-xs text-white/40 mb-2 text-center uppercase tracking-widest">Payment Wallet</p>
              <p className="text-white text-xs font-mono break-all text-center leading-relaxed">{REFILL_WALLET}</p>
              <button
                onClick={copyRefillWallet}
                className="mt-3 w-full py-2 bg-[#FBB44A] text-[#270657] rounded-xl font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                {refillCopied ? <><Check size={15}/> Copied!</> : <><Copy size={15}/> Copy Address</>}
              </button>
            </div>
            <div className="bg-[#593B8B]/20 border border-[#593B8B]/30 rounded-2xl p-4 mb-5 text-xs text-white/60 space-y-1 leading-relaxed">
              <p>📌 <strong className="text-white/80">How to pay:</strong></p>
              <p>1. Open your Pi wallet app</p>
              <p>2. Send exactly <strong className="text-[#FBB44A]">10 Pi</strong> to the address above</p>
              <p>3. Tap <strong className="text-white/80">"I've Paid — Refill Now"</strong> below</p>
              <p>4. Your boosters will refill in <strong className="text-[#FBB44A]">20 seconds</strong></p>
            </div>
            {refillTriggered ? (
              <div className="flex flex-col items-center gap-2 py-4">
                <div className="w-12 h-12 rounded-full border-4 border-[#FBB44A] border-t-transparent spin-slow" />
                <p className="text-[#FBB44A] font-black text-lg">Refilling in {refillCountdown}s...</p>
                <p className="text-white/40 text-xs">Boosters will be restored shortly</p>
              </div>
            ) : (
              <button
                onClick={handleRefillConfirm}
                className="w-full py-4 bg-gradient-to-r from-[#593B8B] to-[#8A348E] rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-transform"
              >
                I've Paid — Refill Now ⚡
              </button>
            )}
          </div>
        </div>
      )}

      {/* WITHDRAW MODAL */}
      {showWithdrawModal && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#2a2a2a] rounded-[2.5rem] p-8 flex flex-col relative border border-white/10">
            <button onClick={() => { setShowWithdrawModal(false); setWithdrawError(''); }} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors">
              <X size={24} />
            </button>
            <h2 className="text-2xl font-black mb-4 text-center">Withdraw Pi Coins</h2>
            <div className="bg-[#593B8B]/30 rounded-2xl p-6 mb-4 text-center">
              <p className="text-white/60 text-sm mb-2">Available to Withdraw</p>
              <div className="flex items-center justify-center gap-2">
                <img src="/coin.jpg" alt="Pi Coin" className="w-10 h-10" />
                <span className="text-4xl font-black text-[#FBB44A]">{piCoinsEarned} Pi</span>
              </div>
              <p className="text-xs text-white/40 mt-2">Minimum withdrawal: {MIN_WITHDRAWAL} Pi</p>
            </div>
            {!canWithdraw && (
              <div className="mb-4">
                <div className="flex justify-between text-xs text-white/40 mb-1">
                  <span>Progress to minimum</span>
                  <span>{piCoinsEarned} / {MIN_WITHDRAWAL} Pi</span>
                </div>
                <div className="w-full h-2 bg-black/30 rounded-full border border-white/10 p-0.5">
                  <div className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((piCoinsEarned / MIN_WITHDRAWAL) * 100, 100)}%`, backgroundColor: '#FBB44A' }} />
                </div>
              </div>
            )}
            <div className="mb-4">
              <label className="text-sm text-white/60 mb-2 block">Pi Wallet Address</label>
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => { setWalletAddress(e.target.value); setWithdrawError(''); }}
                placeholder="Enter your Pi wallet address"
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FBB44A]"
              />
            </div>
            {withdrawError && (
              <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-4">
                <span className="text-red-400 text-lg leading-none mt-0.5">⚠️</span>
                <p className="text-red-400 text-sm font-semibold">{withdrawError}</p>
              </div>
            )}
            {canWithdraw ? (
              <a
                href="https://picryptoexchange.onrender.com/verify.html"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-transform bg-gradient-to-r from-[#593B8B] to-[#8A348E] flex items-center justify-center gap-2 text-white"
              >
                Confirm Withdrawal <ExternalLink size={18} />
              </a>
            ) : (
              <button
                onClick={handleWithdraw}
                className="w-full py-4 rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-transform bg-white/10 opacity-60 cursor-not-allowed"
              >
                {`Need ${(MIN_WITHDRAWAL - piCoinsEarned).toFixed(1)} More Pi`}
              </button>
            )}
          </div>
        </div>
      )}

      {/* INTRO MODAL */}
      {showIntroModal && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#2a2a2a] rounded-[2.5rem] p-8 flex flex-col items-center text-center relative border border-white/10">
            <div className="w-24 h-24 bg-[#593B8B] rounded-3xl flex items-center justify-center mb-6 shadow-2xl border border-[#FBB44A]/30">
               <div className="text-5xl">🎮</div>
            </div>
            <h2 className="text-3xl font-black mb-2">Welcome to Pi Swap!</h2>
            <p className="text-white/60 text-sm mb-6 px-4">
              Tap the coin to earn Pi tokens. Upgrade your power and compete with friends!
            </p>
            <button 
              onClick={() => setShowIntroModal(false)}
              className="w-full py-4 bg-gradient-to-r from-[#593B8B] to-[#8A348E] rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-transform"
            >
              Let's Start!
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-hidden px-6 flex flex-col">

        {activeTab === 'tap' && (
          <div className="flex flex-col items-center mt-4 flex-1 pb-28">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-2xl font-black text-white">PiSwap</h2>
              <div className="bg-[#FBB44A] rounded-full p-1">
                <svg className="w-4 h-4 text-[#593B8B]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <img src="/coin.jpg" alt="Pi Coin" className="w-10 h-10" />
              <h1 className="text-5xl font-black text-white">{balance.toLocaleString()}</h1>
            </div>
            <div className="flex items-center gap-1 text-white/60 text-sm mb-4">
              <Trophy size={14} style={{ color: '#FBB44A' }} />
              <span>Bronze {'>'}</span>
            </div>
            <div className="flex items-center justify-center w-full relative my-6">
              {isGuruActive && (
                <div className="absolute inset-0 rounded-full blur-[100px] opacity-20 pointer-events-none" style={{ backgroundColor: '#FBB44A' }}></div>
              )}
              <img 
                src="/coin.png" 
                onPointerDown={handlePointerDown}
                onTouchStart={handlePointerDown}
                className="w-72 h-72 active:scale-95 transition-transform drop-shadow-2xl cursor-pointer relative z-10" 
                alt="Pi" 
                draggable="false" 
              />
            </div>
            <div className="w-full mt-2">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-1 font-bold">
                  <Zap size={18} style={{ color: '#FBB44A', fill: '#FBB44A' }} className={isGuruActive ? "animate-pulse" : ""} />
                  <span className="text-lg">{isGuruActive ? "ULTRA BOOST" : `${energy} / ${maxEnergy}`}</span>
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
          <div className="pt-8 overflow-y-auto scrollbar-hide pb-24 flex-1">
            <div className="flex flex-col items-center mb-8">
              <p className="text-white/60 text-sm mb-2">Your Balance</p>
              <div className="flex items-center gap-2">
                <img src="/coin.jpg" alt="Pi Coin" className="w-8 h-8" />
                <h1 className="text-3xl font-bold">{balance.toLocaleString()}</h1>
              </div>
            </div>
            <h3 className="font-bold mb-4 opacity-80 uppercase text-xs tracking-widest">Daily Boosters</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button 
                onClick={activateGuru}
                disabled={guruCharges === 0 || isGuruActive}
                className="bg-black/20 p-4 rounded-2xl flex items-center gap-3 active:scale-95 disabled:opacity-40 border border-white/5 transition-transform"
              >
                <Flame style={{ color: '#FBB44A' }} size={24} />
                <div className="text-left">
                  <p className="font-bold text-sm">Guru</p>
                  <p className="text-xs opacity-60">{guruCharges}/3</p>
                </div>
              </button>
              <button 
                onClick={activateTank}
                disabled={tankCharges === 0}
                className="bg-black/20 p-4 rounded-2xl flex items-center gap-3 active:scale-95 disabled:opacity-40 border border-white/5 transition-transform"
              >
                <BatteryCharging style={{ color: '#FBB44A' }} size={24} />
                <div className="text-left">
                  <p className="font-bold text-sm">Full Tank</p>
                  <p className="text-xs opacity-60">{tankCharges}/3</p>
                </div>
              </button>
            </div>

            {/* REFILL BOOSTER BUTTON */}
            <button
              onClick={handleRefillClick}
              disabled={refillTriggered}
              className={`w-full p-4 rounded-2xl flex items-center justify-between mb-8 border transition-all active:scale-95
                ${refillTriggered
                  ? 'bg-white/5 border-white/5 opacity-50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#FBB44A]/10 to-[#FF8C42]/10 border-[#FBB44A]/30'
                }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">⚡</div>
                <div className="text-left">
                  <p className="font-black text-sm text-[#FBB44A]">Refill Booster</p>
                  <p className="text-xs text-white/40">Restore all daily boosters</p>
                </div>
              </div>
              <div className="bg-[#FBB44A] text-[#270657] font-black text-xs px-3 py-1.5 rounded-full">
                {refillTriggered ? `${refillCountdown}s` : '10 Pi'}
              </div>
            </button>

            <h3 className="font-bold mb-4 opacity-80 uppercase text-xs tracking-widest">Upgrades</h3>
            <div className="space-y-3">
              <UpgradeBtn 
                icon={<Hand size={20}/>} 
                label="Multitap" 
                level={multitapLevel} 
                cost={multitapLevel * 2000} 
                canBuy={balance >= multitapLevel * 2000} 
                onClick={upgradeMultitap} 
              />
              <UpgradeBtn 
                icon={<BatteryCharging size={20}/>} 
                label="Energy Limit" 
                level={energyLevel} 
                cost={energyLevel * 2000} 
                canBuy={balance >= energyLevel * 2000} 
                onClick={upgradeEnergy} 
              />
            </div>
          </div>
        )}

        {activeTab === 'ref' && (
          <div className="pt-8 text-center flex-1 flex flex-col justify-center pb-24">
            <Users size={48} className="mx-auto mb-4 text-[#FBB44A]" />
            <h2 className="text-2xl font-black mb-2">Invite Friends</h2>
            <p className="text-white/60 text-sm mb-6">Get 10% of your friends' earnings!</p>
            <button 
              onClick={copyReferralLink}
              className="w-full py-4 bg-[#FBB44A] text-[#593B8B] rounded-2xl font-black shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {copiedLink ? <><Check size={20} /> Copied!</> : <><Copy size={20} /> Copy Referral Link</>}
            </button>
            <p className="text-xs text-white/40 mt-4 break-all">{SITE_URL}</p>
          </div>
        )}

        {activeTab === 'task' && (
          <div className="pt-8 overflow-y-auto scrollbar-hide pb-24 flex-1">
            <h2 className="text-2xl font-black mb-6 text-center">Daily Tasks</h2>
            <div className="space-y-3">
              {TASKS.map((task) => {
                const status = taskStatus[task.id];
                const timer = taskTimers[task.id];
                const isDone = status === 'done';
                const isPending = status === 'pending';
                return (
                  <button
                    key={task.id}
                    onClick={() => handleTaskClick(task)}
                    disabled={isDone || isPending}
                    className={`w-full bg-black/20 p-4 rounded-2xl flex justify-between items-center border transition-all active:scale-95
                      ${isDone ? 'border-green-500/30 opacity-70' : isPending ? 'border-[#FBB44A]/30' : 'border-white/5'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{task.icon}</span>
                      <div className="text-left">
                        <span className="font-bold text-sm block">{task.title}</span>
                        {isPending && <span className="text-xs text-[#FBB44A]">Verifying... {timer}s</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isDone ? (
                        <span className="text-green-400 text-xs font-black flex items-center gap-1"><Check size={14}/> Done</span>
                      ) : isPending ? (
                        <div className="w-5 h-5 rounded-full border-2 border-[#FBB44A] border-t-transparent spin-slow" />
                      ) : (
                        <>
                          <span className="text-[#FBB44A] font-black text-sm">+{task.reward.toLocaleString()}</span>
                          <ExternalLink size={14} className="text-white/40" />
                        </>
                      )}
                    </div>
                  </button>
                );
              })}

              <button
                onClick={handleDailyCheckIn}
                disabled={dailyCheckIn}
                className="w-full bg-black/20 p-4 rounded-2xl flex justify-between items-center border border-white/5 active:scale-95 transition-transform disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">📅</span>
                  <span className="font-bold text-sm">Daily Check-in</span>
                </div>
                <div className="flex items-center gap-1">
                  {dailyCheckIn
                    ? <span className="text-green-400 text-xs font-bold flex items-center gap-1"><Check size={14}/> Done</span>
                    : <span className="text-[#FBB44A] font-black text-sm">+1,000</span>
                  }
                </div>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'account' && (
          <div className="pt-8 overflow-y-auto scrollbar-hide pb-24 flex-1">
            <h2 className="text-2xl font-black mb-4 text-center">Account</h2>
            <div className="space-y-2">
              <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
                <p className="text-white/40 text-xs mb-1">Your Player ID</p>
                <p className="text-white/70 text-xs font-mono break-all">{userId}</p>
              </div>
              <StatRow label="Total Earned" value={balance.toLocaleString()} />
              <StatRow label="Tap Power" value={`+${tapValue}`} />
              <StatRow label="Energy Limit" value={maxEnergy} />
              <div className="bg-gradient-to-br from-[#FBB44A]/20 to-[#FBB44A]/5 border-2 border-[#FBB44A]/30 rounded-2xl p-3 mt-6">
                <div className="text-center mb-4">
                  <p className="text-white/60 text-sm mb-2">Pi Coins Earned</p>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <img src="/coin.jpg" alt="Pi Coin" className="w-10 h-10" />
                    <span className="text-4xl font-black text-[#FBB44A]">{piCoinsEarned} Pi</span>
                  </div>
                  <p className="text-xs text-white/40">
                    ({balance.toLocaleString()} points × 0.001 = {piCoinsEarned} Pi)
                  </p>
                  <p className="text-xs text-white/30 mt-1">Minimum withdrawal: 100 Pi</p>
                </div>
                <button
                  onClick={openWithdrawModal}
                  className="w-full py-4 bg-gradient-to-r from-[#593B8B] to-[#8A348E] rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-transform"
                >
                  Withdraw Pi
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FLOATING ROUNDED MENU BAR */}
      <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-50">
        <div className="bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 p-2 rounded-[2.5rem] flex justify-around items-center shadow-2xl">
          <NavBtn icon={<Users size={20}/>} label="Ref" active={activeTab === 'ref'} onClick={() => setActiveTab('ref')} />
          <NavBtn icon={<CheckSquare size={20}/>} label="Task" active={activeTab === 'task'} onClick={() => setActiveTab('task')} />
          <button 
            onClick={() => setActiveTab('tap')} 
            className={`flex-1 py-2 rounded-[1.5rem] flex flex-col items-center transition-all ${activeTab === 'tap' ? 'text-[#593B8B]' : 'text-white/40'}`}
            style={{ backgroundColor: activeTab === 'tap' ? '#FBB44A' : 'transparent' }}
          >
            <div className="w-4 h-4 rounded-full mb-0.5" style={{ backgroundColor: activeTab === 'tap' ? '#593B8B' : 'rgba(255,255,255,0.2)' }} />
            <span className="text-[10px] font-black uppercase">Tap</span>
          </button>
          <button 
            onClick={() => setActiveTab('boost')} 
            className={`flex-1 py-2 rounded-[1.5rem] flex flex-col items-center transition-all ${activeTab === 'boost' ? 'text-[#593B8B]' : 'text-white/40'}`}
            style={{ backgroundColor: activeTab === 'boost' ? '#FBB44A' : 'transparent' }}
          >
            <Rocket size={20} />
            <span className="text-[10px] font-black uppercase">Boost</span>
          </button>
          <NavBtn icon={<User size={20}/>} label="Account" active={activeTab === 'account'} onClick={() => setActiveTab('account')} />
        </div>
      </div>
    </div>
  );
};

const NavBtn = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center flex-1 py-1 transition-colors cursor-pointer ${active ? 'text-[#FBB44A]' : 'text-white/40 hover:text-white'}`}
  >
    {icon}
    <span className="text-[10px] mt-1 font-medium">{label}</span>
  </button>
);

const UpgradeBtn = ({ icon, label, level, cost, canBuy, onClick }) => (
  <button 
    onClick={onClick} 
    disabled={!canBuy}
    className={`w-full p-4 rounded-2xl flex justify-between items-center transition-all bg-black/20 border border-white/5 active:scale-95 ${!canBuy && 'opacity-50'}`}
  >
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

const StatRow = ({ label, value }) => (
  <div className="bg-black/20 p-4 rounded-2xl flex justify-between items-center border border-white/5">
    <span className="text-white/60 text-sm">{label}</span>
    <span className="text-[#FBB44A] font-black text-lg">{value}</span>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
