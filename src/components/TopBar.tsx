import React, { useState } from 'react';
import { useDesaWatt } from '../context/DesaWattContext';
import { VillageId } from '../types';
import { CountUpNumber } from '@/components/ui/CountUpNumber';

export const TopBar: React.FC = () => {
  const {
    selectedVillageId,
    setSelectedVillageId,
    activeVillage,
    villages,
    totalScore,
    readinessLevel,
    setIsPublicPortal,
    resetDemoData,
    currentUser,
    logout,
    startTour,
  } = useDesaWatt();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getScoreBadgeColor = (level: string) => {
    if (level === 'Tinggi') return 'bg-[#E2F0E4] text-[#27602C] border-[#C2E0C5]';
    if (level === 'Menengah') return 'bg-[#F6E7BD] text-[#825708] border-[#EED38A]';
    return 'bg-[#F9DFDC] text-[#8B281B] border-[#ECAAA4]';
  };

  const getDotColor = (level: string) => {
    if (level === 'Tinggi') return 'bg-[#4C9A52]';
    if (level === 'Menengah') return 'bg-[#D99A1E]';
    return 'bg-[#B84A3A]';
  };

  return (
    <header className="sticky top-0 min-h-16 w-full bg-[#F3F5EA] border-b border-[#C5CCAE] z-40 px-3.5 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2.5 shadow-[0_1px_4px_rgba(0,0,0,0.03)] select-none">
      {/* Village selector with responsive shrink and text ellipsis */}
      <div className="relative min-w-0 flex-1 max-w-[280px] sm:max-w-md">
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between gap-1.5 sm:gap-2 bg-[#E4E8D6] border border-[#C5CCAE] rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 hover:border-[#4B5D2A] transition-all text-left group cursor-pointer shadow-xs min-w-0"
        >
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
            <span className="material-symbols-outlined text-[#4B5D2A] text-[18px] sm:text-[20px] shrink-0">
              location_on
            </span>
            <span className="text-[12.5px] sm:text-[13.5px] font-bold text-[#1F2A14] truncate min-w-0">
              {activeVillage.name}, {activeVillage.regency}
            </span>
            <span
              className={`hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-extrabold border shrink-0 ${getScoreBadgeColor(
                readinessLevel
              )}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${getDotColor(readinessLevel)}`}></span>
              <CountUpNumber value={totalScore} /> ({readinessLevel})
            </span>
          </div>
          <span className="material-symbols-outlined text-[#6B7753] text-[18px] sm:text-[20px] shrink-0 group-hover:text-[#1F2A14] transition-transform">
            {isDropdownOpen ? 'expand_less' : 'expand_more'}
          </span>
        </button>

        {isDropdownOpen && (
          <div className="absolute left-0 top-full mt-2 w-72 sm:w-80 bg-[#F3F5EA] border border-[#C5CCAE] rounded-xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#6B7753] px-3 py-1.5">
              Pilih Desa Percontohan (Kab. Mukomuko)
            </div>
            {(Object.keys(villages) as VillageId[]).map((vId) => {
              const v = villages[vId];
              const score = Object.values(v.indicators).reduce((a, b) => a + b, 0);
              const level = score <= 60 ? 'Rendah' : score <= 90 ? 'Menengah' : 'Tinggi';
              const isSelected = selectedVillageId === vId;
              return (
                <button
                  key={vId}
                  onClick={() => {
                    setSelectedVillageId(vId);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                    isSelected ? 'bg-[#E4E8D6] text-[#1F2A14] font-black' : 'hover:bg-[#FAFBF4] text-[#3A4728]'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-bold text-[13px] text-[#1F2A14] truncate">{v.name}</div>
                    <div className="text-[11px] text-[#6B7753] truncate">{v.subdistrict}</div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border shrink-0 ${getScoreBadgeColor(
                      level
                    )}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${getDotColor(level)}`}></span>
                    <CountUpNumber value={score} /> ({level})
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Right controls: responsive and wrapping gracefully */}
      <div className="flex items-center flex-wrap gap-2 shrink-0">
        {/* Tur Panduan Walkthrough button (compact icon + text) */}
        <button
          onClick={startTour}
          title="Buka panduan interaktif cara kerja sistem"
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#4B5D2A] bg-[#FAFBF4] hover:bg-[#E4E8D6] text-[#1F2A14] text-[12px] font-bold transition-all shadow-xs cursor-pointer group shrink-0"
        >
          <span className="material-symbols-outlined text-[16px] text-[#E0A526] group-hover:scale-110 transition-transform">
            explore
          </span>
          <span className="whitespace-nowrap">Tur Panduan</span>
        </button>

        {/* Reset Demo button (compact icon + short text) */}
        <button
          onClick={resetDemoData}
          title="Kembalikan data default simulasi"
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#C5CCAE] hover:border-[#4B5D2A] bg-[#FAFBF4] hover:bg-[#E4E8D6] text-[#3A4728] hover:text-[#1F2A14] text-[12px] font-bold transition-all shadow-xs cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-[15px] text-[#6B7753]">restart_alt</span>
          <span className="whitespace-nowrap">Reset Demo</span>
        </button>

        {/* Portal Transparansi Warga link (stays single line) */}
        <button
          onClick={() => setIsPublicPortal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#4B5D2A] hover:bg-[#3F4E2C] text-[#F7F8EE] border border-[#4B5D2A] transition-all text-[12px] font-bold shadow-xs whitespace-nowrap cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-[16px] text-[#E0A526]">public</span>
          <span className="whitespace-nowrap">Portal Warga (tanpa login)</span>
          <span className="material-symbols-outlined text-[14px]">open_in_new</span>
        </button>

        {/* User Profile (Concise avatar + name, always visible, without long role text) */}
        <div className="flex items-center gap-1.5 sm:gap-2 pl-2 border-l border-[#C5CCAE] shrink-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#E4E8D6] text-[#3F4E2C] border border-[#C5CCAE] flex items-center justify-center font-bold text-[12px] shrink-0">
            {currentUser.name.slice(0, 2).toUpperCase()}
          </div>
          <span className="text-[12px] sm:text-[13px] font-bold text-[#1F2A14] whitespace-nowrap">
            {currentUser.name}
          </span>
          <button
            onClick={logout}
            title="Keluar / Ganti Akun"
            className="p-1 rounded-lg text-[#6B7753] hover:text-[#B84A3A] hover:bg-[#E4E8D6] transition-colors cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
