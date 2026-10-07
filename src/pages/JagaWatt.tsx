import React, { useState } from 'react';
import { useDesaWatt } from '../context/DesaWattContext';
import { GlowingMetricCard } from '@/components/ui/GlowingMetricCard';

export const JagaWatt: React.FC = () => {
  const { activeVillage, setIsPublicPortal } = useDesaWatt();
  const [showRulesModal, setShowRulesModal] = useState(false);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-12 text-[#3A4728]">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#E4E8D6] text-[#4B5D2A] border border-[#C5CCAE]">
              Modul 3: Jaga Watt • Monitoring & Peringatan Dini
            </span>
            <span className="text-[#C5CCAE]">•</span>
            <span className="text-[12px] font-semibold text-[#6B7753]">
              Pembaruan telemetri 2 menit yang lalu
            </span>
          </div>
          <h1 className="text-[28px] font-extrabold text-[#1F2A14] tracking-tight leading-tight">
            Pemantauan Real-Time & Peringatan Dini PLTS
          </h1>
          <p className="text-[14px] text-[#3A4728] mt-1 max-w-3xl leading-relaxed">
            Sistem deteksi dini preventif untuk menjamin keberlanjutan pasokan energi bersih,
            ketahanan baterai, dan kesehatan kas perawatan microgrid desa.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowRulesModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#4B5D2A] bg-[#F3F5EA] text-[#3A4728] hover:bg-[#E4E8D6] font-bold text-[13px] shadow-xs transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-[#4B5D2A]">rule</span>
            <span>Lihat Aturan Peringatan</span>
          </button>
          <button
            onClick={() => setIsPublicPortal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4B5D2A] text-[#F7F8EE] font-bold text-[13px] hover:bg-[#3F4E2C] shadow-sm transition-all cursor-pointer group"
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
        className={`p-6 rounded-[14px] border flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs ${
          activeVillage.statusPLTS === 'Sehat'
            ? 'bg-[#E2F0E4] border-[#C2E0C5]'
            : activeVillage.statusPLTS === 'Waspada'
            ? 'bg-[#F6E7BD] border-[#EED38A]'
            : 'bg-[#F9DFDC] border-[#ECAAA4]'
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
              activeVillage.statusPLTS === 'Sehat'
                ? 'bg-[#4C9A52] text-[#F7F8EE]'
                : activeVillage.statusPLTS === 'Waspada'
                ? 'bg-[#D99A1E] text-[#1F2A14]'
                : 'bg-[#B84A3A] text-[#F7F8EE]'
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
              <h2 className="text-[18px] font-black text-[#1F2A14]">{activeVillage.name}</h2>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase border ${
                  activeVillage.statusPLTS === 'Sehat'
                    ? 'bg-[#F3F5EA] text-[#27602C] border-[#C2E0C5]'
                    : activeVillage.statusPLTS === 'Waspada'
                    ? 'bg-[#F3F5EA] text-[#825708] border-[#EED38A]'
                    : 'bg-[#F3F5EA] text-[#8B281B] border-[#ECAAA4]'
                }`}
              >
                STATUS: {activeVillage.statusPLTS}
              </span>
            </div>
            <p className="text-[13px] text-[#3A4728] mt-1 max-w-2xl leading-relaxed">
              {activeVillage.statusDescription}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 shrink-0 border-t md:border-t-0 md:border-l border-[#C5CCAE] pt-3 md:pt-0 md:pl-6">
          <div>
            <span className="text-[11px] font-bold text-[#6B7753] uppercase block">
              Tegangan Bus DC
            </span>
            <span className="text-[20px] font-black text-[#1F2A14]">51.8 Volt</span>
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#6B7753] uppercase block">
              Sinking Fund Bulan Ini
            </span>
            <span className="text-[20px] font-black text-[#4C9A52]">
              {activeVillage.collectionRatePercent}% Terkumpul
            </span>
          </div>
        </div>
      </div>

      {/* 4 Dimensions Diagnostic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Dimensi 1: Kinerja Teknis */}
        <GlowingMetricCard>
          <div className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7753]">
                1. Kinerja Teknis
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#E0A526]"></span>
            </div>
            <div className="text-[22px] font-black text-[#1F2A14]">91.4% Efisiensi</div>
            <p className="text-[12px] text-[#3A4728] mt-1 leading-relaxed">
              Array surya normal (99.1%), Inverter Unit 2 perlu pembersihan debu rutin.
            </p>
          </div>
        </GlowingMetricCard>

        {/* Dimensi 2: Keuangan */}
        <GlowingMetricCard>
          <div className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7753]">
                2. Keuangan & Iuran
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#4C9A52]"></span>
            </div>
            <div className="text-[22px] font-black text-[#1F2A14]">
              {activeVillage.collectionRatePercent}% Tertib
            </div>
            <p className="text-[12px] text-[#3A4728] mt-1 leading-relaxed">
              Saldo Dana O&M: Rp {activeVillage.saldoDanaOMJuta} Jt (Aman untuk operasional).
            </p>
          </div>
        </GlowingMetricCard>

        {/* Dimensi 3: Kelembagaan */}
        <GlowingMetricCard>
          <div className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7753]">
                3. Kelembagaan
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#4C9A52]"></span>
            </div>
            <div className="text-[22px] font-black text-[#1F2A14]">Aktif & Sah</div>
            <p className="text-[12px] text-[#3A4728] mt-1 leading-relaxed">
              Pengurus: {activeVillage.pengurusName}, Teknisi siaga: {activeVillage.technicianName}.
            </p>
          </div>
        </GlowingMetricCard>

        {/* Dimensi 4: Kualitas Data */}
        <GlowingMetricCard>
          <div className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7753]">
                4. Kualitas Data
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#4C9A52]"></span>
            </div>
            <div className="text-[22px] font-black text-[#1F2A14]">99.8% Online</div>
            <p className="text-[12px] text-[#3A4728] mt-1 leading-relaxed">
              Gateway IoT 4G terhubung stabil dengan latency sinyal &lt; 5 detik.
            </p>
          </div>
        </GlowingMetricCard>
      </div>

      {/* Telemetry Charts & Alerts (Two Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Production vs Prediction Chart (7 cols) */}
        <div className="lg:col-span-7 bg-[#F3F5EA] p-6 rounded-[14px] border border-[#C5CCAE] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[16px] font-extrabold text-[#1F2A14]">
                Kurva Aliran Daya Sepanjang Hari (Produksi vs Beban)
              </h3>
              <p className="text-[12px] text-[#6B7753]">
                Puncak irradiasi: 48.6 kW | Beban siang: 32.4 kW | Surplus baterai: +16.2 kW
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#4B5D2A] bg-[#E4E8D6] px-2.5 py-1 rounded-full border border-[#C5CCAE]">
              Live Feed
            </span>
          </div>

          {/* SVG Multi-Line Chart in Warm Light Container */}
          <div className="w-full bg-[#FAFBF4] rounded-xl p-4 border border-[#C5CCAE]">
            <svg className="w-full h-44 overflow-visible" viewBox="0 0 400 120">
              {/* Grid Lines */}
              <line x1="0" y1="30" x2="400" y2="30" stroke="#D3D9BE" strokeDasharray="3 3" />
              <line x1="0" y1="70" x2="400" y2="70" stroke="#D3D9BE" strokeDasharray="3 3" />
              <line x1="0" y1="110" x2="400" y2="110" stroke="#C5CCAE" />

              {/* Solar Generation Curve (Army Green #4B5D2A) */}
              <path
                d="M 20 110 Q 80 105, 140 70 T 220 20 T 300 75 T 380 110"
                fill="none"
                stroke="#4B5D2A"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Village Demand Curve (Amber #E0A526) */}
              <path
                d="M 20 95 Q 100 85, 180 80 T 260 70 T 340 40 T 380 75"
                fill="none"
                stroke="#E0A526"
                strokeWidth="2.5"
                strokeDasharray="4 2"
                strokeLinecap="round"
              />

              {/* Anomaly Dot at peak (maintenance needed) */}
              <circle cx="220" cy="20" r="5" fill="#E0A526" stroke="#FAFBF4" strokeWidth="2" />
            </svg>
            <div className="flex justify-between text-[11px] text-[#6B7753] pt-2 font-medium">
              <span>06:00 (Fajar)</span>
              <span>09:00</span>
              <span className="text-[#4B5D2A] font-bold">12:30 (Puncak Radiasi)</span>
              <span>15:00</span>
              <span>18:00 (Beban Rumah)</span>
              <span>21:00</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[12px] text-[#3A4728] pt-1 flex-wrap">
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-1.5 bg-[#4B5D2A] rounded-full"></span>
              Produksi Surya (Solar Input kW)
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-1.5 bg-[#E0A526] rounded-full"></span>
              Konsumsi Desa (Beban kW)
            </span>
            <span className="flex items-center gap-1.5 text-[#825708] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#E0A526]"></span>
              Titik Anomali Debu Inverter
            </span>
          </div>
        </div>

        {/* Right: Actionable Alerts List (5 cols) */}
        <div className="lg:col-span-5 bg-[#F3F5EA] p-6 rounded-[14px] border border-[#C5CCAE] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-extrabold text-[#1F2A14]">
              Daftar Peringatan Dini & Tindakan Cepat
            </h3>
            <span className="text-[11px] font-bold text-[#6B7753]">3 Pemberitahuan</span>
          </div>

          {/* Alert 1: Waspada */}
          <div className="p-3.5 rounded-xl bg-[#F6E7BD] border border-[#EED38A] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-[#FAFBF4] text-[#825708] border border-[#EED38A]">
                Waspada Ringan
              </span>
              <span className="text-[11px] text-[#825708] font-semibold">Sore ini</span>
            </div>
            <h4 className="text-[13px] font-bold text-[#825708]">
              Inverter Unit 2: Sirip Pendingin Berdebu
            </h4>
            <p className="text-[12px] text-[#7A4F06] leading-relaxed">
              Penurunan efisiensi termal 4%. Teknisi lokal ({activeVillage.technicianName})
              dijadwalkan pembersihan sirip rutin pukul 16:30 WIB.
            </p>
          </div>

          {/* Alert 2: Info */}
          <div className="p-3.5 rounded-xl bg-[#E2F0E4] border border-[#C2E0C5] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-[#FAFBF4] text-[#27602C] border border-[#C2E0C5]">
                Info Finansial
              </span>
              <span className="text-[11px] text-[#27602C] font-semibold">Kemarin</span>
            </div>
            <h4 className="text-[13px] font-bold text-[#27602C]">
              Setoran Dana Sinking Fund Masuk
            </h4>
            <p className="text-[12px] text-[#1E4D23] leading-relaxed">
              Penyetoran kas iuran bulanan warga berhasil diverifikasi ke rekening escrow bank senilai
              Rp 14.850.000.
            </p>
          </div>

          {/* Alert 3: Log */}
          <div className="p-3.5 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-[#E4E8D6] text-[#3A4728]">
                Log Berkala
              </span>
              <span className="text-[11px] text-[#6B7753]">Pekan lalu</span>
            </div>
            <h4 className="text-[13px] font-bold text-[#1F2A14]">Inspeksi Visual Modul Selesai</h4>
            <p className="text-[12px] text-[#3A4728] leading-relaxed">
              Tidak ditemukan retak kaca atau shading pohon baru pada deretan modul PLTS.
            </p>
          </div>
        </div>
      </div>

      {/* Rules Modal (Transparent Thresholds) */}
      {showRulesModal && (
        <div className="fixed inset-0 bg-[#1F2A14]/60 backdrop-blur-[3px] z-50 flex items-center justify-center p-4">
          <div className="bg-[#F3F5EA] border border-[#C5CCAE] rounded-[14px] max-w-2xl w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 text-[#3A4728]">
            <div className="flex items-center justify-between pb-3 border-b border-[#C5CCAE]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4B5D2A] text-[24px]">
                  rule_folder
                </span>
                <h3 className="text-[18px] font-extrabold text-[#1F2A14]">
                  Aturan & Ambang Batas Peringatan Dini PLTS
                </h3>
              </div>
              <button
                onClick={() => setShowRulesModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-[#E4E8D6] flex items-center justify-center text-[#6B7753] hover:text-[#1F2A14] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3.5 text-[13px]">
              {/* Hijau */}
              <div className="p-4 rounded-xl bg-[#E2F0E4] border border-[#C2E0C5]">
                <div className="flex items-center gap-2 text-[#27602C] font-extrabold mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4C9A52]"></span>
                  STATUS HIJAU (SEHAT) — Pemantauan Rutin
                </div>
                <p className="text-[#3A4728] leading-relaxed">
                  Efisiensi modul &gt; 85%, kepatuhan iuran warga &gt; 80%, saldo O&M memenuhi target
                  triwulanan. Tindakan: Pemeliharaan berkala mingguan oleh teknisi desa.
                </p>
              </div>

              {/* Kuning */}
              <div className="p-4 rounded-xl bg-[#F6E7BD] border border-[#EED38A]">
                <div className="flex items-center gap-2 text-[#825708] font-extrabold mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D99A1E]"></span>
                  STATUS KUNING (WASPADA) — Pendampingan dan Koreksi
                </div>
                <p className="text-[#7A4F06] leading-relaxed">
                  Penurunan produksi 15%–25%, tunggakan iuran 15%–30%, atau anomali debu filter
                  inverter. Tindakan: Intervensi BUMDes, pembersihan sirip, dan penagihan iuran
                  terpadu dalam 14 hari.
                </p>
              </div>

              {/* Merah */}
              <div className="p-4 rounded-xl bg-[#F9DFDC] border border-[#ECAAA4]">
                <div className="flex items-center gap-2 text-[#8B281B] font-extrabold mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B84A3A]"></span>
                  STATUS MERAH (BERISIKO MANGKRAK) — Eskalasi ke Dinas/Pendamping & Audit
                </div>
                <p className="text-[#641A12] leading-relaxed">
                  Baterai drop kritis (&lt; 60% DoD terus-menerus), pergantian pengurus tanpa serah
                  terima, atau tunggakan iuran &gt; 50% selama 3 bulan. Tindakan: Eskalasi langsung ke
                  Dinas/Pendamping, audit menyeluruh, dan opsi alih kelola EaaS.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowRulesModal(false)}
                className="px-5 py-2.5 rounded-xl bg-[#4B5D2A] text-[#F7F8EE] font-bold text-[13px] hover:bg-[#3F4E2C] cursor-pointer shadow-xs"
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
