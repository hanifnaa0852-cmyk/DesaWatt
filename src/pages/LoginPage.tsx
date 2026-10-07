import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useDesaWatt } from '../context/DesaWattContext';
import { VillageId } from '../types';
import { DesaWattShaderBackground } from '@/components/ui/DesaWattShaderBackground';

export const LoginPage: React.FC = () => {
  const { login, villages, setIsPublicPortal } = useDesaWatt();

  const [selectedVillageId, setSelectedVillageId] = useState<VillageId>('sumber-makmur');
  const [role, setRole] = useState<'pengurus' | 'pendamping'>('pengurus');
  const [password, setPassword] = useState('••••••••');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPulseSuccess, setShowPulseSuccess] = useState(false);

  const selectedVillage = villages[selectedVillageId];

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoggingIn) return;

    setIsLoggingIn(true);

    // Sequence the energetic animation
    setTimeout(() => {
      setShowPulseSuccess(true);
    }, 1100);

    setTimeout(async () => {
      const username = role === 'pengurus' ? selectedVillage.pengurusName : selectedVillage.pendampingName;
      const roleLabel = role === 'pengurus' ? 'Pengurus Koperasi Desa' : 'Tenaga Pendamping Teknis';
      await login(username, roleLabel);
    }, 1900);
  };

  return (
    <div className="min-h-screen relative text-[#3A4728] flex flex-col justify-between overflow-x-hidden select-none font-sans">
      {/* High-Fidelity MeshGradient Shader Background in Army Olive & Warm Amber */}
      <DesaWattShaderBackground />

      {/* Top Navbar */}
      <header className="relative z-20 px-6 sm:px-10 py-4 flex items-center justify-between border-b border-[#C5CCAE] bg-[#F3F5EA]/90 backdrop-blur-md shadow-xs">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4C9A52] shadow-xs animate-pulse" />
          <span className="text-[12px] font-black tracking-wider text-[#1F2A14] uppercase">
            DesaWatt Portal • Kendali Mandiri Energi Bersih Desa
          </span>
        </div>

        {/* Public Transparency Portal without login */}
        <button
          onClick={() => setIsPublicPortal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAFBF4] hover:bg-[#E4E8D6] text-[#1F2A14] border border-[#C5CCAE] text-[12px] font-bold transition-all shadow-xs group cursor-pointer"
        >
          <span className="material-symbols-outlined text-[17px] text-[#E0A526]">public</span>
          <span>Portal Transparansi Warga (Tanpa Login)</span>
          <span className="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform text-[#4B5D2A]">
            open_in_new
          </span>
        </button>
      </header>

      {/* Main 2-Column Split Hero Layout */}
      <main className="relative z-20 flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12 min-w-0 w-full">
        <div className="w-full max-w-6xl grid grid-cols-1 min-[1100px]:grid-cols-12 gap-8 min-[1100px]:gap-12 items-center min-w-0">
          
          {/* LEFT COLUMN: Engaging Hero Showcase & Live Microgrid Highlights */}
          <div className="min-[1100px]:col-span-7 space-y-6 w-full min-w-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3F5EA] border border-[#C5CCAE] text-[#4B5D2A] text-[12px] font-extrabold tracking-wide shadow-xs">
              <span className="material-symbols-outlined text-[16px] text-[#E0A526]">bolt</span>
              <span>Kedaulatan Energi Berkelanjutan BUMDes & Koperasi</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-[28px] sm:text-[38px] lg:text-[44px] font-black tracking-tight leading-[1.15] text-[#F7F8EE] drop-shadow-md">
                Nyalakan Terang Desa, <br />
                <span className="text-[#F6E7BD] underline decoration-[#E0A526] decoration-4 underline-offset-4">
                  Kawal PLTS Bebas Mangkrak.
                </span>
              </h1>
              <p className="text-[14px] sm:text-[15px] text-[#F7F8EE]/90 leading-relaxed max-w-xl font-medium drop-shadow-xs">
                Platform terpadu pendukung keputusan koperasi desa: analisis kesiapan komunal, uji ketahanan kas baterai, dan pengawasan operasional microgrid secara transparan.
              </p>
            </div>

            {/* 3 Value Proposition Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 w-full min-w-0">
              <div className="p-4 rounded-[14px] bg-[#F3F5EA]/95 border border-[#C5CCAE] shadow-xs space-y-1 hover:border-[#4B5D2A] transition-all">
                <div className="w-8 h-8 rounded-lg bg-[#E4E8D6] text-[#4B5D2A] flex items-center justify-center font-bold mb-2">
                  <span className="material-symbols-outlined text-[18px]">fact_check</span>
                </div>
                <h4 className="text-[13px] font-extrabold text-[#1F2A14]">Baca Desa</h4>
                <p className="text-[11px] text-[#3A4728] leading-snug">
                  8 indeks kesiapan teknis, kelembagaan & kapasitas iuran.
                </p>
              </div>

              <div className="p-4 rounded-[14px] bg-[#F3F5EA]/95 border border-[#C5CCAE] shadow-xs space-y-1 hover:border-[#4B5D2A] transition-all">
                <div className="w-8 h-8 rounded-lg bg-[#F6E7BD] text-[#825708] flex items-center justify-center font-bold mb-2">
                  <span className="material-symbols-outlined text-[18px]">tune</span>
                </div>
                <h4 className="text-[13px] font-extrabold text-[#1F2A14]">Rancang Watt</h4>
                <p className="text-[11px] text-[#3A4728] leading-snug">
                  Simulator arus kas & sinking fund baterai hingga 20 tahun.
                </p>
              </div>

              <div className="p-4 rounded-[14px] bg-[#F3F5EA]/95 border border-[#C5CCAE] shadow-xs space-y-1 hover:border-[#4B5D2A] transition-all">
                <div className="w-8 h-8 rounded-lg bg-[#E4E8D6] text-[#4B5D2A] flex items-center justify-center font-bold mb-2">
                  <span className="material-symbols-outlined text-[18px]">shield</span>
                </div>
                <h4 className="text-[13px] font-extrabold text-[#1F2A14]">Jaga Watt</h4>
                <p className="text-[11px] text-[#3A4728] leading-snug">
                  Deteksi dini 4 dimensi & pencegahan aset PLTS mangkrak.
                </p>
              </div>
            </div>

            {/* Live Microgrid Badge Status */}
            <div className="p-4 rounded-[14px] bg-[#F3F5EA]/95 border border-[#C5CCAE] flex items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#4B5D2A] text-[#F7F8EE] flex items-center justify-center font-bold shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-[22px]">solar_power</span>
                </div>
                <div>
                  <div className="text-[13px] font-extrabold text-[#1F2A14] flex items-center gap-2">
                    <span>Pilot Microgrid Kab. Mukomuko</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E2F0E4] text-[#27602C] font-bold border border-[#C2E0C5]">
                      Aktif Normal
                    </span>
                  </div>
                  <div className="text-[11px] text-[#6B7753] mt-0.5 font-medium">
                    3 Desa Binaan • 145 kWp Total Kapasitas Terpasang • 530 KK Terlayani
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Login Panel */}
          <div className="lg:col-span-5">
            <div className="w-full bg-[#F3F5EA] border border-[#C5CCAE] rounded-[14px] p-7 sm:p-9 shadow-xl relative overflow-hidden">
              
              {/* Success Flash Wave upon Login */}
              <AnimatePresence>
                {showPulseSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-[#F3F5EA]/95 backdrop-blur-md pointer-events-none z-30 flex items-center justify-center"
                  >
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 mx-auto rounded-full bg-[#4B5D2A] text-[#F7F8EE] flex items-center justify-center shadow-md">
                        <span className="material-symbols-outlined text-[28px]">done</span>
                      </div>
                      <div className="text-[15px] font-black text-[#1F2A14]">Autentikasi Berhasil</div>
                      <div className="text-[12px] text-[#6B7753]">Membuka Dashboard Microgrid...</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CLEAN ANIMATED LOGO MARK */}
              <div className="flex flex-col items-center text-center mb-6">
                <motion.div
                  animate={{
                    y: isLoggingIn ? [0, -6, 0] : [0, -3, 0],
                    scale: isLoggingIn ? [1, 1.05, 1] : 1,
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: isLoggingIn ? 0.6 : 3.5,
                    ease: 'easeInOut',
                  }}
                  className="mb-3 relative"
                >
                  {/* Clean Cream Tile for Logo */}
                  <div className="w-18 h-18 rounded-[14px] bg-[#FAFBF4] border border-[#C5CCAE] p-2.5 shadow-xs flex items-center justify-center">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full overflow-visible"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Sun Beams in warm amber */}
                      <motion.g
                        animate={{
                          opacity: isLoggingIn ? [0.6, 1, 0.6] : [0.75, 1, 0.75],
                          scale: isLoggingIn ? [1, 1.25, 1] : [1, 1.05, 1],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: isLoggingIn ? 0.4 : 2,
                        }}
                        style={{ transformOrigin: '50px 52px' }}
                      >
                        <line x1="28" y1="28" x2="35" y2="35" stroke="#E0A526" strokeWidth="4.5" strokeLinecap="round" />
                        <line x1="50" y1="17" x2="50" y2="27" stroke="#E0A526" strokeWidth="4.5" strokeLinecap="round" />
                        <line x1="72" y1="28" x2="65" y2="35" stroke="#E0A526" strokeWidth="4.5" strokeLinecap="round" />
                      </motion.g>

                      {/* Rising Half-Sun Arc (Warm Amber #E0A526) */}
                      <path d="M 28 52 A 22 22 0 0 1 72 52 Z" fill="#E0A526" />

                      {/* Center Connection Node */}
                      <motion.circle
                        cx="50"
                        cy="52"
                        r={isLoggingIn ? 7.5 : 6}
                        fill="#FAFBF4"
                        stroke="#4B5D2A"
                        strokeWidth="2"
                        animate={{
                          scale: isLoggingIn ? [1, 1.3, 1] : [1, 1.1, 1],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: isLoggingIn ? 0.5 : 1.8,
                        }}
                        style={{ transformOrigin: '50px 52px' }}
                      />
                      <circle cx="50" cy="52" r="2.8" fill="#4B5D2A" />

                      {/* Pitched Village Roof Line */}
                      <path
                        d="M 18 64 L 50 40 L 82 64"
                        stroke="#3F4E2C"
                        strokeWidth="4.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Solar Panel Cells Base Grid */}
                      <rect x="27" y="65" width="12" height="15" rx="2" fill="#4B5D2A" />
                      <rect x="44" y="65" width="12" height="15" rx="2" fill="#4B5D2A" />
                      <rect x="61" y="65" width="12" height="15" rx="2" fill="#4B5D2A" />

                      <line x1="27" y1="72.5" x2="39" y2="72.5" stroke="#F7F8EE" strokeWidth="1.5" />
                      <line x1="44" y1="72.5" x2="56" y2="72.5" stroke="#F7F8EE" strokeWidth="1.5" />
                      <line x1="61" y1="72.5" x2="73" y2="72.5" stroke="#F7F8EE" strokeWidth="1.5" />

                      {/* Stable Bedrock Ground Line */}
                      <line x1="22" y1="84" x2="78" y2="84" stroke="#6B7753" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </div>
                </motion.div>

                <h2 className="text-[22px] font-black tracking-tight text-[#1F2A14] flex items-center gap-1.5">
                  <span>Masuk ke</span>
                  <span className="text-[#4B5D2A]">Desa</span>
                  <span className="text-[#E0A526]">Watt</span>
                </h2>
                <p className="text-[12px] text-[#6B7753] mt-0.5">
                  Pilih desa binaan dan peran untuk melanjutkan simulasi
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Village Selector Dropdown */}
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#6B7753] mb-1.5">
                    Pilih Desa Binaan (Kab. Mukomuko)
                  </label>
                  <div className="relative">
                    <select
                      value={selectedVillageId}
                      onChange={(e) => setSelectedVillageId(e.target.value as VillageId)}
                      disabled={isLoggingIn}
                      className="w-full bg-[#FAFBF4] border border-[#C5CCAE] text-[#1F2A14] rounded-xl px-4 py-3 text-[13px] font-bold focus:outline-none focus:border-[#4B5D2A] focus:ring-1 focus:ring-[#4B5D2A] transition-all cursor-pointer appearance-none shadow-xs"
                    >
                      {(Object.keys(villages) as VillageId[]).map((vId) => {
                        const v = villages[vId];
                        const score = Object.values(v.indicators).reduce((a, b) => a + b, 0);
                        const level = score <= 60 ? 'Rendah' : score <= 90 ? 'Menengah' : 'Tinggi';
                        return (
                          <option key={vId} value={vId} className="bg-[#FAFBF4] text-[#1F2A14]">
                            {v.name} — Skor {score}/120 ({level})
                          </option>
                        );
                      })}
                    </select>
                    <span className="material-symbols-outlined text-[#6B7753] absolute right-3 top-3.5 pointer-events-none text-[20px]">
                      unfold_more
                    </span>
                  </div>
                </div>

                {/* Role Toggle */}
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#6B7753] mb-1.5">
                    Peran Pengguna
                  </label>
                  <div className="grid grid-cols-2 gap-2 bg-[#FAFBF4] p-1.5 rounded-xl border border-[#C5CCAE]">
                    <button
                      type="button"
                      onClick={() => setRole('pengurus')}
                      disabled={isLoggingIn}
                      className={`py-2 px-2.5 rounded-lg text-[12px] font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        role === 'pengurus'
                          ? 'bg-[#4B5D2A] text-[#F7F8EE] shadow-xs'
                          : 'text-[#3A4728] hover:text-[#1F2A14]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">manage_accounts</span>
                      <span className="truncate">{selectedVillage.pengurusName} (Pengurus)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('pendamping')}
                      disabled={isLoggingIn}
                      className={`py-2 px-2.5 rounded-lg text-[12px] font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        role === 'pendamping'
                          ? 'bg-[#4B5D2A] text-[#F7F8EE] shadow-xs'
                          : 'text-[#3A4728] hover:text-[#1F2A14]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">engineering</span>
                      <span className="truncate">{selectedVillage.pendampingName} (Pendamping)</span>
                    </button>
                  </div>
                </div>

                {/* Password input */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#6B7753]">
                      Kunci Akses Koperasi
                    </label>
                    <span className="text-[10px] text-[#825708] font-bold">Demo Siap Pakai</span>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoggingIn}
                    className="w-full bg-[#FAFBF4] border border-[#C5CCAE] text-[#1F2A14] rounded-xl px-4 py-2.5 text-[14px] font-mono tracking-widest focus:outline-none focus:border-[#4B5D2A] focus:ring-1 focus:ring-[#4B5D2A] transition-all"
                    placeholder="••••••••"
                  />
                </div>

                {/* Login Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full relative py-3.5 px-6 rounded-xl bg-[#4B5D2A] hover:bg-[#3F4E2C] active:scale-[0.99] text-[#F7F8EE] font-extrabold text-[14px] shadow-sm transition-all flex items-center justify-center gap-2.5 overflow-hidden cursor-pointer"
                  >
                    {isLoggingIn && (
                      <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '200%' }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                      />
                    )}

                    {isLoggingIn ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        <span>Mengakses Microgrid...</span>
                      </>
                    ) : (
                      <>
                        <span>Buka Dashboard & Simulasi</span>
                        <span className="material-symbols-outlined text-[19px]">arrow_forward</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Bottom Security Note */}
              <div className="mt-5 pt-4 border-t border-[#C5CCAE] flex items-center justify-between text-[11px] text-[#6B7753]">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-[#4C9A52]">verified_user</span>
                  <span>Sistem Keputusan Terverifikasi</span>
                </span>
                <span className="text-[#3A4728] font-mono font-medium">Mukomuko, Bengkulu</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 py-4 px-6 sm:px-10 border-t border-[#C5CCAE] bg-[#F3F5EA]/90 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-[#6B7753]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4C9A52]" />
          <span className="text-[#3A4728]">Data simulasi - prototipe konseptual | DesaWatt, gagasan HORIZON 2026</span>
        </div>
        <div>
          <span>DesaWatt © 2026</span>
        </div>
      </footer>
    </div>
  );
};
