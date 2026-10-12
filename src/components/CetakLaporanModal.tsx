import React from 'react';
import { useDesaWatt, DIMENSION_CONFIGS, PREREQUISITE_CONFIGS } from '../context/DesaWattContext';
import { VillageId } from '../types';
import { GradientButton } from '@/components/ui/gradient-button';

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
  const gateInfo = calculateGateChecklist(targetVillageId);

  // Status kualitatif 8 dimensi
  const villageDimensions = village.dimensions || {};
  const gapDimensions = DIMENSION_CONFIGS.filter(
    (cfg) => villageDimensions[cfg.key]?.status !== 'Siap'
  );

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
            <span className="font-bold text-[14px]">Pratinjau Laporan Profil Diagnosis PLTS Desa (Siap Cetak A4)</span>
          </div>
          <div className="flex items-center gap-2">
            <GradientButton
              onClick={handlePrint}
              variant="green-gold"
              size="sm"
              className="font-black text-[13px] flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
              <span>Cetak / Simpan PDF</span>
            </GradientButton>
            <GradientButton
              onClick={onClose}
              variant="green-outline"
              size="sm"
              className="font-bold text-[13px] cursor-pointer"
            >
              Tutup
            </GradientButton>
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
                  LAPORAN DIAGNOSTIK KESIAPAN & GERBANG KEPUTUSAN PLTS DESA
                </h1>
                <p className="text-[12px] text-[#475569] font-medium">
                  Kerangka Pemberdayaan Komunal DesaWatt • Tata Kelola Koperasi Desa & Warga
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="inline-block px-2.5 py-1 rounded-md bg-[#FAFBF4] border border-[#CBD5E1] text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                Data ilustratif – prototipe konseptual
              </span>
              <p className="text-[11px] text-[#64748B] mt-1">Tanggal Cetak: {currentDate}</p>
            </div>
          </div>

          {/* Desa Profile & Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] mb-4 print:bg-white print:border-black">
            <div>
              <span className="text-[10px] font-bold text-[#64748B] uppercase block">Nama Desa</span>
              <span className="text-[14px] font-black text-[#0F172A] block">{village.name}</span>
              <span className="text-[11px] text-[#475569]">{village.subdistrict}, {village.regency}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#64748B] uppercase block">Kapasitas Sistem</span>
              <span className="text-[14px] font-black text-[#147A4B] block">{village.capacityKwp} kWp / {village.batteryKwh} kWh</span>
              <span className="text-[11px] text-[#334155]">{village.connectionsKK} KK Penerima Manfaat</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#64748B] uppercase block">Status Gerbang</span>
              <span className="text-[13px] font-bold text-[#0F172A] block leading-snug">{gateInfo.statusText}</span>
              <span className="text-[10px] text-[#64748B]">{gateInfo.passedCount} dari 5 Prasyarat</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#64748B] uppercase block">Saran Rekomendasi</span>
              <span className="text-[11px] font-semibold text-[#0F172A] block leading-snug">{gateInfo.saranRekomendasi}</span>
            </div>
          </div>

          {/* Table 8 Dimensi Diagnosis */}
          <div className="mb-4">
            <h2 className="text-[13px] font-black uppercase tracking-wider text-[#1F2A14] mb-2 flex items-center justify-between border-b pb-1">
              <span>1. Profil Diagnosis 8 Dimensi Kesiapan (Baca Desa)</span>
              <span className="text-[10px] font-normal text-[#64748B]">Penilaian Kualitatif</span>
            </h2>

            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#F1F5F9] text-[#475569] uppercase font-bold text-[10px] border-y border-[#CBD5E1]">
                  <th className="py-1.5 px-2 w-8">No</th>
                  <th className="py-1.5 px-2">Dimensi Kesiapan</th>
                  <th className="py-1.5 px-2 text-center w-28">Status Dimensi</th>
                  <th className="py-1.5 px-2 text-center w-36">Status Bukti</th>
                  <th className="py-1.5 px-2">Bukti Minimum yang Diperiksa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {DIMENSION_CONFIGS.map((dim) => {
                  const state = villageDimensions[dim.key] || {
                    status: 'Belum siap',
                    verificationStatus: 'Belum diverifikasi',
                  };
                  return (
                    <tr key={dim.key}>
                      <td className="py-1 px-2 font-bold text-[#64748B]">{dim.number}</td>
                      <td className="py-1 px-2 font-bold text-[#0F172A]">{dim.title}</td>
                      <td className="py-1 px-2 text-center font-black">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] ${
                            state.status === 'Siap'
                              ? 'bg-[#E2F0E4] text-[#27602C]'
                              : state.status === 'Perlu penguatan'
                              ? 'bg-[#F6E7BD] text-[#825708]'
                              : 'bg-[#F9DFDC] text-[#8B281B]'
                          }`}
                        >
                          {state.status}
                        </span>
                      </td>
                      <td className="py-1 px-2 text-center">
                        <span className="text-[10px] text-[#475569]">
                          {state.verificationStatus}
                        </span>
                      </td>
                      <td className="py-1 px-2 text-[#334155]">{dim.evidenceMinimum}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 2 Column: Daftar Kesenjangan & 5 Prasyarat Mutlak */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* Box 1: Daftar Kesenjangan */}
            <div className="p-3 rounded-xl border border-[#FCDCA7] bg-[#FEF6E9] print:bg-white print:border-black">
              <h3 className="text-[12px] font-black text-[#96600E] uppercase tracking-wider mb-1.5">
                2. Daftar Kesenjangan yang Perlu Ditutup ({gapDimensions.length})
              </h3>
              {gapDimensions.length === 0 ? (
                <div className="text-[11px] text-[#147A4B] font-bold">
                  Seluruh 8 dimensi berada pada status Siap. Tidak ada kesenjangan kritis.
                </div>
              ) : (
                <div className="space-y-2">
                  {gapDimensions.map((item) => (
                    <div key={item.key} className="text-[11px]">
                      <div className="font-bold text-[#0F172A]">
                        • {item.title} ({villageDimensions[item.key]?.status || 'Belum siap'}):
                      </div>
                      <div className="text-[#475569] pl-2.5">
                        Tindakan: {item.gapActionSuggestion}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Box 2: 5 Prasyarat Mutlak Gerbang Keputusan */}
            <div className="p-3 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] print:bg-white print:border-black">
              <h3 className="text-[12px] font-black text-[#1F2A14] uppercase tracking-wider mb-1.5">
                3. Telaah 5 Prasyarat Mutlak Gerbang Keputusan
              </h3>
              <ul className="space-y-1.5 text-[11px] text-[#334155]">
                {PREREQUISITE_CONFIGS.map((prereq) => {
                  const state = village.prerequisites?.[prereq.id];
                  const isChecked = state?.checked;
                  return (
                    <li key={prereq.id} className="flex items-start gap-1.5">
                      <span className={isChecked ? 'text-[#147A4B] font-black' : 'text-[#D64545] font-black'}>
                        {isChecked ? '✓' : '✕'}
                      </span>
                      <div>
                        <strong>{prereq.title}</strong>
                        {state?.evidenceNote && (
                          <span className="text-[#64748B] block italic">Bukti: {state.evidenceNote}</span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
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
              <p className="text-[#64748B] mb-8">Ditinjau Oleh (Pengawas Koperasi):</p>
              <p className="font-bold text-[#0F172A] underline">Pengawas Koperasi Desa</p>
              <p className="text-[10px] text-[#64748B]">Unit Pengawasan KDKMP/BUMDes</p>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-4 pt-2 border-t border-[#E2E8F0] text-center text-[10px] text-[#64748B] leading-relaxed">
            <div>DesaWatt hanya alat bantu analisis. Keputusan akhir ditetapkan oleh musyawarah desa, pengurus koperasi, dan pendamping.</div>
            <div>Data demo bersifat ilustratif, bukan hasil pengukuran lapangan. Angka dampak akan diukur lewat pilot dan evaluasi independen.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CetakLaporanModal;
