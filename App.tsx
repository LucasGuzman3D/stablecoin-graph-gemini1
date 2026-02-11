
import React, { useState } from 'react';
import RetroWindow from './components/RetroWindow';
import StablecoinChart from './components/StablecoinChart';
import HitCounter from './components/HitCounter';
import { RETRO_ICONS } from './constants';
import { AnalystReport } from './types';

const App: React.FC = () => {
  const [showPlayer, setShowPlayer] = useState(true);

  const report: AnalystReport = {
    summary: "Stablecoins are showing exponential growth despite the 56k modem lag. Total market cap has surged from $2.6B in 2018 to $160B in 2024 — a 6,000% increase that would make even the most bullish dot-com analyst blush.",
    outlook: "Bullish on digital dollars, bearish on pets.com. Institutional adoption is accelerating and Tron's dominance continues to climb. We predict stablecoins will become the backbone of global remittances by 2026.",
    hotTake: "Tron is the new GeoCities of finance — ugly, underestimated, and somehow everywhere!"
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 relative pb-20">
      {/* Top Banner */}
      <div className="retro-bevel bg-[#c0c0c0] p-1 mb-4">
        <marquee scrollamount="5">
          ✨ Welcome to My Stablecoin Data Portal! ✨ &nbsp;&nbsp;&nbsp; 
          Current ETH Supply: $85B &nbsp;&nbsp;&nbsp; 
          Tron Dominance: 36.2% &nbsp;&nbsp;&nbsp; 
          STABLE IS THE NEW GROWTH! &nbsp;&nbsp;&nbsp; 
          STAY INFORMED, STAY STABLE! &nbsp;&nbsp;&nbsp;
          🔥 DATA UPDATED DAILY 🔥
        </marquee>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Sidebar Widgets */}
        <div className="space-y-6">
          <RetroWindow title="Nav-i-gator">
            <ul className="comic-sans text-blue-800 underline space-y-2 cursor-pointer">
              <li>[ HOME ]</li>
              <li>[ LINKS ]</li>
              <li>[ GUESTBOOK ]</li>
              <li>[ EMAIL ME ]</li>
              <li>[ DATA SOURCES ]</li>
            </ul>
            <div className="mt-4 flex justify-center">
              <img src={RETRO_ICONS.mail} alt="mail" className="w-16 h-16 pixelated" />
            </div>
          </RetroWindow>

          <RetroWindow title="System Status">
            <div className="text-xs space-y-2">
              <div className="flex justify-between">
                <span>CPU Load:</span>
                <span className="bg-green-500 w-20 h-3 border border-black relative">
                  <div className="bg-red-500 h-full w-[15%]"></div>
                </span>
              </div>
              <p>Modem: 56.6 Kbps</p>
              <p>Buffer: Optimal</p>
              <p>Market Volatility: <span className="text-red-600 font-bold">HIGH</span></p>
            </div>
          </RetroWindow>

          <div className="flex flex-col items-center">
             <img src={RETRO_ICONS.construction} alt="under construction" className="w-32 pixelated" />
             <p className="comic-sans text-[10px] text-center mt-2">Pardon our dust! Quantitative analysis in progress.</p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          <RetroWindow title="Serious Financial Dashboard - Stablecoin.exe">
            <StablecoinChart />
            
            <div className="mt-10 border-t-4 border-double border-black pt-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <img src={RETRO_ICONS.fire} alt="hot" className="w-8" />
                Analyst Report from the Desk of Dr. Crypto, PhD
              </h3>
              
              <div className="bg-blue-50 p-4 border-2 border-dashed border-blue-400 mt-2 min-h-[150px]">
                  <div className="space-y-4">
                    <div>
                      <span className="font-bold underline">Market Summary:</span>
                      <p className="text-sm mt-1">{report.summary}</p>
                    </div>
                    <div>
                      <span className="font-bold underline">Year 2005 Outlook:</span>
                      <p className="text-sm mt-1">{report.outlook}</p>
                    </div>
                    <div className="bg-yellow-100 p-2 border border-yellow-400">
                      <span className="font-bold text-red-600">HOT TAKE:</span>
                      <p className="italic text-sm">"{report.hotTake}"</p>
                    </div>
                  </div>
              </div>
            </div>
          </RetroWindow>
        </div>
      </div>

      {/* Floating Media Player */}
      {showPlayer && (
        <div className="fixed bottom-10 right-10 z-50">
          <RetroWindow 
            title="Crypto_News_May_2002.avi" 
            width="280px" 
            onClose={() => setShowPlayer(false)}
          >
            <div className="bg-black aspect-video flex items-center justify-center relative group">
              <img 
                src="https://picsum.photos/seed/finance/400/225" 
                className="w-full opacity-60 pixelated grayscale contrast-125"
                alt="pixelated video"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="bg-white/20 p-2 rounded-full cursor-pointer hover:bg-white/40">
                   <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                 </div>
              </div>
              <div className="absolute bottom-1 left-1 bg-black/80 text-[10px] text-white px-1">
                00:42 / 12:00
              </div>
            </div>
            <div className="flex justify-between mt-2 px-1">
              <div className="flex gap-1">
                <button className="retro-bevel bg-[#c0c0c0] w-6 text-xs h-6 flex items-center justify-center">◀</button>
                <button className="retro-bevel bg-[#c0c0c0] w-6 text-xs h-6 flex items-center justify-center">II</button>
                <button className="retro-bevel bg-[#c0c0c0] w-6 text-xs h-6 flex items-center justify-center">▶</button>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px]">VOL</span>
                <div className="w-12 h-2 bg-gray-300 border border-black">
                  <div className="bg-blue-600 w-2/3 h-full"></div>
                </div>
              </div>
            </div>
          </RetroWindow>
        </div>
      )}

      {/* Bottom Counter Area */}
      <footer className="w-full flex flex-col items-center gap-4 py-10">
        <HitCounter count={4782} />
        <div className="flex items-center gap-10">
           <img src={RETRO_ICONS.dollar} alt="spinning dollar" className="w-20 h-20 pixelated" />
           <div className="text-center">
             <p className="comic-sans font-bold">Best viewed in Netscape Navigator 4.0+</p>
             <p className="text-[10px]">© 2002 - Stablecoin Quant Portal. All rights reserved.</p>
           </div>
           <img src={RETRO_ICONS.dollar} alt="spinning dollar" className="w-20 h-20 pixelated" />
        </div>
      </footer>

      {/* Background Decor */}
      <div className="fixed top-20 right-5 opacity-20 pointer-events-none">
        <h1 className="text-8xl font-black rotate-12">STABLE!</h1>
      </div>
      <div className="fixed bottom-40 left-5 opacity-20 pointer-events-none">
        <h1 className="text-8xl font-black -rotate-12">GROWTH!</h1>
      </div>
    </div>
  );
};

export default App;
