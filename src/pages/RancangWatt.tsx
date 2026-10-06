import React from 'react';
import { useDesaWatt } from '../context/DesaWattContext';
import { ManagementModel } from '../types';
import { GlowingMetricCard } from '@/components/ui/GlowingMetricCard';

export const RancangWatt: React.FC = () => {
  const {
    activeVillage,
    totalScore,
    readinessLevel,
    recommendedModel,
    effectiveModel,
    setSelectedModelOverride,
    isModelMismatch,
    simulatorParams,
    setSimulatorParams,
    simulationResults,
    setActivePage,
  } = useDesaWatt();

  const {
    capexJuta,
    tariffPerKwh,
    productiveLoadPercent,
    monthlyContributionPerKK,
    horizonYears,
    panelDegradationPercentPerYear,
    batteryReplacementCostJuta,
  } = simulatorParams;

  const modelsConfig: {
    id: ManagementModel;
    title: string;
    subtitle: string;
    description: string;
    threshold: number;
    pros: string[];
    cons: string[];
  }[] = [
    {
      id: 'milik_koperasi',
      title: 'Milik Koperasi Penuh',
      subtitle: 'Kepemilikan Mandiri 100% Desa',
      description:
        'Koperasi Desa menguasai penuh aset PLTS, mengelola penjualan listrik langsung, dan menanggung dana cadangan baterai mandiri.',
      threshold: 91,
      pros: ['Kedaulatan energi penuh', 'Seluruh laba masuk kas koperasi desa'],
      cons: ['Risiko capex penggantian baterai ditanggung desa 100%'],
    },
    {
      id: 'kemitraan',
      title: 'Kemitraan (JV BUMDes / Swasta)',
      subtitle: 'Bagi Hasil & Supervisi Teknis',
      description:
        'Kerja sama operasi dengan pengembang terpercaya. Risiko teknis dan capex baterai ditanggung bersama dengan pembagian hasil transparan.',
      threshold: 61,
      pros: ['Pendampingan teknis berkelanjutan', 'Bagi risiko suku cadang'],
      cons: ['Marjin kas bersih terbagi', 'Butuh regulasi SPK kemitraan yang ketat'],
    },
    {
      id: 'eaas',
      title: 'Energy-as-a-Service (EaaS)',
      subtitle: 'Sewa Jasa Energi Tanpa Beban Capex',
      description:
        'Desa hanya membayar listrik yang terpakai. Pihak ketiga memiliki aset dan bertanggung jawab 100% atas baterai, inverter, dan operasional.',
      threshold: 40,
      pros: ['Bebas beban penggantian baterai', 'Jaminan SLA uptime tinggi'],
      cons: ['Aset bukan milik desa', 'Tarif ditentukan kontrak jangka panjang'],
    },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-12 text-slate-100">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#F5A623]/20 text-[#F5A623] border border-[#F5A623]/30">
              Pilar 2 • Financial Tech & Business Model
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-[12px] font-semibold text-slate-400">
              Desa: {activeVillage.name} (Skor: {totalScore})
            </span>
          </div>
          <h1 className="text-[28px] font-extrabold text-white tracking-tight leading-tight">
            Rancang Watt: Model Pengelolaan & Simulator Arus Kas
          </h1>
          <p className="text-[14px] text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Pilih arsitektur kepemilikan aset PLTS komunal dan uji ketahanan fiskal desa melalui
            simulasi cash-flow, payback period, dan ketercukupan sinking fund baterai.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActivePage('gerbang-keputusan')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#147A4B] text-white font-bold text-[13px] hover:bg-[#005F38] shadow-md transition-all cursor-pointer group"
          >
            <span>Lanjut ke Gerbang Keputusan</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </div>

      {/* Management Models Selection Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[16px] font-extrabold text-white">
            1. Pilihan Model Kepemilikan & Tata Kelola
          </h2>
          <span className="text-[12px] text-slate-400">
            Rekomendasi sistem berbasis skor Baca Desa:{' '}
            <strong className="text-[#4ADE80]">
              {recommendedModel === 'milik_koperasi'
                ? 'Milik Koperasi'
                : recommendedModel === 'kemitraan'
                ? 'Kemitraan (JV BUMDes)'
                : 'EaaS'}
            </strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {modelsConfig.map((m) => {
            const isSelected = effectiveModel === m.id;
            const isRecommended = recommendedModel === m.id;
            const isBelowThreshold = totalScore < m.threshold;

            return (
              <div
                key={m.id}
                onClick={() => setSelectedModelOverride(m.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative backdrop-blur-xl ${
                  isSelected
                    ? 'border-[#34D399] bg-[#0E2238] ring-2 ring-[#34D399]/40 shadow-xl'
                    : 'border-white/10 bg-[#0C1B2C]/85 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Ambang: Skor ≥ {m.threshold}
                    </span>
                    {isRecommended && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-[#147A4B]/40 text-[#4ADE80] border border-[#34D399]/40">
                        Direkomendasikan
                      </span>
                    )}
                  </div>

                  <h3 className="text-[17px] font-black text-white">{m.title}</h3>
                  <span className="text-[12px] font-semibold text-[#4ADE80] block mb-2">
                    {m.subtitle}
                  </span>
                  <p className="text-[12px] text-slate-300 leading-relaxed mb-4">
                    {m.description}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-white/10 text-[11px]">
                    <div className="text-slate-300">
                      <strong className="text-[#4ADE80]">Kelebihan:</strong> {m.pros.join(', ')}
                    </div>
                    <div className="text-slate-400">
                      <strong className="text-amber-400">Tantangan:</strong> {m.cons.join(', ')}
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400">
                    {isBelowThreshold ? '⚠️ Skor desa di bawah ambang' : '✓ Memenuhi syarat skor'}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? 'border-[#34D399] bg-[#147A4B] text-white'
                        : 'border-white/20'
                    }`}
                  >
                    {isSelected && (
                      <span className="material-symbols-outlined text-[14px]">done</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mismatch Warning Alert (Correction 2) */}
        {isModelMismatch && (
          <div className="mt-4 p-4 rounded-xl bg-[#F5A623]/15 border border-[#F5A623]/30 flex items-start gap-3 backdrop-blur-xl animate-in fade-in">
            <span className="material-symbols-outlined text-[#F5A623] text-[22px] shrink-0 mt-0.5">
              warning
            </span>
            <div className="flex-1">
              <h4 className="text-[13px] font-extrabold text-[#F5A623]">
                Peringatan Inkonsistensi Model vs Skor Kesiapan
              </h4>
              <p className="text-[12px] text-amber-200 mt-0.5 leading-relaxed">
                Anda memilih model <strong>Milik Koperasi</strong> yang memerlukan ambang skor minimal{' '}
                <strong>91 poin</strong>, sedangkan skor kesiapan {activeVillage.name} saat ini adalah{' '}
                <strong>{totalScore} poin ({readinessLevel})</strong>. Memaksakan model ini tanpa
                pendampingan intensif berisiko memicu gagal kelola dan PLTS mangkrak.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Simulator Arus Kas & Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Sliders (5 cols) */}
        <div className="lg:col-span-5 bg-[#0C1B2C]/85 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="text-[16px] font-extrabold text-white">
                Parameter Simulasi Finansial
              </h3>
              <p className="text-[11px] text-slate-400">
                Sesuaikan variabel untuk melihat dampak arus kas
              </p>
            </div>
            <span className="material-symbols-outlined text-[#34D399] text-[20px]">tune</span>
          </div>

          {/* Slider 1: Capex */}
          <div>
            <div className="flex justify-between items-center text-[12px] font-bold mb-1">
              <span className="text-slate-300">Belanja Modal (Capex PLTS)</span>
              <span className="text-[#4ADE80] font-black">Rp {capexJuta} Juta</span>
            </div>
            <input
              type="range"
              min="300"
              max="1200"
              step="50"
              value={capexJuta}
              onChange={(e) =>
                setSimulatorParams((p) => ({ ...p, capexJuta: Number(e.target.value) }))
              }
              className="w-full accent-[#147A4B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Rp 300 Jt</span>
              <span>Rp 1.200 Jt</span>
            </div>
          </div>

          {/* Slider 2: Tarif Listrik */}
          <div>
            <div className="flex justify-between items-center text-[12px] font-bold mb-1">
              <span className="text-slate-300">Tarif Listrik Produktif</span>
              <span className="text-[#4ADE80] font-black">Rp {tariffPerKwh} / kWh</span>
            </div>
            <input
              type="range"
              min="1500"
              max="4000"
              step="100"
              value={tariffPerKwh}
              onChange={(e) =>
                setSimulatorParams((p) => ({ ...p, tariffPerKwh: Number(e.target.value) }))
              }
              className="w-full accent-[#147A4B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Rp 1.500</span>
              <span>Rp 4.000</span>
            </div>
          </div>

          {/* Slider 3: Beban Produktif % */}
          <div>
            <div className="flex justify-between items-center text-[12px] font-bold mb-1">
              <span className="text-slate-300">Porsi Beban Produktif UMKM</span>
              <span className="text-[#4ADE80] font-black">{productiveLoadPercent}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="70"
              step="5"
              value={productiveLoadPercent}
              onChange={(e) =>
                setSimulatorParams((p) => ({
                  ...p,
                  productiveLoadPercent: Number(e.target.value),
                }))
              }
              className="w-full accent-[#147A4B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>10% (Rendah)</span>
              <span>70% (Tinggi)</span>
            </div>
          </div>

          {/* Slider 4: Iuran O&M Bulanan / KK */}
          <div>
            <div className="flex justify-between items-center text-[12px] font-bold mb-1">
              <span className="text-slate-300">Iuran Rutin per KK</span>
              <span className="text-[#4ADE80] font-black">
                Rp {monthlyContributionPerKK.toLocaleString('id-ID')} / bln
              </span>
            </div>
            <input
              type="range"
              min="30000"
              max="150000"
              step="5000"
              value={monthlyContributionPerKK}
              onChange={(e) =>
                setSimulatorParams((p) => ({
                  ...p,
                  monthlyContributionPerKK: Number(e.target.value),
                }))
              }
              className="w-full accent-[#147A4B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Rp 30.000</span>
              <span>Rp 150.000</span>
            </div>
          </div>

          {/* Horizon Selection */}
          <div className="pt-2">
            <span className="text-[12px] font-bold text-slate-300 block mb-1.5">
              Horizon Simulasi
            </span>
            <div className="grid grid-cols-3 gap-2">
              {([10, 15, 20] as const).map((h) => (
                <button
                  key={h}
                  onClick={() => setSimulatorParams((p) => ({ ...p, horizonYears: h }))}
                  className={`py-1.5 rounded-lg text-[12px] font-bold transition-all cursor-pointer ${
                    horizonYears === h
                      ? 'bg-[#147A4B] text-white shadow-md border border-[#34D399]/40'
                      : 'bg-black/30 text-slate-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {h} Tahun
                </button>
              ))}
            </div>
          </div>

          {/* Assumptions note */}
          <div className="p-3 bg-black/40 rounded-xl border border-white/10 text-[11px] text-slate-300 leading-relaxed">
            <strong className="text-white">Asumsi Simulasi:</strong> Degradasi panel {panelDegradationPercentPerYear}%/thn, discount rate 8%, biaya pemeliharaan berkala 2.5% capex/thn, alokasi sinking fund 20% total kas masuk.
          </div>
        </div>

        {/* Right: Real-time Outcomes & Visual Cash-Flow (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* 3 Outcome KPI Cards with Glowing Card Animation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <GlowingMetricCard glowColor={simulationResults.npvJuta >= 0 ? 'green' : 'amber'}>
              <div className="p-4.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Net Present Value (NPV)
                </span>
                <div
                  className={`text-[22px] font-black mt-1 ${
                    simulationResults.npvJuta >= 0 ? 'text-[#4ADE80]' : 'text-[#F87171]'
                  }`}
                >
                  Rp {simulationResults.npvJuta.toLocaleString('id-ID')} Jt
                </div>
                <span className="text-[11px] text-slate-400">
                  {simulationResults.npvJuta >= 0 ? '✓ Investasi Layak' : '⚠️ NPV Negatif'}
                </span>
              </div>
            </GlowingMetricCard>

            <GlowingMetricCard glowColor="amber">
              <div className="p-4.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Payback Period
                </span>
                <div className="text-[22px] font-black text-white mt-1">
                  {simulationResults.paybackPeriodYears} Tahun
                </div>
                <span className="text-[11px] text-[#4ADE80] font-bold">
                  Rata-rata: Rp {simulationResults.netAnnualAverageJuta} Jt/thn
                </span>
              </div>
            </GlowingMetricCard>

            <GlowingMetricCard glowColor={simulationResults.batteryFundSufficient ? 'emerald' : 'amber'}>
              <div className="p-4.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Kecukupan Sinking Fund
                </span>
                <div
                  className={`text-[22px] font-black mt-1 ${
                    simulationResults.batteryFundSufficient ? 'text-[#4ADE80]' : 'text-amber-400'
                  }`}
                >
                  {simulationResults.batteryFundSufficient ? 'TERPENUHI' : 'DEFISIT DANA'}
                </div>
                <span className="text-[11px] text-slate-300">
                  Tahun ke-11: Ganti Baterai
                </span>
              </div>
            </GlowingMetricCard>
          </div>

          {/* Amber Warning if Sinking Fund Deficit in Year 11 */}
          {!simulationResults.batteryFundSufficient && (
            <div className="p-4 rounded-xl bg-[#F5A623]/15 border border-[#F5A623]/30 flex items-start gap-3 backdrop-blur-xl">
              <span className="material-symbols-outlined text-[#F5A623] text-[20px] mt-0.5">
                warning
              </span>
              <div className="text-[12px] text-amber-200 leading-relaxed">
                <strong>Peringatan Dana Cadangan:</strong> Saldo akumulasi Dana O&M pada Tahun ke-11 diproyeksikan tidak mampu menutup biaya penggantian baterai sebesar Rp {batteryReplacementCostJuta} Juta. Naikkan iuran bulanan atau tambahkan porsi beban produktif siang hari.
              </div>
            </div>
          )}

          {/* Cumulative Cash-Flow Chart (SVG) */}
          <div className="bg-[#0C1B2C]/85 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-[15px] font-extrabold text-white">
                  Proyeksi Saldo Akumulasi Kas & Dana O&M (Horizon {horizonYears} Tahun)
                </h4>
                <p className="text-[11px] text-slate-400">
                  Titik kuning menandai momen kritis penggantian baterai pada Tahun ke-11
                </p>
              </div>
            </div>

            {/* SVG Visual Bars */}
            <div className="w-full h-44 flex items-end gap-1.5 pt-4 pb-2 border-b border-white/10">
              {simulationResults.yearlyData.map((d) => {
                const maxVal = Math.max(
                  ...simulationResults.yearlyData.map((x) => Math.abs(x.omFundAccumulationJuta)),
                  200
                );
                const heightPercent = Math.min(
                  Math.max((Math.abs(d.omFundAccumulationJuta) / maxVal) * 100, 10),
                  100
                );
                const isPositive = d.omFundAccumulationJuta >= 0;

                return (
                  <div
                    key={d.year}
                    className="flex-1 flex flex-col items-center justify-end h-full group relative"
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-10 hidden group-hover:flex bg-black/90 text-white text-[10px] px-2 py-1 rounded shadow-md z-20 whitespace-nowrap border border-white/20">
                      Thn {d.year}: Rp {d.omFundAccumulationJuta} Jt
                    </div>

                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t-sm transition-all ${
                        d.isBatteryYear
                          ? 'bg-[#F5A623] ring-2 ring-[#F5A623]/50'
                          : isPositive
                          ? 'bg-[#147A4B]'
                          : 'bg-[#EF4444]'
                      }`}
                    ></div>
                    <span className="text-[9px] font-semibold text-slate-400 mt-1">
                      {d.year}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#147A4B]"></span>
                Saldo Dana O&M Surplus
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#F5A623]"></span>
                Tahun ke-11 (Ganti Baterai LiFePO4)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#EF4444]"></span>
                Defisit Kas
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
