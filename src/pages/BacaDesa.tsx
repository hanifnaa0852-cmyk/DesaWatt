import React from 'react';
import { useDesaWatt, INDICATOR_CONFIGS } from '../context/DesaWattContext';
import { VillageId, IndicatorKey } from '../types';

export const BacaDesa: React.FC = () => {
  const {
    selectedVillageId,
    setSelectedVillageId,
    activeVillage,
    villages,
    updateIndicator,
    totalScore,
    readinessLevel,
    recommendedModel,
    lowestIndicators,
    setActivePage,
  } = useDesaWatt();

  // Radar categories calculation (max 30 each: sum of two indicators)
  const technicalScore =
    activeVillage.indicators.potensi_surya + activeVillage.indicators.aksesibilitas;
  const productiveScore =
    activeVillage.indicators.anchor_load + activeVillage.indicators.kepastian_pasar;
  const institutionalScore =
    activeVillage.indicators.kapasitas_koperasi + activeVillage.indicators.partisipasi_warga;
  const financialScore =
    activeVillage.indicators.kemampuan_bayar + activeVillage.indicators.dana_om;

  // Radar polygon vertices (Center 100, 100, radius 70)
  // Categories: Top (Technical), Right (Productive), Bottom (Institutional), Left (Financial)
  const maxCategory = 30;
  const cx = 110;
  const cy = 110;
  const r = 75;

  const getCoord = (score: number, angleDeg: number) => {
    const angleRad = (angleDeg - 90) * (Math.PI / 180);
    const radius = (score / maxCategory) * r;
    return {
      x: cx + radius * Math.cos(angleRad),
      y: cy + radius * Math.sin(angleRad),
    };
  };

  const pTop = getCoord(technicalScore, 0);
  const pRight = getCoord(productiveScore, 90);
  const pBottom = getCoord(institutionalScore, 180);
  const pLeft = getCoord(financialScore, 270);
  const polygonPoints = `${pTop.x},${pTop.y} ${pRight.x},${pRight.y} ${pBottom.x},${pBottom.y} ${pLeft.x},${pLeft.y}`;

  // Gauge calculation (circumference for r=42 is 263.89)
  const gaugeCircumference = 2 * Math.PI * 42;
  const gaugeOffset = gaugeCircumference - (totalScore / 120) * gaugeCircumference;

  const getScoreColor = (score: number) => {
    if (score >= 91) return '#147A4B';
    if (score >= 61) return '#F5A623';
    return '#D64545';
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner & Title */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#EBF7F1] text-[#147A4B] border border-[#C1E7D4]">
              Instrumen Baku Modul 1
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-[12px] font-semibold text-slate-500">
              Versi Pedoman Kelola BUMDes & Komunitas 2026
            </span>
          </div>
          <h1 className="text-[28px] font-extrabold text-[#131B2E] tracking-tight leading-tight">
            Baca Desa: Indeks Kesiapan Kelembagaan & Teknis PLTS
          </h1>
          <p className="text-[14px] text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Instrumen evaluasi mandiri 8 indikator untuk menentukan kelayakan adopsi, tata kelola
            komunitas, serta mitigasi risiko keberlanjutan operasional PLTS desa.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              window.print();
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-[13px] hover:bg-slate-50 shadow-2xs transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>Cetak Rekap Skoring</span>
          </button>
          <button
            onClick={() => setActivePage('rancang-watt')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#147A4B] text-white font-bold text-[13px] hover:bg-[#005F38] shadow-sm transition-all cursor-pointer group"
          >
            <span>Lanjut ke Rancang Watt</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </div>

      {/* Village Switcher Strip & Legend */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mr-1">
            Pilih Desa:
          </span>
          {(Object.keys(villages) as VillageId[]).map((vId) => {
            const v = villages[vId];
            const score = Object.values(v.indicators).reduce((a, b) => a + b, 0);
            const isSelected = selectedVillageId === vId;
            const dotColor =
              score >= 91 ? 'bg-[#147A4B]' : score >= 61 ? 'bg-[#F5A623]' : 'bg-[#D64545]';

            return (
              <button
                key={vId}
                onClick={() => setSelectedVillageId(vId)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-[13px] font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#131B2E] text-white shadow-sm'
                    : 'bg-[#F8FAFC] text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
                <span>{v.name}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {score}/120
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4 text-[12px] text-slate-500 font-medium">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">
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
            <span className="w-2 h-2 rounded-full bg-[#147A4B]"></span>
            <span>91–120 Tinggi</span>
          </span>
        </div>
      </div>

      {/* Aggregate Score & Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Gauge & Level narrative (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[12px] font-bold uppercase tracking-wider text-slate-400">
                Evaluasi Agregat
              </span>
              <span
                className={`px-3 py-1 rounded-full text-[12px] font-extrabold flex items-center gap-1.5 border ${
                  readinessLevel === 'Tinggi'
                    ? 'bg-[#EBF7F1] text-[#136B45] border-[#C1E7D4]'
                    : readinessLevel === 'Menengah'
                    ? 'bg-[#FEF6E9] text-[#96600E] border-[#FCDCA7]'
                    : 'bg-[#FDF2F2] text-[#A52828] border-[#F8C3C3]'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    readinessLevel === 'Tinggi'
                      ? 'bg-[#136B45]'
                      : readinessLevel === 'Menengah'
                      ? 'bg-[#96600E]'
                      : 'bg-[#A52828]'
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
                  <span className="text-[32px] font-black text-[#131B2E] tracking-tight leading-none">
                    {totalScore}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                    DARI 120
                  </span>
                </div>
              </div>

              {/* Assessment Narrative */}
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[18px] font-bold text-[#131B2E] leading-snug">
                  {readinessLevel === 'Tinggi' && 'Kategori TINGGI (Mandiri Siap Kelola)'}
                  {readinessLevel === 'Menengah' && 'Kategori MENENGAH (Kemitraan/EaaS)'}
                  {readinessLevel === 'Rendah' && 'Kategori RENDAH (Pendampingan Khusus)'}
                </h3>
                <p className="text-[13px] text-slate-600 leading-relaxed">
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
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-center mt-4">
            <div className="p-2.5 rounded-xl bg-[#F8FAFC]">
              <span className="text-[11px] font-bold text-slate-400 block">Kesiapan Teknis</span>
              <span className="text-[15px] font-black text-[#131B2E]">
                {technicalScore}/30 Pts
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F8FAFC]">
              <span className="text-[11px] font-bold text-slate-400 block">Beban Produktif</span>
              <span className="text-[15px] font-black text-[#131B2E]">
                {productiveScore}/30 Pts
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F8FAFC]">
              <span className="text-[11px] font-bold text-slate-400 block">Kesiapan Fiskal</span>
              <span className="text-[15px] font-black text-[#131B2E]">
                {financialScore}/30 Pts
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: 4-Dimension Radar Chart & Visuals (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center gap-6">
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
                fillOpacity="0.25"
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
                className="text-[10px] font-extrabold fill-slate-700"
              >
                Potensi Teknis ({technicalScore})
              </text>
              <text
                x={cx + r + 10}
                y={cy + 4}
                textAnchor="start"
                className="text-[10px] font-extrabold fill-slate-700"
              >
                Beban ({productiveScore})
              </text>
              <text
                x={cx}
                y={cy + r + 16}
                textAnchor="middle"
                className="text-[10px] font-extrabold fill-slate-700"
              >
                Kelembagaan ({institutionalScore})
              </text>
              <text
                x={cx - r - 10}
                y={cy + 4}
                textAnchor="end"
                className="text-[10px] font-extrabold fill-slate-700"
              >
                Keuangan ({financialScore})
              </text>
            </svg>
          </div>

          {/* Contextual photo cards & documentation */}
          <div className="flex-1 space-y-3 w-full">
            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200/80 flex items-start gap-3">
              <span className="material-symbols-outlined text-[#147A4B] text-[20px] mt-0.5">
                wb_sunny
              </span>
              <div>
                <span className="text-[13px] font-bold text-[#131B2E] block">
                  Radiasi Rata-rata 4.8 kWh/m²/hari <span className="text-[11px] text-slate-400 font-normal italic">(estimasi demo)</span>
                </span>
                <span className="text-[12px] text-slate-500">
                  Lahan kas desa terbuka luas, bebas bayangan pohon kelapa sawit & siap digunakan.
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200/80 flex items-start gap-3">
              <span className="material-symbols-outlined text-[#147A4B] text-[20px] mt-0.5">
                verified
              </span>
              <div>
                <span className="text-[13px] font-bold text-[#131B2E] block">
                  Status Legalitas & Regulasi Desa
                </span>
                <span className="text-[12px] text-slate-500">
                  Verifikasi Dinas/Pendamping: Terdaftar resmi BUMDes / Koperasi Desa Merah Putih.
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#EBF7F1]/60 border border-[#C1E7D4] flex items-center justify-between">
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
      <div className="bg-[#FEF6E9] border border-[#FCDCA7] rounded-2xl p-5 shadow-2xs">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[#FEAE2C] text-[#6B4500] flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-[20px]">troubleshoot</span>
          </div>
          <div>
            <h3 className="text-[15px] font-extrabold text-[#96600E]">
              Indikator yang Menahan Skor ({activeVillage.name})
            </h3>
            <p className="text-[12px] text-[#96600E]/80">
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
                className="bg-white/90 p-4 rounded-xl border border-[#FCDCA7] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[12px] font-bold text-[#835500] uppercase tracking-wider">
                      {ind.category} • Indikator {ind.number}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-black bg-[#FEF6E9] text-[#96600E]">
                      Skor: {currentVal} / 15 ({optLabel})
                    </span>
                  </div>
                  <h4 className="text-[14px] font-extrabold text-[#131B2E]">{ind.name}</h4>
                  <p className="text-[12px] text-slate-600 mt-1 leading-relaxed">
                    <strong className="text-slate-800">Tindakan Rekomendasi:</strong>{' '}
                    {ind.recommendationIfLow}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 8 Indicators Assessment Matrix */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-2 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#147A4B] text-[24px]">
                checklist
              </span>
              <h2 className="text-[20px] font-extrabold text-[#131B2E]">
                Matriks 8 Indikator Kesiapan Komunal
              </h2>
            </div>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Klik salah satu opsi (5 / 10 / 15) pada tiap indikator untuk menguji simulasi kesiapan
              desa secara langsung.
            </p>
          </div>
          <span className="text-[12px] font-bold text-slate-400">
            Total Bobot: 8 Indikator × Maks. 15 = 120 Poin
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {INDICATOR_CONFIGS.map((ind) => {
            const currentValue = activeVillage.indicators[ind.key];

            return (
              <div
                key={ind.key}
                className="p-5 rounded-2xl border border-slate-200/80 bg-[#FAFAFA] flex flex-col justify-between hover:border-slate-300 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      INDIKATOR {ind.number} • {ind.category}
                    </span>
                    <span className="text-[16px] font-black text-[#147A4B]">
                      {currentValue} <span className="text-[12px] text-slate-400 font-semibold">/15</span>
                    </span>
                  </div>

                  <h3 className="text-[15px] font-extrabold text-[#131B2E] leading-snug">
                    {ind.name}
                  </h3>
                  <p className="text-[12px] text-slate-500 mt-1 mb-4 leading-relaxed">
                    {ind.description}
                  </p>
                </div>

                {/* 3 Selectable Buttons (5, 10, 15) */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/60">
                  {([5, 10, 15] as const).map((scoreVal) => {
                    const isSelected = currentValue === scoreVal;
                    const opt = ind.options[scoreVal];

                    return (
                      <button
                        key={scoreVal}
                        type="button"
                        onClick={() => updateIndicator(selectedVillageId, ind.key, scoreVal)}
                        className={`p-2 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#147A4B] text-white shadow-sm ring-2 ring-[#147A4B]/20'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span
                            className={`text-[12px] font-extrabold ${
                              isSelected ? 'text-white' : 'text-[#131B2E]'
                            }`}
                          >
                            {opt.label}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                              isSelected
                                ? 'bg-white/20 text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {scoreVal}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] mt-1.5 line-clamp-2 leading-tight ${
                            isSelected ? 'text-white/80' : 'text-slate-400'
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
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-[17px] font-extrabold text-[#131B2E] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#147A4B] text-[20px]">
                compare_arrows
              </span>
              Benchmark Komparasi 3 Desa Binaan (Kab. Mukomuko, Bengkulu)
            </h3>
            <p className="text-[12px] text-slate-500 mt-0.5">
              Peta komparasi indikator kesiapan antar desa untuk memandu penugasan pendampingan
              lapangan.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[#F8FAFC] text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4 rounded-l-lg">Indikator Penilaian (Maks. 15)</th>
                <th className="py-3 px-4 text-center">
                  Desa Karang Asri <span className="text-[#D64545] font-black">(55 - Rendah)</span>
                </th>
                <th className="py-3 px-4 text-center">
                  Desa Tirta Mukti <span className="text-[#835500] font-black">(80 - Menengah)</span>
                </th>
                <th className="py-3 px-4 text-center rounded-r-lg">
                  Desa Sumber Makmur <span className="text-[#147A4B] font-black">(110 - Tinggi)</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {INDICATOR_CONFIGS.map((ind) => {
                return (
                  <tr key={ind.key} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#131B2E]">
                      {ind.number}. {ind.name}
                    </td>
                    <td className="py-3 px-4 text-center text-slate-600">
                      {villages['karang-asri'].indicators[ind.key]} / 15
                    </td>
                    <td className="py-3 px-4 text-center text-slate-600">
                      {villages['tirta-mukti'].indicators[ind.key]} / 15
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-[#147A4B]">
                      {villages['sumber-makmur'].indicators[ind.key]} / 15
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-[#F8FAFC] font-extrabold text-[14px]">
                <td className="py-3.5 px-4 text-[#131B2E]">TOTAL SKOR KESIAPAN AKHIR</td>
                <td className="py-3.5 px-4 text-center text-[#D64545]">
                  {Object.values(villages['karang-asri'].indicators).reduce((a, b) => a + b, 0)} / 120
                </td>
                <td className="py-3.5 px-4 text-center text-[#835500]">
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
      <div className="bg-[#EBF7F1] border border-[#C1E7D4] p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#147A4B] text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">verified</span>
          </div>
          <div>
            <h4 className="text-[14px] font-extrabold text-[#147A4B]">
              Skor Siap: Terkalkulasi {totalScore}/120 (Level {readinessLevel})
            </h4>
            <p className="text-[12px] text-[#147A4B]/90">
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
