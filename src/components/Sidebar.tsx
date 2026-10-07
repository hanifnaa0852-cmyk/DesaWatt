import React from 'react';
import { useDesaWatt } from '../context/DesaWattContext';
import { DesaWattLogoMark } from './DesaWattLogoMark';

export const Sidebar: React.FC = () => {
  const { activePage, setActivePage, startTour } = useDesaWatt();

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
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-[#3F4E2C] border-r border-[#323E23] z-50 flex flex-col justify-between select-none shadow-[2px_0_12px_rgba(0,0,0,0.08)]">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Brand Header with cream logo tile */}
        <div className="h-16 px-5 flex items-center gap-3 border-b border-[#4B5D2A] shrink-0">
          <div className="p-1 rounded-[10px] bg-[#F3F5EA] flex items-center justify-center shrink-0 shadow-xs">
            <DesaWattLogoMark size={28} className="shrink-0" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[17px] font-black leading-tight text-[#F7F8EE] tracking-tight truncate">
              DesaWatt
            </span>
            <span className="text-[11px] font-bold text-[#D4DCBC] uppercase tracking-wider truncate">
              PLTS Komunal Desa
            </span>
          </div>
        </div>

        {/* Section title */}
        <div className="px-5 pt-4 pb-1.5 flex items-center justify-between">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#D4DCBC]">
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
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-[12px] transition-all text-left font-bold text-[14px] cursor-pointer ${
                  isActive
                    ? 'bg-[#E4E8D6] text-[#3F4E2C] shadow-sm font-black'
                    : 'text-[#EEF1DF] hover:bg-[#4B5D2A] hover:text-[#F7F8EE]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      isActive
                        ? 'text-[#3F4E2C]'
                        : item.isGate
                        ? 'text-[#E0A526]'
                        : 'text-[#D4DCBC]'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wider shrink-0 ${
                      isActive
                        ? 'bg-[#3F4E2C] text-[#E4E8D6]'
                        : item.isGate
                        ? 'bg-[#F6E7BD] text-[#825708]'
                        : 'bg-[#4B5D2A] text-[#EEF1DF]'
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

      {/* Bottom system status cards & Tour launcher */}
      <div className="p-3 border-t border-[#4B5D2A] shrink-0 space-y-2">
        {/* Quick Tour Button */}
        <button
          onClick={startTour}
          className="w-full bg-[#4B5D2A] hover:bg-[#5E7336] text-[#F7F8EE] border border-[#5E7336] rounded-xl px-3 py-2 flex items-center justify-between transition-all cursor-pointer shadow-xs text-left group"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#E0A526] text-[18px]">explore</span>
            <span className="text-[12px] font-bold">Tur Panduan</span>
          </div>
          <span className="text-[10px] bg-[#3F4E2C] text-[#D4DCBC] px-1.5 py-0.5 rounded font-extrabold group-hover:text-white">
            Mulai
          </span>
        </button>

        <div className="bg-[#364326] p-2.5 rounded-xl border border-[#4B5D2A] flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#4C9A52] animate-pulse shrink-0 shadow-sm"></span>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-bold text-[#F7F8EE] truncate">
                Server Pusat
              </span>
              <span className="text-[9.5px] text-[#D4DCBC] font-semibold truncate">Sinkronisasi Realtime</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#D4DCBC] text-[16px]">cloud_done</span>
        </div>

        <div className="bg-[#364326] p-2.5 rounded-xl border border-[#4B5D2A] flex items-start gap-2">
          <span className="material-symbols-outlined text-[#E0A526] text-[16px] shrink-0 mt-0.5">
            support_agent
          </span>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-[#F7F8EE] truncate">
              Bantuan Desa
            </span>
            <span className="text-[9.5px] text-[#D4DCBC] font-medium truncate">
              Pendamping Siap Bantu
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
