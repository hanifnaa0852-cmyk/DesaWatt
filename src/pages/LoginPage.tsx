import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useDesaWatt } from '../context/DesaWattContext';
import { VillageId } from '../types';
import { DesaWattShaderBackground } from '@/components/ui/DesaWattShaderBackground';
import { DesaWattLogoMark } from '../components/DesaWattLogoMark';
import { getReadinessLevel, toScore100 } from '../utils/score';

export const ROLES = [
  {
    id: 'pengurus' as const,
    name: 'Pengurus Koperasi Desa (KDKMP/BUMDes)',
    shortName: 'Pengurus Koperasi',
    initial: 'PK',
    icon: 'manage_accounts',
    description: 'Mengelola data desa, iuran, dan dana O&M',
  },
  {
    id: 'pendamping' as const,
    name: 'Pendamping Desa',
    shortName: 'Pendamping Desa',
    initial: 'PD',
    icon: 'engineering',
    description: 'Membantu penilaian, menyusun rencana, dan memantau',
  },
  {
    id: 'pengawas' as const,
    name: 'Pengawas Koperasi',
    shortName: 'Pengawas Koperasi',
    initial: 'PW',
    icon: 'verified_user',
    description: 'Meninjau hasil penilaian, daftar periksa, dan laporan warga',
  },
];

export const LoginPage: React.FC = () => {
  const { login, villages, setIsPublicPortal } = useDesaWatt();

  const [selectedVillageId, setSelectedVillageId] = useState<VillageId>('sumber-makmur');
  const [role, setRole] = useState<'pengurus' | 'pendamping' | 'pengawas'>('pengurus');
  const [password, setPassword] = useState('••••••••');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPulseSuccess, setShowPulseSuccess] = useState(false);

  const activeRoleConfig = ROLES.find((r) => r.id === role) || ROLES[0];

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoggingIn) return;

    setIsLoggingIn(true);

    setTimeout(() => {
      setShowPulseSuccess(true);
    }, 900);

    setTimeout(async () => {
      await login(activeRoleConfig.name, activeRoleConfig.name, activeRoleConfig.initial);
    }, 1600);
  };

  return (
    <div className="min-h-screen relative text-[#3A4728] flex flex-col justify-between overflow-x-hidden overflow-y-auto select-none font-sans">
      {/* High-Fidelity MeshShader Background */}
      <DesaWattShaderBackground />

      {/* Top Navbar */}
      <header className="relative z-20 px-4 sm:px-8 py-2.5 flex items-center justify-between border-b border-[#C5CCAE] bg-[#F3F5EA]/90 backdrop-blur-md shadow-xs shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded-[10px] bg-[#FAFBF4] border border-[#C5CCAE] flex items-center justify-center shrink-0 shadow-xs">
            <DesaWattLogoMark size={26} className="shrink-0" animated />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-[14px] sm:text-[15px] font-black tracking-tight text-[#1F2A14] leading-tight">
                DesaWatt
              </span>
              <span className="w-2 h-2 rounded-full bg-[#4C9A52] shadow-xs animate-pulse" />
            </div>
            <span className="text-[9.5px] font-bold text-[#6B7753] uppercase tracking-wider">
              Pemberdayaan Masyarakat & PLTS Komunal
            </span>
          </div>
        </div>

        {/* Public Transparency Portal without login */}
        <button
          onClick={() => setIsPublicPortal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAFBF4] hover:bg-[#E4E8D6] text-[#1F2A14] border border-[#C5CCAE] text-[11.5px] font-bold transition-all shadow-xs group cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px] text-[#E0A526]">public</span>
          <span>Portal Warga (Tanpa Login)</span>
          <span className="material-symbols-outlined text-[14px] group-hover:translate-x-0.5 transition-transform text-[#4B5D2A]">
            open_in_new
          </span>
        </button>
      </header>

      {/* Main 2-Column Split Hero Layout - Compact to fit screen */}
      <main className="relative z-20 flex-1 flex items-center justify-center p-3 sm:p-5 lg:p-6 min-w-0 w-full">
        <div className="w-full max-w-6xl grid grid-cols-1 min-[1100px]:grid-cols-12 gap-6 min-[1100px]:gap-8 items-center min-w-0">
          
          {/* LEFT COLUMN: Narrative & 6 Components Overview */}
          <div className="min-[1100px]:col-span-7 space-y-4 w-full min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F5EA] border border-[#C5CCAE] text-[#4B5D2A] text-[11px] font-extrabold tracking-wide shadow-xs">
              <span className="material-symbols-outlined text-[15px] text-[#E0A526]">diversity_3</span>
              <span>Subtema: Pemberdayaan Masyarakat (Community Empowerment)</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-[24px] sm:text-[32px] lg:text-[36px] font-black tracking-tight leading-[1.15] text-[#F7F8EE] drop-shadow-md">
                Dari Akses Energi, <br />
                <span className="text-[#F6E7BD] underline decoration-[#E0A526] decoration-4 underline-offset-4">
                  Menuju Kemandirian Desa.
                </span>
              </h1>
              <p className="text-[12.5px] sm:text-[13.5px] text-[#F7F8EE]/90 leading-relaxed max-w-xl font-medium drop-shadow-xs">
                DesaWatt membantu memfasilitasi pemetaan kebutuhan, peningkatan literasi, profil kesiapan, simulasi siklus hidup, dan pengawasan operasional. Keputusan sepenuhnya ada pada musyawarah desa.
              </p>
            </div>

            {/* 3 Component Tracks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 w-full min-w-0">
              <div className="p-3 rounded-xl bg-[#F3F5EA]/95 border border-[#C5CCAE] shadow-xs space-y-0.5 hover:border-[#4B5D2A] transition-all">
                <div className="flex items-center gap-1.5 text-[#825708] font-bold text-[11px] mb-1">
                  <span className="material-symbols-outlined text-[16px]">forum</span>
                  <span>1 & 2 • Dengar & Belajar</span>
                </div>
                <h4 className="text-[12px] font-extrabold text-[#1F2A14]">Aspirasi & Literasi</h4>
                <p className="text-[10.5px] text-[#3A4728] leading-tight">
                  Pemetaan kelompok rentan & peningkatan literasi terukur.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#F3F5EA]/95 border border-[#C5CCAE] shadow-xs space-y-0.5 hover:border-[#4B5D2A] transition-all">
                <div className="flex items-center gap-1.5 text-[#4B5D2A] font-bold text-[11px] mb-1">
                  <span className="material-symbols-outlined text-[16px]">fact_check</span>
                  <span>3 & 4 • Profil & Rancang</span>
                </div>
                <h4 className="text-[12px] font-extrabold text-[#1F2A14]">Kesiapan & O&M</h4>
                <p className="text-[10.5px] text-[#3A4728] leading-tight">
                  Profil kesenjangan & simulasi tabungan ganti baterai.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#F3F5EA]/95 border border-[#C5CCAE] shadow-xs space-y-0.5 hover:border-[#4B5D2A] transition-all">
                <div className="flex items-center gap-1.5 text-[#4B5D2A] font-bold text-[11px] mb-1">
                  <span className="material-symbols-outlined text-[16px]">handshake</span>
                  <span>5 & 6 • Kelola & Jaga</span>
                </div>
                <h4 className="text-[12px] font-extrabold text-[#1F2A14]">SOP & Pengawasan</h4>
                <p className="text-[10.5px] text-[#3A4728] leading-tight">
                  Operator warga, SOP darurat, & transparansi terbuka.
                </p>
              </div>
            </div>

            {/* Principle Motto Box */}
            <div className="p-3 rounded-xl bg-[#F3F5EA]/90 border border-[#C5CCAE] flex items-center gap-2.5 text-[11.5px] text-[#3A4728] font-semibold">
              <span className="material-symbols-outlined text-[#E0A526] text-[18px] shrink-0">verified</span>
              <span>"Warga ikut menentukan; teknologi mengikuti kebutuhan; manfaat dan biaya transparan; kapasitas lokal tumbuh."</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Compact Login Panel */}
          <div className="min-[1100px]:col-span-5">
            <div className="w-full bg-[#F3F5EA] border border-[#C5CCAE] rounded-[14px] p-5 sm:p-6 shadow-xl relative overflow-hidden">
              
              {/* Success Flash Wave */}
              <AnimatePresence>
                {showPulseSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-[#F3F5EA]/95 backdrop-blur-md pointer-events-none z-30 flex items-center justify-center"
                  >
                    <div className="text-center space-y-1.5">
                      <div className="w-10 h-10 mx-auto rounded-full bg-[#4B5D2A] text-[#F7F8EE] flex items-center justify-center shadow-md">
                        <span className="material-symbols-outlined text-[24px]">done</span>
                      </div>
                      <div className="text-[14px] font-black text-[#1F2A14]">Autentikasi Berhasil</div>
                      <div className="text-[11px] text-[#6B7753]">Membuka Dasbor Pendampingan...</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Title & subtitle */}
              <div className="flex items-center gap-3 mb-3 pb-2.5 border-b border-[#C5CCAE]">
                <div className="w-9 h-9 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] p-1 flex items-center justify-center shrink-0 shadow-2xs">
                  <DesaWattLogoMark size={24} animated />
                </div>
                <div>
                  <h2 className="text-[16px] font-black tracking-tight text-[#1F2A14] leading-tight">
                    Masuk ke DesaWatt
                  </h2>
                  <p className="text-[11px] text-[#6B7753]">
                    Pilih desa binaan dan peran untuk melanjutkan
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-3">
                {/* Village Selector Dropdown */}
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#6B7753] mb-1">
                    Pilih Desa Binaan (Kab. Mukomuko)
                  </label>
                  <div className="relative">
                    <select
                      value={selectedVillageId}
                      onChange={(e) => setSelectedVillageId(e.target.value as VillageId)}
                      disabled={isLoggingIn}
                      className="w-full bg-[#FAFBF4] border border-[#C5CCAE] text-[#1F2A14] rounded-lg px-3 py-2 text-[12px] font-bold focus:outline-none focus:border-[#4B5D2A] focus:ring-1 focus:ring-[#4B5D2A] transition-all cursor-pointer appearance-none shadow-2xs"
                    >
                      {(Object.keys(villages) as VillageId[]).map((vId) => {
                        const v = villages[vId];
                        const level = getReadinessLevel(v.dimensions);
                        return (
                          <option key={vId} value={vId} className="bg-[#FAFBF4] text-[#1F2A14]">
                            {v.name} — Kesiapan: Level {level}
                          </option>
                        );
                      })}
                    </select>
                    <span className="material-symbols-outlined text-[#6B7753] absolute right-2.5 top-2.5 pointer-events-none text-[18px]">
                      unfold_more
                    </span>
                  </div>
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#6B7753] mb-1">
                    Pilih Peran Pengguna
                  </label>
                  <div className="space-y-1.5">
                    {ROLES.map((r) => {
                      const isSelected = role === r.id;
                      return (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setRole(r.id)}
                          disabled={isLoggingIn}
                          className={`w-full text-left p-2 rounded-lg border transition-all cursor-pointer flex items-center gap-2.5 ${
                            isSelected
                              ? 'bg-[#E4E8D6] border-[#4B5D2A] text-[#1F2A14] shadow-xs'
                              : 'bg-[#FAFBF4] border-[#C5CCAE] text-[#3A4728] hover:bg-[#F3F5EA]'
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-md flex items-center justify-center font-black text-[11px] shrink-0 ${
                              isSelected
                                ? 'bg-[#4B5D2A] text-[#F7F8EE]'
                                : 'bg-[#E4E8D6] text-[#4B5D2A]'
                            }`}
                          >
                            {r.initial}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-[11.5px] font-extrabold text-[#1F2A14] leading-tight truncate">
                              {r.name}
                            </div>
                            <div className="text-[10px] text-[#6B7753] leading-tight truncate mt-0.5">
                              {r.description}
                            </div>
                          </div>
                          {isSelected && (
                            <span className="material-symbols-outlined text-[16px] text-[#4B5D2A] shrink-0">
                              check_circle
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {/* Teks bantuan di halaman login */}
                  <p className="text-[10px] text-[#6B7753] mt-1 font-medium">
                    Pilih peran untuk melihat tampilan prototipe. Data yang ditampilkan adalah ilustratif.
                  </p>
                </div>

                {/* Password input */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#6B7753]">
                      Kunci Akses Koperasi
                    </label>
                    <span className="text-[9.5px] text-[#825708] font-bold">Demo Siap Pakai</span>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoggingIn}
                    className="w-full bg-[#FAFBF4] border border-[#C5CCAE] text-[#1F2A14] rounded-lg px-3 py-1.5 text-[13px] font-mono tracking-widest focus:outline-none focus:border-[#4B5D2A] focus:ring-1 focus:ring-[#4B5D2A] transition-all"
                    placeholder="••••••••"
                  />
                </div>

                {/* Login Action Button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#4B5D2A] hover:bg-[#3F4E2C] active:scale-[0.99] text-[#F7F8EE] font-extrabold text-[13px] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isLoggingIn ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        <span>Mengakses Sistem...</span>
                      </>
                    ) : (
                      <>
                        <span className="truncate">Masuk sebagai {activeRoleConfig.shortName}</span>
                        <span className="material-symbols-outlined text-[17px] shrink-0">arrow_forward</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Bottom Security Note */}
              <div className="mt-3 pt-2.5 border-t border-[#C5CCAE] flex items-center justify-between text-[10px] text-[#6B7753]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-[#4C9A52]">verified_user</span>
                  <span>Keputusan pada Musyawarah Desa</span>
                </span>
                <span className="text-[#3A4728] font-mono">Mukomuko, Bengkulu</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 py-2.5 px-4 sm:px-8 border-t border-[#C5CCAE] bg-[#F3F5EA]/90 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[11px] text-[#6B7753] shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4C9A52]" />
          <span className="text-[#3A4728]">Data demo bersifat ilustratif, bukan hasil pengukuran lapangan.</span>
        </div>
        <div>
          <span>DesaWatt © 2026 • Subtema Pemberdayaan Masyarakat</span>
        </div>
      </footer>
    </div>
  );
};
