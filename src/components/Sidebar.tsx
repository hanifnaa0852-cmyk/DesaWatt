import React from 'react';
import { useDesaWatt } from '../context/DesaWattContext';
import { DesaWattLogoMark } from './DesaWattLogoMark';

export const Sidebar: React.FC = () => {
  const { activePage, setActivePage, isSidebarCollapsed, toggleSidebar } = useDesaWatt();

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
    {
      id: 'ringkasan-wilayah' as const,
      label: 'Ringkasan Wilayah',
      icon: 'public',
      badge: null,
      roleTag: 'Kemenkop · ESDM · Kemendes · Dinas',
    },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-[#3F4E2C] border-r border-[#323E23] z-50 flex flex-col justify-between select-none shadow-[2px_0_12px_rgba(0,0,0,0.08)] transition-all duration-300 ${
        isSidebarCollapsed
          ? 'w-[68px]'
          : 'w-[68px] min-[1100px]:w-[220px] 2xl:w-[260px]'
      }`}
    >
      <div className="flex flex-col flex-1 min-h-0">
        {/* Brand Header with cream logo tile & Collapse Toggle */}
        <div
          className={`h-16 border-b border-[#4B5D2A] shrink-0 flex items-center transition-all ${
            isSidebarCollapsed ? 'px-2.5 justify-center' : 'px-3.5 2xl:px-5 justify-between'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              onClick={toggleSidebar}
              title={isSidebarCollapsed ? 'Buka Sidebar' : 'Lipat Sidebar'}
              className="p-1 rounded-[10px] bg-[#FAFBF4] flex items-center justify-center shrink-0 shadow-xs cursor-pointer hover:scale-105 transition-transform"
            >
              <DesaWattLogoMark size={28} className="shrink-0" />
            </div>

            {!isSidebarCollapsed && (
              <div className="hidden min-[1100px]:flex flex-col min-w-0">
                <span className="text-[16px] 2xl:text-[17px] font-black leading-tight text-[#F7F8EE] tracking-tight truncate">
                  DesaWatt
                </span>
                <span className="text-[10px] 2xl:text-[11px] font-bold text-[#D4DCBC] uppercase tracking-wider truncate">
                  PLTS Komunal Desa
                </span>
              </div>
            )}
          </div>

          {/* Toggle fold/unfold button */}
          {!isSidebarCollapsed && (
            <button
              onClick={toggleSidebar}
              title="Lipat Sidebar"
              className="hidden min-[1100px]:flex w-7 h-7 rounded-lg text-[#D4DCBC] hover:text-[#F7F8EE] hover:bg-[#4B5D2A] items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">first_page</span>
            </button>
          )}
        </div>

        {/* Section title (only when expanded) */}
        {!isSidebarCollapsed && (
          <div className="hidden min-[1100px]:flex px-4 2xl:px-5 pt-3.5 pb-1 items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#D4DCBC]">
              Menu Navigasi
            </span>
          </div>
        )}

        {/* Navigation list */}
        <nav className="flex-1 px-2 min-[1100px]:px-2.5 2xl:px-3 pt-2 space-y-1.5 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                title={item.label}
                className={`w-full flex items-center rounded-[12px] transition-all text-left font-bold text-[13px] 2xl:text-[14px] cursor-pointer group ${
                  isSidebarCollapsed
                    ? 'justify-center p-2.5'
                    : 'justify-center min-[1100px]:justify-between p-2.5 min-[1100px]:px-3 min-[1100px]:py-2 2xl:px-3.5 2xl:py-2.5'
                } ${
                  isActive
                    ? 'bg-[#E4E8D6] text-[#3F4E2C] shadow-sm font-black'
                    : 'text-[#EEF1DF] hover:bg-[#4B5D2A] hover:text-[#F7F8EE]'
                }`}
              >
                <div className="flex items-center gap-2.5 2xl:gap-3 min-w-0">
                  <span
                    className={`material-symbols-outlined text-[20px] shrink-0 ${
                      isActive
                        ? 'text-[#3F4E2C]'
                        : item.isGate
                        ? 'text-[#E0A526]'
                        : 'text-[#D4DCBC]'
                    }`}
                  >
                    {item.icon}
                  </span>
                  {!isSidebarCollapsed && (
                    <div className="hidden min-[1100px]:flex flex-col min-w-0">
                      <span className="truncate">{item.label}</span>
                      {'roleTag' in item && item.roleTag && (
                        <span className={`text-[9px] truncate font-medium ${
                          isActive ? 'text-[#3F4E2C]/80' : 'text-[#D4DCBC]/80'
                        }`}>
                          {item.roleTag}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {!isSidebarCollapsed && item.badge && (
                  <span
                    className={`hidden min-[1100px]:inline text-[9.5px] 2xl:text-[10px] px-1.5 2xl:px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wider shrink-0 ${
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

      {/* Bottom status & fold toggle */}
      <div className="p-2 min-[1100px]:p-3 border-t border-[#4B5D2A] shrink-0 space-y-2">
        {/* If collapsed: single button to expand */}
        {isSidebarCollapsed ? (
          <button
            onClick={toggleSidebar}
            title="Buka Sidebar"
            className="w-full h-9 rounded-xl bg-[#4B5D2A] hover:bg-[#5E7336] text-[#F7F8EE] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[20px]">last_page</span>
          </button>
        ) : (
          <>
            <div className="hidden min-[1100px]:flex bg-[#364326] p-2 2xl:p-2.5 rounded-xl border border-[#4B5D2A] items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2 h-2 rounded-full bg-[#4C9A52] animate-pulse shrink-0 shadow-sm"></span>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10.5px] 2xl:text-[11px] font-bold text-[#F7F8EE] truncate">
                    Server Pusat
                  </span>
                  <span className="text-[9px] 2xl:text-[9.5px] text-[#D4DCBC] font-semibold truncate">
                    Sinkronisasi Realtime
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#D4DCBC] text-[15px] 2xl:text-[16px]">
                cloud_done
              </span>
            </div>

            <div className="hidden min-[1100px]:flex bg-[#364326] p-2 2xl:p-2.5 rounded-xl border border-[#4B5D2A] items-start gap-2">
              <span className="material-symbols-outlined text-[#E0A526] text-[15px] 2xl:text-[16px] shrink-0 mt-0.5">
                support_agent
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-[10.5px] 2xl:text-[11px] font-bold text-[#F7F8EE] truncate">
                  Bantuan Desa
                </span>
                <span className="text-[9px] 2xl:text-[9.5px] text-[#D4DCBC] font-medium truncate">
                  Pendamping Siap Bantu
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};
