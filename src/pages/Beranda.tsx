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
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-12 text-[#334155]">
      {/* Top Banner: Active Village Snapshot with subtle warm gradient */}
      <div className="rounded-2xl bg-gradient-to-r from-[#E8F5EE] via-[#F4FAF6] to-[#FFF7E6] border border-[#E2E8F0] p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border ${
                activeVillage.statusPLTS === 'Sehat'
                  ? 'bg-[#EBF7F1] text-[#147A4B] border-[#C6E7D5]'
                  : activeVillage.statusPLTS === 'Waspada'
                  ? 'bg-[#FFF4DC] text-[#B45309] border-[#FDE68A]'
                  : 'bg-[#FDF2F2] text-[#D64545] border-[#F8C3C3]'
              }`}>
                STATUS: {activeVillage.statusPLTS.toUpperCase()}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[12px] font-semibold text-[#64748B]">
                Unit Usaha Koperasi Desa Merah Putih
              </span>
            </div>

            <h1 className="text-[26px] font-black text-[#0F172A] tracking-tight">
              Selamat Bertugas, {activeVillage.pengurusName} & {activeVillage.pendampingName}
            </h1>
            <p className="text-[14px] text-[#334155] max-w-2xl leading-relaxed">
              Ringkasan operasional dan tata kelola PLTS Komunal di{' '}
              <strong className="text-[#0F172A]">{activeVillage.name}</strong>,{' '}
              {activeVillage.subdistrict}, {activeVillage.regency}. {activeVillage.statusDescription}
            </p>

            <div className="flex items-center gap-4 pt-2 text-[12px] text-[#475569] font-semibold flex-wrap">
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
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 flex flex-col justify-between min-w-[240px] shrink-0 shadow-xs">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                Daya Sesaat (Live Feed)
              </div>
              <div className="text-[24px] font-black text-[#0F172A] mt-0.5">38.4 kW</div>
              <div className="text-[12px] text-[#64748B] mt-1 flex justify-between">
                <span>Beban: 64%</span>
                <span className="text-[#147A4B] font-bold">Cadangan: 21.2 kW</span>
              </div>
            </div>
            <div className="pt-3 mt-3 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] font-bold text-[#147A4B]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22A06B]"></span>
                Inverter 50.02 Hz Sinkron
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Top KPI Cards with Clean White Surface */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <GlowingMetricCard>
          <div className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#64748B]">
                Energi Hari Ini
              </span>
              <span className="w-8 h-8 rounded-lg bg-[#E8F5EE] text-[#147A4B] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">bolt</span>
              </span>
            </div>
            <div className="my-2">
              <div className="text-[28px] font-black text-[#0F172A] tracking-tight">
                {activeVillage.productionTodayKwh} <span className="text-[16px] text-[#64748B] font-bold">kWh</span>
              </div>
              <div className="text-[12px] text-[#147A4B] font-bold flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span>88.7% target harian</span>
              </div>
            </div>
            <span className="text-[11px] text-[#64748B]">Kebutuhan desa: 160 kWh</span>
          </div>
        </GlowingMetricCard>

        {/* KPI 2 */}
        <GlowingMetricCard>
          <div className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#64748B]">Iuran Terkumpul</span>
              <span className="w-8 h-8 rounded-lg bg-[#FFF4DC] text-[#B45309] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">payments</span>
              </span>
            </div>
            <div className="my-2">
              <div className="text-[28px] font-black text-[#0F172A] tracking-tight">
                {activeVillage.collectionRatePercent}%
              </div>
              <div className="text-[12px] text-[#475569] font-semibold mt-0.5">
                Rp {(activeVillage.collectionRatePercent * 0.17).toFixed(1)} Jt bulan ini
              </div>
            </div>
            <span className="text-[11px] text-[#64748B]">Tarif Rp 75.000 / KK / bulan</span>
          </div>
        </GlowingMetricCard>

        {/* KPI 3 */}
        <GlowingMetricCard>
          <div className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#64748B]">Emisi Terhindar</span>
                <span className="text-[10px] text-[#64748B] italic font-medium">(estimasi demo)</span>
              </div>
              <span className="w-8 h-8 rounded-lg bg-[#E8F5EE] text-[#147A4B] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">eco</span>
              </span>
            </div>
            <div className="my-2">
              <div className="text-[28px] font-black text-[#0F172A] tracking-tight">
                214 <span className="text-[16px] text-[#64748B] font-bold">kg CO₂e</span>
              </div>
              <div className="text-[12px] text-[#475569] font-semibold mt-0.5">
                Setara 78 Liter solar dihemat <span className="text-[10px] text-[#64748B] italic">(estimasi demo)</span>
              </div>
            </div>
            <span className="text-[11px] text-[#64748B]">Perhitungan faktor emisi lokal</span>
          </div>
        </GlowingMetricCard>

        {/* KPI 4 */}
        <GlowingMetricCard>
          <div className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#64748B]">
                Dana Cadangan O&M
              </span>
              <span className="w-8 h-8 rounded-lg bg-[#E8F5EE] text-[#147A4B] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">savings</span>
              </span>
            </div>
            <div className="my-2">
              <div className="text-[28px] font-black text-[#0F172A] tracking-tight">
                Rp {activeVillage.saldoDanaOMJuta} <span className="text-[16px] text-[#64748B] font-bold">Juta</span>
              </div>
              <div className="text-[12px] text-[#147A4B] font-bold mt-0.5">
                Target Baterai: Rp {activeVillage.targetBatteryFundJuta} Jt
              </div>
            </div>
            <span className="text-[11px] text-[#64748B]">Rekening escrow aman</span>
          </div>
        </GlowingMetricCard>
      </div>

      {/* 3 Pillars Track Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[18px] font-extrabold text-[#0F172A]">
              3 Pilar Keputusan PLTS Desa
            </h2>
            <p className="text-[12px] text-[#64748B]">
              Alur terintegrasi dari penilaian kesiapan, simulasi model bisnis, gerbang kelayakan,
              hingga pemantauan operasional.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Pillar 1 */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#E8F5EE] text-[#147A4B]">
                  Pilar 1 • Kesiapan
                </span>
                <span className="material-symbols-outlined text-[#64748B] text-[20px]">
                  fact_check
                </span>
              </div>
              <h3 className="text-[18px] font-extrabold text-[#0F172A]">Baca Desa</h3>
              <p className="text-[12px] text-[#334155] mt-1 mb-4 leading-relaxed">
                Evaluasi kesiapan komunal, kapasitas kelembagaan, beban produktif, dan kemampuan bayar
                iuran.
              </p>

              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] mb-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] font-bold text-[#64748B] uppercase">Skor Saat Ini</span>
                  <span className="text-[20px] font-black text-[#147A4B]">
                    {totalScore} <span className="text-[13px] text-[#64748B]">/ 120</span>
                  </span>
                </div>
                <div className="text-[12px] font-bold text-[#0F172A] mt-1">
                  Level {readinessLevel}
                </div>
              </div>
            </div>

            <button
              onClick={() => setActivePage('baca-desa')}
              className="w-full py-2.5 px-4 rounded-xl bg-[#F8FAFC] hover:bg-[#147A4B] text-[#0F172A] hover:text-white font-bold text-[13px] transition-all flex items-center justify-center gap-2 border border-[#E2E8F0] cursor-pointer"
            >
              <span>Lihat Rincian 8 Indikator</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#FFF4DC] text-[#B45309]">
                  Pilar 2 • Finansial
                </span>
                <span className="material-symbols-outlined text-[#64748B] text-[20px]">
                  solar_power
                </span>
              </div>
              <h3 className="text-[18px] font-extrabold text-[#0F172A]">Rancang Watt</h3>
              <p className="text-[12px] text-[#334155] mt-1 mb-4 leading-relaxed">
                Pilih model pengelolaan dan simulasikan arus kas, tarif, serta kecukupan sinking fund
                baterai.
              </p>

              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] mb-4">
                <div className="text-[11px] font-bold text-[#64748B] uppercase">Model Terpilih</div>
                <div className="text-[15px] font-black text-[#0F172A] mt-0.5 truncate">
                  {getModelLabel(effectiveModel)}
                </div>
                <div className="text-[12px] text-[#147A4B] font-bold mt-1">
                  Kas Bersih: ~Rp {simulationResults.netAnnualAverageJuta.toLocaleString('id-ID')} Jt / tahun
                </div>
              </div>
            </div>

            <button
              onClick={() => setActivePage('rancang-watt')}
              className="w-full py-2.5 px-4 rounded-xl bg-[#F8FAFC] hover:bg-[#147A4B] text-[#0F172A] hover:text-white font-bold text-[13px] transition-all flex items-center justify-center gap-2 border border-[#E2E8F0] cursor-pointer"
            >
              <span>Buka Simulator Arus Kas</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#E8F5EE] text-[#147A4B]">
                  Pilar 3 • Aset & M&E
                </span>
                <span className="material-symbols-outlined text-[#64748B] text-[20px]">
                  monitor_heart
                </span>
              </div>
              <h3 className="text-[18px] font-extrabold text-[#0F172A]">Jaga Watt</h3>
              <p className="text-[12px] text-[#334155] mt-1 mb-4 leading-relaxed">
                Deteksi anomali operasional, status 4 dimensi, peringatan dini, dan pencegahan risiko
                mangkrak.
              </p>

              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] mb-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] font-bold text-[#64748B] uppercase">Indeks Kesehatan</span>
                  <span className="text-[20px] font-black text-[#147A4B]">94 / 100</span>
                </div>
                <div className="text-[12px] text-[#B45309] font-bold mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">warning</span>
                  1 Peringatan Rutin: Inverter Unit 2
                </div>
              </div>
            </div>

            <button
              onClick={() => setActivePage('jaga-watt')}
              className="w-full py-2.5 px-4 rounded-xl bg-[#F8FAFC] hover:bg-[#147A4B] text-[#0F172A] hover:text-white font-bold text-[13px] transition-all flex items-center justify-center gap-2 border border-[#E2E8F0] cursor-pointer"
            >
              <span>Masuk Dashboard Pemantauan</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cross-Village Comparison Strip */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm">
        <h3 className="text-[16px] font-extrabold text-[#0F172A] mb-4 flex items-center gap-2">
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
                    ? 'border-[#147A4B] bg-[#E8F5EE]/40 ring-1 ring-[#147A4B]'
                    : 'border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-[14px] text-[#0F172A]">{v.name}</span>
                  {isSelected && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#147A4B] text-white">
                      Desa Anda
                    </span>
                  )}
                </div>
                <div className="text-[12px] text-[#64748B] mb-2">
                  Kapasitas: {v.capacityKwp} kWp • {v.subdistrict}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0]">
                  <span className="text-[12px] font-bold text-[#64748B]">Skor Kesiapan</span>
                  <span className={`text-[14px] font-black ${
                    score >= 91 ? 'text-[#147A4B]' : score >= 61 ? 'text-[#B45309]' : 'text-[#D64545]'
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
