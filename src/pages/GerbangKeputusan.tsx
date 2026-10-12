import React, { useState } from 'react';
import { useDesaWatt, PREREQUISITE_CONFIGS } from '../context/DesaWattContext';
import { VillageId, PrerequisiteKey } from '../types';
import { GlowingMetricCard } from '@/components/ui/GlowingMetricCard';
import { GradientButton } from '@/components/ui/gradient-button';
import { CetakLaporanModal } from '../components/CetakLaporanModal';

export const GerbangKeputusan: React.FC = () => {
  const {
    activeVillage,
    villages,
    selectedVillageId,
    setSelectedVillageId,
    readinessLevel,
    effectiveModel,
    calculateGateChecklist,
    gateChecklist,
    gateStatusText,
    gateCanProceed,
    updatePrerequisite,
    setActivePage,
  } = useDesaWatt();

  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const getModelLabel = (model: string) => {
    if (model === 'milik_koperasi') return 'Milik Koperasi';
    if (model === 'kemitraan') return 'Kemitraan (JV BUMDes)';
    return 'Energy-as-a-Service (EaaS)';
  };

  const missingCount = gateChecklist.totalCount - gateChecklist.passedCount;

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12 text-[#3A4728] min-w-0">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 w-full min-w-0">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#E4E8D6] text-[#4B5D2A] border border-[#C5CCAE]">
              Tahap Penghubung: Gerbang Keputusan
            </span>
            <span className="text-[#C5CCAE]">•</span>
            <span className="text-[12px] font-semibold text-[#6B7753]">
              Desa: {activeVillage.name}
            </span>
            <span className="text-[#C5CCAE]">•</span>
            <span className="px-2 py-0.5 rounded-sm text-[10px] font-bold bg-[#F1F3E9] text-[#6B7753] border border-[#D5DCBF]">
              Data ilustratif
            </span>
          </div>
          <h1 className="text-[26px] sm:text-[28px] font-extrabold text-[#1F2A14] tracking-tight leading-tight">
            Gerbang Keputusan
          </h1>
          <p className="text-[13px] font-bold text-[#4B5D2A] mt-0.5">
            5 Prasyarat Mutlak • Daftar Periksa Bersama Musyawarah Desa & Koperasi
          </p>
          <p className="text-[14px] text-[#4A5736] mt-1 max-w-3xl leading-relaxed">
            Menghubungkan tahap Baca Desa dan Rancang Watt sebelum komitmen pemasangan.
            Kelima prasyarat ini bersifat mutlak dan tidak dapat dikompensasi oleh dimensi lain.
            Gerbang bersifat tidak mengikat; keputusan akhir berada pada musyawarah desa, pengurus koperasi, dan pendamping.
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
            onClick={() => setActivePage('kelola-bersama')}
            variant="green"
            size="md"
            className="inline-flex items-center gap-2 font-bold text-[13px] shadow-sm cursor-pointer group py-2.5 px-5"
          >
            <span>Lanjut ke Kelola Bersama</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </GradientButton>
        </div>
      </div>

      {/* Village Switcher Pills */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#F3F5EA] border border-[#C5CCAE] rounded-xl p-3 shadow-xs">
        <div className="flex items-center gap-2 text-[12px] font-bold text-[#4B5D2A]">
          <span className="material-symbols-outlined text-[18px] text-[#2E7D32]">verified_user</span>
          <span>Pilih Desa untuk Ditinjau:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {(Object.keys(villages) as VillageId[]).map((vId) => {
            const v = villages[vId];
            const isSelected = vId === selectedVillageId;
            const gate = calculateGateChecklist(vId);

            return (
              <button
                key={vId}
                onClick={() => setSelectedVillageId(vId)}
                className={`px-3 py-2 rounded-lg text-[12px] font-bold transition-all text-left flex items-center gap-2 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#2E7D32] text-white border-[#2E7D32] shadow-xs'
                    : 'bg-white text-[#3A4728] border-[#D1D8BE] hover:bg-[#EAEFD9]'
                }`}
              >
                <span>{v.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                    isSelected ? 'bg-white/20 text-white' : gate.statusStyle
                  }`}
                >
                  {gate.statusText}
                </span>
                <span className="text-[9px] uppercase tracking-wider px-1 py-0.2 rounded bg-black/10">
                  Data ilustratif
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Horizontal Pipeline Track */}
      <div className="rounded-[14px] bg-[#F3F5EA] border border-[#C5CCAE] p-4 sm:p-6 shadow-xs overflow-x-auto w-full min-w-0">
        <div className="flex items-center justify-between min-w-[750px] relative">
          {/* Track line */}
          <div className="absolute left-8 right-8 top-5 h-1 bg-[#D3D9BE] -z-0"></div>
          <div
            className="absolute left-8 top-5 h-1 bg-[#2E7D32] -z-0 transition-all duration-500"
            style={{ width: gateCanProceed ? '80%' : '50%' }}
          ></div>

          {/* Step 1: Dengar Warga */}
          <div className="relative z-10 flex flex-col items-center text-center w-36">
            <div className="w-10 h-10 rounded-full bg-[#2E7D32] text-white flex items-center justify-center font-bold text-[13px] shadow-xs mb-1.5">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7753]">Komponen 1</span>
            <span className="text-[12px] font-bold text-[#1F2A14]">Dengar Warga</span>
            <span className="text-[10px] text-[#6B7753]">Aspirasi Warga</span>
          </div>

          {/* Step 2: Belajar Energi */}
          <div className="relative z-10 flex flex-col items-center text-center w-36">
            <div className="w-10 h-10 rounded-full bg-[#2E7D32] text-white flex items-center justify-center font-bold text-[13px] shadow-xs mb-1.5">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7753]">Komponen 2</span>
            <span className="text-[12px] font-bold text-[#1F2A14]">Belajar Energi</span>
            <span className="text-[10px] text-[#6B7753]">Praktik & Literasi</span>
          </div>

          {/* Step 3: Baca Desa */}
          <div className="relative z-10 flex flex-col items-center text-center w-36">
            <div className="w-10 h-10 rounded-full bg-[#2E7D32] text-white flex items-center justify-center font-bold text-[13px] shadow-xs mb-1.5">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7753]">Komponen 3</span>
            <span className="text-[12px] font-bold text-[#1F2A14]">Baca Desa</span>
            <span className="text-[10px] text-[#4B5D2A] font-semibold">Profil: {readinessLevel}</span>
          </div>

          {/* Step 4: Gerbang Keputusan (Aktif) */}
          <div className="relative z-10 flex flex-col items-center text-center w-44">
            <div className="w-12 h-12 rounded-full bg-[#D97706] text-white flex items-center justify-center font-bold shadow-md ring-4 ring-[#D97706]/30 mb-1">
              <span className="material-symbols-outlined text-[22px]">policy</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#96600E]">Tahap Penghubung</span>
            <span className="text-[13px] font-black text-[#1F2A14]">Gerbang Keputusan</span>
            <span className="mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border bg-white text-[#96600E] border-[#FCDCA7]">
              {gateChecklist.passedCount}/5 Terpenuhi
            </span>
          </div>

          {/* Step 5: Kelola Bersama & Pemasangan */}
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
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7753]">Komponen 5 & 6</span>
            <span className="text-[12px] font-bold text-[#1F2A14]">Kelola Bersama</span>
            <span className="text-[10px] text-[#6B7753]">{gateCanProceed ? 'Siap Berjalan' : 'Menunggu Telaah'}</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 min-[1100px]:grid-cols-12 gap-6 items-start w-full min-w-0">
        {/* Left Column: 5 PRASYARAT (8 cols) */}
        <div className="min-[1100px]:col-span-8 space-y-6 w-full min-w-0">
          <div className="rounded-[14px] bg-white border border-[#C5CCAE] p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EAEFD9] gap-3 mb-4">
              <div>
                <h2 className="text-[18px] font-black text-[#1F2A14] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#2E7D32] text-[22px]">
                    fact_check
                  </span>
                  5 Prasyarat Mutlak (Non-Negotiable)
                </h2>
                <p className="text-[12px] text-[#55633C] mt-0.5">
                  Prasyarat ini tidak dapat dikompensasi oleh dimensi lain. Centang prasyarat yang telah diverifikasi dan lengkapi bukti tertulis.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-extrabold border ${
                    gateCanProceed
                      ? 'bg-[#EBF7F1] text-[#147A4B] border-[#C1E7D4]'
                      : 'bg-[#FEF6E9] text-[#96600E] border-[#FCDCA7]'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      gateCanProceed ? 'bg-[#2E7D32]' : 'bg-[#D97706]'
                    }`}
                  ></span>
                  <span>{gateChecklist.statusText}</span>
                </span>
              </div>
            </div>

            {/* Checklist 5 Prasyarat Interaktif */}
            <div className="space-y-4">
              {PREREQUISITE_CONFIGS.map((cfg) => {
                const currentPrereq = activeVillage.prerequisites?.[cfg.id] || {
                  checked: false,
                  evidenceNote: '',
                };
                const isChecked = currentPrereq.checked;

                return (
                  <div
                    key={cfg.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isChecked
                        ? 'bg-[#F9FCF7] border-[#C1E7D4]'
                        : 'bg-[#FFFDF7] border-[#FCDCA7]'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      {/* Checkbox interaktif pengguna */}
                      <label className="mt-1 flex items-center cursor-pointer shrink-0">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) =>
                            updatePrerequisite(
                              selectedVillageId,
                              cfg.id as PrerequisiteKey,
                              e.target.checked
                            )
                          }
                          className="w-5 h-5 rounded text-[#2E7D32] focus:ring-[#2E7D32] border-[#C5CCAE] cursor-pointer"
                        />
                      </label>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                          <h3 className="text-[14px] font-black text-[#1F2A14] flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-[#EAEFD9] text-[#4B5D2A] text-[10px] font-black flex items-center justify-center">
                              {cfg.number}
                            </span>
                            <span>{cfg.title}</span>
                          </h3>

                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border ${
                              isChecked
                                ? 'bg-[#EBF7F1] text-[#147A4B] border-[#C1E7D4]'
                                : 'bg-[#FEF6E9] text-[#96600E] border-[#FCDCA7]'
                            }`}
                          >
                            {isChecked ? 'Terpenuhi' : 'Belum Terpenuhi'}
                          </span>
                        </div>

                        <p className="text-[12px] text-[#55633C] leading-relaxed mb-3">
                          {cfg.description}
                        </p>

                        {/* Kolom Bukti / Catatan Pengguna */}
                        <div>
                          <label className="block text-[11px] font-bold text-[#4B5D2A] mb-1">
                            Bukti & Dokumen Pendukung (Catatan Lapangan):
                          </label>
                          <input
                            type="text"
                            placeholder="Tuliskan nomor Berita Acara, dokumen SOP, atau nama pihak kompeten pemeriksa..."
                            value={currentPrereq.evidenceNote || ''}
                            onChange={(e) =>
                              updatePrerequisite(
                                selectedVillageId,
                                cfg.id as PrerequisiteKey,
                                isChecked,
                                e.target.value
                              )
                            }
                            className="w-full text-[12px] px-3 py-1.5 rounded-lg bg-white border border-[#C5CCAE] text-[#1F2A14] focus:ring-2 focus:ring-[#2E7D32] focus:outline-hidden"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Helper Text Mutlak Mandatori Prompt 3B */}
            <div className="mt-5 p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] flex items-start gap-3 text-[12px] text-[#92400E] leading-relaxed">
              <span className="material-symbols-outlined text-[20px] text-[#D97706] shrink-0 mt-0.5">
                lightbulb
              </span>
              <div>
                <strong>Petunjuk Telaah Prasyarat:</strong> Jika prasyarat belum terpenuhi, langkah yang disarankan
                adalah pendampingan dan desain ulang, bukan langsung pemasangan. Keputusan akhir ada pada
                musyawarah desa, pengurus koperasi, dan pendamping. Gerbang bersifat tidak mengikat.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Status Gerbang & Saran Rekomendasi (4 cols) */}
        <div className="min-[1100px]:col-span-4 space-y-5 w-full min-w-0">
          <div className="rounded-[14px] bg-[#F3F5EA] border border-[#C5CCAE] p-6 shadow-xs space-y-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7753] block mb-1.5">
                Status Gerbang Keputusan
              </span>

              {/* Status Banner */}
              <div
                className={`p-4 rounded-[12px] border flex items-start gap-3 ${
                  gateCanProceed
                    ? 'bg-[#EBF7F1] border-[#C1E7D4] text-[#147A4B]'
                    : 'bg-[#FEF6E9] border-[#FCDCA7] text-[#96600E]'
                }`}
              >
                <span className="material-symbols-outlined text-[24px] shrink-0 mt-0.5">
                  {gateCanProceed ? 'task_alt' : 'pending_actions'}
                </span>
                <div>
                  <h4 className="text-[15px] font-black leading-snug">{gateChecklist.statusText}</h4>
                  <p className="text-[12px] opacity-90 mt-1 leading-relaxed">
                    {gateCanProceed
                      ? 'Kelima prasyarat mutlak telah terpenuhi. Dokumen siap diajukan ke musyawarah desa untuk pembahasan SPK dan pembagian tanggung jawab.'
                      : `Masih terdapat ${missingCount} prasyarat yang belum lengkap. Lakukan pendampingan bersama sebelum mengambil komitmen fisik.`}
                  </p>
                </div>
              </div>
            </div>

            {/* Saran Rekomendasi Khusus Desa Aktif */}
            <div className="p-4 rounded-[12px] bg-white border border-[#C5CCAE]">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#4B5D2A] block mb-1">
                Saran Sistem untuk {activeVillage.name}:
              </span>
              <p className="text-[13px] font-bold text-[#1F2A14] leading-relaxed">
                "{gateChecklist.saranRekomendasi}"
              </p>
            </div>

            {/* Kelengkapan Prasyarat Progress */}
            <div className="p-4 rounded-[12px] bg-white border border-[#C5CCAE] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#6B7753] block">
                  Pemenuhan Prasyarat
                </span>
                <div className="text-[22px] font-black text-[#1F2A14]">
                  {gateChecklist.passedCount} dari 5
                </div>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`w-3.5 h-7 rounded-sm ${
                      i <= gateChecklist.passedCount ? 'bg-[#2E7D32]' : 'bg-[#EAEFD9]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-1">
              <GradientButton
                type="button"
                onClick={() => setActivePage('kelola-bersama')}
                variant={gateCanProceed ? 'green' : 'green-outline'}
                size="md"
                className="w-full py-2.5 px-4 font-bold text-[13px] flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {gateCanProceed ? 'done_all' : 'checklist'}
                </span>
                <span>{gateCanProceed ? 'Siap Lanjut ke Kelola Bersama' : 'Tinjau Rencana Kelola Bersama'}</span>
              </GradientButton>

              <GradientButton
                type="button"
                onClick={() => setActivePage('baca-desa')}
                variant="green-outline"
                size="md"
                className="w-full py-2.5 px-4 font-bold text-[13px] flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <span className="material-symbols-outlined text-[18px]">undo</span>
                <span>Kembali ke Diagnosis Baca Desa</span>
              </GradientButton>
            </div>

            {/* Catatan Penanggung Jawab */}
            <div className="pt-3 border-t border-[#C5CCAE] text-[11px] text-[#55633C] space-y-1">
              <div><strong>Pendamping:</strong> {activeVillage.pendampingName}</div>
              <div><strong>Pengurus:</strong> {activeVillage.pengurusName}</div>
              <div className="italic pt-1 text-[10px] text-[#6B7753]">
                *Data dan status prasyarat bersifat ilustratif untuk kebutuhan simulasi perencanaan.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Komparasi Status 3 Desa Demo (Ilustratif) */}
      <div className="rounded-[14px] bg-[#F3F5EA] border border-[#C5CCAE] p-6 shadow-xs w-full min-w-0">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h3 className="text-[16px] font-black text-[#1F2A14] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#2E7D32] text-[20px]">
              compare_arrows
            </span>
            <span>Komparasi Status Gerbang 3 Desa Binaan (Data Ilustratif)</span>
          </h3>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EAEFD9] text-[#4B5D2A]">
            Data ilustratif
          </span>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[640px] text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[#E4E8D6] text-[#6B7753] text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4 rounded-l-lg">Nama Desa</th>
                <th className="py-3 px-4">Profil Diagnosis</th>
                <th className="py-3 px-4">Status Gerbang</th>
                <th className="py-3 px-4">Saran Tindakan yang Tampil</th>
                <th className="py-3 px-4 rounded-r-lg text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C5CCAE] bg-white">
              {(Object.keys(villages) as VillageId[]).map((vId) => {
                const v = villages[vId];
                const isCurrent = vId === selectedVillageId;
                const gateInfo = calculateGateChecklist(vId);

                return (
                  <tr
                    key={vId}
                    className={`transition-colors ${
                      isCurrent ? 'bg-[#EBF7F1]/60 font-semibold' : 'hover:bg-[#FAFBF4]'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-bold text-[#1F2A14]">
                      <div className="flex items-center gap-1.5">
                        <span>{v.name}</span>
                        {isCurrent && (
                          <span className="text-[10px] bg-[#2E7D32] text-white px-1.5 py-0.2 rounded font-normal">
                            Desa Aktif
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#6B7753] block font-normal">
                        {v.connectionsKK} KK • {v.capacityKwp} kWp
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {vId === 'sumber-makmur' && (
                        <span className="text-[12px] font-semibold text-[#147A4B]">
                          Sebagian besar Siap; 2 Perlu penguatan
                        </span>
                      )}
                      {vId === 'tirta-mukti' && (
                        <span className="text-[12px] font-semibold text-[#96600E]">
                          Dimensi campuran (Siap & Perlu penguatan)
                        </span>
                      )}
                      {vId === 'karang-asri' && (
                        <span className="text-[12px] font-semibold text-[#B84A3A]">
                          Sebagian besar Belum siap
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${gateInfo.statusStyle}`}
                      >
                        {gateInfo.statusText}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-[#3A4728] max-w-xs text-[12px]">
                      {gateInfo.saranRekomendasi}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedVillageId(vId)}
                        className="text-[12px] font-bold text-[#2E7D32] hover:underline cursor-pointer"
                      >
                        {isCurrent ? 'Sedang Ditinjau' : 'Pilih Desa Ini'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Catatan Kaki Prinsip */}
      <div className="w-full text-center py-2 text-[12px] text-[#6B7753] font-medium border-t border-[#C5CCAE]/60">
        DesaWatt hanya membantu menyajikan sinyal dan bahan telaah. Keputusan akhir sepenuhnya ada pada musyawarah desa, pengurus koperasi, dan pendamping.
      </div>

      {/* Modal Cetak Laporan PDF */}
      <CetakLaporanModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        villageId={selectedVillageId}
      />
    </div>
  );
};
