import React from 'react';
import { useDesaWatt } from '../context/DesaWattContext';
import { VillageId } from '../types';
import { GlowingMetricCard } from '@/components/ui/GlowingMetricCard';

export const Beranda: React.FC = () => {
  const {
    activeVillage,
    selectedVillageId,
    setSelectedVillageId,
    villages,
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
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-12 text-[#3A4728]">
      {/* Top Hero Banner: Active Village Snapshot with army green gradient and cream text */}
      <div className="rounded-[14px] bg-gradient-to-r from-[#4B5D2A] via-[#556930] to-[#5E7336] border border-[#5E7336] p-6 md:p-8 shadow-md text-[#F7F8EE]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border ${
                activeVillage.statusPLTS === 'Sehat'
                  ? 'bg-[#E2F0E4] text-[#27602C] border-[#C2E0C5]'
                  : activeVillage.statusPLTS === 'Waspada'
                  ? 'bg-[#F6E7BD] text-[#825708] border-[#EED38A]'
                  : 'bg-[#F9DFDC] text-[#8B281B] border-[#ECAAA4]'
              }`}>
                STATUS: {activeVillage.statusPLTS.toUpperCase()}
              </span>
              <span className="text-[#D4DCBC]">•</span>
              <span className="text-[12px] font-bold text-[#D4DCBC]">
                Unit Usaha Koperasi Desa Merah Putih
              </span>
            </div>

            <h1 className="text-[26px] font-black text-[#F7F8EE] tracking-tight">
              Selamat Bertugas, {activeVillage.pengurusName} & {activeVillage.pendampingName}
            </h1>
            <p className="text-[14px] text-[#F7F8EE]/90 max-w-2xl leading-relaxed">
              Ringkasan operasional dan tata kelola PLTS Komunal di{' '}
              <strong className="text-white underline decoration-[#E0A526]">{activeVillage.name}</strong>,{' '}
              {activeVillage.subdistrict}, {activeVillage.regency}. {activeVillage.statusDescription}
            </p>

            <div className="flex items-center gap-4 pt-2 text-[12px] text-[#D4DCBC] font-semibold flex-wrap">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#E0A526]">bolt</span>
                Kapasitas: {activeVillage.capacityKwp} kWp
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#E0A526]">
                  battery_charging_full
                </span>
                Bank Baterai: {activeVillage.batteryKwh} kWh LiFePO4
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#E0A526]">groups</span>
                Cakupan: {activeVillage.connectionsKK} KK & Fasilitas Desa
              </span>
            </div>
          </div>

          {/* Quick Telemetry Box in clean light cream tile */}
          <div className="bg-[#F3F5EA] border border-[#C5CCAE] rounded-[14px] p-4.5 flex flex-col justify-between min-w-[240px] shrink-0 shadow-sm text-[#1F2A14]">
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#6B7753]">
                Daya Sesaat (Live Feed)
              </div>
              <div className="text-[26px] font-black text-[#1F2A14] mt-0.5 tracking-tight">38.4 kW</div>
              <div className="text-[12px] text-[#6B7753] mt-1 flex justify-between font-medium">
                <span>Beban: 64%</span>
                <span className="text-[#4C9A52] font-bold">Cadangan: 21.2 kW</span>
              </div>
            </div>
            <div className="pt-3 mt-3 border-t border-[#C5CCAE] flex items-center justify-between text-[11px] font-bold text-[#4B5D2A]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4C9A52]"></span>
                Inverter 50.02 Hz Sinkron
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Top KPI Cards with Clean Surface */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <GlowingMetricCard>
          <div className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#6B7753]">
                Energi Hari Ini
              </span>
              <span className="w-8 h-8 rounded-lg bg-[#E4E8D6] text-[#4B5D2A] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">bolt</span>
              </span>
            </div>
            <div className="my-2">
              <div className="text-[28px] font-black text-[#1F2A14] tracking-tight">
                {activeVillage.productionTodayKwh} <span className="text-[16px] text-[#6B7753] font-bold">kWh</span>
              </div>
              <div className="text-[12px] text-[#4C9A52] font-bold flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span>88.7% target harian</span>
              </div>
            </div>
            <span className="text-[11px] text-[#6B7753]">Kebutuhan desa: 160 kWh</span>
          </div>
        </GlowingMetricCard>

        {/* KPI 2 */}
        <GlowingMetricCard>
          <div className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#6B7753]">Iuran Terkumpul</span>
              <span className="w-8 h-8 rounded-lg bg-[#F6E7BD] text-[#D99A1E] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">payments</span>
              </span>
            </div>
            <div className="my-2">
              <div className="text-[28px] font-black text-[#1F2A14] tracking-tight">
                {activeVillage.collectionRatePercent}%
              </div>
              <div className="text-[12px] text-[#3A4728] font-semibold mt-0.5">
                Rp {(activeVillage.collectionRatePercent * 0.17).toFixed(1)} Jt bulan ini
              </div>
            </div>
            <span className="text-[11px] text-[#6B7753]">Tarif Rp 75.000 / KK / bulan</span>
          </div>
        </GlowingMetricCard>

        {/* KPI 3 */}
        <GlowingMetricCard>
          <div className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#6B7753]">Emisi Terhindar</span>
                <span className="text-[10px] text-[#6B7753] italic font-medium">(estimasi demo)</span>
              </div>
              <span className="w-8 h-8 rounded-lg bg-[#E4E8D6] text-[#4B5D2A] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">eco</span>
              </span>
            </div>
            <div className="my-2">
              <div className="text-[28px] font-black text-[#1F2A14] tracking-tight">
                214 <span className="text-[16px] text-[#6B7753] font-bold">kg CO₂e</span>
              </div>
              <div className="text-[12px] text-[#3A4728] font-semibold mt-0.5">
                Setara 78 Liter solar dihemat <span className="text-[10px] text-[#6B7753] italic">(estimasi demo)</span>
              </div>
            </div>
            <span className="text-[11px] text-[#6B7753]">Perhitungan faktor emisi lokal</span>
          </div>
        </GlowingMetricCard>

        {/* KPI 4 */}
        <GlowingMetricCard>
          <div className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#6B7753]">
                Dana Cadangan O&M
              </span>
              <span className="w-8 h-8 rounded-lg bg-[#E4E8D6] text-[#4B5D2A] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">savings</span>
              </span>
            </div>
            <div className="my-2">
              <div className="text-[28px] font-black text-[#1F2A14] tracking-tight">
                Rp {activeVillage.saldoDanaOMJuta} <span className="text-[16px] text-[#6B7753] font-bold">Juta</span>
              </div>
              <div className="text-[12px] text-[#4C9A52] font-bold mt-0.5">
                Target Baterai: Rp {activeVillage.targetBatteryFundJuta} Jt
              </div>
            </div>
            <span className="text-[11px] text-[#6B7753]">Rekening escrow aman</span>
          </div>
        </GlowingMetricCard>
      </div>

      {/* 3 Pillars Track Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[18px] font-extrabold text-[#1F2A14]">
              3 Pilar Keputusan PLTS Desa
            </h2>
            <p className="text-[12px] text-[#6B7753]">
              Alur terintegrasi dari penilaian kesiapan, simulasi model bisnis, gerbang kelayakan,
              hingga pemantauan operasional.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Pillar 1 */}
          <div className="bg-[#F3F5EA] rounded-[14px] border border-[#C5CCAE] p-6 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-[#4B5D2A] transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#E4E8D6] text-[#4B5D2A]">
                  Pilar 1 • Kesiapan
                </span>
                <span className="material-symbols-outlined text-[#6B7753] text-[20px]">
                  fact_check
                </span>
              </div>
              <h3 className="text-[18px] font-extrabold text-[#1F2A14]">Baca Desa</h3>
              <p className="text-[12px] text-[#3A4728] mt-1 mb-4 leading-relaxed">
                Evaluasi kesiapan komunal, kapasitas kelembagaan, beban produktif, dan kemampuan bayar
                iuran.
              </p>

              <div className="p-3.5 rounded-[12px] bg-[#FAFBF4] border border-[#C5CCAE] mb-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] font-bold text-[#6B7753] uppercase">Skor Saat Ini</span>
                  <span className="text-[20px] font-black text-[#4B5D2A]">
                    {totalScore} <span className="text-[13px] text-[#6B7753]">/ 120</span>
                  </span>
                </div>
                <div className="text-[12px] font-bold text-[#1F2A14] mt-1">
                  Level {readinessLevel}
                </div>
              </div>
            </div>

            <button
              onClick={() => setActivePage('baca-desa')}
              className="w-full py-2.5 px-4 rounded-xl bg-[#4B5D2A] hover:bg-[#3F4E2C] text-[#F7F8EE] font-bold text-[13px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Lihat Rincian 8 Indikator</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Pillar 2 */}
          <div className="bg-[#F3F5EA] rounded-[14px] border border-[#C5CCAE] p-6 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-[#4B5D2A] transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#F6E7BD] text-[#825708]">
                  Pilar 2 • Finansial
                </span>
                <span className="material-symbols-outlined text-[#6B7753] text-[20px]">
                  solar_power
                </span>
              </div>
              <h3 className="text-[18px] font-extrabold text-[#1F2A14]">Rancang Watt</h3>
              <p className="text-[12px] text-[#3A4728] mt-1 mb-4 leading-relaxed">
                Pilih model pengelolaan dan simulasikan arus kas, tarif, serta kecukupan sinking fund
                baterai.
              </p>

              <div className="p-3.5 rounded-[12px] bg-[#FAFBF4] border border-[#C5CCAE] mb-4">
                <div className="text-[11px] font-bold text-[#6B7753] uppercase">Model Terpilih</div>
                <div className="text-[15px] font-black text-[#1F2A14] mt-0.5 truncate">
                  {getModelLabel(effectiveModel)}
                </div>
                <div className="text-[12px] text-[#4C9A52] font-bold mt-1">
                  Kas Bersih: ~Rp {simulationResults.netAnnualAverageJuta.toLocaleString('id-ID')} Jt / tahun
                </div>
              </div>
            </div>

            <button
              onClick={() => setActivePage('rancang-watt')}
              className="w-full py-2.5 px-4 rounded-xl bg-[#4B5D2A] hover:bg-[#3F4E2C] text-[#F7F8EE] font-bold text-[13px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Buka Simulator Arus Kas</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Pillar 3 */}
          <div className="bg-[#F3F5EA] rounded-[14px] border border-[#C5CCAE] p-6 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-[#4B5D2A] transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#E4E8D6] text-[#4B5D2A]">
                  Pilar 3 • Aset & M&E
                </span>
                <span className="material-symbols-outlined text-[#6B7753] text-[20px]">
                  monitor_heart
                </span>
              </div>
              <h3 className="text-[18px] font-extrabold text-[#1F2A14]">Jaga Watt</h3>
              <p className="text-[12px] text-[#3A4728] mt-1 mb-4 leading-relaxed">
                Deteksi anomali operasional, status 4 dimensi, peringatan dini, dan pencegahan risiko
                mangkrak.
              </p>

              <div className="p-3.5 rounded-[12px] bg-[#FAFBF4] border border-[#C5CCAE] mb-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] font-bold text-[#6B7753] uppercase">Indeks Kesehatan</span>
                  <span className="text-[20px] font-black text-[#4B5D2A]">94 / 100</span>
                </div>
                <div className="text-[12px] text-[#825708] font-bold mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-[#E0A526]">warning</span>
                  1 Peringatan Rutin: Inverter Unit 2
                </div>
              </div>
            </div>

            <button
              onClick={() => setActivePage('jaga-watt')}
              className="w-full py-2.5 px-4 rounded-xl bg-[#4B5D2A] hover:bg-[#3F4E2C] text-[#F7F8EE] font-bold text-[13px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Masuk Dashboard Pemantauan</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cross-Village Comparison Strip */}
      <div className="bg-[#F3F5EA] p-6 rounded-[14px] border border-[#C5CCAE] shadow-xs">
        <h3 className="text-[16px] font-extrabold text-[#1F2A14] mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#4B5D2A] text-[20px]">
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
                className={`p-4 rounded-[12px] border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#4B5D2A] bg-[#FAFBF4] ring-2 ring-[#4B5D2A]/30 shadow-xs'
                    : 'border-[#C5CCAE] bg-[#F3F5EA] hover:bg-[#FAFBF4]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-[14px] text-[#1F2A14]">{v.name}</span>
                  {isSelected && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#4B5D2A] text-[#F7F8EE]">
                      Desa Anda
                    </span>
                  )}
                </div>
                <div className="text-[12px] text-[#6B7753] mb-2">
                  Kapasitas: {v.capacityKwp} kWp • {v.subdistrict}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#C5CCAE]">
                  <span className="text-[12px] font-bold text-[#6B7753]">Skor Kesiapan</span>
                  <span className={`text-[14px] font-black ${
                    score >= 91 ? 'text-[#4C9A52]' : score >= 61 ? 'text-[#D99A1E]' : 'text-[#B84A3A]'
                  }`}>
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
