import React, { useState } from 'react';
import { useDesaWatt } from '../context/DesaWattContext';
import { GlowingMetricCard } from '@/components/ui/GlowingMetricCard';

export const JagaWatt: React.FC = () => {
  const { activeVillage, setIsPublicPortal } = useDesaWatt();
  const [showRulesModal, setShowRulesModal] = useState(false);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-12 text-slate-100">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#147A4B]/30 text-[#4ADE80] border border-[#34D399]/40">
              Modul 3: Jaga Watt • Monitoring & Peringatan Dini
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-[12px] font-semibold text-slate-400">
              Pembaruan telemetri 2 menit yang lalu
            </span>
          </div>
          <h1 className="text-[28px] font-extrabold text-white tracking-tight leading-tight">
            Pemantauan Real-Time & Peringatan Dini PLTS
          </h1>
          <p className="text-[14px] text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Sistem deteksi dini preventif untuk menjamin keberlanjutan pasokan energi bersih,
            ketahanan baterai, dan kesehatan kas perawatan microgrid desa.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowRulesModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 bg-white/[0.08] text-slate-200 hover:text-white font-bold text-[13px] hover:bg-white/[0.15] shadow-md transition-all cursor-pointer backdrop-blur-md"
          >
            <span className="material-symbols-outlined text-[18px]">rule</span>
            <span>Lihat Aturan Peringatan</span>
          </button>
          <button
            onClick={() => setIsPublicPortal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#147A4B] text-white font-bold text-[13px] hover:bg-[#005F38] shadow-md transition-all cursor-pointer group border border-[#34D399]/40"
          >
            <span>Buka Portal Warga</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </div>

      {/* Main Status Banner */}
      <div
        className={`p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl backdrop-blur-xl ${
          activeVillage.statusPLTS === 'Sehat'
            ? 'bg-[#147A4B]/25 border-[#34D399]/40'
            : activeVillage.statusPLTS === 'Waspada'
            ? 'bg-[#F5A623]/20 border-[#F5A623]/40'
            : 'bg-[#EF4444]/20 border-[#EF4444]/40'
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
              activeVillage.statusPLTS === 'Sehat'
                ? 'bg-[#147A4B] text-white'
                : activeVillage.statusPLTS === 'Waspada'
                ? 'bg-[#F5A623] text-black'
                : 'bg-[#EF4444] text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[26px]">
              {activeVillage.statusPLTS === 'Sehat'
                ? 'verified'
                : activeVillage.statusPLTS === 'Waspada'
                ? 'warning'
                : 'error'}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[18px] font-black text-white">{activeVillage.name}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase bg-black/40 text-slate-200 border border-white/10">
                STATUS: {activeVillage.statusPLTS}
              </span>
            </div>
            <p className="text-[13px] text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {activeVillage.statusDescription}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 shrink-0 border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-6">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase block">
              Tegangan Bus DC
            </span>
            <span className="text-[20px] font-black text-white">51.8 Volt</span>
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase block">
              Sinking Fund Bulan Ini
            </span>
            <span className="text-[20px] font-black text-[#4ADE80]">
              {activeVillage.collectionRatePercent}% Terkumpul
            </span>
          </div>
        </div>
      </div>

      {/* 4 Dimensions Diagnostic Cards with Glowing Effect */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Dimensi 1: Kinerja Teknis */}
        <GlowingMetricCard glowColor="amber">
          <div className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                1. Kinerja Teknis
              </span>
              <span className="w-2 h-2 rounded-full bg-[#F5A623]"></span>
            </div>
            <div className="text-[20px] font-black text-white">91.4% Efisiensi</div>
            <p className="text-[11px] text-slate-400 mt-1">
              Array surya normal (99.1%), Inverter Unit 2 perlu pembersihan debu.
            </p>
          </div>
        </GlowingMetricCard>

        {/* Dimensi 2: Keuangan */}
        <GlowingMetricCard glowColor="green">
          <div className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                2. Keuangan & Iuran
              </span>
              <span className="w-2 h-2 rounded-full bg-[#34D399]"></span>
            </div>
            <div className="text-[20px] font-black text-white">
              {activeVillage.collectionRatePercent}% Tertib
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Saldo Dana O&M: Rp {activeVillage.saldoDanaOMJuta} Jt (Aman untuk operasional).
            </p>
          </div>
        </GlowingMetricCard>

        {/* Dimensi 3: Kelembagaan */}
        <GlowingMetricCard glowColor="emerald">
          <div className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                3. Kelembagaan
              </span>
              <span className="w-2 h-2 rounded-full bg-[#34D399]"></span>
            </div>
            <div className="text-[20px] font-black text-white">Aktif & Sah</div>
            <p className="text-[11px] text-slate-400 mt-1">
              Pengurus: {activeVillage.pengurusName}, Teknisi siaga: {activeVillage.technicianName}.
            </p>
          </div>
        </GlowingMetricCard>

        {/* Dimensi 4: Kualitas Data */}
        <GlowingMetricCard glowColor="green">
          <div className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                4. Kualitas Data
              </span>
              <span className="w-2 h-2 rounded-full bg-[#34D399]"></span>
            </div>
            <div className="text-[20px] font-black text-white">99.8% Online</div>
            <p className="text-[11px] text-slate-400 mt-1">
              Gateway IoT 4G terhubung stabil dengan delay sinyal &lt; 5 detik.
            </p>
          </div>
        </GlowingMetricCard>
      </div>

      {/* Telemetry Charts & Alerts (Two Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Production vs Prediction Chart (7 cols) */}
        <div className="lg:col-span-7 bg-[#0C1B2C]/85 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[16px] font-extrabold text-white">
                Kurva Aliran Daya Sepanjang Hari (Produksi vs Beban)
              </h3>
              <p className="text-[12px] text-slate-400">
                Puncak irradiasi: 48.6 kW | Beban siang: 32.4 kW | Surplus baterai: +16.2 kW
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#4ADE80] bg-[#147A4B]/30 px-2.5 py-1 rounded-full border border-[#34D399]/30">
              Live Feed
            </span>
          </div>

          {/* SVG Multi-Line Chart */}
          <div className="w-full bg-black/40 rounded-xl p-4 border border-white/10">
            <svg className="w-full h-44 overflow-visible" viewBox="0 0 400 120">
              {/* Grid Lines */}
              <line x1="0" y1="30" x2="400" y2="30" stroke="#1E293B" strokeDasharray="3 3" />
              <line x1="0" y1="70" x2="400" y2="70" stroke="#1E293B" strokeDasharray="3 3" />
              <line x1="0" y1="110" x2="400" y2="110" stroke="#334155" />

              {/* Solar Generation Curve (Green) */}
              <path
                d="M 20 110 Q 80 105, 140 70 T 220 20 T 300 75 T 380 110"
                fill="none"
                stroke="#34D399"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Village Demand Curve (Amber) */}
              <path
                d="M 20 95 Q 100 85, 180 80 T 260 70 T 340 40 T 380 75"
                fill="none"
                stroke="#F5A623"
                strokeWidth="2.5"
                strokeDasharray="4 2"
                strokeLinecap="round"
              />

              {/* Anomaly Dot at peak (maintenance needed) */}
              <circle cx="220" cy="20" r="5" fill="#F5A623" stroke="#fff" strokeWidth="2" />
            </svg>
            <div className="flex justify-between text-[11px] text-slate-400 pt-2 font-medium">
              <span>06:00 (Fajar)</span>
              <span>09:00</span>
              <span className="text-[#4ADE80] font-bold">12:30 (Puncak Radiasi)</span>
              <span>15:00</span>
              <span>18:00 (Beban Rumah)</span>
              <span>21:00</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[12px] text-slate-300 pt-1">
            <span className="flex items-center gap-2">
              <span className="w-3 h-1 bg-[#34D399] rounded-full"></span>
              Produksi Surya (Solar Input kW)
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-1 bg-[#F5A623] rounded-full"></span>
              Konsumsi Desa (Beban kW)
            </span>
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#F5A623]"></span>
              Titik Anomali Debu Inverter
            </span>
          </div>
        </div>

        {/* Right: Actionable Alerts List (5 cols) */}
        <div className="lg:col-span-5 bg-[#0C1B2C]/85 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-extrabold text-white">
              Daftar Peringatan Dini & Tindakan Cepat
            </h3>
            <span className="text-[11px] font-bold text-slate-400">3 Pemberitahuan</span>
          </div>

          {/* Alert 1 */}
          <div className="p-3.5 rounded-xl bg-[#F5A623]/15 border border-[#F5A623]/30 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-[#F5A623]/30 text-amber-300 border border-[#F5A623]/40">
                Waspada Ringan
              </span>
              <span className="text-[11px] text-slate-400">Sore ini</span>
            </div>
            <h4 className="text-[13px] font-bold text-amber-300">
              Inverter Unit 2: Sirip Pendingin Berdebu
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Penurunan efisiensi termal 4%. Teknisi lokal ({activeVillage.technicianName})
              dijadwalkan pembersihan sirip rutin pukul 16:30 WIB.
            </p>
          </div>

          {/* Alert 2 */}
          <div className="p-3.5 rounded-xl bg-[#147A4B]/25 border border-[#34D399]/30 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-[#147A4B] text-white">
                Info Finansial
              </span>
              <span className="text-[11px] text-slate-400">Kemarin</span>
            </div>
            <h4 className="text-[13px] font-bold text-[#4ADE80]">
              Setoran Dana Sinking Fund Masuk
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Penyetoran kas iuran bulanan warga berhasil diverifikasi ke rekening escrow bank senilai
              Rp 14.850.000.
            </p>
          </div>

          {/* Alert 3 */}
          <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-white/10 text-slate-300">
                Log Berkala
              </span>
              <span className="text-[11px] text-slate-400">Pekan lalu</span>
            </div>
            <h4 className="text-[13px] font-bold text-white">Inspeksi Visual Modul Selesai</h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Tidak ditemukan retak kaca atau shading pohon baru pada deretan modul PLTS.
            </p>
          </div>
        </div>
      </div>

      {/* Rules Modal (Transparent Thresholds) */}
      {showRulesModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0F2137] border border-white/20 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#34D399] text-[24px]">
                  rule_folder
                </span>
                <h3 className="text-[18px] font-extrabold text-white">
                  Aturan & Ambang Batas Peringatan Dini PLTS
                </h3>
              </div>
              <button
                onClick={() => setShowRulesModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3.5 text-[13px]">
              {/* Hijau */}
              <div className="p-4 rounded-xl bg-[#147A4B]/20 border border-[#34D399]/30">
                <div className="flex items-center gap-2 text-[#4ADE80] font-extrabold mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#34D399]"></span>
                  STATUS HIJAU (SEHAT) — Pemantauan Rutin
                </div>
                <p className="text-slate-200 leading-relaxed">
                  Efisiensi modul &gt; 85%, kepatuhan iuran warga &gt; 80%, saldo O&M memenuhi target
                  triwulanan. Tindakan: Pemeliharaan berkala mingguan oleh teknisi desa.
                </p>
              </div>

              {/* Kuning */}
              <div className="p-4 rounded-xl bg-[#F5A623]/20 border border-[#F5A623]/40">
                <div className="flex items-center gap-2 text-amber-300 font-extrabold mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]"></span>
                  STATUS KUNING (WASPADA) — Pendampingan dan Koreksi
                </div>
                <p className="text-slate-200 leading-relaxed">
                  Penurunan produksi 15%–25%, tunggakan iuran 15%–30%, atau anomali debu filter
                  inverter. Tindakan: Intervensi BUMDes, pembersihan sirip, dan penagihan iuran
                  terpadu dalam 14 hari.
                </p>
              </div>

              {/* Merah */}
              <div className="p-4 rounded-xl bg-[#EF4444]/20 border border-[#EF4444]/40">
                <div className="flex items-center gap-2 text-[#F87171] font-extrabold mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></span>
                  STATUS MERAH (BERISIKO MANGKRAK) — Eskalasi ke Dinas/Pendamping & Audit
                </div>
                <p className="text-slate-200 leading-relaxed">
                  Baterai drop kritis (&lt; 60% DoD terus-menerus), pergantian pengurus tanpa serah
                  terima, atau tunggakan iuran &gt; 50% selama 3 bulan. Tindakan: Eskalasi langsung ke
                  Dinas/Pendamping, audit menyeluruh, dan opsi alih kelola EaaS.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowRulesModal(false)}
                className="px-5 py-2.5 rounded-xl bg-[#147A4B] text-white font-bold text-[13px] hover:bg-[#005F38] cursor-pointer"
              >
                Tutup Panduan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
