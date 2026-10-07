import React from 'react';
import { useDesaWatt, INDICATOR_CONFIGS } from '../context/DesaWattContext';
import { VillageId } from '../types';

interface CetakLaporanModalProps {
  isOpen: boolean;
  onClose: () => void;
  villageId?: VillageId;
}

export const CetakLaporanModal: React.FC<CetakLaporanModalProps> = ({
  isOpen,
  onClose,
  villageId,
}) => {
  const { villages, activeVillage, selectedVillageId, calculateGateChecklist } = useDesaWatt();

  if (!isOpen) return null;

  const targetVillageId = villageId || selectedVillageId;
  const village = villages[targetVillageId] || activeVillage;
  const score = Object.values(village.indicators).reduce((a, b) => a + b, 0);
  const readinessLevel = score <= 60 ? 'Rendah' : score <= 90 ? 'Menengah' : 'Tinggi';

  const recModel =
    score >= 91
      ? 'Milik Koperasi Penuh'
      : score >= 61
      ? 'Kemitraan (JV BUMDes / Swasta)'
      : 'EaaS (Energy-as-a-Service)';

  const gateInfo = calculateGateChecklist(targetVillageId);

  // Lowest indicators
  const sortedIndicators = [...INDICATOR_CONFIGS].sort((a, b) => {
    return village.indicators[a.key] - village.indicators[b.key];
  });
  const lowestTwo = sortedIndicators.slice(0, 2);

  // Unpassed gate requirements list
  const unpassedRequirements: string[] = [];
  if (score < 61) {
    unpassedRequirements.push(`Skor minimal belum mencapai ambang kelayakan microgrid (Saat ini ${score}/120, minimal 61 poin).`);
  }
  if (!village.musdesApproved) {
    unpassedRequirements.push('Berita Acara Musyawarah Desa (Musdes Khusus) belum ditandatangani dan disahkan oleh BPD & Kepala Desa.');
  }
  if (!village.pendampingAssigned) {
    unpassedRequirements.push('Tenaga pendamping teknis lapangan bersertifikasi belum ditugaskan secara resmi oleh Dinas.');
  }
  if (village.saldoDanaOMJuta <= 0) {
    unpassedRequirements.push('Rekening cadangan operasional & pemeliharaan (dana O&M) belum dialokasikan.');
  }

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto print:p-0 print:bg-white print:static print:inset-auto">
      {/* Container wrapper */}
      <div className="relative w-full max-w-4xl bg-white text-[#0F172A] rounded-2xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none print:w-full print:max-w-none print:m-0">
        {/* Screen-only top action bar */}
        <div className="no-print bg-[#3F4E2C] text-[#F7F8EE] px-6 py-3 flex items-center justify-between border-b border-[#323E23]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">print</span>
            <span className="font-bold text-[14px]">Pratinjau Laporan Kesiapan PLTS Desa (Siap Cetak A4)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-lg bg-[#E0A526] hover:bg-[#C9911D] text-[#1F2A14] font-black text-[13px] flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#F7F8EE] font-bold text-[13px] transition-colors cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>

        {/* PRINTABLE A4 CONTENT */}
        <div className="p-6 sm:p-8 bg-white print:p-0 print:m-0 print:text-[11px] text-[12px] leading-relaxed">
          {/* Header Lembaga & Label Konseptual */}
          <div className="border-b-2 border-[#1F2A14] pb-4 mb-4 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#3F4E2C] text-[#F7F8EE] flex items-center justify-center font-black text-[20px] shrink-0 print:border print:border-black">
                DW
              </div>
              <div>
                <h1 className="text-[18px] sm:text-[20px] font-black text-[#1F2A14] tracking-tight uppercase leading-tight">
                  LAPORAN DIAGNOSTIK KESIAPAN PLTS KOMUNAL DESA
                </h1>
                <p className="text-[12px] text-[#475569] font-medium">
                  Kerangka Tata Kelola Koperasi Desa Merah Putih • Kab. Mukomuko, Bengkulu
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="inline-block px-2.5 py-1 rounded-md bg-[#FAFBF4] border border-[#CBD5E1] text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                Data simulasi - prototipe konseptual
              </span>
              <p className="text-[11px] text-[#64748B] mt-1">Tanggal Cetak: {currentDate}</p>
            </div>
          </div>

          {/* Desa Profile & Summary Score Card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] mb-4 print:bg-white print:border-black">
            <div>
              <span className="text-[10px] font-bold text-[#64748B] uppercase block">Nama Desa</span>
              <span className="text-[14px] font-black text-[#0F172A] block">{village.name}</span>
              <span className="text-[11px] text-[#475569]">{village.subdistrict}, {village.regency}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#64748B] uppercase block">Total Skor Kesiapan</span>
              <span className="text-[18px] font-black text-[#147A4B] block">{score} / 120</span>
              <span className="text-[11px] font-bold text-[#334155]">Level {readinessLevel}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#64748B] uppercase block">Model Rekomendasi</span>
              <span className="text-[13px] font-bold text-[#0F172A] block leading-snug">{recModel}</span>
              <span className="text-[10px] text-[#64748B]">{score >= 91 ? 'Skor ≥ 91' : score >= 61 ? 'Skor ≥ 61' : 'Skor < 61'}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#64748B] uppercase block">Status Gerbang SPK</span>
              <span className="text-[12px] font-bold text-[#0F172A] block leading-snug">{gateInfo.statusText}</span>
              <span className="text-[10px] text-[#64748B]">Validasi: {gateInfo.passedCount}/{gateInfo.totalCount} Syarat</span>
            </div>
          </div>

          {/* Table 8 Indicators */}
          <div className="mb-4">
            <h2 className="text-[13px] font-black uppercase tracking-wider text-[#1F2A14] mb-2 flex items-center justify-between border-b pb-1">
              <span>1. Rincian Penilaian 8 Indikator Kesiapan (Baca Desa)</span>
              <span className="text-[10px] font-normal text-[#64748B]">Total Maksimal: 120 Poin</span>
            </h2>

            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#F1F5F9] text-[#475569] uppercase font-bold text-[10px] border-y border-[#CBD5E1]">
                  <th className="py-1.5 px-2 w-8">No</th>
                  <th className="py-1.5 px-2">Indikator Kesiapan</th>
                  <th className="py-1.5 px-2">Dimensi</th>
                  <th className="py-1.5 px-2 text-center w-20">Skor (5/10/15)</th>
                  <th className="py-1.5 px-2">Keterangan Kondisi Lapangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {INDICATOR_CONFIGS.map((ind) => {
                  const val = village.indicators[ind.key];
                  const opt = ind.options[val];
                  return (
                    <tr key={ind.key}>
                      <td className="py-1 px-2 font-bold text-[#64748B]">{ind.number}</td>
                      <td className="py-1 px-2 font-bold text-[#0F172A]">{ind.name}</td>
                      <td className="py-1 px-2 text-[#64748B]">{ind.category}</td>
                      <td className="py-1 px-2 text-center font-black">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          val === 15
                            ? 'bg-[#E2F0E4] text-[#27602C]'
                            : val === 10
                            ? 'bg-[#F6E7BD] text-[#825708]'
                            : 'bg-[#F9DFDC] text-[#8B281B]'
                        }`}>
                          {val} / 15
                        </span>
                      </td>
                      <td className="py-1 px-2 text-[#334155]">{opt.desc}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 2 Column: Lowest Indicators & Unpassed Gate Requirements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* Box 1: Indikator Penahan Skor */}
            <div className="p-3 rounded-xl border border-[#FCDCA7] bg-[#FEF6E9] print:bg-white print:border-black">
              <h3 className="text-[12px] font-black text-[#96600E] uppercase tracking-wider mb-1.5">
                2. Indikator Penahan Skor (Prioritas Pembinaan)
              </h3>
              <div className="space-y-2">
                {lowestTwo.map((item) => (
                  <div key={item.key} className="text-[11px]">
                    <div className="font-bold text-[#0F172A]">
                      • {item.name} ({village.indicators[item.key]}/15):
                    </div>
                    <div className="text-[#475569] pl-2.5">
                      Rekomendasi: {item.recommendationIfLow}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Box 2: Status Gerbang & Syarat Belum Lulus */}
            <div className="p-3 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] print:bg-white print:border-black">
              <h3 className="text-[12px] font-black text-[#1F2A14] uppercase tracking-wider mb-1.5">
                3. Status Gerbang Keputusan & Syarat Belum Lulus
              </h3>
              {unpassedRequirements.length === 0 ? (
                <div className="text-[11px] text-[#147A4B] font-bold">
                  ✓ Seluruh syarat gerbang keputusan telah terpenuhi lengkap. Rekomendasi penerbitan Surat Perintah Kerja (SPK) siap diproses.
                </div>
              ) : (
                <ul className="space-y-1.5 text-[11px] text-[#334155]">
                  {unpassedRequirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#D64545] font-black shrink-0">✕</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Signatures & Legal Disclaimer */}
          <div className="pt-4 border-t border-[#CBD5E1] grid grid-cols-3 gap-4 text-center text-[11px] mt-6">
            <div>
              <p className="text-[#64748B] mb-8">Disusun Oleh (Pengurus Koperasi):</p>
              <p className="font-bold text-[#0F172A] underline">{village.pengurusName}</p>
              <p className="text-[10px] text-[#64748B]">Koperasi Desa Merah Putih</p>
            </div>
            <div>
              <p className="text-[#64748B] mb-8">Diverifikasi Oleh (Pendamping Teknis):</p>
              <p className="font-bold text-[#0F172A] underline">{village.pendampingName}</p>
              <p className="text-[10px] text-[#64748B]">Tenaga Pendamping Lapangan</p>
            </div>
            <div>
              <p className="text-[#64748B] mb-8">Mengetahui (Pemerintah Desa):</p>
              <p className="font-bold text-[#0F172A] underline">Kepala Desa {village.name}</p>
              <p className="text-[10px] text-[#64748B]">Kec. {village.subdistrict}</p>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-4 pt-2 border-t border-[#E2E8F0] text-center text-[10px] text-[#64748B]">
            Dokumen dihasilkan secara otomatis oleh sistem DesaWatt • Horison 2026 • Label simulasi: <strong>Data simulasi - prototipe konseptual</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CetakLaporanModal;
