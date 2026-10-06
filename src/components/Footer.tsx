import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full h-10 border-t border-slate-200/80 bg-white px-6 flex items-center justify-between text-slate-500 text-[12px] font-medium select-none shrink-0">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#147A4B]"></span>
        <span>Data simulasi - prototipe konseptual | DesaWatt, gagasan HORIZON 2026</span>
      </div>
      <div className="flex items-center gap-4 text-slate-400">
        <span>DesaWatt © 2026</span>
      </div>
    </footer>
  );
};
