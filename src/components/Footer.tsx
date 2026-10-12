import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full min-h-11 py-2.5 border-t border-[#C5CCAE] bg-[#F3F5EA] px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[#6B7753] text-[11px] sm:text-[12px] font-medium select-none shrink-0 shadow-[0_-1px_3px_rgba(0,0,0,0.02)] print:hidden">
      <div className="flex items-center gap-2 text-center sm:text-left flex-wrap justify-center sm:justify-start">
        <span className="w-2 h-2 rounded-full bg-[#4C9A52] shrink-0"></span>
        <span className="text-[#3A4728] font-bold">Data ilustratif</span>
        <span className="text-[#C5CCAE] hidden sm:inline">•</span>
        <span className="text-[#6B7753] max-w-2xl">
          Data demo bersifat ilustratif, bukan hasil pengukuran lapangan. Angka dampak akan diukur lewat pilot dan evaluasi independen.
        </span>
      </div>
      <div className="flex items-center gap-3 text-[#6B7753] shrink-0 text-[11px]">
        <span>Pemberdayaan Masyarakat</span>
        <span>•</span>
        <span>DesaWatt © 2026</span>
      </div>
    </footer>
  );
};
