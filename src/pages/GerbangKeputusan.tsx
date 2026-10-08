import React, { useState } from 'react';
import { useDesaWatt } from '../context/DesaWattContext';
import { GlowingMetricCard } from '@/components/ui/GlowingMetricCard';
import { CountUpNumber } from '@/components/ui/CountUpNumber';
import { GradientButton } from '@/components/ui/gradient-button';
import { CetakLaporanModal } from '../components/CetakLaporanModal';

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

  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const getModelLabel = (model: string) => {
    if (model === 'milik_koperasi') return 'Milik Koperasi';
    if (model === 'kemitraan') return 'Kemitraan (JV BUMDes)';
    return 'Energy-as-a-Service (EaaS)';
  };

  const percentComplete = Math.round(
    (gateChecklist.passedCount / gateChecklist.totalCount) * 100
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12 text-[#3A4728] min-w-0">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 w-full min-w-0">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#E4E8D6] text-[#4B5D2A] border border-[#C5CCAE]">
              Titik Kritis Kelayakan: Gerbang Keputusan
            </span>
            <span className="text-[#C5CCAE]">•</span>
            <span className="text-[12px] font-semibold text-[#6B7753]">
              Desa: {activeVillage.name}
            </span>
          </div>
          <h1 className="text-[28px] font-extrabold text-[#1F2A14] tracking-tight leading-tight">
            Gerbang Keputusan: Verifikasi Akhir Sebelum Pemasangan Fisik
          </h1>
          <p className="text-[14px] text-[#3A4728] mt-1 max-w-3xl leading-relaxed">
            Mekanisme audit ketat untuk menghentikan proyek PLTS mangkrak sejak di atas kertas.
            Seluruh syarat teknis, finansial, dan legalitas desa diverifikasi sebelum penerbitan
            Surat Perintah Kerja (SPK).
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <GradientButton
            onClick={() => setIsPrintModalOpen(true)}
            variant="green-outline"
            size="md"
            className="inline-flex items-center gap-2 cursor-pointer shadow-xs text-[13px] py-2.5 px-4 font-bold"
            title="Buka laporan format cetak A4 1 halaman"
          >
            <span className="material-symbols-outlined text-[18px] text-[#4B5D2A]">print</span>
            <span>Cetak / Simpan PDF</span>
          </GradientButton>

          <GradientButton
            onClick={() => setActivePage('jaga-watt')}
            variant="green"
            size="md"
            className="inline-flex items-center gap-2 font-bold text-[13px] shadow-sm cursor-pointer group py-2.5 px-5"
          >
            <span>Lanjut ke 3 Jaga Watt</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </GradientButton>
        </div>
      </div>

      {/* Horizontal Pipeline Track */}
      <div className="rounded-[14px] bg-[#F3F5EA] border border-[#C5CCAE] p-4 sm:p-6 shadow-xs overflow-x-auto w-full min-w-0">
        <div className="flex items-center justify-between min-w-[850px] relative">
          {/* Track line */}
          <div className="absolute left-8 right-8 top-5 h-1 bg-[#D3D9BE] -z-0"></div>
          <div
            className="absolute left-8 top-5 h-1 bg-[#4B5D2A] -z-0 transition-all duration-500"
            style={{ width: gateCanProceed ? '75%' : '58%' }}
          ></div>

          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center text-center w-36">
            <div className="w-10 h-10 rounded-full bg-[#4B5D2A] text-[#F7F8EE] flex items-center justify-center font-bold text-[13px] shadow-xs mb-1.5 border border-[#5E7336]">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7753]">
              Langkah 01
            </span>
            <span className="text-[13px] font-bold text-[#1F2A14]">Skor Baca Desa</span>
            <span className="mt-1 px-2 py-0.5 rounded-full bg-[#E4E8D6] text-[#4B5D2A] text-[11px] font-extrabold border border-[#C5CCAE]">
              <CountUpNumber value={totalScore} /> / 120 ({readinessLevel})
            </span>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center text-center w-36">
            <div className="w-10 h-10 rounded-full bg-[#4B5D2A] text-[#F7F8EE] flex items-center justify-center font-bold text-[13px] shadow-xs mb-1.5 border border-[#5E7336]">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7753]">
              Langkah 02
            </span>
            <span className="text-[13px] font-bold text-[#1F2A14]">Model Terpilih</span>
            <span className="mt-1 px-2 py-0.5 rounded-full bg-[#E4E8D6] text-[#4B5D2A] text-[11px] font-extrabold border border-[#C5CCAE]">
              {getModelLabel(effectiveModel)}
            </span>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center text-center w-36">
            <div className="w-10 h-10 rounded-full bg-[#4B5D2A] text-[#F7F8EE] flex items-center justify-center font-bold text-[13px] shadow-xs mb-1.5 border border-[#5E7336]">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7753]">
              Langkah 03
            </span>
            <span className="text-[13px] font-bold text-[#1F2A14]">Arus Kas & O&M</span>
            <span className="mt-1 px-2 py-0.5 rounded-full bg-[#E4E8D6] text-[#4B5D2A] text-[11px] font-extrabold border border-[#C5CCAE]">
              +Rp <CountUpNumber value={simulationResults.netAnnualAverageJuta} /> Jt/thn
            </span>
          </div>

          {/* Step 4 (Current) */}
          <div className="relative z-10 flex flex-col items-center text-center w-44">
            <div className="w-12 h-12 rounded-full bg-[#E0A526] text-[#1F2A14] flex items-center justify-center font-bold shadow-md ring-4 ring-[#E0A526]/30 mb-1">
              <span className="material-symbols-outlined text-[22px]">verified_user</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#825708]">
              Aktif Saat Ini
            </span>
            <span className="text-[14px] font-extrabold text-[#1F2A14]">Gerbang Keputusan</span>
            <span className="mt-1 px-2.5 py-0.5 rounded-full bg-[#F6E7BD] text-[#825708] text-[11px] font-extrabold border border-[#EED38A]">
              Validasi (<CountUpNumber value={gateChecklist.passedCount} />/<CountUpNumber value={gateChecklist.totalCount} />)
            </span>
          </div>

          {/* Step 5 */}
          <div
            className={`relative z-10 flex flex-col items-center text-center w-36 ${
              gateCanProceed ? 'opacity-100' : 'opacity-40'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-[#FAFBF4] text-[#6B7753] flex items-center justify-center font-bold text-[13px] mb-1.5 border border-[#C5CCAE]">
              <span className="material-symbols-outlined text-[18px]">
                {gateCanProceed ? 'lock_open' : 'lock'}
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7753]">
              Langkah 05
            </span>
            <span className="text-[13px] font-bold text-[#1F2A14]">Pemasangan Fisik</span>
            <span className="mt-1 px-2 py-0.5 rounded-full bg-[#FAFBF4] text-[#6B7753] text-[11px] font-semibold border border-[#C5CCAE]">
              {gateCanProceed ? 'Siap SPK' : 'Menunggu SPK'}
            </span>
          </div>

          {/* Step 6 */}
          <div className="relative z-10 flex flex-col items-center text-center w-36 opacity-40">
            <div className="w-10 h-10 rounded-full bg-[#FAFBF4] text-[#6B7753] flex items-center justify-center font-bold text-[13px] mb-1.5 border border-[#C5CCAE]">
              <span className="material-symbols-outlined text-[18px]">monitor_heart</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7753]">
              Langkah 06
            </span>
            <span className="text-[13px] font-bold text-[#1F2A14]">Jaga Watt (M&E)</span>
            <span className="mt-1 px-2 py-0.5 rounded-full bg-[#FAFBF4] text-[#6B7753] text-[11px] font-semibold border border-[#C5CCAE]">
              Operasional
            </span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 min-[1100px]:grid-cols-12 gap-6 items-start w-full min-w-0">
        {/* Left Column: 5 Verification Checklist (8 cols) */}
        <div className="min-[1100px]:col-span-8 space-y-6 w-full min-w-0">
          <div className="rounded-[14px] bg-[#F3F5EA] border border-[#C5CCAE] p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#C5CCAE] gap-2 mb-4">
              <div>
                <h2 className="text-[18px] font-extrabold text-[#1F2A14] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4B5D2A] text-[22px]">
                    fact_check
                  </span>
                  Matriks Verifikasi Kelayakan Mandiri
                </h2>
                <p className="text-[12px] text-[#6B7753]">
                  Kriteria kesiapan DesaWatt (usulan konseptual)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E2F0E4] text-[#27602C] text-[12px] font-extrabold border border-[#C2E0C5]">
                  <span className="w-2 h-2 rounded-full bg-[#4C9A52]"></span>{' '}
                  <CountUpNumber value={gateChecklist.passedCount} /> Lulus
                </span>
                {gateChecklist.totalCount - gateChecklist.passedCount > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F6E7BD] text-[#825708] text-[12px] font-extrabold border border-[#EED38A]">
                    <span className="w-2 h-2 rounded-full bg-[#D99A1E]"></span>{' '}
                    <CountUpNumber value={gateChecklist.totalCount - gateChecklist.passedCount} /> Menunggu
                  </span>
                )}
              </div>
            </div>

            {/* Checklist Items */}
            <div className="divide-y divide-[#C5CCAE] space-y-1">
              {/* Item 1: Score threshold */}
              <div className="py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      gateChecklist.scorePass
                        ? 'bg-[#E2F0E4] text-[#27602C] border border-[#C2E0C5]'
                        : 'bg-[#F9DFDC] text-[#8B281B] border border-[#ECAAA4]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {gateChecklist.scorePass ? 'done' : 'close'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-[14px] font-extrabold text-[#1F2A14]">
                        1. Skor Memenuhi Ambang Model Terpilih
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          gateChecklist.scorePass
                            ? 'bg-[#E2F0E4] text-[#27602C] border border-[#C2E0C5]'
                            : 'bg-[#F9DFDC] text-[#8B281B] border border-[#ECAAA4]'
                        }`}
                      >
                        {gateChecklist.scorePass ? 'Lulus' : 'Belum Memenuhi'}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#3A4728] mt-1 leading-relaxed">
                      Skor perolehan{' '}
                      <strong className="text-[#1F2A14]">
                        <CountUpNumber value={totalScore} /> / 120
                      </strong>{' '}
                      (Level {readinessLevel}). Ambang minimum model {getModelLabel(effectiveModel)}:
                      skor ≥ {effectiveModel === 'milik_koperasi' ? 91 : 61} poin.
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-right text-[11px] font-semibold text-[#6B7753]">
                  Bobot: <CountUpNumber value={25} />%
                </div>
              </div>

              {/* Item 2: OM Fund Plan */}
              <div className="py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      gateChecklist.omPlanPass
                        ? 'bg-[#E2F0E4] text-[#27602C] border border-[#C2E0C5]'
                        : 'bg-[#F9DFDC] text-[#8B281B] border border-[#ECAAA4]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {gateChecklist.omPlanPass ? 'done' : 'close'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-[14px] font-extrabold text-[#1F2A14]">
                        2. Rencana Dana O&M Tertulis & Mengikat (simulasi)
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          gateChecklist.omPlanPass
                            ? 'bg-[#E2F0E4] text-[#27602C] border border-[#C2E0C5]'
                            : 'bg-[#F9DFDC] text-[#8B281B] border border-[#ECAAA4]'
                        }`}
                      >
                        {gateChecklist.omPlanPass ? 'Lulus' : 'Belum Tersedia'}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#3A4728] mt-1 leading-relaxed">
                      SOP iuran warga disepakati dengan Saldo Dana O&M Rp <CountUpNumber value={activeVillage.saldoDanaOMJuta} />.000.000 di rekening penampung.
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-right text-[11px] font-semibold text-[#6B7753]">
                  Bobot: <CountUpNumber value={20} />%
                </div>
              </div>

              {/* Item 3: Battery replacement plan */}
              <div className="py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      gateChecklist.batteryPlanPass
                        ? 'bg-[#E2F0E4] text-[#27602C] border border-[#C2E0C5]'
                        : 'bg-[#F9DFDC] text-[#8B281B] border border-[#ECAAA4]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {gateChecklist.batteryPlanPass ? 'done' : 'close'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-[14px] font-extrabold text-[#1F2A14]">
                        3. Rencana Penggantian Baterai Tahun Ke-11 (simulasi)
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          gateChecklist.batteryPlanPass
                            ? 'bg-[#E2F0E4] text-[#27602C] border border-[#C2E0C5]'
                            : 'bg-[#F9DFDC] text-[#8B281B] border border-[#ECAAA4]'
                        }`}
                      >
                        {gateChecklist.batteryPlanPass ? 'Lulus' : 'Belum Direncanakan'}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#3A4728] mt-1 leading-relaxed">
                      Dari Dana O&M Rp <CountUpNumber value={activeVillage.saldoDanaOMJuta} /> Jt,{' '}
                      <CountUpNumber
                        value={Number(((activeVillage.saldoDanaOMJuta / activeVillage.targetBatteryFundJuta) * 100).toFixed(1))}
                        decimals={1}
                      />
                      % dari target penggantian baterai Rp <CountUpNumber value={activeVillage.targetBatteryFundJuta} /> Jt teralokasi dengan mekanisme rekening escrow dual-signature (Dinas/Pendamping + Koperasi).
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-right text-[11px] font-semibold text-[#6B7753]">
                  Bobot: <CountUpNumber value={20} />%
                </div>
              </div>

              {/* Item 4: Musdes Approval */}
              <div
                className={`py-4 rounded-[12px] -mx-2 px-3 transition-colors ${
                  musdesApproved ? 'bg-transparent' : 'bg-[#F6E7BD]/40 border border-[#EED38A]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        musdesApproved
                          ? 'bg-[#E2F0E4] text-[#27602C] border border-[#C2E0C5]'
                          : 'bg-[#F6E7BD] text-[#825708] border border-[#EED38A]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {musdesApproved ? 'done' : 'pending_actions'}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-[14px] font-extrabold text-[#1F2A14]">
                          4. Persetujuan Musyawarah Desa (Musdes simulasi)
                        </h3>
                        <span
                          className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                            musdesApproved
                              ? 'bg-[#E2F0E4] text-[#27602C] border border-[#C2E0C5]'
                              : 'bg-[#F6E7BD] text-[#825708] border border-[#EED38A]'
                          }`}
                        >
                          {musdesApproved ? 'Disahkan & Sah (simulasi)' : 'Belum Lengkap / Menunggu'}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#3A4728] mt-1 leading-relaxed">
                        {musdesApproved
                          ? 'Berita Acara (simulasi) Musdes Khusus penandatanganan SK Koperasi (simulasi) telah disahkan bersama BPD & Kepala Desa.'
                          : 'Berita Acara (simulasi) Musdes Khusus penandatanganan SK Koperasi (simulasi) masih dalam proses pengesahan tanda tangan BPD & Kepala Desa.'}
                      </p>

                      {/* Interactive Toggle for User */}
                      <div className="pt-2.5 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setMusdesApproved(!musdesApproved)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold shadow-xs transition-all cursor-pointer ${
                            musdesApproved
                              ? 'bg-[#FAFBF4] text-[#3A4728] hover:bg-[#E4E8D6] border border-[#C5CCAE]'
                              : 'bg-[#4B5D2A] text-[#F7F8EE] hover:bg-[#3F4E2C]'
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
                  <div className="shrink-0 text-right text-[11px] font-semibold text-[#6B7753]">
                    Bobot: <CountUpNumber value={20} />%
                  </div>
                </div>
              </div>

              {/* Item 5: Pendamping Assigned */}
              <div
                className={`py-4 rounded-[12px] -mx-2 px-3 transition-colors ${
                  pendampingAssigned ? 'bg-transparent' : 'bg-[#F6E7BD]/40 border border-[#EED38A]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        pendampingAssigned
                          ? 'bg-[#E2F0E4] text-[#27602C] border border-[#C2E0C5]'
                          : 'bg-[#F6E7BD] text-[#825708] border border-[#EED38A]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {pendampingAssigned ? 'done' : 'pending_actions'}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-[14px] font-extrabold text-[#1F2A14]">
                          5. Pendamping Teknis Ditugaskan (simulasi)
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                            pendampingAssigned
                              ? 'bg-[#E2F0E4] text-[#27602C] border border-[#C2E0C5]'
                              : 'bg-[#F6E7BD] text-[#825708] border border-[#EED38A]'
                          }`}
                        >
                          {pendampingAssigned ? 'Lulus / Ditugaskan' : 'Belum Ditugaskan'}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#3A4728] mt-1 leading-relaxed">
                        {pendampingAssigned
                          ? `Surat Tugas (simulasi) telah terbit atas nama ${activeVillage.pendampingName} sebagai tenaga pendamping lapangan desa bersertifikasi teknis.`
                          : 'Tenaga pendamping teknis bersertifikasi belum ditugaskan oleh Dinas/Pendamping untuk desa ini.'}
                      </p>

                      {/* Interactive Toggle for User */}
                      <div className="pt-2 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setPendampingAssigned(!pendampingAssigned)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold shadow-xs transition-all cursor-pointer ${
                            pendampingAssigned
                              ? 'bg-[#FAFBF4] text-[#3A4728] hover:bg-[#E4E8D6] border border-[#C5CCAE]'
                              : 'bg-[#4B5D2A] text-[#F7F8EE] hover:bg-[#3F4E2C]'
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
                  <div className="shrink-0 text-right text-[11px] font-semibold text-[#6B7753]">
                    Bobot: <CountUpNumber value={15} />%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specs Summary Card */}
          <div className="rounded-[14px] bg-[#F3F5EA] border border-[#C5CCAE] p-6 shadow-xs">
            <h3 className="text-[16px] font-extrabold text-[#1F2A14] mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4B5D2A] text-[20px]">bolt</span>
              Ringkasan Spesifikasi Teknis yang Siap Diinstalasi
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 min-[1200px]:grid-cols-4 gap-3 w-full min-w-0">
              <GlowingMetricCard>
                <div className="p-3.5 flex flex-col justify-between h-full">
                  <span className="text-[11px] font-bold text-[#6B7753] block">Kapasitas Puncak</span>
                  <span className="text-[18px] font-black text-[#1F2A14]">
                    <CountUpNumber value={activeVillage.capacityKwp} /> kWp
                  </span>
                  <span className="text-[10px] text-[#6B7753] block">Tier 1 Monokristalin</span>
                </div>
              </GlowingMetricCard>

              <GlowingMetricCard>
                <div className="p-3.5 flex flex-col justify-between h-full">
                  <span className="text-[11px] font-bold text-[#6B7753] block">Penyimpanan Baterai</span>
                  <span className="text-[18px] font-black text-[#1F2A14]">
                    <CountUpNumber value={activeVillage.batteryKwh} /> kWh
                  </span>
                  <span className="text-[10px] text-[#6B7753] block">Lithium Ferro (LiFePO4)</span>
                </div>
              </GlowingMetricCard>

              <GlowingMetricCard>
                <div className="p-3.5 flex flex-col justify-between h-full">
                  <span className="text-[11px] font-bold text-[#6B7753] block">Penerima Manfaat</span>
                  <span className="text-[18px] font-black text-[#1F2A14]">
                    <CountUpNumber value={activeVillage.connectionsKK} /> KK
                  </span>
                  <span className="text-[10px] text-[#6B7753] block">+ Fasilitas Umum</span>
                </div>
              </GlowingMetricCard>

              <GlowingMetricCard>
                <div className="p-3.5 flex flex-col justify-between h-full">
                  <span className="text-[11px] font-bold text-[#6B7753] block">Kemandirian Energi</span>
                  <span className="text-[18px] font-black text-[#4C9A52]">
                    <CountUpNumber value={98.4} decimals={1} />%
                  </span>
                  <span className="text-[10px] text-[#6B7753] block">Microgrid Komunal</span>
                </div>
              </GlowingMetricCard>
            </div>
          </div>
        </div>

        {/* Right Column: Decision Authority Card (4 cols) */}
        <div className="min-[1100px]:col-span-4 space-y-6 w-full min-w-0">
          <div className="rounded-[14px] bg-[#F3F5EA] border border-[#C5CCAE] p-6 shadow-xs space-y-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7753] block mb-1.5">
                Status Keputusan Verifikasi Dinas/Pendamping
              </span>

              {/* Status Banner */}
              <div
                className={`p-4 rounded-[12px] border flex items-start gap-3 ${
                  gateStatusText === 'SIAP DILANJUTKAN'
                    ? 'bg-[#E2F0E4] border-[#C2E0C5] text-[#27602C]'
                    : gateStatusText === 'KEMBALIKAN KE PENDAMPINGAN'
                    ? 'bg-[#F9DFDC] border-[#ECAAA4] text-[#8B281B]'
                    : 'bg-[#F6E7BD] border-[#EED38A] text-[#825708]'
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
            <div className="p-4 rounded-[12px] bg-[#FAFBF4] border border-[#C5CCAE] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#6B7753] block">
                  Kelengkapan Syarat
                </span>
                <div className="text-[26px] font-black text-[#1F2A14]">
                  <CountUpNumber value={percentComplete} />%{' '}
                  <span className="text-[13px] font-semibold text-[#6B7753]">
                    (<CountUpNumber value={gateChecklist.passedCount} />/<CountUpNumber value={gateChecklist.totalCount} />)
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-[#4B5D2A] border-t-[#D3D9BE] flex items-center justify-center font-bold text-[12px] text-[#4B5D2A]">
                <CountUpNumber value={gateChecklist.passedCount} />/5
              </div>
            </div>

            {/* Rationale */}
            <div className="p-3.5 rounded-[12px] bg-[#FAFBF4] border border-[#C5CCAE] text-[12px] text-[#3A4728] leading-relaxed">
              <strong className="text-[#1F2A14]">Rasional Rekomendasi:</strong> "Rekomendasi
              teknis dan finansial telah diuji secara komprehensif. Pemasangan fisik PLTS komunal{' '}
              {activeVillage.capacityKwp} kWp dapat diotorisasi setelah seluruh mufakat desa
              dituangkan dalam dokumen resmi."
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <GradientButton
                type="button"
                disabled={!gateCanProceed}
                onClick={() => setActivePage('jaga-watt')}
                variant={gateCanProceed ? 'green-gold' : 'default'}
                size="md"
                className={`w-full py-3 px-4 font-bold text-[13px] flex items-center justify-center gap-2 transition-all ${
                  gateCanProceed
                    ? 'cursor-pointer shadow-xs'
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {gateCanProceed ? 'done_all' : 'lock'}
                </span>
                <span>Lanjutkan ke Pemasangan (SPK)</span>
              </GradientButton>

              <GradientButton
                type="button"
                onClick={() => setActivePage('baca-desa')}
                variant="green-outline"
                size="md"
                className="w-full py-2.5 px-4 font-bold text-[13px] flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <span className="material-symbols-outlined text-[18px]">undo</span>
                <span>Kembalikan ke Pendampingan</span>
              </GradientButton>
            </div>

            {/* Sign-off Verifier */}
            <div className="pt-4 border-t border-[#C5CCAE] flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#4B5D2A] text-[#F7F8EE] flex items-center justify-center font-bold text-[13px]">
                BH
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-bold text-[#1F2A14] truncate">
                  {activeVillage.pendampingName}
                </span>
                <span className="text-[11px] text-[#6B7753] truncate">
                  Tenaga Pendamping Lapangan / Tim Dinas
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benchmark Table for 3 Villages */}
      <div className="rounded-[14px] bg-[#F3F5EA] border border-[#C5CCAE] p-6 shadow-xs w-full min-w-0">
        <h3 className="text-[16px] font-extrabold text-[#1F2A14] mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#4B5D2A] text-[20px]">
            compare_arrows
          </span>
          Benchmark Komparasi Gerbang Keputusan & Status 3 Desa Binaan
        </h3>

        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[640px] text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[#E4E8D6] text-[#6B7753] text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4 rounded-l-lg">Nama Desa</th>
                <th className="py-3 px-4">Skor & Kategori</th>
                <th className="py-3 px-4">Model Terpilih</th>
                <th className="py-3 px-4">Status Gerbang</th>
                <th className="py-3 px-4 rounded-r-lg text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C5CCAE]">
              {(Object.keys(villages) as import('../types').VillageId[]).map((vId) => {
                const v = villages[vId];
                const score = Object.values(v.indicators).reduce((a, b) => a + b, 0);
                const cat = score <= 60 ? 'Rendah' : score <= 90 ? 'Menengah' : 'Tinggi';
                const isCurrent = vId === selectedVillageId;

                const gateInfo = calculateGateChecklist(vId);
                const modelLabel = gateInfo.modelLabel;
                const statusLabel = gateInfo.statusText;

                const scoreColor =
                  score >= 91 ? 'text-[#4C9A52]' : score >= 61 ? 'text-[#D99A1E]' : 'text-[#B84A3A]';

                return (
                  <tr
                    key={vId}
                    className={`transition-colors ${
                      isCurrent ? 'bg-[#E4E8D6]/60 font-semibold' : 'hover:bg-[#FAFBF4]'
                    }`}
                  >
                    <td className="py-3 px-4 font-bold text-[#1F2A14]">
                      <div className="flex items-center gap-1.5">
                        <span>{v.name}</span>
                        {isCurrent && (
                          <span className="text-[10px] bg-[#4B5D2A] text-[#F7F8EE] px-1.5 py-0.2 rounded font-normal">
                            Desa Aktif
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-bold ${scoreColor}`}>
                        <CountUpNumber value={score} /> / 120 ({cat})
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-[#3A4728]">{modelLabel}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        statusLabel.includes('SIAP')
                          ? 'bg-[#E2F0E4] text-[#27602C]'
                          : statusLabel.includes('KEMBALIKAN')
                          ? 'bg-[#F9DFDC] text-[#8B281B]'
                          : 'bg-[#F6E7BD] text-[#825708]'
                      }`}>
                        {statusLabel}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedVillageId(vId)}
                        className={`text-[12px] font-bold hover:underline cursor-pointer ${
                          score >= 91
                            ? 'text-[#4C9A52]'
                            : score >= 61
                            ? 'text-[#D99A1E]'
                            : 'text-[#B84A3A]'
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

      {/* Modal Cetak / Simpan PDF Siap Cetak A4 */}
      <CetakLaporanModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        villageId={selectedVillageId}
      />
    </div>
  );
};
