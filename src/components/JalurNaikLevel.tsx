import React, { useState, useEffect, useMemo } from 'react';
import { useDesaWatt, INDICATOR_CONFIGS } from '../context/DesaWattContext';
import { IndicatorKey, ReadinessLevel, ManagementModel, VillageId } from '../types';
import { CountUpNumber } from '@/components/ui/CountUpNumber';
import { GradientButton } from '@/components/ui/gradient-button';

interface InterventionItem {
  key: IndicatorKey;
  number: string;
  name: string;
  category: string;
  actionTitle: string;
  description: string;
}

const INTERVENTIONS: InterventionItem[] = [
  {
    key: 'dana_om',
    number: '08',
    name: 'Kesiapan dana O&M & penggantian baterai',
    category: 'Keuangan',
    actionTitle: 'Buka rekening escrow dana O&M dan terbitkan aturan alokasi',
    description: 'Buka rekening giro/escrow bank khusus dan terbitkan Perdes alokasi iuran rutin untuk sinking fund penggantian baterai.',
  },
  {
    key: 'kepastian_pasar',
    number: '04',
    name: 'Kepastian pasar hasil usaha',
    category: 'Beban Produktif',
    actionTitle: 'Tanda tangani kontrak pembeli/off-taker',
    description: 'Ikat MoU/kontrak pembelian hasil komoditas olahan (hasil laut/perkebunan) dengan off-taker tetap atau koperasi induk.',
  },
  {
    key: 'kapasitas_koperasi',
    number: '05',
    name: 'Kapasitas manajemen koperasi',
    category: 'Kelembagaan',
    actionTitle: 'Bentuk dan latih pengurus koperasi',
    description: 'Lengkapi legalitas badan hukum AHU, laksanakan bimtek pembukuan keuangan unit energi, dan tetapkan pengurus operasional tetap.',
  },
  {
    key: 'anchor_load',
    number: '03',
    name: 'Anchor load (cold storage, pabrik es, pengering)',
    category: 'Beban Produktif',
    actionTitle: 'Operasikan beban produktif siang hari (mesin pengolah / cold storage)',
    description: 'Integrasikan peralatan UMKM desa (cold storage nelayan, pabrik es, pompa air desa) untuk menyerap puncak produksi radiasi matahari.',
  },
  {
    key: 'partisipasi_warga',
    number: '06',
    name: 'Partisipasi & penerimaan warga',
    category: 'Kelembagaan',
    actionTitle: 'Tuntaskan mufakat Musdes 100% dan rekrut teknisi pemuda lokal',
    description: 'Peroleh persetujuan 100% warga melalui Berita Acara Musdes dan siapkan kader pemuda desa untuk sertifikasi teknisi lokal.',
  },
  {
    key: 'kemampuan_bayar',
    number: '07',
    name: 'Kemampuan bayar & arus kas',
    category: 'Keuangan',
    actionTitle: 'Terapkan komitmen iuran rutin terstruktur & sistem pra-bayar',
    description: 'Sepakati kesepakatan tertulis iuran warga dengan skema prabayar atau musiman teratur dan mekanisme subsidi silang.',
  },
  {
    key: 'aksesibilitas',
    number: '02',
    name: 'Aksesibilitas logistik & konektivitas',
    category: 'Potensi Teknis',
    actionTitle: 'Perkuat jalur logistik darat dan pasang penguat sinyal 4G',
    description: 'Siapkan akses jalan angkut komponen berat dan instalasi repeater penguat sinyal 4G untuk telemetri gateway IoT mikrogrid.',
  },
  {
    key: 'potensi_surya',
    number: '01',
    name: 'Potensi surya & lahan/atap',
    category: 'Potensi Teknis',
    actionTitle: 'Sertifikasi lahan kas desa bebas bayangan & bebas sengketa',
    description: 'Pastikan sertifikat hak pakai lahan kas desa > 1.000 m² bebas naungan pohon sawit dan diverifikasi legalitasnya bersama BPD.',
  },
];

export const JalurNaikLevel: React.FC = () => {
  const {
    activeVillage,
    selectedVillageId,
    villages,
    batchUpdateIndicators,
    calculateGateChecklist,
    simulationResetKey,
  } = useDesaWatt();

  // Selected interventions in simulation state (keys mapped to true)
  const [selectedInterventions, setSelectedInterventions] = useState<Record<IndicatorKey, boolean>>({
    potensi_surya: false,
    aksesibilitas: false,
    anchor_load: false,
    kepastian_pasar: false,
    kapasitas_koperasi: false,
    partisipasi_warga: false,
    kemampuan_bayar: false,
    dana_om: false,
  });

  const [notification, setNotification] = useState<string | null>(null);

  // When village changes or global resetDemoData triggers, reset simulation toggles
  useEffect(() => {
    setSelectedInterventions({
      potensi_surya: false,
      aksesibilitas: false,
      anchor_load: false,
      kepastian_pasar: false,
      kapasitas_koperasi: false,
      partisipasi_warga: false,
      kemampuan_bayar: false,
      dana_om: false,
    });
    setNotification(null);
  }, [selectedVillageId, simulationResetKey]);

  // Current baseline values
  const currentIndicators = activeVillage.indicators;
  const currentTotalScore = Object.values(currentIndicators).reduce((a, b) => a + b, 0);

  const calculateReadinessLevel = (score: number): ReadinessLevel => {
    if (score <= 60) return 'Rendah';
    if (score <= 90) return 'Menengah';
    return 'Tinggi';
  };

  const calculateModelRecommendation = (score: number): { id: ManagementModel; label: string } => {
    if (score >= 91) return { id: 'milik_koperasi', label: 'Milik Koperasi Penuh' };
    if (score >= 61) return { id: 'kemitraan', label: 'Kemitraan (JV BUMDes)' };
    return { id: 'eaas', label: 'EaaS (Energy-as-a-Service)' };
  };

  const currentLevel = calculateReadinessLevel(currentTotalScore);
  const currentModel = calculateModelRecommendation(currentTotalScore);
  const currentGate = calculateGateChecklist(selectedVillageId);

  // Eligible interventions: only indicators that are currently NOT 15
  const eligibleInterventions = useMemo(() => {
    return INTERVENTIONS.filter((item) => currentIndicators[item.key] < 15);
  }, [currentIndicators]);

  // Simulated indicators
  const simulatedIndicators = useMemo(() => {
    const next = { ...currentIndicators };
    Object.keys(selectedInterventions).forEach((k) => {
      const key = k as IndicatorKey;
      if (selectedInterventions[key] && next[key] < 15) {
        next[key] = 15;
      }
    });
    return next;
  }, [currentIndicators, selectedInterventions]);

  const simulatedTotalScore = Object.values(simulatedIndicators).reduce((a, b) => a + b, 0);
  const simulatedLevel = calculateReadinessLevel(simulatedTotalScore);
  const simulatedModel = calculateModelRecommendation(simulatedTotalScore);

  // Calculate simulated gate outcome using identical gate rules
  const simulatedGate = useMemo(() => {
    const score = simulatedTotalScore;
    const rLevel = simulatedLevel;
    const effModel = simulatedModel.id;

    let mismatch = false;
    if (effModel === 'milik_koperasi' && score < 91) mismatch = true;
    if (effModel === 'kemitraan' && score < 61) mismatch = true;
    if (effModel === 'eaas' && score < 61) mismatch = true;

    const scorePass = !mismatch && score >= 61;
    // If indicator 8 (dana_om) is simulated to 15, om plan pass is guaranteed (and fund >= 15 Jt)
    const omPlanPass = activeVillage.saldoDanaOMJuta > 0 || simulatedIndicators.dana_om >= 10;
    const batteryPlanPass = activeVillage.targetBatteryFundJuta > 0;
    const musdesPass = activeVillage.musdesApproved;
    const pendampingPass = activeVillage.pendampingAssigned;

    const items = [scorePass, omPlanPass, batteryPlanPass, musdesPass, pendampingPass];
    const passedCount = items.filter(Boolean).length;
    const totalCount = items.length;
    const allPass = passedCount === totalCount;

    let statusText = '';
    let statusStyle = '';

    if (score < 61) {
      statusText = `Kembalikan ke Pendampingan (${passedCount}/${totalCount})`;
      statusStyle = 'bg-[#F9DFDC] text-[#8B281B] border-[#ECAAA4]';
    } else if (allPass) {
      statusText = `Siap Dilanjutkan (${passedCount}/${totalCount})`;
      statusStyle = 'bg-[#E2F0E4] text-[#27602C] border-[#C2E0C5]';
    } else {
      if (!musdesPass && passedCount === 4) {
        statusText = `Menunggu Musdes (${passedCount}/${totalCount})`;
        statusStyle = 'bg-[#F6E7BD] text-[#825708] border-[#EED38A]';
      } else {
        const remaining = totalCount - passedCount;
        statusText = `Menunggu ${remaining} Syarat (${passedCount}/${totalCount})`;
        statusStyle = 'bg-[#F6E7BD] text-[#825708] border-[#EED38A]';
      }
    }

    return {
      passedCount,
      totalCount,
      allPass,
      statusText,
      statusStyle,
      scorePass,
    };
  }, [simulatedTotalScore, simulatedLevel, simulatedModel, activeVillage, simulatedIndicators]);

  const activeInterventionCount = Object.values(selectedInterventions).filter(Boolean).length;
  const scoreDiff = simulatedTotalScore - currentTotalScore;

  // Toggle single intervention
  const handleToggle = (key: IndicatorKey) => {
    setSelectedInterventions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setNotification(null);
  };

  // Reset simulation
  const handleReset = () => {
    setSelectedInterventions({
      potensi_surya: false,
      aksesibilitas: false,
      anchor_load: false,
      kepastian_pasar: false,
      kapasitas_koperasi: false,
      partisipasi_warga: false,
      kemampuan_bayar: false,
      dana_om: false,
    });
    setNotification('Simulasi jalur naik level direset kembali ke data awal.');
    setTimeout(() => setNotification(null), 3000);
  };

  // Apply to real assessment
  const handleApply = () => {
    const updates: Partial<Record<IndicatorKey, 5 | 10 | 15>> = {};
    Object.keys(selectedInterventions).forEach((k) => {
      const key = k as IndicatorKey;
      if (selectedInterventions[key]) {
        updates[key] = 15;
      }
    });

    batchUpdateIndicators(selectedVillageId, updates);
    setSelectedInterventions({
      potensi_surya: false,
      aksesibilitas: false,
      anchor_load: false,
      kepastian_pasar: false,
      kapasitas_koperasi: false,
      partisipasi_warga: false,
      kemampuan_bayar: false,
      dana_om: false,
    });
    setNotification(
      `Berhasil menerapkan ${Object.keys(updates).length} intervensi ke penilaian ${activeVillage.name}! Skor kini menjadi ${simulatedTotalScore} poin.`
    );
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="bg-[#F3F5EA] rounded-[14px] border border-[#C5CCAE] p-6 shadow-xs space-y-6 w-full min-w-0">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#C5CCAE] gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[#4B5D2A] text-[24px]">
              trending_up
            </span>
            <h2 className="text-[20px] font-extrabold text-[#1F2A14] tracking-tight">
              Jalur Naik Level
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FAFBF4] text-[#6B7753] border border-[#C5CCAE]">
              Data simulasi - prototipe konseptual
            </span>
          </div>
          <p className="text-[13px] text-[#3A4728] leading-relaxed max-w-3xl">
            Simulasi intervensi kebijakan dan perbaikan operasional untuk menaikkan indikator desa ke nilai maksimal (15 poin).
            Uji dampak terhadap ambang model bisnis (Milik Koperasi ≥91, Kemitraan/EaaS ≥61) serta kelulusan Gerbang Keputusan secara langsung.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <GradientButton
            type="button"
            onClick={handleReset}
            disabled={activeInterventionCount === 0}
            variant="green-outline"
            size="sm"
            className={`inline-flex items-center gap-1.5 text-[12px] font-bold ${
              activeInterventionCount > 0
                ? 'cursor-pointer shadow-2xs'
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">restart_alt</span>
            <span>Reset Simulasi</span>
          </GradientButton>

          <GradientButton
            type="button"
            onClick={handleApply}
            disabled={activeInterventionCount === 0}
            variant={activeInterventionCount > 0 ? 'green-gold' : 'green'}
            size="sm"
            className={`inline-flex items-center gap-1.5 text-[12px] font-bold shadow-xs ${
              activeInterventionCount > 0
                ? 'cursor-pointer'
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">done_all</span>
            <span>Terapkan ke Penilaian</span>
          </GradientButton>
        </div>
      </div>

      {notification && (
        <div className="p-3.5 rounded-xl bg-[#E2F0E4] border border-[#C2E0C5] text-[#27602C] text-[12px] font-semibold flex items-center gap-2 animate-in fade-in">
          <span className="material-symbols-outlined text-[18px]">info</span>
          <span>{notification}</span>
        </div>
      )}

      {/* Comparison Grid: SEBELUM -> SESUDAH */}
      <div className="p-5 rounded-[12px] bg-[#FAFBF4] border border-[#C5CCAE] space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-black uppercase tracking-wider text-[#1F2A14]">
              Hasil Komparasi: Sebelum → Sesudah Intervensi
            </span>
            <span className="text-[11px] text-[#6B7753] font-medium">
              ({activeInterventionCount} intervensi aktif)
            </span>
          </div>
          <span className="text-[11px] font-semibold text-[#6B7753] italic">
            Data simulasi - prototipe konseptual
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5">
          {/* Card 1: Total Skor */}
          <div className="p-3.5 rounded-xl bg-[#F3F5EA] border border-[#C5CCAE]">
            <span className="text-[11px] font-bold text-[#6B7753] uppercase block">
              Total Skor
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-[18px] font-black text-[#6B7753]">
                {currentTotalScore}
              </span>
              <span className="material-symbols-outlined text-[14px] text-[#4B5D2A]">
                arrow_forward
              </span>
              <span className="text-[22px] font-black text-[#4B5D2A]">
                <CountUpNumber value={simulatedTotalScore} />
              </span>
              <span className="text-[12px] text-[#6B7753] font-bold">/ 120</span>
            </div>
            <div className="text-[11px] font-bold mt-1">
              {scoreDiff > 0 ? (
                <span className="text-[#4C9A52]">+{scoreDiff} poin kenaikan</span>
              ) : (
                <span className="text-[#6B7753]">Belum ada intervensi</span>
              )}
            </div>
          </div>

          {/* Card 2: Tingkat Kesiapan (Level) */}
          <div className="p-3.5 rounded-xl bg-[#F3F5EA] border border-[#C5CCAE]">
            <span className="text-[11px] font-bold text-[#6B7753] uppercase block">
              Level Kesiapan
            </span>
            <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
              <span className="text-[13px] font-bold text-[#6B7753]">
                Level {currentLevel}
              </span>
              <span className="material-symbols-outlined text-[14px] text-[#4B5D2A]">
                arrow_forward
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-black border ${
                  simulatedLevel === 'Tinggi'
                    ? 'bg-[#E2F0E4] text-[#27602C] border-[#C2E0C5]'
                    : simulatedLevel === 'Menengah'
                    ? 'bg-[#F6E7BD] text-[#825708] border-[#EED38A]'
                    : 'bg-[#F9DFDC] text-[#8B281B] border-[#ECAAA4]'
                }`}
              >
                Level {simulatedLevel}
              </span>
            </div>
            <span className="text-[10.5px] text-[#6B7753] block mt-1">
              {simulatedTotalScore <= 60
                ? 'Rendah (40–60)'
                : simulatedTotalScore <= 90
                ? 'Menengah (61–90)'
                : 'Tinggi (91–120)'}
            </span>
          </div>

          {/* Card 3: Model Rekomendasi & Ambang */}
          <div className="p-3.5 rounded-xl bg-[#F3F5EA] border border-[#C5CCAE]">
            <span className="text-[11px] font-bold text-[#6B7753] uppercase block">
              Model Rekomendasi
            </span>
            <div className="text-[13px] font-black text-[#1F2A14] mt-1 truncate">
              {simulatedModel.label}
            </div>
            <div className="text-[11px] mt-1">
              {(() => {
                const threshold = simulatedModel.id === 'milik_koperasi' ? 91 : 61;
                const diff = simulatedTotalScore - threshold;
                if (diff >= 0) {
                  return (
                    <span className="text-[#4C9A52] font-bold">
                      +{diff} poin di atas ambang ({threshold})
                    </span>
                  );
                }
                return (
                  <span className="text-[#B84A3A] font-bold">
                    −{Math.abs(diff)} poin di bawah ambang ({threshold})
                  </span>
                );
              })()}
            </div>
          </div>

          {/* Card 4: Status Gerbang Keputusan */}
          <div className="p-3.5 rounded-xl bg-[#F3F5EA] border border-[#C5CCAE]">
            <span className="text-[11px] font-bold text-[#6B7753] uppercase block">
              Status Gerbang
            </span>
            <div className="mt-1.5">
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold border inline-block ${simulatedGate.statusStyle}`}
              >
                {simulatedGate.statusText}
              </span>
            </div>
            <div className="text-[10.5px] text-[#6B7753] mt-1">
              {simulatedGate.scorePass ? (
                <span className="text-[#4C9A52] font-semibold">✓ Memenuhi syarat skor ≥ 61</span>
              ) : (
                <span className="text-[#B84A3A] font-semibold">⚠️ Skor &lt; 61 (Perlu intervensi)</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Interventions Checklist (Toggles) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[14px] font-extrabold text-[#1F2A14] uppercase tracking-wider">
            Daftar Intervensi Naik Level ({activeVillage.name})
          </h3>
          <span className="text-[11px] text-[#6B7753]">
            {eligibleInterventions.length} indikator belum bernilai maksimal (15)
          </span>
        </div>

        {eligibleInterventions.length === 0 ? (
          <div className="p-6 text-center rounded-xl bg-[#E2F0E4] border border-[#C2E0C5] text-[#27602C]">
            <span className="material-symbols-outlined text-[32px] block mb-1">verified</span>
            <h4 className="font-extrabold text-[15px]">Seluruh Indikator Telah Bernilai Maksimal!</h4>
            <p className="text-[12px] opacity-90 mt-0.5">
              Desa {activeVillage.name} sudah mencapai skor kesempurnaan penuh (120/120 Poin).
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {eligibleInterventions.map((item) => {
              const currentVal = currentIndicators[item.key];
              const isChecked = !!selectedInterventions[item.key];
              const pointsGained = 15 - currentVal;

              return (
                <div
                  key={item.key}
                  onClick={() => handleToggle(item.key)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                    isChecked
                      ? 'bg-[#FAFBF4] border-[#4B5D2A] ring-2 ring-[#4B5D2A]/20 shadow-xs'
                      : 'bg-[#FAFBF4] border-[#C5CCAE] hover:border-[#4B5D2A]/60'
                  }`}
                >
                  {/* Custom Checkbox Toggle */}
                  <div className="pt-0.5 shrink-0">
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        isChecked
                          ? 'bg-[#4B5D2A] border-[#4B5D2A] text-[#F7F8EE]'
                          : 'bg-[#F3F5EA] border-[#C5CCAE]'
                      }`}
                    >
                      {isChecked && (
                        <span className="material-symbols-outlined text-[14px]">check</span>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#6B7753]">
                        Indikator {item.number} • {item.category}
                      </span>
                      <span
                        className={`text-[10.5px] font-bold px-1.5 py-0.2 rounded ${
                          isChecked
                            ? 'bg-[#E2F0E4] text-[#27602C]'
                            : 'bg-[#F6E7BD] text-[#825708]'
                        }`}
                      >
                        {currentVal} → 15 (+{pointsGained} Poin)
                      </span>
                    </div>

                    <h4 className="text-[13.5px] font-bold text-[#1F2A14] leading-snug">
                      {item.actionTitle}
                    </h4>
                    <p className="text-[11.5px] text-[#3A4728] mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Helper Note */}
      <div className="p-3 bg-[#E4E8D6] rounded-xl border border-[#C5CCAE] flex items-center justify-between flex-wrap gap-2 text-[11px] text-[#3A4728]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#4B5D2A] text-[18px]">help_outline</span>
          <span>
            Simulasi ini aman dan tidak akan merubah data desa sebelum tombol <strong>"Terapkan ke Penilaian"</strong> ditekan.
          </span>
        </div>
        <span className="font-bold text-[#6B7753]">Data simulasi - prototipe konseptual</span>
      </div>
    </div>
  );
};

export default JalurNaikLevel;
