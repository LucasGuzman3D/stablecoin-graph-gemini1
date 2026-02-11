
import React from 'react';

interface RetroWindowProps {
  title: string;
  children: React.ReactNode;
  width?: string;
  className?: string;
  onClose?: () => void;
}

const RetroWindow: React.FC<RetroWindowProps> = ({ title, children, width = 'auto', className = '', onClose }) => {
  return (
    <div className={`retro-bevel bg-[#c0c0c0] p-[3px] shadow-lg ${className}`} style={{ width }}>
      <div className="win95-title mb-1">
        <span>{title}</span>
        <div className="flex gap-1">
          <button className="retro-bevel w-4 h-4 bg-[#c0c0c0] text-black text-[10px] flex items-center justify-center font-bold active:retro-bevel-inset">_</button>
          <button className="retro-bevel w-4 h-4 bg-[#c0c0c0] text-black text-[10px] flex items-center justify-center font-bold active:retro-bevel-inset">□</button>
          <button 
            onClick={onClose}
            className="retro-bevel w-4 h-4 bg-[#c0c0c0] text-black text-[10px] flex items-center justify-center font-bold active:retro-bevel-inset"
          >X</button>
        </div>
      </div>
      <div className="retro-bevel-inset bg-white p-4 h-full overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default RetroWindow;
