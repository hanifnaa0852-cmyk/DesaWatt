import React from 'react';
import { useDesaWatt } from '../context/DesaWattContext';
import { DesaWattLogoMark } from './DesaWattLogoMark';

export const Sidebar: React.FC = () => {
  const { activePage, setActivePage } = useDesaWatt();

  const navItems = [
    {
      id: 'beranda' as const,
      label: 'Beranda',
      icon: 'dashboard',
      badge: null,
    },
    {
      id: 'baca-desa' as const,
      label: '1 Baca Desa',
      icon: 'fact_check',
      badge: 'Pilar 1',
    },
    {
      id: 'rancang-watt' as const,
      label: '2 Rancang Watt',
      icon: 'solar_power',
      badge: 'Pilar 2',
    },
    {
      id: 'gerbang-keputusan' as const,
      label: '◇ Gerbang Keputusan',
      icon: 'verified_user',
      badge: 'Gerbang',
      isGate: true,
    },
    {
      id: 'jaga-watt' as const,
      label: '3 Jaga Watt',
      icon: 'monitor_heart',
      badge: 'Pilar 3',
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-white border-r border-slate-200 z-50 flex flex-col justify-between select-none">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center gap-3 border-b border-slate-100 shrink-0">
          <DesaWattLogoMark size={36} className="shadow-xs shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-[17px] font-extrabold leading-tight text-[#131B2E] tracking-tight truncate">
              DesaWatt
            </span>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider truncate">
              PLTS Komunal Desa
            </span>
          </div>
        </div>

        {/* Section title */}
        <div className="px-4 pt-4 pb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Menu Navigasi
          </span>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all text-left font-medium text-[14px] ${
                  isActive
                    ? 'bg-[#147A4B] text-white font-semibold shadow-sm'
                    : 'text-slate-600 hover:bg-[#F2F3FF] hover:text-[#131B2E]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      isActive ? 'text-white' : item.isGate ? 'text-[#835500]' : 'text-slate-500'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.isGate
                        ? 'bg-[#FEF6E9] text-[#835500]'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom system status cards */}
      <div className="p-3 border-t border-slate-100 shrink-0 space-y-2">
        <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#22A06B] animate-pulse shrink-0"></span>
            <div className="flex flex-col min-w-0">
              <span className="text-[12px] font-semibold text-[#131B2E] truncate">
                Server Pusat
              </span>
              <span className="text-[10px] text-slate-500 truncate">Sinkronisasi Realtime</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-slate-400 text-[18px]">cloud_done</span>
        </div>

        <div className="bg-[#EBF7F1]/50 p-2.5 rounded-xl border border-[#C1E7D4] flex items-start gap-2.5">
          <span className="material-symbols-outlined text-[#147A4B] text-[18px] shrink-0 mt-0.5">
            support_agent
          </span>
          <div className="flex flex-col min-w-0">
            <span className="text-[12px] font-semibold text-[#131B2E] truncate">
              Bantuan Desa
            </span>
            <span className="text-[10px] text-slate-600 truncate">
              Pendamping Siap Bantu
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
