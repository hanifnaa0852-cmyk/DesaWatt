import React from 'react';
import { useDesaWatt } from '../context/DesaWattContext';

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

  const percentComplete = Math.round((gateChecklist.passedCount / gateChecklist.totalCount) * 100);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-12">
      {/* Disclaimer Banner */}
      <div className="rounded-2xl bg-white border border-slate-200/80 p-4.5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#EBF7F1] text-[#147A4B] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">info</span>
          </div>
          <p className="text-[13px] text-slate-700 leading-relaxed">
            <strong className="text-[#147A4B]">Skor bersifat rekomendasi, tidak mengikat.</strong>{' '}
            Otorisasi pelaksanaan fisik PLTS komunal tetap tunduk pada persetujuan mufakat warga
            serta validasi lapangan Dinas/Pendamping terkait.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8FAFC] text-slate-600 text-[11px] font-bold border border-slate-200 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#FEAE2C]"></span>
          SOP Verifikasi v3.2 / 2026
        </span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
              Tahap Persetujuan Akhir
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-[12px] font-semibold text-slate-500">
              Validasi Teknis & Tata Kelola
            </span>
          </div>
          <h1 className="text-[28px] font-extrabold text-[#131B2E] tracking-tight leading-tight">
            Gerbang Keputusan Pemasangan PLTS Komunal
          </h1>
          <p className="text-[14px] text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Verifikasi kepatuhan dan kelayakan komprehensif sebelum penerbitan rekomendasi resmi
            Surat Perintah Kerja (SPK) pemasangan instalasi fisik PLTS komunal pedesaan.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActivePage('jaga-watt')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#147A4B] text-white font-bold text-[13px] hover:bg-[#005F38] shadow-sm transition-all cursor-pointer group"
          >
            <span>Lanjut ke 3 Jaga Watt</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </div>

      {/* Horizontal Pipeline Track */}
      <div className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-2xs overflow-x-auto">
        <div className="flex items-center justify-between min-w-[850px] relative">
          {/* Track line */}
          <div className="absolute left-8 right-8 top-5 h-1 bg-slate-100 -z-0"></div>
          <div
            className="absolute left-8 top-5 h-1 bg-[#147A4B] -z-0 transition-all duration-500"
            style={{ width: gateCanProceed ? '75%' : '58%' }}
          ></div>

          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center text-center w-36">
            <div className="w-10 h-10 rounded-full bg-[#147A4B] text-white flex items-center justify-center font-bold text-[13px] shadow-sm mb-1.5">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Langkah 01
            </span>
            <span className="text-[13px] font-bold text-[#131B2E]">Skor Baca Desa</span>
            <span className="mt-1 px-2 py-0.5 rounded-full bg-[#EBF7F1] text-[#147A4B] text-[11px] font-extrabold">
              {totalScore} / 120 ({readinessLevel})
            </span>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center text-center w-36">
            <div className="w-10 h-10 rounded-full bg-[#147A4B] text-white flex items-center justify-center font-bold text-[13px] shadow-sm mb-1.5">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Langkah 02
            </span>
            <span className="text-[13px] font-bold text-[#131B2E]">Model Terpilih</span>
            <span className="mt-1 px-2 py-0.5 rounded-full bg-[#EBF7F1] text-[#147A4B] text-[11px] font-extrabold">
              {getModelLabel(effectiveModel)}
            </span>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center text-center w-36">
            <div className="w-10 h-10 rounded-full bg-[#147A4B] text-white flex items-center justify-center font-bold text-[13px] shadow-sm mb-1.5">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Langkah 03
            </span>
            <span className="text-[13px] font-bold text-[#131B2E]">Arus Kas & O&M</span>
            <span className="mt-1 px-2 py-0.5 rounded-full bg-[#EBF7F1] text-[#147A4B] text-[11px] font-extrabold">
              +Rp {simulationResults.netAnnualAverageJuta.toLocaleString('id-ID')} Jt/thn
            </span>
          </div>

          {/* Step 4 (Current) */}
          <div className="relative z-10 flex flex-col items-center text-center w-44">
            <div className="w-12 h-12 rounded-full bg-[#FEAE2C] text-[#6B4500] flex items-center justify-center font-bold shadow-md ring-4 ring-[#FFDDB4] mb-1">
              <span className="material-symbols-outlined text-[22px]">verified_user</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#835500]">
              Aktif Saat Ini
            </span>
            <span className="text-[14px] font-extrabold text-[#131B2E]">Gerbang Keputusan</span>
            <span className="mt-1 px-2.5 py-0.5 rounded-full bg-[#FEF6E9] text-[#96600E] text-[11px] font-extrabold border border-[#FCDCA7]">
              Validasi ({gateChecklist.passedCount}/{gateChecklist.totalCount})
            </span>
          </div>

          {/* Step 5 */}
          <div
            className={`relative z-10 flex flex-col items-center text-center w-36 ${
              gateCanProceed ? 'opacity-100' : 'opacity-40'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-[13px] mb-1.5">
              <span className="material-symbols-outlined text-[18px]">
                {gateCanProceed ? 'lock_open' : 'lock'}
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Langkah 05
            </span>
            <span className="text-[13px] font-bold text-[#131B2E]">Pemasangan Fisik</span>
            <span className="mt-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[11px] font-semibold">
              {gateCanProceed ? 'Siap SPK' : 'Menunggu SPK'}
            </span>
          </div>

          {/* Step 6 */}
          <div className="relative z-10 flex flex-col items-center text-center w-36 opacity-40">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-[13px] mb-1.5">
              <span className="material-symbols-outlined text-[18px]">monitor_heart</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Langkah 06
            </span>
            <span className="text-[13px] font-bold text-[#131B2E]">Jaga Watt (M&E)</span>
            <span className="mt-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[11px] font-semibold">
              Operasional
            </span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 5 Verification Checklist (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2 mb-4">
              <div>
                <h2 className="text-[18px] font-extrabold text-[#131B2E] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#147A4B] text-[22px]">
                    fact_check
                  </span>
                  Matriks Verifikasi Kelayakan Mandiri
                </h2>
                <p className="text-[12px] text-slate-500">
                  Kriteria kesiapan DesaWatt (usulan konseptual)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF7F1] text-[#136B45] text-[12px] font-extrabold">
                  <span className="w-2 h-2 rounded-full bg-[#147A4B]"></span>{' '}
                  {gateChecklist.passedCount} Lulus
                </span>
                {gateChecklist.totalCount - gateChecklist.passedCount > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF6E9] text-[#96600E] text-[12px] font-extrabold">
                    <span className="w-2 h-2 rounded-full bg-[#FEAE2C]"></span>{' '}
                    {gateChecklist.totalCount - gateChecklist.passedCount} Menunggu
                  </span>
                )}
              </div>
            </div>

            {/* Checklist Items */}
            <div className="divide-y divide-slate-100 space-y-1">
              {/* Item 1: Score threshold */}
              <div className="py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      gateChecklist.scorePass
                        ? 'bg-[#EBF7F1] text-[#147A4B]'
                        : 'bg-[#FDF2F2] text-[#D64545]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {gateChecklist.scorePass ? 'done' : 'close'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-[14px] font-extrabold text-[#131B2E]">
                        1. Skor Memenuhi Ambang Model Terpilih
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          gateChecklist.scorePass
                            ? 'bg-[#EBF7F1] text-[#147A4B]'
                            : 'bg-[#FDF2F2] text-[#D64545]'
                        }`}
                      >
                        {gateChecklist.scorePass ? 'Lulus' : 'Belum Memenuhi'}
                      </span>
                    </div>
                    <p className="text-[12px] text-slate-600 mt-1 leading-relaxed">
                      Skor perolehan <strong className="text-[#131B2E]">{totalScore} / 120</strong>{' '}
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
                        ? 'bg-[#EBF7F1] text-[#147A4B]'
                        : 'bg-[#FDF2F2] text-[#D64545]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {gateChecklist.omPlanPass ? 'done' : 'close'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-[14px] font-extrabold text-[#131B2E]">
                        2. Rencana Dana O&M Tertulis & Mengikat (simulasi)
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          gateChecklist.omPlanPass
                            ? 'bg-[#EBF7F1] text-[#147A4B]'
                            : 'bg-[#FDF2F2] text-[#D64545]'
                        }`}
                      >
                        {gateChecklist.omPlanPass ? 'Lulus' : 'Belum Tersedia'}
                      </span>
                    </div>
                    <p className="text-[12px] text-slate-600 mt-1 leading-relaxed">
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
                        ? 'bg-[#EBF7F1] text-[#147A4B]'
                        : 'bg-[#FDF2F2] text-[#D64545]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {gateChecklist.batteryPlanPass ? 'done' : 'close'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-[14px] font-extrabold text-[#131B2E]">
                        3. Rencana Penggantian Baterai Tahun Ke-11 (simulasi)
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          gateChecklist.batteryPlanPass
                            ? 'bg-[#EBF7F1] text-[#147A4B]'
                            : 'bg-[#FDF2F2] text-[#D64545]'
                        }`}
                      >
                        {gateChecklist.batteryPlanPass ? 'Lulus' : 'Belum Direncanakan'}
                      </span>
                    </div>
                    <p className="text-[12px] text-slate-600 mt-1 leading-relaxed">
                      Dari Dana O&M Rp {activeVillage.saldoDanaOMJuta} Jt, {((activeVillage.saldoDanaOMJuta / activeVillage.targetBatteryFundJuta) * 100).toFixed(1)}% dari target penggantian baterai Rp {activeVillage.targetBatteryFundJuta} Jt teralokasi dengan mekanisme rekening escrow dual-signature (Dinas/Pendamping + Koperasi).
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-right text-[11px] font-semibold text-slate-400">
                  Bobot: 20%
                </div>
              </div>

              {/* Item 4: Musdes Approval (INTERACTIVE TOGGLE - default waiting for Sumber Makmur!) */}
              <div
                className={`py-4 rounded-xl -mx-2 px-3 transition-colors ${
                  musdesApproved ? 'bg-white' : 'bg-[#FEF6E9]/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        musdesApproved
                          ? 'bg-[#EBF7F1] text-[#147A4B]'
                          : 'bg-[#FEAE2C] text-[#6B4500]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {musdesApproved ? 'done' : 'pending_actions'}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-[14px] font-extrabold text-[#131B2E]">
                          4. Persetujuan Musyawarah Desa (Musdes simulasi)
                        </h3>
                        <span
                          className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                            musdesApproved
                              ? 'bg-[#EBF7F1] text-[#147A4B]'
                              : 'bg-[#FEAE2C] text-[#6B4500]'
                          }`}
                        >
                          {musdesApproved ? 'Disahkan & Sah (simulasi)' : 'Belum Lengkap / Menunggu'}
                        </span>
                      </div>
                      <p className="text-[12px] text-slate-600 mt-1 leading-relaxed">
                        {musdesApproved
                          ? 'Berita Acara (simulasi) Musdes Khusus penandatanganan SK Koperasi (simulasi) telah disahkan bersama BPD & Kepala Desa.'
                          : 'Berita Acara (simulasi) Musdes Khusus penandatanganan SK Koperasi (simulasi) masih dalam proses pengesahan tanda tangan BPD & Kepala Desa.'}
                      </p>

                      {/* Interactive Toggle for User to Experience State Change */}
                      <div className="pt-2.5 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setMusdesApproved(!musdesApproved)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold shadow-2xs transition-all cursor-pointer ${
                            musdesApproved
                              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              : 'bg-[#147A4B] text-white hover:bg-[#005F38]'
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
                  pendampingAssigned ? 'bg-white' : 'bg-[#FEF6E9]/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        pendampingAssigned
                          ? 'bg-[#EBF7F1] text-[#147A4B]'
                          : 'bg-[#FEAE2C] text-[#6B4500]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {pendampingAssigned ? 'done' : 'pending_actions'}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-[14px] font-extrabold text-[#131B2E]">
                          5. Pendamping Teknis Ditugaskan (simulasi)
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                            pendampingAssigned
                              ? 'bg-[#EBF7F1] text-[#147A4B]'
                              : 'bg-[#FEAE2C] text-[#6B4500]'
                          }`}
                        >
                          {pendampingAssigned ? 'Lulus / Ditugaskan' : 'Belum Ditugaskan'}
                        </span>
                      </div>
                      <p className="text-[12px] text-slate-600 mt-1 leading-relaxed">
                        {pendampingAssigned
                          ? `Surat Tugas (simulasi) telah terbit atas nama ${activeVillage.pendampingName} sebagai tenaga pendamping lapangan desa bersertifikasi teknis.`
                          : 'Tenaga pendamping teknis bersertifikasi belum ditugaskan oleh Dinas/Pendamping untuk desa ini.'}
                      </p>

                      {/* Interactive Toggle for User */}
                      <div className="pt-2 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setPendampingAssigned(!pendampingAssigned)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold shadow-2xs transition-all cursor-pointer ${
                            pendampingAssigned
                              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              : 'bg-[#147A4B] text-white hover:bg-[#005F38]'
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
          <div className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-2xs">
            <h3 className="text-[16px] font-extrabold text-[#131B2E] mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#147A4B] text-[20px]">bolt</span>
              Ringkasan Spesifikasi Teknis yang Siap Diinstalasi
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-[#F8FAFC]">
                <span className="text-[11px] font-bold text-slate-400 block">Kapasitas Puncak</span>
                <span className="text-[18px] font-black text-[#131B2E]">
                  {activeVillage.capacityKwp} kWp
                </span>
                <span className="text-[10px] text-slate-500 block">Tier 1 Monokristalin</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8FAFC]">
                <span className="text-[11px] font-bold text-slate-400 block">Penyimpanan Baterai</span>
                <span className="text-[18px] font-black text-[#131B2E]">
                  {activeVillage.batteryKwh} kWh
                </span>
                <span className="text-[10px] text-slate-500 block">Lithium Ferro (LiFePO4)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8FAFC]">
                <span className="text-[11px] font-bold text-slate-400 block">Penerima Manfaat</span>
                <span className="text-[18px] font-black text-[#131B2E]">
                  {activeVillage.connectionsKK} KK
                </span>
                <span className="text-[10px] text-slate-500 block">+ Fasilitas Umum</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8FAFC]">
                <span className="text-[11px] font-bold text-slate-400 block">Kemandirian Energi</span>
                <span className="text-[18px] font-black text-[#147A4B]">98.4%</span>
                <span className="text-[10px] text-slate-500 block">Microgrid Komunal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Decision Authority Card (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-2xs space-y-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Status Keputusan Verifikasi Dinas/Pendamping
              </span>

              {/* Status Banner */}
              <div
                className={`p-4 rounded-xl border flex items-start gap-3 ${
                  gateStatusText === 'SIAP DILANJUTKAN'
                    ? 'bg-[#EBF7F1] border-[#C1E7D4] text-[#136B45]'
                    : gateStatusText === 'KEMBALIKAN KE PENDAMPINGAN'
                    ? 'bg-[#FDF2F2] border-[#F8C3C3] text-[#A52828]'
                    : 'bg-[#FEF6E9] border-[#FCDCA7] text-[#96600E]'
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
            <div className="p-4 rounded-xl bg-[#F8FAFC] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 block">
                  Kelengkapan Syarat
                </span>
                <div className="text-[26px] font-black text-[#131B2E]">
                  {percentComplete}%{' '}
                  <span className="text-[13px] font-semibold text-slate-400">
                    ({gateChecklist.passedCount}/{gateChecklist.totalCount})
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-[#147A4B] border-t-slate-200 flex items-center justify-center font-bold text-[12px] text-[#147A4B]">
                {gateChecklist.passedCount}/5
              </div>
            </div>

            {/* Rationale */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-[12px] text-slate-600 leading-relaxed">
              <strong className="text-[#131B2E]">Rasional Rekomendasi:</strong> "Rekomendasi
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
                    ? 'bg-[#147A4B] text-white hover:bg-[#005F38] shadow-sm cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
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
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[13px] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">undo</span>
                <span>Kembalikan ke Pendampingan</span>
              </button>
            </div>

            {/* Sign-off Verifier (Dinas/Pendamping per Correction 1) */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#147A4B]/10 text-[#147A4B] flex items-center justify-center font-bold text-[13px]">
                BH
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-bold text-[#131B2E] truncate">
                  {activeVillage.pendampingName}
                </span>
                <span className="text-[11px] text-slate-500 truncate">
                  Tenaga Pendamping Lapangan / Tim Dinas/Pendamping
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benchmark Table for 3 Villages */}
      <div className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-2xs">
        <h3 className="text-[16px] font-extrabold text-[#131B2E] mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#147A4B] text-[20px]">
            compare_arrows
          </span>
          Benchmark Komparasi Gerbang Keputusan & Status 3 Desa Binaan
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[#F8FAFC] text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4 rounded-l-lg">Nama Desa</th>
                <th className="py-3 px-4">Skor & Kategori</th>
                <th className="py-3 px-4">Model Terpilih</th>
                <th className="py-3 px-4">Status Gerbang</th>
                <th className="py-3 px-4 rounded-r-lg text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
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
                  score >= 91 ? 'text-[#147A4B]' : score >= 61 ? 'text-[#96600E]' : 'text-[#D64545]';

                return (
                  <tr
                    key={vId}
                    className={`transition-colors ${
                      isCurrent ? 'bg-[#EBF7F1]/20 font-semibold' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3 px-4 font-bold text-[#131B2E]">
                      <div className="flex items-center gap-1.5">
                        <span>{v.name}</span>
                        {isCurrent && (
                          <span className="text-[10px] bg-[#147A4B] text-white px-1.5 py-0.2 rounded font-normal">
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
                    <td className="py-3 px-4 font-medium text-slate-800">{modelLabel}</td>
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
                            ? 'text-[#147A4B]'
                            : score >= 61
                            ? 'text-[#96600E]'
                            : 'text-[#D64545]'
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
