import React, { useState } from 'react';
import { useDesaWatt } from '../context/DesaWattContext';

export const JagaWatt: React.FC = () => {
  const { activeVillage, setIsPublicPortal, setActivePage } = useDesaWatt();
  const [showRulesModal, setShowRulesModal] = useState(false);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#EBF7F1] text-[#147A4B] border border-[#C1E7D4]">
              Modul 3: Jaga Watt • Monitoring & Peringatan Dini
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-[12px] font-semibold text-slate-500">
              Pembaruan telemetri 2 menit yang lalu
            </span>
          </div>
          <h1 className="text-[28px] font-extrabold text-[#131B2E] tracking-tight leading-tight">
            Pemantauan Real-Time & Peringatan Dini PLTS
          </h1>
          <p className="text-[14px] text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Sistem deteksi dini preventif untuk menjamin keberlanjutan pasokan energi bersih,
            ketahanan baterai, dan kesehatan kas perawatan microgrid desa.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowRulesModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-[13px] hover:bg-slate-50 shadow-2xs transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">rule</span>
            <span>Lihat Aturan Peringatan</span>
          </button>
          <button
            onClick={() => setIsPublicPortal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#147A4B] text-white font-bold text-[13px] hover:bg-[#005F38] shadow-sm transition-all cursor-pointer group"
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
        className={`p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs ${
          activeVillage.statusPLTS === 'Sehat'
            ? 'bg-[#EBF7F1] border-[#C1E7D4]'
            : activeVillage.statusPLTS === 'Waspada'
            ? 'bg-[#FEF6E9] border-[#FCDCA7]'
            : 'bg-[#FDF2F2] border-[#F8C3C3]'
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              activeVillage.statusPLTS === 'Sehat'
                ? 'bg-[#147A4B] text-white'
                : activeVillage.statusPLTS === 'Waspada'
                ? 'bg-[#FEAE2C] text-[#6B4500]'
                : 'bg-[#BA1A1A] text-white'
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
              <h2 className="text-[18px] font-black text-[#131B2E]">{activeVillage.name}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase bg-white/80 text-slate-800">
                STATUS: {activeVillage.statusPLTS}
              </span>
            </div>
            <p className="text-[13px] text-slate-700 mt-1 max-w-2xl leading-relaxed">
              {activeVillage.statusDescription}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 shrink-0 border-t md:border-t-0 md:border-l border-black/10 pt-3 md:pt-0 md:pl-6">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase block">
              Tegangan Bus DC
            </span>
            <span className="text-[20px] font-black text-[#131B2E]">51.8 Volt</span>
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase block">
              Sinking Fund Bulan Ini
            </span>
            <span className="text-[20px] font-black text-[#147A4B]">
              {activeVillage.collectionRatePercent}% Terkumpul
            </span>
          </div>
        </div>
      </div>

      {/* 4 Dimensions Diagnostic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Dimensi 1: Kinerja Teknis */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              1. Kinerja Teknis
            </span>
            <span className="w-2 h-2 rounded-full bg-[#FEAE2C]"></span>
          </div>
          <div className="text-[20px] font-black text-[#131B2E]">91.4% Efisiensi</div>
          <p className="text-[11px] text-slate-500 mt-1">
            Array surya normal (99.1%), Inverter Unit 2 perlu pembersihan debu.
          </p>
        </div>

        {/* Dimensi 2: Keuangan */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              2. Keuangan & Iuran
            </span>
            <span className="w-2 h-2 rounded-full bg-[#147A4B]"></span>
          </div>
          <div className="text-[20px] font-black text-[#131B2E]">
            {activeVillage.collectionRatePercent}% Tertib
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Saldo Dana O&M: Rp {activeVillage.saldoDanaOMJuta} Jt (Aman untuk operasional).
          </p>
        </div>

        {/* Dimensi 3: Kelembagaan */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              3. Kelembagaan
            </span>
            <span className="w-2 h-2 rounded-full bg-[#147A4B]"></span>
          </div>
          <div className="text-[20px] font-black text-[#131B2E]">Aktif & Sah</div>
          <p className="text-[11px] text-slate-500 mt-1">
            Pengurus: {activeVillage.pengurusName}, Teknisi siaga: {activeVillage.technicianName}.
          </p>
        </div>

        {/* Dimensi 4: Kualitas Data */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              4. Kualitas Data
            </span>
            <span className="w-2 h-2 rounded-full bg-[#147A4B]"></span>
          </div>
          <div className="text-[20px] font-black text-[#131B2E]">99.8% Online</div>
          <p className="text-[11px] text-slate-500 mt-1">
            Gateway IoT 4G terhubung stabil dengan delay sinyal &lt; 5 detik.
          </p>
        </div>
      </div>

      {/* Telemetry Charts & Alerts (Two Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Production vs Prediction Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[16px] font-extrabold text-[#131B2E]">
                Kurva Aliran Daya Sepanjang Hari (Produksi vs Beban)
              </h3>
              <p className="text-[12px] text-slate-500">
                Puncak irradiasi: 48.6 kW | Beban siang: 32.4 kW | Surplus baterai: +16.2 kW
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#147A4B] bg-[#EBF7F1] px-2.5 py-1 rounded-full">
              Live Feed
            </span>
          </div>

          {/* SVG Multi-Line Chart */}
          <div className="w-full bg-[#F8FAFC] rounded-xl p-4">
            <svg className="w-full h-44 overflow-visible" viewBox="0 0 400 120">
              {/* Grid Lines */}
              <line x1="0" y1="30" x2="400" y2="30" stroke="#E2E8F0" strokeDasharray="3 3" />
              <line x1="0" y1="70" x2="400" y2="70" stroke="#E2E8F0" strokeDasharray="3 3" />
              <line x1="0" y1="110" x2="400" y2="110" stroke="#CBD5E1" />

              {/* Solar Generation Curve (Green) */}
              <path
                d="M 20 110 Q 80 105, 140 70 T 220 20 T 300 75 T 380 110"
                fill="none"
                stroke="#147A4B"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Village Demand Curve (Amber) */}
              <path
                d="M 20 95 Q 100 85, 180 80 T 260 70 T 340 40 T 380 75"
                fill="none"
                stroke="#FEAE2C"
                strokeWidth="2.5"
                strokeDasharray="4 2"
                strokeLinecap="round"
              />

              {/* Anomaly Dot at peak (maintenance needed) */}
              <circle cx="220" cy="20" r="5" fill="#FEAE2C" stroke="#fff" strokeWidth="2" />
            </svg>
            <div className="flex justify-between text-[11px] text-slate-500 pt-2 font-medium">
              <span>06:00 (Fajar)</span>
              <span>09:00</span>
              <span className="text-[#147A4B] font-bold">12:30 (Puncak Radiasi)</span>
              <span>15:00</span>
              <span>18:00 (Beban Rumah)</span>
              <span>21:00</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[12px] text-slate-600 pt-1">
            <span className="flex items-center gap-2">
              <span className="w-3 h-1 bg-[#147A4B] rounded-full"></span>
              Produksi Surya (Solar Input kW)
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-1 bg-[#FEAE2C] rounded-full"></span>
              Konsumsi Desa (Beban kW)
            </span>
            <span className="flex items-center gap-1.5 text-[#835500] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#FEAE2C]"></span>
              Titik Anomali Debu Inverter
            </span>
          </div>
        </div>

        {/* Right: Actionable Alerts List (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-extrabold text-[#131B2E]">
              Daftar Peringatan Dini & Tindakan Cepat
            </h3>
            <span className="text-[11px] font-bold text-slate-400">3 Pemberitahuan</span>
          </div>

          {/* Alert 1 */}
          <div className="p-3.5 rounded-xl bg-[#FEF6E9] border border-[#FCDCA7] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-[#FEAE2C] text-[#6B4500]">
                Waspada Ringan
              </span>
              <span className="text-[11px] text-slate-500">Sore ini</span>
            </div>
            <h4 className="text-[13px] font-bold text-[#96600E]">
              Inverter Unit 2: Sirip Pendingin Berdebu
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Penurunan efisiensi termal 4%. Teknisi lokal ({activeVillage.technicianName})
              dijadwalkan pembersihan sirip rutin pukul 16:30 WIB.
            </p>
          </div>

          {/* Alert 2 */}
          <div className="p-3.5 rounded-xl bg-[#EBF7F1] border border-[#C1E7D4] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-[#147A4B] text-white">
                Info Finansial
              </span>
              <span className="text-[11px] text-slate-500">Kemarin</span>
            </div>
            <h4 className="text-[13px] font-bold text-[#147A4B]">
              Setoran Dana Sinking Fund Masuk
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Penyetoran kas iuran bulanan warga berhasil diverifikasi ke rekening escrow bank senilai
              Rp 14.850.000.
            </p>
          </div>

          {/* Alert 3 */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-slate-200 text-slate-700">
                Log Berkala
              </span>
              <span className="text-[11px] text-slate-500">Pekan lalu</span>
            </div>
            <h4 className="text-[13px] font-bold text-[#131B2E]">Inspeksi Visual Modul Selesai</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Tidak ditemukan retak kaca atau shading pohon baru pada deretan modul PLTS.
            </p>
          </div>
        </div>
      </div>

      {/* Rules Modal (Transparent Thresholds) */}
      {showRulesModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#147A4B] text-[24px]">
                  rule_folder
                </span>
                <h3 className="text-[18px] font-extrabold text-[#131B2E]">
                  Aturan & Ambang Batas Peringatan Dini PLTS
                </h3>
              </div>
              <button
                onClick={() => setShowRulesModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3.5 text-[13px]">
              {/* Hijau */}
              <div className="p-4 rounded-xl bg-[#EBF7F1] border border-[#C1E7D4]">
                <div className="flex items-center gap-2 text-[#147A4B] font-extrabold mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#147A4B]"></span>
                  STATUS HIJAU (SEHAT) — Pemantauan Rutin
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Efisiensi modul &gt; 85%, kepatuhan iuran warga &gt; 80%, saldo O&M memenuhi target
                  triwulanan. Tindakan: Pemeliharaan berkala mingguan oleh teknisi desa.
                </p>
              </div>

              {/* Kuning */}
              <div className="p-4 rounded-xl bg-[#FEF6E9] border border-[#FCDCA7]">
                <div className="flex items-center gap-2 text-[#96600E] font-extrabold mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FEAE2C]"></span>
                  STATUS KUNING (WASPADA) — Pendampingan dan Koreksi
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Penurunan produksi 15%–25%, tunggakan iuran 15%–30%, atau anomali debu filter
                  inverter. Tindakan: Intervensi BUMDes, pembersihan sirip, dan penagihan iuran
                  terpadu dalam 14 hari.
                </p>
              </div>

              {/* Merah */}
              <div className="p-4 rounded-xl bg-[#FDF2F2] border border-[#F8C3C3]">
                <div className="flex items-center gap-2 text-[#A52828] font-extrabold mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D64545]"></span>
                  STATUS MERAH (BERISIKO MANGKRAK) — Eskalasi ke Dinas/Pendamping & Audit
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Baterai drop kritis (&lt; 60% DoD terus-menerus), pergantian pengurus tanpa serah
                  terima, atau tunggakan iuran &gt; 50% selama 3 bulan. Tindakan: Eskalasi langsung ke
                  Dinas/Pendamping, audit menyeluruh, dan opsi alih kelola EaaS.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowRulesModal(false)}
                className="px-5 py-2.5 rounded-xl bg-[#147A4B] text-white font-bold text-[13px] hover:bg-[#005F38]"
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
