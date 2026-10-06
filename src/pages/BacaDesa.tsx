import React from 'react';
import { useDesaWatt, INDICATOR_CONFIGS } from '../context/DesaWattContext';
import { VillageId } from '../types';
import { GlowingMetricCard } from '@/components/ui/GlowingMetricCard';

export const BacaDesa: React.FC = () => {
  const {
    activeVillage,
    selectedVillageId,
    setSelectedVillageId,
    villages,
    updateIndicator,
    totalScore,
    readinessLevel,
    recommendedModel,
    lowestIndicators,
    setActivePage,
  } = useDesaWatt();

  // Radar chart calculation variables
  const technicalScore =
    activeVillage.indicators.potensi_surya + activeVillage.indicators.aksesibilitas; // Max 30
  const productiveScore =
    activeVillage.indicators.anchor_load + activeVillage.indicators.kepastian_pasar; // Max 30
  const institutionalScore =
    activeVillage.indicators.kapasitas_koperasi + activeVillage.indicators.partisipasi_warga; // Max 30
  const financialScore =
    activeVillage.indicators.kemampuan_bayar + activeVillage.indicators.dana_om; // Max 30

  const maxCategory = 30;
  const cx = 110;
  const cy = 110;
  const r = 80;

  const pTop = {
    x: cx,
    y: cy - (technicalScore / maxCategory) * r,
  };
  const pRight = {
    x: cx + (productiveScore / maxCategory) * r,
    y: cy,
  };
  const pBottom = {
    x: cx,
    y: cy + (institutionalScore / maxCategory) * r,
  };
  const pLeft = {
    x: cx - (financialScore / maxCategory) * r,
    y: cy,
  };

  const polygonPoints = `${pTop.x},${pTop.y} ${pRight.x},${pRight.y} ${pBottom.x},${pBottom.y} ${pLeft.x},${pLeft.y}`;

  // Gauge calculation for Total Score (Max 120)
  const gaugeCircumference = 2 * Math.PI * 42;
  const gaugeOffset = gaugeCircumference - (totalScore / 120) * gaugeCircumference;

  const getScoreColor = (score: number) => {
    if (score >= 91) return '#147A4B';
    if (score >= 61) return '#F5A623';
    return '#D64545';
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-12 text-[#334155]">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#E8F5EE] text-[#147A4B] border border-[#C6E7D5]">
              Modul 1: Baca Desa • Diagnostik Komunal
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-[12px] font-semibold text-[#64748B]">
              Survei Kesiapan 8 Indikator (Maks. 120 Poin)
            </span>
          </div>
          <h1 className="text-[28px] font-extrabold text-[#0F172A] tracking-tight leading-tight">
            Penilaian Mandiri Kesiapan Desa (Baca Desa)
          </h1>
          <p className="text-[14px] text-[#334155] mt-1 max-w-3xl leading-relaxed">
            Diagnostik 4 dimensi komprehensif: Kelayakan teknis, beban produktif desa, kapasitas
            kelembagaan koperasi, dan kepatuhan kas iuran masyarakat.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActivePage('rancang-watt')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#147A4B] text-white font-bold text-[13px] hover:bg-[#005F38] shadow-sm transition-all cursor-pointer group"
          >
            <span>Lanjut ke Rancang Watt</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </div>

      {/* Village Switcher Strip & Legend */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider mr-1">
            Pilih Desa:
          </span>
          {(Object.keys(villages) as VillageId[]).map((vId) => {
            const v = villages[vId];
            const score = Object.values(v.indicators).reduce((a, b) => a + b, 0);
            const isSelected = selectedVillageId === vId;
            const dotColor =
              score >= 91 ? 'bg-[#22A06B]' : score >= 61 ? 'bg-[#F5A623]' : 'bg-[#D64545]';

            return (
              <button
                key={vId}
                onClick={() => setSelectedVillageId(vId)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-[13px] font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#147A4B] text-white shadow-xs'
                    : 'bg-[#F8FAFC] text-[#334155] hover:bg-slate-100 border border-[#E2E8F0]'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
                <span>{v.name}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-[#334155]'
                  }`}
                >
                  {score}/120
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4 text-[12px] text-[#475569] font-medium">
          <span className="text-[#64748B] font-bold uppercase tracking-wider text-[11px]">
            Rentang Skor:
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#D64545]"></span>
            <span>40–60 Rendah</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#F5A623]"></span>
            <span>61–90 Menengah</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#22A06B]"></span>
            <span>91–120 Tinggi</span>
          </span>
        </div>
      </div>

      {/* Aggregate Score & Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Gauge & Level narrative (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#64748B]">
                Evaluasi Agregat
              </span>
              <span
                className={`px-3 py-1 rounded-full text-[12px] font-extrabold flex items-center gap-1.5 border ${
                  readinessLevel === 'Tinggi'
                    ? 'bg-[#EBF7F1] text-[#147A4B] border-[#C6E7D5]'
                    : readinessLevel === 'Menengah'
                    ? 'bg-[#FFF4DC] text-[#B45309] border-[#FDE68A]'
                    : 'bg-[#FDF2F2] text-[#D64545] border-[#F8C3C3]'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    readinessLevel === 'Tinggi'
                      ? 'bg-[#22A06B]'
                      : readinessLevel === 'Menengah'
                      ? 'bg-[#F5A623]'
                      : 'bg-[#D64545]'
                  }`}
                ></span>
                Level {readinessLevel}
              </span>
            </div>

            <div className="flex items-center gap-6 my-3">
              {/* Radial Donut Gauge */}
              <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="transparent"
                    stroke="#F1F5F9"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="transparent"
                    stroke={getScoreColor(totalScore)}
                    strokeWidth="10"
                    strokeDasharray={gaugeCircumference}
                    strokeDashoffset={gaugeOffset}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[32px] font-black text-[#0F172A] tracking-tight leading-none">
                    {totalScore}
                  </span>
                  <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mt-1">
                    DARI 120
                  </span>
                </div>
              </div>

              {/* Assessment Narrative */}
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[18px] font-bold text-[#0F172A] leading-snug">
                  {readinessLevel === 'Tinggi' && 'Kategori TINGGI (Mandiri Siap Kelola)'}
                  {readinessLevel === 'Menengah' && 'Kategori MENENGAH (Kemitraan/EaaS)'}
                  {readinessLevel === 'Rendah' && 'Kategori RENDAH (Pendampingan Khusus)'}
                </h3>
                <p className="text-[13px] text-[#334155] leading-relaxed">
                  {readinessLevel === 'Tinggi' &&
                    'Desa dinilai sangat siap secara organisasi, permodalan awal, dan komitmen iuran warga untuk mengoperasikan PLTS mandiri di bawah kelolaan Koperasi Desa.'}
                  {readinessLevel === 'Menengah' &&
                    'Desa memiliki modal sosial dan beban potensial memadai, namun membutuhkan penguatan tata kelola melalui model Kemitraan bertahap.'}
                  {readinessLevel === 'Rendah' &&
                    'Desa belum disarankan belanja modal besar mandiri; disarankan fokus pada intervensi pendampingan intensif & perbaikan kelembagaan.'}
                </p>
                <div className="pt-1">
                  {(() => {
                    const recThreshold = recommendedModel === 'milik_koperasi' ? 91 : 61;
                    const recModelName =
                      recommendedModel === 'milik_koperasi' ? 'Milik Koperasi' : 'Kemitraan/EaaS';
                    const diffToThreshold = totalScore - recThreshold;

                    if (diffToThreshold >= 0) {
                      return (
                        <span className="text-[12px] font-bold text-[#147A4B] inline-flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">trending_up</span>
                          +{diffToThreshold} poin di atas ambang model {recModelName} ({recThreshold})
                        </span>
                      );
                    } else {
                      return (
                        <span className="text-[12px] font-bold text-[#D64545] inline-flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">warning</span>
                          −{Math.abs(diffToThreshold)} poin di bawah ambang model {recModelName} ({recThreshold})
                        </span>
                      );
                    }
                  })()}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Breakdown */}
          <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-[#E2E8F0] text-center mt-4">
            <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
              <span className="text-[11px] font-bold text-[#64748B] block">Kesiapan Teknis</span>
              <span className="text-[15px] font-black text-[#0F172A]">
                {technicalScore}/30 Pts
              </span>
            </div>
            <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
              <span className="text-[11px] font-bold text-[#64748B] block">Beban Produktif</span>
              <span className="text-[15px] font-black text-[#0F172A]">
                {productiveScore}/30 Pts
              </span>
            </div>
            <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
              <span className="text-[11px] font-bold text-[#64748B] block">Kesiapan Fiskal</span>
              <span className="text-[15px] font-black text-[#0F172A]">
                {financialScore}/30 Pts
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: 4-Dimension Radar Chart & Visuals (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row items-center gap-6">
          {/* Radar Chart SVG */}
          <div className="relative w-56 h-56 shrink-0 flex items-center justify-center">
            <svg className="w-56 h-56 overflow-visible" viewBox="0 0 220 220">
              {/* Background Concentric Polygons */}
              {[10, 20, 30].map((step) => {
                const stepR = (step / maxCategory) * r;
                return (
                  <polygon
                    key={step}
                    points={`
                      ${cx},${cy - stepR} 
                      ${cx + stepR},${cy} 
                      ${cx},${cy + stepR} 
                      ${cx - stepR},${cy}
                    `}
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="1"
                    strokeDasharray={step === 30 ? 'none' : '2 2'}
                  />
                );
              })}

              {/* Cross Axes */}
              <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke="#CBD5E1" strokeWidth="1" />
              <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke="#CBD5E1" strokeWidth="1" />

              {/* Data Polygon */}
              <polygon
                points={polygonPoints}
                fill={getScoreColor(totalScore)}
                fillOpacity="0.2"
                stroke={getScoreColor(totalScore)}
                strokeWidth="2.5"
                strokeLinejoin="round"
                className="transition-all duration-500"
              />

              {/* Vertex Dots */}
              <circle cx={pTop.x} cy={pTop.y} r="4" fill={getScoreColor(totalScore)} />
              <circle cx={pRight.x} cy={pRight.y} r="4" fill={getScoreColor(totalScore)} />
              <circle cx={pBottom.x} cy={pBottom.y} r="4" fill={getScoreColor(totalScore)} />
              <circle cx={pLeft.x} cy={pLeft.y} r="4" fill={getScoreColor(totalScore)} />

              {/* Labels */}
              <text
                x={cx}
                y={cy - r - 10}
                textAnchor="middle"
                className="text-[10px] font-extrabold fill-[#334155]"
              >
                Potensi Teknis ({technicalScore})
              </text>
              <text
                x={cx + r + 10}
                y={cy + 4}
                textAnchor="start"
                className="text-[10px] font-extrabold fill-[#334155]"
              >
                Beban ({productiveScore})
              </text>
              <text
                x={cx}
                y={cy + r + 16}
                textAnchor="middle"
                className="text-[10px] font-extrabold fill-[#334155]"
              >
                Kelembagaan ({institutionalScore})
              </text>
              <text
                x={cx - r - 10}
                y={cy + 4}
                textAnchor="end"
                className="text-[10px] font-extrabold fill-[#334155]"
              >
                Keuangan ({financialScore})
              </text>
            </svg>
          </div>

          {/* Diagnostic interpretation */}
          <div className="flex-1 space-y-3.5 w-full">
            <h4 className="text-[15px] font-extrabold text-[#0F172A]">
              Profil Kesiapan 4 Dimensi ({activeVillage.name})
            </h4>

            <div className="space-y-2 text-[12px]">
              <div>
                <div className="flex justify-between font-bold text-[#334155] mb-1">
                  <span>1. Kelayakan Teknis (Lahan & Radiasi)</span>
                  <span className="text-[#147A4B] font-black">{technicalScore} / 30</span>
                </div>
                <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#147A4B] h-full rounded-full"
                    style={{ width: `${(technicalScore / 30) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-[#334155] mb-1">
                  <span>2. Beban Produktif Siang Hari</span>
                  <span className="text-[#B45309] font-black">{productiveScore} / 30</span>
                </div>
                <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#F5A623] h-full rounded-full"
                    style={{ width: `${(productiveScore / 30) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-[#334155] mb-1">
                  <span>3. Kelembagaan & Legalitas Koperasi</span>
                  <span className="text-[#147A4B] font-black">{institutionalScore} / 30</span>
                </div>
                <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#22A06B] h-full rounded-full"
                    style={{ width: `${(institutionalScore / 30) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-[#334155] mb-1">
                  <span>4. Kapasitas Iuran & Dana Cadangan</span>
                  <span className="text-[#0284C7] font-black">{financialScore} / 30</span>
                </div>
                <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#0284C7] h-full rounded-full"
                    style={{ width: `${(financialScore / 30) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex items-start gap-2.5 text-[11px]">
              <span className="material-symbols-outlined text-[#147A4B] text-[18px] mt-0.5">
                verified
              </span>
              <div>
                <span className="text-[13px] font-bold text-[#0F172A] block">
                  Status Legalitas & Regulasi Desa
                </span>
                <span className="text-[12px] text-[#64748B]">
                  Verifikasi Dinas/Pendamping: Terdaftar resmi BUMDes / Koperasi Desa Merah Putih.
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#E8F5EE] rounded-xl border border-[#C6E7D5] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#147A4B] text-[18px]">
                  groups
                </span>
                <span className="text-[12px] font-bold text-[#147A4B]">
                  Persetujuan Komitmen Iuran Warga
                </span>
              </div>
              <span className="text-[12px] font-black text-[#147A4B]">
                {activeVillage.collectionRatePercent}% Komitmen
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Callout: "Indikator yang menahan skor" (Lowest Indicators Alert) */}
      <div className="bg-[#FFF4DC] border border-[#FDE68A] rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[#F5A623] text-white flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-[20px]">troubleshoot</span>
          </div>
          <div>
            <h3 className="text-[15px] font-extrabold text-[#B45309]">
              Indikator yang Menahan Skor ({activeVillage.name})
            </h3>
            <p className="text-[12px] text-[#92400E]">
              Fokus intervensi prioritas sebelum eksekusi fisik atau pengajuan pembiayaan:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lowestIndicators.map((ind) => {
            const currentVal = activeVillage.indicators[ind.key];
            const optLabel = ind.options[currentVal].label;

            return (
              <div
                key={ind.key}
                className="bg-white p-4 rounded-xl border border-[#FDE68A] flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[12px] font-bold text-[#B45309] uppercase tracking-wider">
                      {ind.category} • Indikator {ind.number}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-black bg-[#FFF4DC] text-[#B45309] border border-[#FDE68A]">
                      Skor: {currentVal} / 15 ({optLabel})
                    </span>
                  </div>
                  <h4 className="text-[14px] font-extrabold text-[#0F172A]">{ind.name}</h4>
                  <p className="text-[12px] text-[#334155] mt-1 leading-relaxed">
                    <strong className="text-[#0F172A]">Tindakan Rekomendasi:</strong>{' '}
                    {ind.recommendationIfLow}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 8 Indicators Assessment Matrix */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[#E2E8F0] gap-2 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#147A4B] text-[24px]">
                checklist
              </span>
              <h2 className="text-[20px] font-extrabold text-[#0F172A]">
                Matriks 8 Indikator Kesiapan Komunal
              </h2>
            </div>
            <p className="text-[13px] text-[#64748B] mt-0.5">
              Klik salah satu opsi (5 / 10 / 15) pada tiap indikator untuk menguji simulasi kesiapan
              desa secara langsung.
            </p>
          </div>
          <span className="text-[12px] font-bold text-[#64748B]">
            Total Bobot: 8 Indikator × Maks. 15 = 120 Poin
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {INDICATOR_CONFIGS.map((ind) => {
            const currentValue = activeVillage.indicators[ind.key];

            return (
              <div
                key={ind.key}
                className="p-5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] flex flex-col justify-between hover:border-slate-300 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                      INDIKATOR {ind.number} • {ind.category}
                    </span>
                    <span className="text-[16px] font-black text-[#147A4B]">
                      {currentValue} <span className="text-[12px] text-[#64748B] font-semibold">/15</span>
                    </span>
                  </div>

                  <h3 className="text-[15px] font-extrabold text-[#0F172A] leading-snug">
                    {ind.name}
                  </h3>
                  <p className="text-[12px] text-[#64748B] mt-1 mb-4 leading-relaxed">
                    {ind.description}
                  </p>
                </div>

                {/* 3 Selectable Buttons (5, 10, 15) */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#E2E8F0]">
                  {([5, 10, 15] as const).map((scoreVal) => {
                    const isSelected = currentValue === scoreVal;
                    const opt = ind.options[scoreVal];

                    return (
                      <button
                        key={scoreVal}
                        type="button"
                        onClick={() => updateIndicator(selectedVillageId, ind.key, scoreVal)}
                        className={`p-2.5 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#147A4B] text-white shadow-xs'
                            : 'bg-white hover:bg-[#F1F5F9] text-[#334155] border border-[#E2E8F0]'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span
                            className={`text-[12px] font-extrabold ${
                              isSelected ? 'text-white' : 'text-[#0F172A]'
                            }`}
                          >
                            {opt.label}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                              isSelected
                                ? 'bg-white/20 text-white'
                                : 'bg-[#E2E8F0] text-[#334155]'
                            }`}
                          >
                            {scoreVal}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] mt-1.5 line-clamp-2 leading-tight ${
                            isSelected ? 'text-white/80' : 'text-[#64748B]'
                          }`}
                        >
                          {opt.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Benchmark Komparasi 3 Desa Table */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] mb-4">
          <div>
            <h3 className="text-[17px] font-extrabold text-[#0F172A] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#147A4B] text-[20px]">
                compare_arrows
              </span>
              Benchmark Komparasi 3 Desa Binaan (Kab. Mukomuko, Bengkulu)
            </h3>
            <p className="text-[12px] text-[#64748B] mt-0.5">
              Peta komparasi indikator kesiapan antar desa untuk memandu penugasan pendampingan
              lapangan.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[#F8FAFC] text-[#64748B] text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4 rounded-l-lg">Indikator Penilaian (Maks. 15)</th>
                <th className="py-3 px-4 text-center">
                  Desa Karang Asri <span className="text-[#D64545] font-black">(55 - Rendah)</span>
                </th>
                <th className="py-3 px-4 text-center">
                  Desa Tirta Mukti <span className="text-[#B45309] font-black">(80 - Menengah)</span>
                </th>
                <th className="py-3 px-4 text-center rounded-r-lg">
                  Desa Sumber Makmur <span className="text-[#147A4B] font-black">(110 - Tinggi)</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {INDICATOR_CONFIGS.map((ind) => {
                return (
                  <tr key={ind.key} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#0F172A]">
                      {ind.number}. {ind.name}
                    </td>
                    <td className="py-3 px-4 text-center text-[#475569]">
                      {villages['karang-asri'].indicators[ind.key]} / 15
                    </td>
                    <td className="py-3 px-4 text-center text-[#475569]">
                      {villages['tirta-mukti'].indicators[ind.key]} / 15
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-[#147A4B]">
                      {villages['sumber-makmur'].indicators[ind.key]} / 15
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-[#F8FAFC] font-extrabold text-[14px]">
                <td className="py-3.5 px-4 text-[#0F172A]">TOTAL SKOR KESIAPAN AKHIR</td>
                <td className="py-3.5 px-4 text-center text-[#D64545]">
                  {Object.values(villages['karang-asri'].indicators).reduce((a, b) => a + b, 0)} / 120
                </td>
                <td className="py-3.5 px-4 text-center text-[#B45309]">
                  {Object.values(villages['tirta-mukti'].indicators).reduce((a, b) => a + b, 0)} / 120
                </td>
                <td className="py-3.5 px-4 text-center text-[#147A4B]">
                  {Object.values(villages['sumber-makmur'].indicators).reduce((a, b) => a + b, 0)} / 120
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Action Footer Strip */}
      <div className="bg-[#E8F5EE] border border-[#C6E7D5] p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#147A4B] text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">verified</span>
          </div>
          <div>
            <h4 className="text-[14px] font-extrabold text-[#147A4B]">
              Skor Siap: Terkalkulasi {totalScore}/120 (Level {readinessLevel})
            </h4>
            <p className="text-[12px] text-[#334155]">
              Tahap selanjutnya: Analisis model kepemilikan dan kalkulasi simulator arus kas di modul
              Rancang Watt.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActivePage('rancang-watt')}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#147A4B] text-white font-extrabold text-[14px] hover:bg-[#005F38] shadow-sm transition-all cursor-pointer group"
        >
          <span>Lanjut ke Simulasi "Rancang Watt"</span>
          <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
};
