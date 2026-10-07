import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full h-11 border-t border-[#C5CCAE] bg-[#F3F5EA] px-6 flex items-center justify-between text-[#6B7753] text-[12px] font-medium select-none shrink-0 shadow-[0_-1px_3px_rgba(0,0,0,0.02)]">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#4C9A52]"></span>
        <span className="text-[#3A4728]">Data simulasi - prototipe konseptual | DesaWatt, gagasan HORIZON 2026</span>
      </div>
      <div className="flex items-center gap-4 text-[#6B7753]">
        <span>DesaWatt © 2026</span>
      </div>
    </footer>
  );
};
