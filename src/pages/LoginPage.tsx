import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useDesaWatt } from '../context/DesaWattContext';
import { VillageId } from '../types';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';

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
    <BackgroundGradientAnimation
      gradientBackgroundStart="#071510"
      gradientBackgroundEnd="#0A1828"
      firstColor="20, 122, 75"        /* Deep Green #147A4B */
      secondColor="245, 166, 35"      /* Solar Amber #F5A623 */
      thirdColor="0, 95, 56"          /* Dark Forest Green #005F38 */
      fourthColor="254, 174, 44"      /* Warm Solar Gold #FEAE2C */
      fifthColor="19, 107, 69"        /* Emerald Energy #136B45 */
      pointerColor="52, 211, 153"     /* Interactive cursor glow */
      size="85%"
      blendingValue="screen"
      interactive={true}
      containerClassName="min-h-screen h-screen w-screen overflow-y-auto"
      className="min-h-screen flex flex-col justify-between"
    >
      {/* Top Navbar */}
      <header className="relative z-20 px-6 sm:px-10 py-5 flex items-center justify-between border-b border-white/[0.08] backdrop-blur-md bg-black/[0.2]">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#34D399] shadow-[0_0_10px_#34D399] animate-pulse" />
          <span className="text-[12px] font-extrabold tracking-wider text-slate-200 uppercase">
            DesaWatt Portal • Kendali Mandiri Energi Bersih Desa
          </span>
        </div>

        {/* Public Transparency Portal without login */}
        <button
          onClick={() => setIsPublicPortal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.16] text-slate-100 hover:text-white border border-white/15 text-[12px] font-bold transition-all shadow-xs group cursor-pointer backdrop-blur-sm"
        >
          <span className="material-symbols-outlined text-[17px] text-[#F5A623]">public</span>
          <span>Portal Transparansi Warga (Tanpa Login)</span>
          <span className="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform text-slate-300 group-hover:text-white">
            open_in_new
          </span>
        </button>
      </header>

      {/* Main 2-Column Split Hero Layout */}
      <main className="relative z-20 flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Engaging Hero Showcase & Live Microgrid Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#147A4B]/30 border border-[#34D399]/40 text-[#4ADE80] text-[12px] font-extrabold tracking-wide backdrop-blur-md">
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              <span>Kedaulatan Energi Berkelanjutan BUMDes & Koperasi</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-[34px] sm:text-[44px] font-black tracking-tight leading-[1.15] text-white drop-shadow-md">
                Nyalakan Terang Desa, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#34D399] via-[#F5A623] to-[#FBBF24]">
                  Kawal PLTS Bebas Mangkrak.
                </span>
              </h1>
              <p className="text-[15px] sm:text-[16px] text-slate-200 leading-relaxed max-w-xl font-normal drop-shadow-xs">
                Platform terpadu pendukung keputusan koperasi desa: analisis kesiapan komunal, uji ketahanan kas baterai, dan pengawasan operasional microgrid secara transparan.
              </p>
            </div>

            {/* 3 Value Proposition Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="p-4 rounded-2xl bg-black/[0.3] border border-white/15 backdrop-blur-xl space-y-1 hover:border-[#34D399]/60 transition-all shadow-lg">
                <div className="w-8 h-8 rounded-lg bg-[#147A4B]/30 text-[#34D399] flex items-center justify-center font-bold mb-2">
                  <span className="material-symbols-outlined text-[18px]">fact_check</span>
                </div>
                <h4 className="text-[13px] font-extrabold text-white">Baca Desa</h4>
                <p className="text-[11px] text-slate-300 leading-snug">
                  8 indeks kesiapan teknis, kelembagaan & kapasitas iuran.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/[0.3] border border-white/15 backdrop-blur-xl space-y-1 hover:border-[#F5A623]/60 transition-all shadow-lg">
                <div className="w-8 h-8 rounded-lg bg-[#F5A623]/30 text-[#F5A623] flex items-center justify-center font-bold mb-2">
                  <span className="material-symbols-outlined text-[18px]">tune</span>
                </div>
                <h4 className="text-[13px] font-extrabold text-white">Rancang Watt</h4>
                <p className="text-[11px] text-slate-300 leading-snug">
                  Simulator arus kas & sinking fund baterai hingga 20 tahun.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/[0.3] border border-white/15 backdrop-blur-xl space-y-1 hover:border-[#34D399]/60 transition-all shadow-lg">
                <div className="w-8 h-8 rounded-lg bg-[#147A4B]/30 text-[#34D399] flex items-center justify-center font-bold mb-2">
                  <span className="material-symbols-outlined text-[18px]">shield</span>
                </div>
                <h4 className="text-[13px] font-extrabold text-white">Jaga Watt</h4>
                <p className="text-[11px] text-slate-300 leading-snug">
                  Deteksi dini 4 dimensi & pencegahan aset PLTS mangkrak.
                </p>
              </div>
            </div>

            {/* Live Microgrid Badge Status */}
            <div className="p-4 rounded-2xl bg-black/[0.35] border border-[#147A4B]/40 backdrop-blur-xl flex items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#147A4B] text-white flex items-center justify-center font-bold shrink-0 shadow-[0_0_15px_rgba(20,122,75,0.6)]">
                  <span className="material-symbols-outlined text-[22px]">solar_power</span>
                </div>
                <div>
                  <div className="text-[13px] font-extrabold text-white flex items-center gap-2">
                    <span>Pilot Microgrid Kab. Mukomuko</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#147A4B]/50 text-[#4ADE80] font-bold">
                      Aktif Normal
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    3 Desa Binaan • 145 kWp Total Kapasitas Terpasang • 530 KK Terlayani
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Login Panel with Clean Animated Logo Mark */}
          <div className="lg:col-span-5">
            <div className="w-full bg-black/[0.4] backdrop-blur-2xl border border-white/[0.18] rounded-3xl p-7 sm:p-9 shadow-[0_25px_70px_rgba(0,0,0,0.7)] relative overflow-hidden">
              
              {/* Success Flash Wave upon Login */}
              <AnimatePresence>
                {showPulseSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-b from-[#147A4B]/40 to-[#071510]/95 backdrop-blur-md pointer-events-none z-30 flex items-center justify-center"
                  >
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 mx-auto rounded-full bg-[#147A4B] text-white flex items-center justify-center shadow-[0_0_30px_#147A4B]">
                        <span className="material-symbols-outlined text-[28px]">done</span>
                      </div>
                      <div className="text-[14px] font-black text-white">Autentikasi Berhasil</div>
                      <div className="text-[11px] text-slate-200">Membuka Dashboard Microgrid...</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CLEAN ANIMATED LOGO MARK (NO ORBIT CIRCLES) */}
              <div className="flex flex-col items-center text-center mb-6">
                <motion.div
                  animate={{
                    y: isLoggingIn ? [0, -8, 0] : [0, -4, 0],
                    scale: isLoggingIn ? [1, 1.08, 1] : 1,
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: isLoggingIn ? 0.6 : 3.5,
                    ease: 'easeInOut',
                  }}
                  className="mb-4 relative"
                >
                  {/* Clean SVG Vector Logo Mark */}
                  <div className="w-20 h-20 rounded-2xl bg-[#091E16] border border-[#147A4B]/80 p-2 shadow-[0_10px_30px_rgba(20,122,75,0.5)] flex items-center justify-center">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full overflow-visible"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Sun Beams */}
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
                        <line x1="28" y1="28" x2="35" y2="35" stroke="#F5A623" strokeWidth="4.5" strokeLinecap="round" />
                        <line x1="50" y1="17" x2="50" y2="27" stroke="#F5A623" strokeWidth="4.5" strokeLinecap="round" />
                        <line x1="72" y1="28" x2="65" y2="35" stroke="#F5A623" strokeWidth="4.5" strokeLinecap="round" />
                      </motion.g>

                      {/* Rising Half-Sun Arc (Solar Amber) */}
                      <path d="M 28 52 A 22 22 0 0 1 72 52 Z" fill="#F5A623" />

                      {/* Center Connection Node */}
                      <motion.circle
                        cx="50"
                        cy="52"
                        r={isLoggingIn ? 7.5 : 6}
                        fill="#FFFFFF"
                        animate={{
                          scale: isLoggingIn ? [1, 1.3, 1] : [1, 1.1, 1],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: isLoggingIn ? 0.5 : 1.8,
                        }}
                        style={{ transformOrigin: '50px 52px' }}
                      />
                      <circle cx="50" cy="52" r="2.8" fill="#147A4B" />

                      {/* Pitched Village Roof Line */}
                      <path
                        d="M 18 64 L 50 40 L 82 64"
                        stroke="#FFFFFF"
                        strokeWidth="4.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Solar Panel Cells Base Grid */}
                      <rect x="27" y="65" width="12" height="15" rx="2" fill="#FFFFFF" fillOpacity="0.95" />
                      <rect x="44" y="65" width="12" height="15" rx="2" fill="#FFFFFF" fillOpacity="0.95" />
                      <rect x="61" y="65" width="12" height="15" rx="2" fill="#FFFFFF" fillOpacity="0.95" />

                      <line x1="27" y1="72.5" x2="39" y2="72.5" stroke="#147A4B" strokeWidth="1.5" />
                      <line x1="44" y1="72.5" x2="56" y2="72.5" stroke="#147A4B" strokeWidth="1.5" />
                      <line x1="61" y1="72.5" x2="73" y2="72.5" stroke="#147A4B" strokeWidth="1.5" />

                      {/* Stable Bedrock Ground Line */}
                      <line x1="22" y1="84" x2="78" y2="84" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.75" />
                    </svg>
                  </div>
                </motion.div>

                <h2 className="text-[22px] font-black tracking-tight text-white flex items-center gap-1.5">
                  <span>Masuk ke</span>
                  <span className="text-[#34D399]">Desa</span>
                  <span className="text-[#F5A623]">Watt</span>
                </h2>
                <p className="text-[12px] text-slate-300 mt-0.5">
                  Pilih desa binaan dan peran untuk melanjutkan simulasi
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Village Selector Dropdown */}
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-200 mb-1.5">
                    Pilih Desa Binaan (Kab. Mukomuko)
                  </label>
                  <div className="relative">
                    <select
                      value={selectedVillageId}
                      onChange={(e) => setSelectedVillageId(e.target.value as VillageId)}
                      disabled={isLoggingIn}
                      className="w-full bg-[#0C1A2E]/90 border border-white/25 text-white rounded-xl px-4 py-3 text-[13px] font-bold focus:outline-none focus:border-[#34D399] focus:ring-1 focus:ring-[#34D399] transition-all cursor-pointer appearance-none"
                    >
                      {(Object.keys(villages) as VillageId[]).map((vId) => {
                        const v = villages[vId];
                        const score = Object.values(v.indicators).reduce((a, b) => a + b, 0);
                        const level = score <= 60 ? 'Rendah' : score <= 90 ? 'Menengah' : 'Tinggi';
                        return (
                          <option key={vId} value={vId} className="bg-[#0C1A2E] text-white">
                            {v.name} — Skor {score}/120 ({level})
                          </option>
                        );
                      })}
                    </select>
                    <span className="material-symbols-outlined text-slate-400 absolute right-3 top-3.5 pointer-events-none text-[20px]">
                      unfold_more
                    </span>
                  </div>
                </div>

                {/* Role Toggle */}
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-200 mb-1.5">
                    Peran Pengguna
                  </label>
                  <div className="grid grid-cols-2 gap-2 bg-[#0C1A2E]/80 p-1.5 rounded-xl border border-white/15">
                    <button
                      type="button"
                      onClick={() => setRole('pengurus')}
                      disabled={isLoggingIn}
                      className={`py-2 px-2.5 rounded-lg text-[12px] font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        role === 'pengurus'
                          ? 'bg-[#147A4B] text-white shadow-xs'
                          : 'text-slate-300 hover:text-white'
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
                          ? 'bg-[#147A4B] text-white shadow-xs'
                          : 'text-slate-300 hover:text-white'
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
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-200">
                      Kunci Akses Koperasi
                    </label>
                    <span className="text-[10px] text-[#F5A623] font-semibold">Demo Siap Pakai</span>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoggingIn}
                    className="w-full bg-[#0C1A2E]/90 border border-white/25 text-white rounded-xl px-4 py-2.5 text-[14px] font-mono tracking-widest focus:outline-none focus:border-[#34D399] focus:ring-1 focus:ring-[#34D399] transition-all"
                    placeholder="••••••••"
                  />
                </div>

                {/* Login Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full relative py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#147A4B] via-[#168E56] to-[#147A4B] hover:brightness-110 active:scale-[0.99] text-white font-extrabold text-[14px] shadow-[0_10px_25px_rgba(20,122,75,0.5)] transition-all flex items-center justify-center gap-2.5 overflow-hidden cursor-pointer"
                  >
                    {isLoggingIn && (
                      <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '200%' }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
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
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-[#34D399]">verified_user</span>
                  <span>Sistem Keputusan Terverifikasi</span>
                </span>
                <span className="text-slate-400 font-mono">Mukomuko, Bengkulu</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 py-4 px-6 sm:px-10 border-t border-white/[0.08] backdrop-blur-md bg-black/[0.25] flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-slate-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#34D399]" />
          <span>Data simulasi - prototipe konseptual | DesaWatt, gagasan HORIZON 2026</span>
        </div>
        <div>
          <span>DesaWatt © 2026</span>
        </div>
      </footer>
    </BackgroundGradientAnimation>
  );
};
