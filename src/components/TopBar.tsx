import React, { useState } from 'react';
import { useDesaWatt } from '../context/DesaWattContext';
import { VillageId } from '../types';

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
  } = useDesaWatt();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getScoreBadgeColor = (level: string) => {
    if (level === 'Tinggi') return 'bg-[#EBF7F1] text-[#136B45] border-[#C1E7D4]';
    if (level === 'Menengah') return 'bg-[#FEF6E9] text-[#96600E] border-[#FCDCA7]';
    return 'bg-[#FDF2F2] text-[#A52828] border-[#F8C3C3]';
  };

  const getDotColor = (level: string) => {
    if (level === 'Tinggi') return 'bg-[#136B45]';
    if (level === 'Menengah') return 'bg-[#96600E]';
    return 'bg-[#A52828]';
  };

  return (
    <header className="sticky top-0 h-16 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 z-40 px-6 flex items-center justify-between shadow-[0_1px_4px_rgba(15,23,42,0.03)] select-none">
      {/* Village selector */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2 hover:border-slate-300 hover:bg-slate-50 transition-all text-left group cursor-pointer shadow-xs"
        >
          <span className="material-symbols-outlined text-[#147A4B] text-[20px]">location_on</span>
          <div className="flex items-center gap-2.5">
            <span className="text-[14px] font-bold text-[#131B2E] max-w-[240px] truncate">
              {activeVillage.name}, {activeVillage.regency}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[12px] font-extrabold border ${getScoreBadgeColor(
                readinessLevel
              )}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${getDotColor(readinessLevel)}`}></span>
              {totalScore} ({readinessLevel})
            </span>
          </div>
          <span className="material-symbols-outlined text-slate-400 text-[20px] group-hover:text-slate-700 transition-transform">
            {isDropdownOpen ? 'expand_less' : 'expand_more'}
          </span>
        </button>

        {isDropdownOpen && (
          <div className="absolute left-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-lg p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
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
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-all ${
                    isSelected ? 'bg-[#EBF7F1] text-[#136B45]' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-bold text-[13px]">{v.name}</div>
                    <div className="text-[11px] text-slate-500">{v.subdistrict}</div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border ${getScoreBadgeColor(
                      level
                    )}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${getDotColor(level)}`}></span>
                    {score} ({level})
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-4">
        {/* Reset Demo button */}
        <button
          onClick={resetDemoData}
          title="Kembalikan data default simulasi"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white text-slate-600 hover:text-slate-900 text-[12px] font-semibold transition-all shadow-2xs hover:bg-slate-50"
        >
          <span className="material-symbols-outlined text-[16px] text-slate-400">restart_alt</span>
          <span>Reset Demo</span>
        </button>

        {/* Portal Transparansi Warga link */}
        <button
          onClick={() => setIsPublicPortal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EBF7F1] text-[#147A4B] border border-[#C1E7D4] hover:bg-[#147A4B] hover:text-white transition-all text-[12px] font-bold shadow-2xs group whitespace-nowrap cursor-pointer"
        >
          <span className="material-symbols-outlined text-[17px]">public</span>
          <span>Portal Warga (tanpa login)</span>
          <span className="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">
            open_in_new
          </span>
        </button>

        {/* User / Actor Info with Logout button */}
        <div className="hidden xl:flex items-center gap-3 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-[#147A4B]/10 text-[#147A4B] flex items-center justify-center font-bold text-[13px] ring-1 ring-[#147A4B]/20">
            {currentUser.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[13px] font-bold text-[#131B2E] leading-tight">
              {currentUser.name}
            </span>
            <span className="text-[11px] font-medium text-slate-500">
              {currentUser.role}
            </span>
          </div>
          <button
            onClick={logout}
            title="Keluar / Ganti Akun"
            className="ml-1 p-1.5 rounded-lg text-slate-400 hover:text-[#D64545] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
