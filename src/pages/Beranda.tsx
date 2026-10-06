import React from 'react';
import { useDesaWatt } from '../context/DesaWattContext';
import { VillageId } from '../types';

export const Beranda: React.FC = () => {
  const {
    activeVillage,
    villages,
    selectedVillageId,
    setSelectedVillageId,
    totalScore,
    readinessLevel,
    effectiveModel,
    simulationResults,
    setActivePage,
  } = useDesaWatt();

  const getModelLabel = (model: string) => {
    if (model === 'milik_koperasi') return 'Milik Koperasi';
    if (model === 'kemitraan') return 'Kemitraan (JV BUMDes)';
    return 'Energy-as-a-Service (EaaS)';
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-12">
      {/* Welcome Hero Banner */}
      <div className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-2xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-extrabold border ${
                  activeVillage.statusPLTS === 'Sehat'
                    ? 'bg-[#EBF7F1] text-[#136B45] border-[#C1E7D4]'
                    : activeVillage.statusPLTS === 'Waspada'
                    ? 'bg-[#FEF6E9] text-[#96600E] border-[#FCDCA7]'
                    : 'bg-[#FDF2F2] text-[#A52828] border-[#F8C3C3]'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    activeVillage.statusPLTS === 'Sehat'
                      ? 'bg-[#136B45]'
                      : activeVillage.statusPLTS === 'Waspada'
                      ? 'bg-[#FEAE2C] animate-pulse'
                      : 'bg-[#BA1A1A]'
                  }`}
                ></span>
                STATUS: {activeVillage.statusPLTS.toUpperCase()}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[12px] font-semibold text-slate-500">
                Unit Usaha Koperasi Desa Merah Putih
              </span>
            </div>

            <h1 className="text-[26px] font-black text-[#131B2E] tracking-tight">
              Selamat Bertugas, {activeVillage.pengurusName} & {activeVillage.pendampingName}
            </h1>
            <p className="text-[14px] text-slate-600 max-w-2xl leading-relaxed">
              Ringkasan operasional dan tata kelola PLTS Komunal di{' '}
              <strong className="text-[#131B2E]">{activeVillage.name}</strong>,{' '}
              {activeVillage.subdistrict}, {activeVillage.regency}. {activeVillage.statusDescription}
            </p>

            <div className="flex items-center gap-4 pt-2 text-[12px] text-slate-500 font-semibold flex-wrap">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#147A4B]">bolt</span>
                Kapasitas: {activeVillage.capacityKwp} kWp
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#147A4B]">
                  battery_charging_full
                </span>
                Bank Baterai: {activeVillage.batteryKwh} kWh LiFePO4
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#147A4B]">groups</span>
                Cakupan: {activeVillage.connectionsKK} KK & Fasilitas Desa
              </span>
            </div>
          </div>

          {/* Quick Telemetry Box */}
          <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between min-w-[240px] shrink-0">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Daya Sesaat (Live Feed)
              </div>
              <div className="text-[24px] font-black text-[#131B2E] mt-0.5">38.4 kW</div>
              <div className="text-[12px] text-slate-500 mt-1 flex justify-between">
                <span>Beban: 64%</span>
                <span>Cadangan: 21.2 kW</span>
              </div>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-bold text-[#147A4B]">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#147A4B]"></span>
                Inverter 50.02 Hz Sinkron
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[12px] font-bold uppercase tracking-wider">
              Energi Hari Ini
            </span>
            <span className="w-8 h-8 rounded-lg bg-[#EBF7F1] text-[#147A4B] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">bolt</span>
            </span>
          </div>
          <div className="my-2">
            <div className="text-[28px] font-black text-[#131B2E] tracking-tight">
              {activeVillage.productionTodayKwh} <span className="text-[16px] text-slate-400">kWh</span>
            </div>
            <div className="text-[12px] text-[#147A4B] font-bold flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              <span>88.7% target harian</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-400">Kebutuhan desa: 160 kWh</span>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[12px] font-bold uppercase tracking-wider">Iuran Terkumpul</span>
            <span className="w-8 h-8 rounded-lg bg-[#FEF6E9] text-[#96600E] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">payments</span>
            </span>
          </div>
          <div className="my-2">
            <div className="text-[28px] font-black text-[#131B2E] tracking-tight">
              {activeVillage.collectionRatePercent}%
            </div>
            <div className="text-[12px] text-slate-600 font-semibold mt-0.5">
              Rp {(activeVillage.collectionRatePercent * 0.17).toFixed(1)} Jt bulan ini
            </div>
          </div>
          <span className="text-[11px] text-slate-400">Tarif Rp 75.000 / KK / bulan</span>
        </div>

        {/* KPI 3 (labelled estimasi demo per correction 3) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <div className="flex flex-col">
              <span className="text-[12px] font-bold uppercase tracking-wider">Emisi Terhindar</span>
              <span className="text-[10px] text-slate-400 italic font-medium">(estimasi demo)</span>
            </div>
            <span className="w-8 h-8 rounded-lg bg-[#EBF7F1] text-[#147A4B] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">eco</span>
            </span>
          </div>
          <div className="my-2">
            <div className="text-[28px] font-black text-[#131B2E] tracking-tight">
              214 <span className="text-[16px] text-slate-400">kg CO₂e</span>
            </div>
            <div className="text-[12px] text-slate-600 font-semibold mt-0.5">
              Setara 78 Liter solar dihemat <span className="text-[10px] text-slate-400 italic">(estimasi demo)</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-400">Perhitungan faktor emisi lokal</span>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[12px] font-bold uppercase tracking-wider">
              Dana Cadangan O&M
            </span>
            <span className="w-8 h-8 rounded-lg bg-[#EBF7F1] text-[#147A4B] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">savings</span>
            </span>
          </div>
          <div className="my-2">
            <div className="text-[28px] font-black text-[#131B2E] tracking-tight">
              Rp {activeVillage.saldoDanaOMJuta} <span className="text-[16px] text-slate-400">Juta</span>
            </div>
            <div className="text-[12px] text-[#147A4B] font-bold mt-0.5">
              Target Baterai: Rp {activeVillage.targetBatteryFundJuta} Jt
            </div>
          </div>
          <span className="text-[11px] text-slate-400">Rekening escrow aman</span>
        </div>
      </div>

      {/* 3 Pillars Track Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[18px] font-extrabold text-[#131B2E]">
              3 Pilar Keputusan PLTS Desa
            </h2>
            <p className="text-[12px] text-slate-500">
              Alur terintegrasi dari penilaian kesiapan, simulasi model bisnis, gerbang kelayakan,
              hingga pemantauan operasional.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Pillar 1 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#EBF7F1] text-[#147A4B]">
                  Pilar 1 • Kesiapan
                </span>
                <span className="material-symbols-outlined text-slate-400 text-[20px]">
                  fact_check
                </span>
              </div>
              <h3 className="text-[18px] font-extrabold text-[#131B2E]">Baca Desa</h3>
              <p className="text-[12px] text-slate-600 mt-1 mb-4 leading-relaxed">
                Evaluasi kesiapan komunal, kapasitas kelembagaan, beban produktif, dan kemampuan bayar
                iuran.
              </p>

              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-100 mb-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Skor Saat Ini</span>
                  <span className="text-[20px] font-black text-[#147A4B]">
                    {totalScore} <span className="text-[13px] text-slate-400">/ 120</span>
                  </span>
                </div>
                <div className="text-[12px] font-bold text-[#131B2E] mt-1">
                  Level {readinessLevel}
                </div>
              </div>
            </div>

            <button
              onClick={() => setActivePage('baca-desa')}
              className="w-full py-2.5 px-4 rounded-xl bg-[#F8FAFC] hover:bg-[#147A4B] hover:text-white text-[#131B2E] font-bold text-[13px] transition-all flex items-center justify-center gap-2 border border-slate-200/80 cursor-pointer"
            >
              <span>Lihat Rincian 8 Indikator</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#FEF6E9] text-[#96600E]">
                  Pilar 2 • Finansial
                </span>
                <span className="material-symbols-outlined text-slate-400 text-[20px]">
                  solar_power
                </span>
              </div>
              <h3 className="text-[18px] font-extrabold text-[#131B2E]">Rancang Watt</h3>
              <p className="text-[12px] text-slate-600 mt-1 mb-4 leading-relaxed">
                Pilih model pengelolaan dan simulasikan arus kas, tarif, serta kecukupan sinking fund
                baterai.
              </p>

              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-100 mb-4">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Model Terpilih</div>
                <div className="text-[15px] font-black text-[#131B2E] mt-0.5 truncate">
                  {getModelLabel(effectiveModel)}
                </div>
                <div className="text-[12px] text-[#147A4B] font-bold mt-1">
                  Kas Bersih: ~Rp {simulationResults.netAnnualAverageJuta.toLocaleString('id-ID')} Jt / tahun
                </div>
              </div>
            </div>

            <button
              onClick={() => setActivePage('rancang-watt')}
              className="w-full py-2.5 px-4 rounded-xl bg-[#F8FAFC] hover:bg-[#147A4B] hover:text-white text-[#131B2E] font-bold text-[13px] transition-all flex items-center justify-center gap-2 border border-slate-200/80 cursor-pointer"
            >
              <span>Buka Simulator Arus Kas</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#EBF7F1] text-[#147A4B]">
                  Pilar 3 • Aset & M&E
                </span>
                <span className="material-symbols-outlined text-slate-400 text-[20px]">
                  monitor_heart
                </span>
              </div>
              <h3 className="text-[18px] font-extrabold text-[#131B2E]">Jaga Watt</h3>
              <p className="text-[12px] text-slate-600 mt-1 mb-4 leading-relaxed">
                Deteksi anomali operasional, status 4 dimensi, peringatan dini, dan pencegahan risiko
                mangkrak.
              </p>

              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-100 mb-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Indeks Kesehatan</span>
                  <span className="text-[20px] font-black text-[#147A4B]">94 / 100</span>
                </div>
                <div className="text-[12px] text-[#96600E] font-bold mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">warning</span>
                  1 Peringatan Rutin: Inverter Unit 2
                </div>
              </div>
            </div>

            <button
              onClick={() => setActivePage('jaga-watt')}
              className="w-full py-2.5 px-4 rounded-xl bg-[#F8FAFC] hover:bg-[#147A4B] hover:text-white text-[#131B2E] font-bold text-[13px] transition-all flex items-center justify-center gap-2 border border-slate-200/80 cursor-pointer"
            >
              <span>Masuk Dashboard Pemantauan</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cross-Village Comparison Strip */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <h3 className="text-[16px] font-extrabold text-[#131B2E] mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#147A4B] text-[20px]">
            compare_arrows
          </span>
          Tolok Ukur Daerah: Perbandingan Kinerja Antar Desa Binaan
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(Object.keys(villages) as VillageId[]).map((vId) => {
            const v = villages[vId];
            const score = Object.values(v.indicators).reduce((a, b) => a + b, 0);
            const level = score <= 60 ? 'Rendah' : score <= 90 ? 'Menengah' : 'Tinggi';
            const isSelected = selectedVillageId === vId;

            return (
              <div
                key={vId}
                onClick={() => setSelectedVillageId(vId)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#147A4B] bg-[#EBF7F1]/30 ring-2 ring-[#147A4B]/20'
                    : 'border-slate-200/80 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-[14px] text-[#131B2E]">{v.name}</span>
                  {isSelected && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#147A4B] text-white">
                      Desa Anda
                    </span>
                  )}
                </div>
                <div className="text-[12px] text-slate-500 mb-2">
                  Kapasitas: {v.capacityKwp} kWp • {v.subdistrict}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-[12px] font-bold text-slate-400">Skor Kesiapan</span>
                  <span className="text-[14px] font-black text-[#131B2E]">
                    {score} ({level})
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
