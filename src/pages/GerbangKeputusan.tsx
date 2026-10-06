import React from 'react';
import { useDesaWatt } from '../context/DesaWattContext';
import { GlowingMetricCard } from '@/components/ui/GlowingMetricCard';

export const GerbangKeputusan: React.FC = () => {
  const {
    activeVillage,
    villages,
    selectedVillageId,
    setSelectedVillageId,
    totalScore,
    readinessLevel,
    effectiveModel,
    musdesApproved,
    setMusdesApproved,
    pendampingAssigned,
    setPendampingAssigned,
    calculateGateChecklist,
    gateChecklist,
    gateStatusText,
    gateCanProceed,
    simulationResults,
    setActivePage,
  } = useDesaWatt();

  const getModelLabel = (model: string) => {
    if (model === 'milik_koperasi') return 'Milik Koperasi';
    if (model === 'kemitraan') return 'Kemitraan (JV BUMDes)';
    return 'Energy-as-a-Service (EaaS)';
  };

  const percentComplete = Math.round(
    (gateChecklist.passedCount / gateChecklist.totalCount) * 100
  );

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-12 text-slate-100">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#147A4B]/30 text-[#4ADE80] border border-[#34D399]/40">
              Titik Kritis Kelayakan: Gerbang Keputusan
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-[12px] font-semibold text-slate-400">
              Desa: {activeVillage.name}
            </span>
          </div>
          <h1 className="text-[28px] font-extrabold text-white tracking-tight leading-tight">
            Gerbang Keputusan: Verifikasi Akhir Sebelum Pemasangan Fisik
          </h1>
          <p className="text-[14px] text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Mekanisme audit ketat untuk menghentikan proyek PLTS mangkrak sejak di atas kertas.
            Seluruh syarat teknis, finansial, dan legalitas desa diverifikasi sebelum penerbitan
            Surat Perintah Kerja (SPK).
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActivePage('jaga-watt')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#147A4B] text-white font-bold text-[13px] hover:bg-[#005F38] shadow-md transition-all cursor-pointer group"
          >
            <span>Lanjut ke 3 Jaga Watt</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </div>

      {/* Horizontal Pipeline Track */}
      <div className="rounded-2xl bg-[#0C1B2C]/85 backdrop-blur-xl border border-white/10 p-6 shadow-xl overflow-x-auto">
        <div className="flex items-center justify-between min-w-[850px] relative">
          {/* Track line */}
          <div className="absolute left-8 right-8 top-5 h-1 bg-slate-800 -z-0"></div>
          <div
            className="absolute left-8 top-5 h-1 bg-[#147A4B] -z-0 transition-all duration-500 shadow-[0_0_8px_#34D399]"
            style={{ width: gateCanProceed ? '75%' : '58%' }}
          ></div>

          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center text-center w-36">
            <div className="w-10 h-10 rounded-full bg-[#147A4B] text-white flex items-center justify-center font-bold text-[13px] shadow-md mb-1.5 border border-[#34D399]/40">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Langkah 01
            </span>
            <span className="text-[13px] font-bold text-white">Skor Baca Desa</span>
            <span className="mt-1 px-2 py-0.5 rounded-full bg-[#147A4B]/30 text-[#4ADE80] text-[11px] font-extrabold border border-[#34D399]/30">
              {totalScore} / 120 ({readinessLevel})
            </span>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center text-center w-36">
            <div className="w-10 h-10 rounded-full bg-[#147A4B] text-white flex items-center justify-center font-bold text-[13px] shadow-md mb-1.5 border border-[#34D399]/40">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Langkah 02
            </span>
            <span className="text-[13px] font-bold text-white">Model Terpilih</span>
            <span className="mt-1 px-2 py-0.5 rounded-full bg-[#147A4B]/30 text-[#4ADE80] text-[11px] font-extrabold border border-[#34D399]/30">
              {getModelLabel(effectiveModel)}
            </span>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center text-center w-36">
            <div className="w-10 h-10 rounded-full bg-[#147A4B] text-white flex items-center justify-center font-bold text-[13px] shadow-md mb-1.5 border border-[#34D399]/40">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Langkah 03
            </span>
            <span className="text-[13px] font-bold text-white">Arus Kas & O&M</span>
            <span className="mt-1 px-2 py-0.5 rounded-full bg-[#147A4B]/30 text-[#4ADE80] text-[11px] font-extrabold border border-[#34D399]/30">
              +Rp {simulationResults.netAnnualAverageJuta.toLocaleString('id-ID')} Jt/thn
            </span>
          </div>

          {/* Step 4 (Current) */}
          <div className="relative z-10 flex flex-col items-center text-center w-44">
            <div className="w-12 h-12 rounded-full bg-[#F5A623] text-black flex items-center justify-center font-bold shadow-lg ring-4 ring-[#F5A623]/30 mb-1">
              <span className="material-symbols-outlined text-[22px]">verified_user</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
              Aktif Saat Ini
            </span>
            <span className="text-[14px] font-extrabold text-white">Gerbang Keputusan</span>
            <span className="mt-1 px-2.5 py-0.5 rounded-full bg-[#F5A623]/20 text-[#F5A623] text-[11px] font-extrabold border border-[#F5A623]/40">
              Validasi ({gateChecklist.passedCount}/{gateChecklist.totalCount})
            </span>
          </div>

          {/* Step 5 */}
          <div
            className={`relative z-10 flex flex-col items-center text-center w-36 ${
              gateCanProceed ? 'opacity-100' : 'opacity-40'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-[13px] mb-1.5 border border-white/10">
              <span className="material-symbols-outlined text-[18px]">
                {gateCanProceed ? 'lock_open' : 'lock'}
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Langkah 05
            </span>
            <span className="text-[13px] font-bold text-white">Pemasangan Fisik</span>
            <span className="mt-1 px-2 py-0.5 rounded-full bg-black/40 text-slate-400 text-[11px] font-semibold border border-white/10">
              {gateCanProceed ? 'Siap SPK' : 'Menunggu SPK'}
            </span>
          </div>

          {/* Step 6 */}
          <div className="relative z-10 flex flex-col items-center text-center w-36 opacity-40">
            <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-[13px] mb-1.5 border border-white/10">
              <span className="material-symbols-outlined text-[18px]">monitor_heart</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Langkah 06
            </span>
            <span className="text-[13px] font-bold text-white">Jaga Watt (M&E)</span>
            <span className="mt-1 px-2 py-0.5 rounded-full bg-black/40 text-slate-400 text-[11px] font-semibold border border-white/10">
              Operasional
            </span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 5 Verification Checklist (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl bg-[#0C1B2C]/85 backdrop-blur-xl border border-white/10 p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2 mb-4">
              <div>
                <h2 className="text-[18px] font-extrabold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#34D399] text-[22px]">
                    fact_check
                  </span>
                  Matriks Verifikasi Kelayakan Mandiri
                </h2>
                <p className="text-[12px] text-slate-400">
                  Kriteria kesiapan DesaWatt (usulan konseptual)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#147A4B]/30 text-[#4ADE80] text-[12px] font-extrabold border border-[#34D399]/30">
                  <span className="w-2 h-2 rounded-full bg-[#34D399]"></span>{' '}
                  {gateChecklist.passedCount} Lulus
                </span>
                {gateChecklist.totalCount - gateChecklist.passedCount > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5A623]/20 text-[#F5A623] text-[12px] font-extrabold border border-[#F5A623]/30">
                    <span className="w-2 h-2 rounded-full bg-[#F5A623]"></span>{' '}
                    {gateChecklist.totalCount - gateChecklist.passedCount} Menunggu
                  </span>
                )}
              </div>
            </div>

            {/* Checklist Items */}
            <div className="divide-y divide-white/10 space-y-1">
              {/* Item 1: Score threshold */}
              <div className="py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      gateChecklist.scorePass
                        ? 'bg-[#147A4B]/30 text-[#4ADE80] border border-[#34D399]/40'
                        : 'bg-[#EF4444]/20 text-[#F87171] border border-[#EF4444]/30'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {gateChecklist.scorePass ? 'done' : 'close'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-[14px] font-extrabold text-white">
                        1. Skor Memenuhi Ambang Model Terpilih
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          gateChecklist.scorePass
                            ? 'bg-[#147A4B]/30 text-[#4ADE80] border border-[#34D399]/40'
                            : 'bg-[#EF4444]/20 text-[#F87171] border border-[#EF4444]/30'
                        }`}
                      >
                        {gateChecklist.scorePass ? 'Lulus' : 'Belum Memenuhi'}
                      </span>
                    </div>
                    <p className="text-[12px] text-slate-300 mt-1 leading-relaxed">
                      Skor perolehan <strong className="text-white">{totalScore} / 120</strong>{' '}
                      (Level {readinessLevel}). Ambang minimum model {getModelLabel(effectiveModel)}:
                      skor ≥ {effectiveModel === 'milik_koperasi' ? 91 : 61} poin.
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-right text-[11px] font-semibold text-slate-400">
                  Bobot: 25%
                </div>
              </div>

              {/* Item 2: OM Fund Plan */}
              <div className="py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      gateChecklist.omPlanPass
                        ? 'bg-[#147A4B]/30 text-[#4ADE80] border border-[#34D399]/40'
                        : 'bg-[#EF4444]/20 text-[#F87171] border border-[#EF4444]/30'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {gateChecklist.omPlanPass ? 'done' : 'close'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-[14px] font-extrabold text-white">
                        2. Rencana Dana O&M Tertulis & Mengikat (simulasi)
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          gateChecklist.omPlanPass
                            ? 'bg-[#147A4B]/30 text-[#4ADE80] border border-[#34D399]/40'
                            : 'bg-[#EF4444]/20 text-[#F87171] border border-[#EF4444]/30'
                        }`}
                      >
                        {gateChecklist.omPlanPass ? 'Lulus' : 'Belum Tersedia'}
                      </span>
                    </div>
                    <p className="text-[12px] text-slate-300 mt-1 leading-relaxed">
                      SOP iuran warga disepakati dengan Saldo Dana O&M Rp {activeVillage.saldoDanaOMJuta}.000.000 di rekening penampung.
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-right text-[11px] font-semibold text-slate-400">
                  Bobot: 20%
                </div>
              </div>

              {/* Item 3: Battery replacement plan */}
              <div className="py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      gateChecklist.batteryPlanPass
                        ? 'bg-[#147A4B]/30 text-[#4ADE80] border border-[#34D399]/40'
                        : 'bg-[#EF4444]/20 text-[#F87171] border border-[#EF4444]/30'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {gateChecklist.batteryPlanPass ? 'done' : 'close'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-[14px] font-extrabold text-white">
                        3. Rencana Penggantian Baterai Tahun Ke-11 (simulasi)
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          gateChecklist.batteryPlanPass
                            ? 'bg-[#147A4B]/30 text-[#4ADE80] border border-[#34D399]/40'
                            : 'bg-[#EF4444]/20 text-[#F87171] border border-[#EF4444]/30'
                        }`}
                      >
                        {gateChecklist.batteryPlanPass ? 'Lulus' : 'Belum Direncanakan'}
                      </span>
                    </div>
                    <p className="text-[12px] text-slate-300 mt-1 leading-relaxed">
                      Dari Dana O&M Rp {activeVillage.saldoDanaOMJuta} Jt, {((activeVillage.saldoDanaOMJuta / activeVillage.targetBatteryFundJuta) * 100).toFixed(1)}% dari target penggantian baterai Rp {activeVillage.targetBatteryFundJuta} Jt teralokasi dengan mekanisme rekening escrow dual-signature (Dinas/Pendamping + Koperasi).
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-right text-[11px] font-semibold text-slate-400">
                  Bobot: 20%
                </div>
              </div>

              {/* Item 4: Musdes Approval */}
              <div
                className={`py-4 rounded-xl -mx-2 px-3 transition-colors ${
                  musdesApproved ? 'bg-transparent' : 'bg-[#F5A623]/10 border border-[#F5A623]/20'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        musdesApproved
                          ? 'bg-[#147A4B]/30 text-[#4ADE80] border border-[#34D399]/40'
                          : 'bg-[#F5A623]/30 text-[#F5A623] border border-[#F5A623]/40'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {musdesApproved ? 'done' : 'pending_actions'}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-[14px] font-extrabold text-white">
                          4. Persetujuan Musyawarah Desa (Musdes simulasi)
                        </h3>
                        <span
                          className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                            musdesApproved
                              ? 'bg-[#147A4B]/30 text-[#4ADE80] border border-[#34D399]/40'
                              : 'bg-[#F5A623]/20 text-[#F5A623] border border-[#F5A623]/40'
                          }`}
                        >
                          {musdesApproved ? 'Disahkan & Sah (simulasi)' : 'Belum Lengkap / Menunggu'}
                        </span>
                      </div>
                      <p className="text-[12px] text-slate-300 mt-1 leading-relaxed">
                        {musdesApproved
                          ? 'Berita Acara (simulasi) Musdes Khusus penandatanganan SK Koperasi (simulasi) telah disahkan bersama BPD & Kepala Desa.'
                          : 'Berita Acara (simulasi) Musdes Khusus penandatanganan SK Koperasi (simulasi) masih dalam proses pengesahan tanda tangan BPD & Kepala Desa.'}
                      </p>

                      {/* Interactive Toggle for User */}
                      <div className="pt-2.5 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setMusdesApproved(!musdesApproved)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold shadow-md transition-all cursor-pointer ${
                            musdesApproved
                              ? 'bg-white/10 text-slate-200 hover:bg-white/20 border border-white/15'
                              : 'bg-[#147A4B] text-white hover:bg-[#005F38] border border-[#34D399]/40'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {musdesApproved ? 'undo' : 'upload_file'}
                          </span>
                          <span>
                            {musdesApproved
                              ? 'Batalkan Pengesahan Berita Acara (simulasi)'
                              : 'Simulasikan: Unggah & Sahkan Berita Acara Musdes (simulasi)'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 text-right text-[11px] font-semibold text-slate-400">
                    Bobot: 20%
                  </div>
                </div>
              </div>

              {/* Item 5: Pendamping Assigned */}
              <div
                className={`py-4 rounded-xl -mx-2 px-3 transition-colors ${
                  pendampingAssigned ? 'bg-transparent' : 'bg-[#F5A623]/10 border border-[#F5A623]/20'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        pendampingAssigned
                          ? 'bg-[#147A4B]/30 text-[#4ADE80] border border-[#34D399]/40'
                          : 'bg-[#F5A623]/30 text-[#F5A623] border border-[#F5A623]/40'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {pendampingAssigned ? 'done' : 'pending_actions'}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-[14px] font-extrabold text-white">
                          5. Pendamping Teknis Ditugaskan (simulasi)
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                            pendampingAssigned
                              ? 'bg-[#147A4B]/30 text-[#4ADE80] border border-[#34D399]/40'
                              : 'bg-[#F5A623]/20 text-[#F5A623] border border-[#F5A623]/40'
                          }`}
                        >
                          {pendampingAssigned ? 'Lulus / Ditugaskan' : 'Belum Ditugaskan'}
                        </span>
                      </div>
                      <p className="text-[12px] text-slate-300 mt-1 leading-relaxed">
                        {pendampingAssigned
                          ? `Surat Tugas (simulasi) telah terbit atas nama ${activeVillage.pendampingName} sebagai tenaga pendamping lapangan desa bersertifikasi teknis.`
                          : 'Tenaga pendamping teknis bersertifikasi belum ditugaskan oleh Dinas/Pendamping untuk desa ini.'}
                      </p>

                      {/* Interactive Toggle for User */}
                      <div className="pt-2 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setPendampingAssigned(!pendampingAssigned)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold shadow-md transition-all cursor-pointer ${
                            pendampingAssigned
                              ? 'bg-white/10 text-slate-200 hover:bg-white/20 border border-white/15'
                              : 'bg-[#147A4B] text-white hover:bg-[#005F38] border border-[#34D399]/40'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {pendampingAssigned ? 'undo' : 'assignment_ind'}
                          </span>
                          <span>
                            {pendampingAssigned
                              ? 'Batalkan Penugasan Pendamping (simulasi)'
                              : 'Tugaskan Pendamping Teknis Lapangan (simulasi)'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 text-right text-[11px] font-semibold text-slate-400">
                    Bobot: 15%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specs Summary Card */}
          <div className="rounded-2xl bg-[#0C1B2C]/85 backdrop-blur-xl border border-white/10 p-6 shadow-xl">
            <h3 className="text-[16px] font-extrabold text-white mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#34D399] text-[20px]">bolt</span>
              Ringkasan Spesifikasi Teknis yang Siap Diinstalasi
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <GlowingMetricCard glowColor="green">
                <div className="p-3.5 flex flex-col justify-between h-full">
                  <span className="text-[11px] font-bold text-slate-400 block">Kapasitas Puncak</span>
                  <span className="text-[18px] font-black text-white">
                    {activeVillage.capacityKwp} kWp
                  </span>
                  <span className="text-[10px] text-slate-400 block">Tier 1 Monokristalin</span>
                </div>
              </GlowingMetricCard>

              <GlowingMetricCard glowColor="amber">
                <div className="p-3.5 flex flex-col justify-between h-full">
                  <span className="text-[11px] font-bold text-slate-400 block">Penyimpanan Baterai</span>
                  <span className="text-[18px] font-black text-white">
                    {activeVillage.batteryKwh} kWh
                  </span>
                  <span className="text-[10px] text-slate-400 block">Lithium Ferro (LiFePO4)</span>
                </div>
              </GlowingMetricCard>

              <GlowingMetricCard glowColor="emerald">
                <div className="p-3.5 flex flex-col justify-between h-full">
                  <span className="text-[11px] font-bold text-slate-400 block">Penerima Manfaat</span>
                  <span className="text-[18px] font-black text-white">
                    {activeVillage.connectionsKK} KK
                  </span>
                  <span className="text-[10px] text-slate-400 block">+ Fasilitas Umum</span>
                </div>
              </GlowingMetricCard>

              <GlowingMetricCard glowColor="green">
                <div className="p-3.5 flex flex-col justify-between h-full">
                  <span className="text-[11px] font-bold text-slate-400 block">Kemandirian Energi</span>
                  <span className="text-[18px] font-black text-[#4ADE80]">98.4%</span>
                  <span className="text-[10px] text-slate-400 block">Microgrid Komunal</span>
                </div>
              </GlowingMetricCard>
            </div>
          </div>
        </div>

        {/* Right Column: Decision Authority Card (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl bg-[#0C1B2C]/85 backdrop-blur-xl border border-white/10 p-6 shadow-xl space-y-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Status Keputusan Verifikasi Dinas/Pendamping
              </span>

              {/* Status Banner */}
              <div
                className={`p-4 rounded-xl border flex items-start gap-3 backdrop-blur-md ${
                  gateStatusText === 'SIAP DILANJUTKAN'
                    ? 'bg-[#147A4B]/30 border-[#34D399]/40 text-[#4ADE80]'
                    : gateStatusText === 'KEMBALIKAN KE PENDAMPINGAN'
                    ? 'bg-[#EF4444]/20 border-[#EF4444]/30 text-[#F87171]'
                    : 'bg-[#F5A623]/20 border-[#F5A623]/30 text-[#F5A623]'
                }`}
              >
                <span className="material-symbols-outlined text-[24px] shrink-0 mt-0.5">
                  {gateStatusText === 'SIAP DILANJUTKAN'
                    ? 'task_alt'
                    : gateStatusText === 'KEMBALIKAN KE PENDAMPINGAN'
                    ? 'cancel'
                    : 'hourglass_top'}
                </span>
                <div>
                  <h4 className="text-[14px] font-black leading-snug">{gateStatusText}</h4>
                  <p className="text-[12px] opacity-90 mt-0.5 leading-relaxed">
                    {gateStatusText === 'SIAP DILANJUTKAN' &&
                      'Semua syarat terpenuhi lengkap. Otorisasi rekomendasi penerbitan SPK siap dicairkan.'}
                    {gateStatusText === 'KEMBALIKAN KE PENDAMPINGAN' &&
                      'Skor di bawah 61 poin. Desa dikembalikan ke fase pembinaan intensif & perbaikan tata kelola.'}
                    {gateStatusText.startsWith('MENUNGGU') &&
                      'Analisis teknis & ekonomi valid. Otorisasi terkunci hingga Berita Acara Musdes disahkan.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Completeness Metric */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 block">
                  Kelengkapan Syarat
                </span>
                <div className="text-[26px] font-black text-white">
                  {percentComplete}%{' '}
                  <span className="text-[13px] font-semibold text-slate-400">
                    ({gateChecklist.passedCount}/{gateChecklist.totalCount})
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-[#34D399] border-t-slate-700 flex items-center justify-center font-bold text-[12px] text-[#4ADE80]">
                {gateChecklist.passedCount}/5
              </div>
            </div>

            {/* Rationale */}
            <div className="p-3.5 rounded-xl bg-black/30 border border-white/10 text-[12px] text-slate-300 leading-relaxed">
              <strong className="text-white">Rasional Rekomendasi:</strong> "Rekomendasi
              teknis dan finansial telah diuji secara komprehensif. Pemasangan fisik PLTS komunal{' '}
              {activeVillage.capacityKwp} kWp dapat diotorisasi setelah seluruh mufakat desa
              dituangkan dalam dokumen resmi."
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                disabled={!gateCanProceed}
                onClick={() => setActivePage('jaga-watt')}
                className={`w-full py-3 px-4 rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 transition-all ${
                  gateCanProceed
                    ? 'bg-[#147A4B] text-white hover:bg-[#005F38] shadow-md cursor-pointer border border-[#34D399]/40'
                    : 'bg-white/10 text-slate-500 cursor-not-allowed border border-white/5'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {gateCanProceed ? 'done_all' : 'lock'}
                </span>
                <span>Lanjutkan ke Pemasangan (SPK)</span>
              </button>

              <button
                type="button"
                onClick={() => setActivePage('baca-desa')}
                className="w-full py-2.5 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-slate-200 font-bold text-[13px] transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/10"
              >
                <span className="material-symbols-outlined text-[18px]">undo</span>
                <span>Kembalikan ke Pendampingan</span>
              </button>
            </div>

            {/* Sign-off Verifier */}
            <div className="pt-4 border-t border-white/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#147A4B] text-white flex items-center justify-center font-bold text-[13px] ring-2 ring-[#34D399]/30">
                BH
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-bold text-white truncate">
                  {activeVillage.pendampingName}
                </span>
                <span className="text-[11px] text-slate-400 truncate">
                  Tenaga Pendamping Lapangan / Tim Dinas/Pendamping
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benchmark Table for 3 Villages */}
      <div className="rounded-2xl bg-[#0C1B2C]/85 backdrop-blur-xl border border-white/10 p-6 shadow-xl">
        <h3 className="text-[16px] font-extrabold text-white mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#34D399] text-[20px]">
            compare_arrows
          </span>
          Benchmark Komparasi Gerbang Keputusan & Status 3 Desa Binaan
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-black/40 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4 rounded-l-lg">Nama Desa</th>
                <th className="py-3 px-4">Skor & Kategori</th>
                <th className="py-3 px-4">Model Terpilih</th>
                <th className="py-3 px-4">Status Gerbang</th>
                <th className="py-3 px-4 rounded-r-lg text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {(Object.keys(villages) as import('../types').VillageId[]).map((vId) => {
                const v = villages[vId];
                const score = Object.values(v.indicators).reduce((a, b) => a + b, 0);
                const cat = score <= 60 ? 'Rendah' : score <= 90 ? 'Menengah' : 'Tinggi';
                const isCurrent = vId === selectedVillageId;

                // Dynamically calculated using the exact same 5-point verification matrix
                const gateInfo = calculateGateChecklist(vId);
                const modelLabel = gateInfo.modelLabel;
                const statusLabel = gateInfo.statusText;
                const statusStyle = gateInfo.statusStyle;

                const scoreColor =
                  score >= 91 ? 'text-[#4ADE80]' : score >= 61 ? 'text-[#F5A623]' : 'text-[#F87171]';

                return (
                  <tr
                    key={vId}
                    className={`transition-colors ${
                      isCurrent ? 'bg-[#147A4B]/20 font-semibold' : 'hover:bg-white/[0.04]'
                    }`}
                  >
                    <td className="py-3 px-4 font-bold text-white">
                      <div className="flex items-center gap-1.5">
                        <span>{v.name}</span>
                        {isCurrent && (
                          <span className="text-[10px] bg-[#147A4B] text-white px-1.5 py-0.2 rounded font-normal border border-[#34D399]/40">
                            Desa Aktif
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-bold ${scoreColor}`}>
                        {score} / 120 ({cat})
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-200">{modelLabel}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${statusStyle}`}>
                        {statusLabel}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedVillageId(vId)}
                        className={`text-[12px] font-bold hover:underline cursor-pointer ${
                          score >= 91
                            ? 'text-[#4ADE80]'
                            : score >= 61
                            ? 'text-[#F5A623]'
                            : 'text-[#F87171]'
                        }`}
                      >
                        {score >= 91 ? 'Buka Detail' : score >= 61 ? 'Supervisi' : 'Intervensi'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
