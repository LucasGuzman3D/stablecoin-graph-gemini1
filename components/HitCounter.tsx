
import React from 'react';

const HitCounter: React.FC<{ count: number }> = ({ count }) => {
  const paddedCount = count.toString().padStart(8, '0');
  
  return (
    <div className="bg-black border-2 border-[#808080] p-1 inline-flex items-center gap-2">
      <span className="text-[10px] text-white uppercase font-mono">You are visitor</span>
      <div className="flex gap-[1px]">
        {paddedCount.split('').map((digit, i) => (
          <div 
            key={i} 
            className="bg-[#111] text-[#0f0] font-mono text-2xl px-1 border border-[#333] shadow-inner"
            style={{ fontFamily: "'VT323', monospace" }}
          >
            {digit}
          </div>
        ))}
      </div>
      <img 
        src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3N6Y3h6Y3h6Y3h6Y3h6Y3h6Y3h6Y3h6Y3h6Y3h6Y3h6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKMGpxP5OsuwO08/giphy.gif" 
        className="w-6 h-6 pixelated"
        alt="world"
      />
    </div>
  );
};

export default HitCounter;
