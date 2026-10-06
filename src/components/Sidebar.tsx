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
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-white border-r border-[#E2E8F0] z-50 flex flex-col justify-between select-none shadow-[2px_0_8px_rgba(0,0,0,0.02)]">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center gap-3 border-b border-[#E2E8F0] shrink-0">
          <DesaWattLogoMark size={34} className="shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-[17px] font-black leading-tight text-[#0F172A] tracking-tight truncate">
              DesaWatt
            </span>
            <span className="text-[11px] font-bold text-[#147A4B] uppercase tracking-wider truncate">
              PLTS Komunal Desa
            </span>
          </div>
        </div>

        {/* Section title */}
        <div className="px-5 pt-5 pb-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#64748B]">
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
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all text-left font-bold text-[14px] cursor-pointer ${
                  isActive
                    ? 'bg-[#147A4B] text-white shadow-sm'
                    : 'text-[#334155] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      isActive ? 'text-white' : item.isGate ? 'text-[#F5A623]' : 'text-[#64748B]'
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
                        ? 'bg-white/20 text-white'
                        : item.isGate
                        ? 'bg-[#FFF4DC] text-[#B45309] border border-[#FDE68A]'
                        : 'bg-[#E8F5EE] text-[#147A4B]'
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
      <div className="p-3.5 border-t border-[#E2E8F0] shrink-0 space-y-2">
        <div className="bg-[#E8F5EE] p-3 rounded-xl border border-[#C6E7D5] flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22A06B] animate-pulse shrink-0 shadow-sm"></span>
            <div className="flex flex-col min-w-0">
              <span className="text-[12px] font-bold text-[#0F172A] truncate">
                Server Pusat
              </span>
              <span className="text-[10px] text-[#147A4B] font-semibold truncate">Sinkronisasi Realtime</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#147A4B] text-[18px]">cloud_done</span>
        </div>

        <div className="bg-[#E8F5EE] p-3 rounded-xl border border-[#C6E7D5] flex items-start gap-2.5">
          <span className="material-symbols-outlined text-[#147A4B] text-[18px] shrink-0 mt-0.5">
            support_agent
          </span>
          <div className="flex flex-col min-w-0">
            <span className="text-[12px] font-bold text-[#0F172A] truncate">
              Bantuan Desa
            </span>
            <span className="text-[10px] text-[#334155] font-medium truncate">
              Pendamping Siap Bantu
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
