import React, { useMemo } from 'react';
import { useDesaWatt } from '../context/DesaWattContext';
import { ManagementModel } from '../types';

export const RancangWatt: React.FC = () => {
  const {
    activeVillage,
    totalScore,
    readinessLevel,
    recommendedModel,
    selectedModelOverride,
    setSelectedModelOverride,
    effectiveModel,
    isModelMismatch,
    simulatorParams,
    setSimulatorParams,
    simulationResults,
    setActivePage,
  } = useDesaWatt();

  const modelsConfig: {
    id: ManagementModel;
    title: string;
    subtitle: string;
    threshold: number;
    description: string;
    pros: string[];
    cons: string[];
  }[] = [
    {
      id: 'milik_koperasi',
      title: 'Milik Koperasi',
      subtitle: 'Mandiri Penuh 100%',
      threshold: 91,
      description:
        'Koperasi menguasai kepemilikan aset, memungut tarif, dan menanggung pemeliharaan dengan pendampingan teknis.',
      pros: ['Kedaulatan energi desa 100%', 'Seluruh surplus kas menjadi pendapatan koperasi'],
      cons: ['Menuntut kapasitas teknisi lokal tinggi', 'Koperasi wajib mendanai sinking fund baterai'],
    },
    {
      id: 'kemitraan',
      title: 'Kemitraan (JV BUMDes)',
      subtitle: 'BUMDes 51% - Swasta 49%',
      threshold: 61,
      description:
        'Bagi risiko belanja modal dan pemeliharaan bersama operator swasta berizin, dengan penguatan bertahap.',
      pros: ['Suku cadang & inverter dijamin vendor', 'Kebutuhan capex awal desa lebih ringan'],
      cons: ['Bagi hasil pendapatan listrik', 'Tergantung pada kontrak SLA operator mitra'],
    },
    {
      id: 'eaas',
      title: 'Energy-as-a-Service (EaaS)',
      subtitle: 'Layanan Penuh Pihak Ketiga',
      threshold: 61,
      description:
        'Aset dimiliki penyedia energi swasta/BUMN. Warga hanya membayar biaya pemakaian listrik per kWh tanpa belanja modal.',
      pros: ['Nol risiko belanja modal desa', 'Penggantian baterai & inverter 100% ditanggung mitra'],
      cons: ['Tarif per kWh relatif lebih tinggi', 'Koperasi tidak memiliki aset fisik'],
    },
  ];

  // Simulator Calculations
  const { capexJuta, tariffPerKwh, productiveLoadPercent, monthlyContributionPerKK, panelDegradationPercentPerYear, batteryReplacementCostJuta, horizonYears } = simulatorParams;

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#FEF6E9] text-[#96600E] border border-[#FCDCA7]">
              Pilar 2 • Financial Tech & Business Model
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-[12px] font-semibold text-slate-500">
              Desa: {activeVillage.name} (Skor: {totalScore})
            </span>
          </div>
          <h1 className="text-[28px] font-extrabold text-[#131B2E] tracking-tight leading-tight">
            Rancang Watt: Model Pengelolaan & Simulator Arus Kas
          </h1>
          <p className="text-[14px] text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Pilih arsitektur kepemilikan aset PLTS komunal dan uji ketahanan fiskal desa melalui
            simulasi cash-flow, payback period, dan ketercukupan sinking fund baterai.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActivePage('gerbang-keputusan')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#147A4B] text-white font-bold text-[13px] hover:bg-[#005F38] shadow-sm transition-all cursor-pointer group"
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
          <h2 className="text-[16px] font-extrabold text-[#131B2E]">
            1. Pilihan Model Kepemilikan & Tata Kelola
          </h2>
          <span className="text-[12px] text-slate-500">
            Rekomendasi sistem berbasis skor Baca Desa:{' '}
            <strong className="text-[#147A4B]">
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
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative ${
                  isSelected
                    ? 'border-[#147A4B] bg-white ring-2 ring-[#147A4B]/20 shadow-sm'
                    : 'border-slate-200/80 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Ambang: Skor ≥ {m.threshold}
                    </span>
                    {isRecommended && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-[#EBF7F1] text-[#147A4B] border border-[#C1E7D4]">
                        Direkomendasikan
                      </span>
                    )}
                  </div>

                  <h3 className="text-[17px] font-black text-[#131B2E]">{m.title}</h3>
                  <span className="text-[12px] font-semibold text-[#147A4B] block mb-2">
                    {m.subtitle}
                  </span>
                  <p className="text-[12px] text-slate-600 leading-relaxed mb-4">
                    {m.description}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-slate-100 text-[11px]">
                    <div className="text-slate-600">
                      <strong className="text-[#147A4B]">Kelebihan:</strong> {m.pros.join(', ')}
                    </div>
                    <div className="text-slate-500">
                      <strong className="text-slate-700">Tantangan:</strong> {m.cons.join(', ')}
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400">
                    {isBelowThreshold ? '⚠️ Skor desa di bawah ambang' : '✓ Memenuhi syarat skor'}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? 'border-[#147A4B] bg-[#147A4B] text-white'
                        : 'border-slate-300'
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
          <div className="mt-4 p-4 rounded-xl bg-[#FEF6E9] border border-[#FCDCA7] flex items-start gap-3 animate-in fade-in">
            <span className="material-symbols-outlined text-[#F5A623] text-[22px] shrink-0 mt-0.5">
              warning
            </span>
            <div className="flex-1">
              <h4 className="text-[13px] font-extrabold text-[#96600E]">
                Peringatan Inkonsistensi Model vs Skor Kesiapan
              </h4>
              <p className="text-[12px] text-[#96600E]/90 mt-0.5 leading-relaxed">
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
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-[16px] font-extrabold text-[#131B2E]">
                Parameter Simulasi Finansial
              </h3>
              <p className="text-[11px] text-slate-400">
                Sesuaikan variabel untuk melihat dampak arus kas
              </p>
            </div>
            <span className="material-symbols-outlined text-[#147A4B] text-[20px]">tune</span>
          </div>

          {/* Slider 1: Capex */}
          <div>
            <div className="flex justify-between items-center text-[12px] font-bold mb-1">
              <span className="text-slate-700">Belanja Modal (Capex PLTS)</span>
              <span className="text-[#147A4B] font-black">Rp {capexJuta} Juta</span>
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
              <span className="text-slate-700">Tarif Listrik Produktif</span>
              <span className="text-[#147A4B] font-black">Rp {tariffPerKwh} / kWh</span>
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
              <span className="text-slate-700">Porsi Beban Produktif UMKM</span>
              <span className="text-[#147A4B] font-black">{productiveLoadPercent}%</span>
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
              <span className="text-slate-700">Iuran Rutin per KK</span>
              <span className="text-[#147A4B] font-black">
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

          {/* Slider 5: Harga Penggantian Baterai */}
          <div>
            <div className="flex justify-between items-center text-[12px] font-bold mb-1">
              <span className="text-slate-700">Biaya Ganti Baterai (Thn ke-11)</span>
              <span className="text-[#835500] font-black">Rp {batteryReplacementCostJuta} Juta</span>
            </div>
            <input
              type="range"
              min="80"
              max="300"
              step="10"
              value={batteryReplacementCostJuta}
              onChange={(e) =>
                setSimulatorParams((p) => ({
                  ...p,
                  batteryReplacementCostJuta: Number(e.target.value),
                }))
              }
              className="w-full accent-[#835500] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Rp 80 Jt</span>
              <span>Rp 300 Jt</span>
            </div>
          </div>

          {/* Horizon Selection */}
          <div className="pt-2">
            <span className="text-[12px] font-bold text-slate-700 block mb-1.5">
              Horizon Simulasi
            </span>
            <div className="grid grid-cols-3 gap-2">
              {([10, 15, 20] as const).map((h) => (
                <button
                  key={h}
                  onClick={() => setSimulatorParams((p) => ({ ...p, horizonYears: h }))}
                  className={`py-1.5 rounded-lg text-[12px] font-bold transition-all cursor-pointer ${
                    horizonYears === h
                      ? 'bg-[#147A4B] text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {h} Tahun
                </button>
              ))}
            </div>
          </div>

          {/* Assumptions note */}
          <div className="p-3 bg-[#F8FAFC] rounded-xl border border-slate-200/80 text-[11px] text-slate-500 leading-relaxed">
            <strong className="text-slate-700">Asumsi Simulasi:</strong> Degradasi panel {panelDegradationPercentPerYear}%/thn, discount rate 8%, biaya pemeliharaan berkala 2.5% capex/thn, alokasi sinking fund 20% total kas masuk.
          </div>
        </div>

        {/* Right: Real-time Outcomes & Visual Cash-Flow (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* 3 Outcome KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Net Present Value (NPV)
              </span>
              <div
                className={`text-[22px] font-black mt-1 ${
                  simulationResults.npvJuta >= 0 ? 'text-[#147A4B]' : 'text-[#D64545]'
                }`}
              >
                Rp {simulationResults.npvJuta.toLocaleString('id-ID')} Jt
              </div>
              <span className="text-[11px] text-slate-500">
                {simulationResults.npvJuta >= 0 ? '✓ Investasi Layak' : '⚠️ NPV Negatif'}
              </span>
            </div>

            <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Payback Period
              </span>
              <div className="text-[22px] font-black text-[#131B2E] mt-1">
                {simulationResults.paybackPeriodYears} Tahun
              </div>
              <span className="text-[11px] text-[#147A4B] font-bold">
                Rata-rata: Rp {simulationResults.netAnnualAverageJuta} Jt/thn
              </span>
            </div>

            <div
              className={`p-4.5 rounded-2xl border shadow-2xs ${
                simulationResults.batteryFundSufficient
                  ? 'bg-white border-slate-200/80'
                  : 'bg-[#FEF6E9] border-[#FCDCA7]'
              }`}
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Kecukupan Sinking Fund
              </span>
              <div
                className={`text-[22px] font-black mt-1 ${
                  simulationResults.batteryFundSufficient ? 'text-[#147A4B]' : 'text-[#96600E]'
                }`}
              >
                {simulationResults.batteryFundSufficient ? 'TERPENUHI' : 'DEFISIT DANA'}
              </div>
              <span className="text-[11px] text-slate-600">
                Tahun ke-11: Ganti Baterai
              </span>
            </div>
          </div>

          {/* Amber Warning if Sinking Fund Deficit in Year 11 */}
          {!simulationResults.batteryFundSufficient && (
            <div className="p-4 rounded-xl bg-[#FEF6E9] border border-[#FCDCA7] flex items-start gap-3">
              <span className="material-symbols-outlined text-[#F5A623] text-[20px] mt-0.5">
                warning
              </span>
              <div className="text-[12px] text-[#96600E] leading-relaxed">
                <strong>Peringatan Dana Cadangan:</strong> Saldo akumulasi Dana O&M pada Tahun ke-11 diproyeksikan tidak mampu menutup biaya penggantian baterai sebesar Rp {batteryReplacementCostJuta} Juta. Naikkan iuran bulanan atau tambahkan porsi beban produktif siang hari.
              </div>
            </div>
          )}

          {/* Cumulative Cash-Flow Chart (SVG) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-[15px] font-extrabold text-[#131B2E]">
                  Proyeksi Saldo Akumulasi Kas & Dana O&M (Horizon {horizonYears} Tahun)
                </h4>
                <p className="text-[11px] text-slate-400">
                  Titik kuning menandai momen kritis penggantian baterai pada Tahun ke-11
                </p>
              </div>
            </div>

            {/* SVG Visual Bars */}
            <div className="w-full h-44 flex items-end gap-1.5 pt-4 pb-2 border-b border-slate-200">
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
                    <div className="absolute -top-10 hidden group-hover:flex bg-[#131B2E] text-white text-[10px] px-2 py-1 rounded shadow-md z-20 whitespace-nowrap">
                      Thn {d.year}: Rp {d.omFundAccumulationJuta} Jt
                    </div>

                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t-sm transition-all ${
                        d.isBatteryYear
                          ? 'bg-[#FEAE2C] ring-2 ring-[#FEAE2C]/50'
                          : isPositive
                          ? 'bg-[#147A4B]'
                          : 'bg-[#D64545]'
                      }`}
                    ></div>
                    <span className="text-[9px] font-semibold text-slate-400 mt-1">
                      {d.year}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#147A4B]"></span>
                Saldo Dana O&M Surplus
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#FEAE2C]"></span>
                Tahun ke-11 (Ganti Baterai LiFePO4)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#D64545]"></span>
                Defisit Kas
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
