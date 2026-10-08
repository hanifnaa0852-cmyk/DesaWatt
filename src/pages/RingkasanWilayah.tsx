import React, { useState } from 'react';
import { useDesaWatt } from '../context/DesaWattContext';
import { VillageId, ReadinessLevel } from '../types';
import { CountUpNumber } from '@/components/ui/CountUpNumber';
import { GlowingMetricCard } from '@/components/ui/GlowingMetricCard';
import { GradientButton } from '@/components/ui/gradient-button';
import { CetakLaporanModal } from '../components/CetakLaporanModal';

export const RingkasanWilayah: React.FC = () => {
  const { villages, selectedVillageId, setSelectedVillageId, setActivePage, calculateGateChecklist } = useDesaWatt();

  const [printModalVillage, setPrintModalVillage] = useState<VillageId | null>(null);

  const villageList = Object.values(villages);
  const totalDesa = villageList.length;

  // 1. Rata-rata skor
  const scores = villageList.map((v) =>
    Object.values(v.indicators).reduce((a, b) => a + b, 0)
  );
  const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / (totalDesa || 1));

  // 2. Sebaran level
  const levelsCount: Record<ReadinessLevel, number> = {
    Rendah: 0,
    Menengah: 0,
    Tinggi: 0,
  };
  scores.forEach((s) => {
    if (s <= 60) levelsCount['Rendah'] += 1;
    else if (s <= 90) levelsCount['Menengah'] += 1;
    else levelsCount['Tinggi'] += 1;
  });

  // 3. Persentase desa dengan rencana dana O&M (indikator 8 / dana_om minimal bernilai 10)
  const desaWithOMPlan = villageList.filter((v) => v.indicators.dana_om >= 10).length;
  const percentOMPlan = Math.round((desaWithOMPlan / (totalDesa || 1)) * 100);

  // 4. Jumlah desa menunggu syarat gerbang
  const desaMenungguGerbang = villageList.filter((v) => {
    const gate = calculateGateChecklist(v.id);
    return !gate.allPass || Object.values(v.indicators).reduce((a, b) => a + b, 0) < 61;
  }).length;

  // Total terpasang & KK
  const totalCapacityKwp = villageList.reduce((acc, v) => acc + v.capacityKwp, 0);
  const totalKK = villageList.reduce((acc, v) => acc + v.connectionsKK, 0);

  // Schematic map coordinates on a clean SVG terrain box
  // Kab. Mukomuko: Lubuk Pinang (Utara), Penarik (Tengah), Ipuh (Selatan)
  const mapNodes = [
    {
      id: 'sumber-makmur' as VillageId,
      name: 'Desa Sumber Makmur',
      subdistrict: 'Kec. Lubuk Pinang (Utara)',
      cx: 140,
      cy: 70,
      village: villages['sumber-makmur'],
      score: Object.values(villages['sumber-makmur'].indicators).reduce((a, b) => a + b, 0),
    },
    {
      id: 'karang-asri' as VillageId,
      name: 'Desa Karang Asri',
      subdistrict: 'Kec. Penarik (Tengah)',
      cx: 260,
      cy: 130,
      village: villages['karang-asri'],
      score: Object.values(villages['karang-asri'].indicators).reduce((a, b) => a + b, 0),
    },
    {
      id: 'tirta-mukti' as VillageId,
      name: 'Desa Tirta Mukti',
      subdistrict: 'Kec. Ipuh (Selatan Pesisir)',
      cx: 370,
      cy: 180,
      village: villages['tirta-mukti'],
      score: Object.values(villages['tirta-mukti'].indicators).reduce((a, b) => a + b, 0),
    },
  ];

  const getLevelColor = (score: number) => {
    if (score >= 91) return '#4C9A52'; // Hijau Sehat/Tinggi
    if (score >= 61) return '#D99A1E'; // Amber Waspada/Menengah
    return '#B84A3A'; // Merah Rendah
  };

  const getLevelBadgeClass = (score: number) => {
    if (score >= 91) return 'bg-[#E2F0E4] text-[#27602C] border-[#C2E0C5]';
    if (score >= 61) return 'bg-[#F6E7BD] text-[#825708] border-[#EED38A]';
    return 'bg-[#F9DFDC] text-[#8B281B] border-[#ECAAA4]';
  };

  const handleOpenVillage = (vId: VillageId) => {
    setSelectedVillageId(vId);
    setActivePage('beranda');
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12 text-[#3A4728] min-w-0">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 w-full min-w-0">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#E4E8D6] text-[#4B5D2A] border border-[#C5CCAE]">
              Multi-Stakeholder Dashboard
            </span>
            <span className="text-[#C5CCAE]">•</span>
            <span className="text-[12px] font-bold text-[#4B5D2A] bg-[#FAFBF4] px-2.5 py-0.5 rounded-md border border-[#C5CCAE]">
              Peran: Kemenkop · ESDM · Kemendes · Dinas
            </span>
            <span className="text-[#C5CCAE]">•</span>
            <span className="text-[11px] font-semibold text-[#6B7753]">
              Data agregat, tanpa data pribadi warga.
            </span>
          </div>

          <h1 className="text-[28px] font-extrabold text-[#1F2A14] tracking-tight leading-tight">
            Ringkasan Wilayah: Pemantauan Agregat Microgrid Kabupaten
          </h1>
          <p className="text-[14px] text-[#3A4728] mt-1 max-w-3xl leading-relaxed">
            Pusat pantau lintas kementerian dan dinas daerah untuk mengevaluasi progres elektrifikasi desa,
            ketercukupan sinking fund pemeliharaan, serta sebaran risiko PLTS mangkrak di Kab. Mukomuko.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1 rounded-full bg-[#FAFBF4] border border-[#C5CCAE] text-[11px] font-bold text-[#6B7753]">
            Data simulasi - prototipe konseptual
          </span>
        </div>
      </div>

      {/* 5 Agregat KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 min-[1100px]:grid-cols-5 gap-4 w-full min-w-0">
        {/* KPI 1: Jumlah Desa Dinilai */}
        <GlowingMetricCard>
          <div className="p-4.5 flex flex-col justify-between h-full">
            <span className="text-[11px] font-bold text-[#6B7753] uppercase block">
              Desa Dinilai
            </span>
            <div className="text-[26px] font-black text-[#1F2A14] mt-1 tracking-tight">
              <CountUpNumber value={totalDesa} /> Desa
            </div>
            <span className="text-[11px] text-[#4B5D2A] font-semibold">
              <CountUpNumber value={totalCapacityKwp} /> kWp • <CountUpNumber value={totalKK} /> KK Terlayani
            </span>
          </div>
        </GlowingMetricCard>

        {/* KPI 2: Rata-Rata Skor */}
        <GlowingMetricCard>
          <div className="p-4.5 flex flex-col justify-between h-full">
            <span className="text-[11px] font-bold text-[#6B7753] uppercase block">
              Rata-Rata Skor
            </span>
            <div className="text-[26px] font-black text-[#1F2A14] mt-1 tracking-tight">
              <CountUpNumber value={averageScore} /> <span className="text-[14px] text-[#6B7753] font-bold">/ 120</span>
            </div>
            <span className="text-[11px] text-[#D99A1E] font-semibold">
              Kategori: Menengah
            </span>
          </div>
        </GlowingMetricCard>

        {/* KPI 3: Sebaran Level */}
        <GlowingMetricCard>
          <div className="p-4.5 flex flex-col justify-between h-full">
            <span className="text-[11px] font-bold text-[#6B7753] uppercase block">
              Sebaran Level Kesiapan
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 rounded bg-[#E2F0E4] text-[#27602C] text-[12px] font-black">
                <CountUpNumber value={levelsCount['Tinggi']} /> T
              </span>
              <span className="px-2 py-0.5 rounded bg-[#F6E7BD] text-[#825708] text-[12px] font-black">
                <CountUpNumber value={levelsCount['Menengah']} /> M
              </span>
              <span className="px-2 py-0.5 rounded bg-[#F9DFDC] text-[#8B281B] text-[12px] font-black">
                <CountUpNumber value={levelsCount['Rendah']} /> R
              </span>
            </div>
            <span className="text-[10px] text-[#6B7753]">
              1 Tinggi • 1 Menengah • 1 Rendah
            </span>
          </div>
        </GlowingMetricCard>

        {/* KPI 4: Persentase Desa dengan Rencana Dana O&M */}
        <GlowingMetricCard>
          <div className="p-4.5 flex flex-col justify-between h-full">
            <span className="text-[11px] font-bold text-[#6B7753] uppercase block">
              Rencana Dana O&M
            </span>
            <div className="text-[26px] font-black text-[#4C9A52] mt-1 tracking-tight">
              <CountUpNumber value={percentOMPlan} />%
            </div>
            <span className="text-[11px] text-[#6B7753]">
              <CountUpNumber value={desaWithOMPlan} /> dari <CountUpNumber value={totalDesa} /> Desa (Indikator 8 ≥ 10)
            </span>
          </div>
        </GlowingMetricCard>

        {/* KPI 5: Menunggu Syarat Gerbang */}
        <GlowingMetricCard>
          <div className="p-4.5 flex flex-col justify-between h-full">
            <span className="text-[11px] font-bold text-[#6B7753] uppercase block">
              Menunggu Syarat Gerbang
            </span>
            <div className="text-[26px] font-black text-[#D99A1E] mt-1 tracking-tight">
              <CountUpNumber value={desaMenungguGerbang} /> Desa
            </div>
            <span className="text-[11px] text-[#6B7753]">
              Belum siap SPK fisik
            </span>
          </div>
        </GlowingMetricCard>
      </div>

      {/* Peta Skematis Tiga Desa & Roadmap Section (2 Columns) */}
      <div className="grid grid-cols-1 min-[1100px]:grid-cols-12 gap-6 items-stretch w-full min-w-0">
        {/* Left Column: Peta Skematis 3 Desa (7 cols) */}
        <div className="min-[1100px]:col-span-7 bg-[#F3F5EA] p-6 rounded-[14px] border border-[#C5CCAE] shadow-xs flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#C5CCAE] mb-4">
              <div>
                <h3 className="text-[16px] font-extrabold text-[#1F2A14] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4B5D2A] text-[20px]">map</span>
                  Peta Skematis Sebaran Pilot PLTS Komunal
                </h3>
                <span className="text-[11px] text-[#6B7753] italic">
                  Peta skematis, bukan peta resmi • Kab. Mukomuko, Bengkulu
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FAFBF4] border border-[#C5CCAE] text-[#6B7753]">
                Data simulasi - prototipe konseptual
              </span>
            </div>

            {/* SVG Terrain Map */}
            <div className="relative w-full bg-[#FAFBF4] border border-[#C5CCAE] rounded-xl p-4 overflow-hidden shadow-inner">
              <svg className="w-full h-56" viewBox="0 0 500 240">
                {/* Coastal Line / Topography Silhouette */}
                <path
                  d="M 20 40 Q 120 70, 220 110 T 360 170 T 480 220"
                  fill="none"
                  stroke="#D3D9BE"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M 50 15 Q 180 30, 280 60 T 450 120"
                  fill="none"
                  stroke="#E4E8D6"
                  strokeWidth="4"
                  strokeDasharray="4 4"
                />

                {/* Connecting Corridor Line */}
                <line x1="140" y1="70" x2="260" y2="130" stroke="#4B5D2A" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
                <line x1="260" y1="130" x2="370" y2="180" stroke="#4B5D2A" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />

                {/* Map Nodes */}
                {mapNodes.map((node) => {
                  const nodeColor = getLevelColor(node.score);
                  const isCurrent = node.id === selectedVillageId;

                  return (
                    <g
                      key={node.id}
                      onClick={() => handleOpenVillage(node.id)}
                      className="cursor-pointer group"
                    >
                      {/* Pulse circle for selected */}
                      {isCurrent && (
                        <circle
                          cx={node.cx}
                          cy={node.cy}
                          r="18"
                          fill="none"
                          stroke={nodeColor}
                          strokeWidth="2"
                          className="animate-ping opacity-75"
                        />
                      )}

                      {/* Node circle */}
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r="11"
                        fill={nodeColor}
                        stroke="#FAFBF4"
                        strokeWidth="3"
                        className="transition-transform group-hover:scale-125"
                      />

                      {/* Icon */}
                      <text
                        x={node.cx}
                        y={node.cy + 3.5}
                        textAnchor="middle"
                        fill="#F7F8EE"
                        fontSize="9"
                        fontWeight="bold"
                        pointerEvents="none"
                      >
                        ⚡
                      </text>

                      {/* Text callout label */}
                      <rect
                        x={node.cx - 55}
                        y={node.cy - 34}
                        width="110"
                        height="22"
                        rx="6"
                        fill="#F3F5EA"
                        stroke="#C5CCAE"
                        strokeWidth="1"
                        className="group-hover:stroke-[#4B5D2A]"
                      />
                      <text
                        x={node.cx}
                        y={node.cy - 20}
                        textAnchor="middle"
                        fill="#1F2A14"
                        fontSize="10"
                        fontWeight="bold"
                        pointerEvents="none"
                      >
                        {node.name.replace('Desa ', '')} ({node.score})
                      </text>
                    </g>
                  );
                })}

                {/* Ocean / Compass Label */}
                <text x="35" y="215" fill="#6B7753" fontSize="10" fontWeight="bold">
                  Samudra Hindia (Pesisir Barat)
                </text>
                <text x="440" y="30" fill="#6B7753" fontSize="10" fontWeight="bold">
                  U ↑
                </text>
              </svg>
            </div>
          </div>

          {/* Map Legend */}
          <div className="flex items-center justify-between text-[11px] text-[#6B7753] pt-4 border-t border-[#C5CCAE] flex-wrap gap-2 mt-4">
            <span className="font-bold text-[#1F2A14]">Legenda Tingkat Kesiapan:</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4C9A52]"></span>
                <span>Tinggi (91–120)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D99A1E]"></span>
                <span>Menengah (61–90)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B84A3A]"></span>
                <span>Rendah (40–60)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Panel "Target Peta Jalan 2026-2030" (5 cols) */}
        <div className="min-[1100px]:col-span-5 bg-[#F3F5EA] p-6 rounded-[14px] border border-[#C5CCAE] shadow-xs flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#C5CCAE] mb-4">
              <div>
                <h3 className="text-[16px] font-extrabold text-[#1F2A14] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4B5D2A] text-[20px]">timeline</span>
                  Target Peta Jalan 2026–2030
                </h3>
                <span className="text-[11px] text-[#6B7753] italic">
                  target, bukan capaian • Rencana Induk PLTS Komunal
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FAFBF4] border border-[#C5CCAE] text-[#6B7753]">
                Data simulasi - prototipe konseptual
              </span>
            </div>

            <p className="text-[12px] text-[#3A4728] leading-relaxed mb-4">
              Peta jalan transisi energi berbasis Koperasi Merah Putih untuk memastikan replikasi microgrid
              berlangsung terukur tanpa meninggalkan aset mangkrak.
            </p>

            {/* 4 Phases with Progress Bars */}
            <div className="space-y-4">
              {/* Fase I */}
              <div className="p-3 bg-[#FAFBF4] rounded-xl border border-[#C5CCAE]">
                <div className="flex justify-between items-center text-[12px] font-bold mb-1">
                  <span className="text-[#1F2A14]">Fase I: Prototipe & Validasi (2026)</span>
                  <span className="text-[#4C9A52] font-black">75% Target</span>
                </div>
                <div className="w-full bg-[#D3D9BE] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#4B5D2A] h-full rounded-full" style={{ width: '75%' }}></div>
                </div>
                <span className="text-[10px] text-[#6B7753] block mt-1">
                  Standardisasi 8 indikator Baca Desa & uji sinking fund escrow percontohan.
                </span>
              </div>

              {/* Fase II */}
              <div className="p-3 bg-[#FAFBF4] rounded-xl border border-[#C5CCAE]">
                <div className="flex justify-between items-center text-[12px] font-bold mb-1">
                  <span className="text-[#1F2A14]">Fase II: Pilot 2–3 Desa (2027)</span>
                  <span className="text-[#D99A1E] font-black">40% Target</span>
                </div>
                <div className="w-full bg-[#D3D9BE] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#E0A526] h-full rounded-full" style={{ width: '40%' }}></div>
                </div>
                <span className="text-[10px] text-[#6B7753] block mt-1">
                  Pemasangan fisik microgrid mandiri & kemitraan JV BUMDes di Mukomuko.
                </span>
              </div>

              {/* Fase III */}
              <div className="p-3 bg-[#FAFBF4] rounded-xl border border-[#C5CCAE]">
                <div className="flex justify-between items-center text-[12px] font-bold mb-1">
                  <span className="text-[#1F2A14]">Fase III: Perluasan Terbatas (2028–2029)</span>
                  <span className="text-[#6B7753] font-black">15% Target</span>
                </div>
                <div className="w-full bg-[#D3D9BE] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#6B7753] h-full rounded-full" style={{ width: '15%' }}></div>
                </div>
                <span className="text-[10px] text-[#6B7753] block mt-1">
                  Replikasi ke 15 desa pesisir & kepulauan se-Provinsi Bengkulu.
                </span>
              </div>

              {/* Fase IV */}
              <div className="p-3 bg-[#FAFBF4] rounded-xl border border-[#C5CCAE]">
                <div className="flex justify-between items-center text-[12px] font-bold mb-1">
                  <span className="text-[#1F2A14]">Fase IV: Replikasi Bersyarat (2030)</span>
                  <span className="text-[#6B7753] font-black">5% Target</span>
                </div>
                <div className="w-full bg-[#D3D9BE] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#6B7753] h-full rounded-full" style={{ width: '5%' }}></div>
                </div>
                <span className="text-[10px] text-[#6B7753] block mt-1">
                  Model EaaS & mandiri nasional untuk 100+ desa tertinggal/3T.
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#C5CCAE] text-[11px] text-[#6B7753]">
            Target terkalibrasi berkala berdasarkan audit M&E tahunan Dinas PMD & ESDM.
          </div>
        </div>
      </div>

      {/* Tabel Desa: Skor, Level, Model, Status Gerbang, Status PLTS, Aksi */}
      <div className="bg-[#F3F5EA] p-6 rounded-[14px] border border-[#C5CCAE] shadow-xs w-full min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#C5CCAE] gap-2 mb-4">
          <div>
            <h3 className="text-[17px] font-extrabold text-[#1F2A14] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4B5D2A] text-[22px]">table_chart</span>
              Matriks Kinerja & Status Kelayakan 3 Desa Binaan
            </h3>
            <p className="text-[12px] text-[#6B7753] mt-0.5">
              Semua angka dihitung dari state bersama yang sama secara real-time.
            </p>
          </div>
          <span className="text-[11px] font-bold text-[#6B7753]">
            Data simulasi - prototipe konseptual
          </span>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[760px] text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[#E4E8D6] text-[#6B7753] text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4 rounded-l-lg">Nama Desa</th>
                <th className="py-3 px-4">Skor</th>
                <th className="py-3 px-4">Level</th>
                <th className="py-3 px-4">Model Rekomendasi</th>
                <th className="py-3 px-4">Status Gerbang</th>
                <th className="py-3 px-4">Status PLTS</th>
                <th className="py-3 px-4 text-center">Laporan</th>
                <th className="py-3 px-4 rounded-r-lg text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C5CCAE]">
              {villageList.map((v) => {
                const score = Object.values(v.indicators).reduce((a, b) => a + b, 0);
                const level: ReadinessLevel = score <= 60 ? 'Rendah' : score <= 90 ? 'Menengah' : 'Tinggi';
                const gate = calculateGateChecklist(v.id);
                const isSelected = v.id === selectedVillageId;

                const modelLabel =
                  score >= 91
                    ? 'Milik Koperasi'
                    : score >= 61
                    ? 'Kemitraan/EaaS'
                    : 'EaaS (Pilot Kecil)';

                return (
                  <tr
                    key={v.id}
                    className={`transition-colors ${
                      isSelected ? 'bg-[#FAFBF4] font-semibold' : 'hover:bg-[#FAFBF4]/60'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-bold text-[#1F2A14]">
                      <div className="flex items-center gap-1.5">
                        <span>{v.name}</span>
                        {isSelected && (
                          <span className="text-[10px] bg-[#4B5D2A] text-[#F7F8EE] px-1.5 py-0.2 rounded font-normal">
                            Desa Aktif
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#6B7753] font-normal block">{v.subdistrict}</span>
                    </td>

                    <td className="py-3.5 px-4 font-black text-[#1F2A14]">
                      <CountUpNumber value={score} /> <span className="text-[11px] text-[#6B7753] font-normal">/ 120</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-black border ${getLevelBadgeClass(score)}`}>
                        Level {level}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-[#3A4728] font-medium">{modelLabel}</td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${gate.statusStyle}`}>
                        {gate.statusText}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${
                          v.statusPLTS === 'Sehat'
                            ? 'bg-[#E2F0E4] text-[#27602C] border-[#C2E0C5]'
                            : v.statusPLTS === 'Waspada'
                            ? 'bg-[#F6E7BD] text-[#825708] border-[#EED38A]'
                            : 'bg-[#F9DFDC] text-[#8B281B] border-[#ECAAA4]'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            v.statusPLTS === 'Sehat'
                              ? 'bg-[#4C9A52]'
                              : v.statusPLTS === 'Waspada'
                              ? 'bg-[#D99A1E]'
                              : 'bg-[#B84A3A]'
                          }`}
                        ></span>
                        {v.statusPLTS}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => setPrintModalVillage(v.id)}
                        title="Cetak Laporan Desa Ini"
                        className="p-1.5 rounded-lg hover:bg-[#E4E8D6] text-[#4B5D2A] transition-colors cursor-pointer inline-flex items-center justify-center border border-[#C5CCAE]"
                      >
                        <span className="material-symbols-outlined text-[18px]">print</span>
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <GradientButton
                        onClick={() => handleOpenVillage(v.id)}
                        variant="green"
                        size="sm"
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-[12px] font-bold cursor-pointer shadow-2xs"
                      >
                        <span>Buka Desa</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </GradientButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Cetak Laporan if triggered */}
      {printModalVillage && (
        <CetakLaporanModal
          isOpen={true}
          onClose={() => setPrintModalVillage(null)}
          villageId={printModalVillage}
        />
      )}
    </div>
  );
};

export default RingkasanWilayah;
