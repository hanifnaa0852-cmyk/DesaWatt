import React from 'react';
import { useDesaWatt } from '../context/DesaWattContext';
import { DesaWattLogoMark } from './DesaWattLogoMark';

export const Sidebar: React.FC = () => {
  const { activePage, setActivePage, isSidebarCollapsed, toggleSidebar, setIsPublicPortal } = useDesaWatt();

  const navItems = [
    {
      id: 'beranda' as const,
      label: 'Beranda',
      sublabel: 'Kemandirian Desa',
      icon: 'dashboard',
      badge: null,
      badgeColor: 'system',
    },
    {
      id: 'dengar-warga' as const,
      label: '1. Dengar Warga',
      sublabel: 'Kebutuhan & musyawarah',
      icon: 'forum',
      badge: 'Pendampingan',
      badgeColor: 'amber',
    },
    {
      id: 'belajar-energi' as const,
      label: '2. Belajar Energi',
      sublabel: 'Literasi terukur pre/post',
      icon: 'school',
      badge: 'Pendampingan',
      badgeColor: 'amber',
    },
    {
      id: 'baca-desa' as const,
      label: '3. Baca Desa',
      sublabel: 'Profil kesiapan & kesenjangan',
      icon: 'fact_check',
      badge: 'Sistem',
      badgeColor: 'system',
    },
    {
      id: 'rancang-watt' as const,
      label: '4. Rancang Watt',
      sublabel: 'Biaya siklus hidup & O&M',
      icon: 'tune',
      badge: 'Sistem',
      badgeColor: 'system',
    },
    {
      id: 'gerbang-keputusan' as const,
      label: '◇ Gerbang Keputusan',
      sublabel: 'Tahap penghubung musdes',
      icon: 'verified_user',
      badge: 'Penghubung',
      badgeColor: 'gate',
      isGate: true,
    },
    {
      id: 'kelola-bersama' as const,
      label: '5. Kelola Bersama',
      sublabel: 'Operator, SOP, pembukuan',
      icon: 'hub',
      badge: 'Pendampingan',
      badgeColor: 'amber',
    },
    {
      id: 'jaga-watt' as const,
      label: '6. Jaga Watt',
      sublabel: 'Monitoring, keluhan, aksi',
      icon: 'monitor_heart',
      badge: 'Sistem',
      badgeColor: 'system',
    },
    {
      id: 'portal-warga' as const,
      label: 'Portal Warga',
      sublabel: 'Transparansi tanpa login',
      icon: 'public',
      badge: 'Publik',
      badgeColor: 'public',
      isPortalAction: true,
    },
    {
      id: 'ringkasan-wilayah' as const,
      label: 'Ringkasan Wilayah',
      sublabel: 'Tinjauan multi-desa',
      icon: 'domain',
      badge: null,
      badgeColor: 'system',
    },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-[#3F4E2C] border-r border-[#323E23] z-50 flex flex-col justify-between select-none shadow-[2px_0_12px_rgba(0,0,0,0.08)] transition-all duration-300 print:hidden ${
        isSidebarCollapsed
          ? 'w-[68px]'
          : 'w-[68px] min-[1100px]:w-[300px] 2xl:w-[320px]'
      }`}
    >
      <div className="flex flex-col flex-1 min-h-0">
        {/* Brand Header with cream logo tile & Collapse Toggle */}
        <div
          className={`h-16 border-b border-[#4B5D2A] shrink-0 flex items-center transition-all ${
            isSidebarCollapsed ? 'px-2.5 justify-center' : 'px-4 2xl:px-5 justify-between'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              onClick={toggleSidebar}
              title={isSidebarCollapsed ? 'Buka Sidebar' : 'Lipat Sidebar'}
              className="p-1 rounded-[10px] bg-[#FAFBF4] border border-[#C5CCAE] flex items-center justify-center shrink-0 shadow-xs cursor-pointer hover:scale-105 transition-transform"
            >
              <DesaWattLogoMark size={28} className="shrink-0" animated />
            </div>

            {!isSidebarCollapsed && (
              <div className="hidden min-[1100px]:flex flex-col min-w-0">
                <span className="text-[16px] 2xl:text-[17px] font-black leading-tight text-[#F7F8EE] tracking-tight truncate">
                  DesaWatt
                </span>
                <span className="text-[10px] 2xl:text-[11px] font-bold text-[#D4DCBC] uppercase tracking-wider truncate">
                  Pemberdayaan Masyarakat
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
          <div className="hidden min-[1100px]:flex px-4 2xl:px-5 pt-3 pb-1 items-center justify-between">
            <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-[#D4DCBC]">
              Alur 6 Komponen Pemberdayaan
            </span>
          </div>
        )}

        {/* Navigation list */}
        <nav className="flex-1 px-2 min-[1100px]:px-3 pt-1.5 space-y-1 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => {
            const isActive = !('isPortalAction' in item) && activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if ('isPortalAction' in item && item.isPortalAction) {
                    setIsPublicPortal(true);
                  } else {
                    setActivePage(item.id as any);
                  }
                }}
                title={item.label}
                className={`w-full flex items-center rounded-[12px] transition-all text-left font-bold cursor-pointer group ${
                  isSidebarCollapsed
                    ? 'justify-center p-2'
                    : 'p-2 min-[1100px]:px-3 min-[1100px]:py-2.5'
                } ${
                  isActive
                    ? 'bg-[#E4E8D6] text-[#3F4E2C] shadow-sm font-black'
                    : 'text-[#EEF1DF] hover:bg-[#4B5D2A] hover:text-[#F7F8EE]'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <span
                    className={`material-symbols-outlined text-[20px] shrink-0 mt-0.5 ${
                      isActive
                        ? 'text-[#3F4E2C]'
                        : item.badgeColor === 'amber'
                        ? 'text-[#F6E7BD]'
                        : item.badgeColor === 'gate'
                        ? 'text-[#E0A526]'
                        : item.badgeColor === 'public'
                        ? 'text-[#E0A526]'
                        : 'text-[#D4DCBC]'
                    }`}
                  >
                    {item.icon}
                  </span>
                  {!isSidebarCollapsed && (
                    <div className="hidden min-[1100px]:flex flex-col min-w-0 flex-1">
                      <span className="text-[13.5px] leading-snug whitespace-nowrap font-extrabold">
                        {item.label}
                      </span>
                      <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                        {item.badge && (
                          <span
                            className={`text-[8.5px] px-1.5 py-0.2 rounded font-black uppercase tracking-wider shrink-0 ${
                              isActive
                                ? 'bg-[#3F4E2C] text-[#E4E8D6]'
                                : item.badgeColor === 'amber'
                                ? 'bg-[#F6E7BD] text-[#825708]'
                                : item.badgeColor === 'gate'
                                ? 'bg-[#FAFBF4] text-[#4B5D2A]'
                                : item.badgeColor === 'public'
                                ? 'bg-[#F6E7BD] text-[#825708]'
                                : 'bg-[#4B5D2A] text-[#EEF1DF]'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                        {item.sublabel && (
                          <span
                            className={`text-[9.5px] truncate font-medium ${
                              isActive ? 'text-[#3F4E2C]/85' : 'text-[#D4DCBC]/85'
                            }`}
                          >
                            {item.sublabel}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom status & fold toggle */}
      <div className="p-2 min-[1100px]:p-3 border-t border-[#4B5D2A] shrink-0 space-y-2">
        {isSidebarCollapsed ? (
          <button
            onClick={toggleSidebar}
            title="Buka Sidebar"
            className="w-full h-8 rounded-xl bg-[#4B5D2A] hover:bg-[#5E7336] text-[#F7F8EE] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">last_page</span>
          </button>
        ) : (
          <div className="hidden min-[1100px]:flex bg-[#364326] p-2.5 rounded-xl border border-[#4B5D2A] flex-col gap-1">
            <div className="flex items-center gap-1.5 text-[10px] text-[#F6E7BD] font-bold">
              <span className="material-symbols-outlined text-[14px] text-[#E0A526]">diversity_3</span>
              <span>Kemandirian Berkelanjutan</span>
            </div>
            <p className="text-[8.5px] text-[#D4DCBC] leading-tight">
              DesaWatt membantu menyajikan data; keputusan di musyawarah desa.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};
