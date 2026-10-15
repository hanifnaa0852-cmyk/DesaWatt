import React, { useState } from 'react';
import { useDesaWatt } from '../context/DesaWattContext';
import { GlowingMetricCard } from '@/components/ui/GlowingMetricCard';
import { GradientButton } from '@/components/ui/gradient-button';
import { BelajarEnergiStage, KelompokPelatihan, PelatihanKelompokItem } from '../types';

export const BelajarEnergi: React.FC = () => {
  const {
    activeVillage,
    updateBelajarEnergi,
    setActivePage,
    setIsPublicPortal,
  } = useDesaWatt();

  const data = activeVillage.belajarEnergi || {
    currentStage: 3 as BelajarEnergiStage,
    pelatihanList: [
      {
        id: 'PEL-1',
        kelompok: 'Rumah Tangga' as KelompokPelatihan,
        jumlahPeserta: 78,
        hasilPreTest: '38% (Pemahaman etika beban & keselamatan dasar rendah)',
        hasilPostTest: '89% (Paham etika beban malam & pemilihan lampu LED)',
        tindakLanjut: 'Terjadwal' as const,
        catatanTindakLanjut: 'Pemeriksaan acak MCB rumah dan pembagian stiker etika beban.',
      },
      {
        id: 'PEL-2',
        kelompok: 'Operator' as KelompokPelatihan,
        jumlahPeserta: 3,
        hasilPreTest: '46% (Pengalaman terbatas genset solar manual)',
        hasilPostTest: '94% (Lulus uji SOP baterai, inverter, & keselamatan K3)',
        tindakLanjut: 'Terjadwal' as const,
        catatanTindakLanjut: 'Pencatatan logsheet bus voltage dan perawatan filter inverter harian.',
      },
      {
        id: 'PEL-3',
        kelompok: 'Pengurus Koperasi' as KelompokPelatihan,
        jumlahPeserta: 12,
        hasilPreTest: '52% (Pembukuan kas manual buku tulis sederhana)',
        hasilPostTest: '90% (Menguasai rekening escrow sinking fund baterai)',
        tindakLanjut: 'Terjadwal' as const,
        catatanTindakLanjut: 'Laporan keuangan bulanan kas O&M ditempel di papan balai desa.',
      },
      {
        id: 'PEL-4',
        kelompok: 'Pelaku Usaha' as KelompokPelatihan,
        jumlahPeserta: 24,
        hasilPreTest: '41% (Cenderung menyalakan mesin produktif malam hari)',
        hasilPostTest: '88% (Komitmen disiplin shift operasi siang 09:30-13:30)',
        tindakLanjut: 'Terjadwal' as const,
        catatanTindakLanjut: 'Penjadwalan operasi mesin giling kopi dan pompa air terkoordinasi.',
      },
      {
        id: 'PEL-5',
        kelompok: 'Pemuda' as KelompokPelatihan,
        jumlahPeserta: 32,
        hasilPreTest: '43% (Belum paham bahaya tegangan DC tinggi)',
        hasilPostTest: '91% (Terlatih tim siaga tanggap ranting & evakuasi darurat)',
        tindakLanjut: 'Terjadwal' as const,
        catatanTindakLanjut: 'Patroli berkala jalur kabel udara dusun menjelang musim angin.',
      },
      {
        id: 'PEL-6',
        kelompok: 'Kelompok Perempuan' as KelompokPelatihan,
        jumlahPeserta: 48,
        hasilPreTest: '44% (Khawatir listrik padam mendadak merusak kulkas)',
        hasilPostTest: '92% (Menguasai pembagian beban rumah tangga & usaha kue)',
        tindakLanjut: 'Terjadwal' as const,
        catatanTindakLanjut: 'Kader posyandu memantau kulkas vaksin dan keluhan layanan warga.',
      },
    ],
  };

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleStageChange = (stage: BelajarEnergiStage) => {
    updateBelajarEnergi(activeVillage.id, { currentStage: stage });
    triggerToast(`Tahap pembelajaran diperbarui ke Tahap ${stage}`);
  };

  const handleUpdateItem = (id: string, updates: Partial<PelatihanKelompokItem>) => {
    const updatedList = data.pelatihanList.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
    updateBelajarEnergi(activeVillage.id, { pelatihanList: updatedList });
    triggerToast('Data pelatihan diperbarui');
  };

  // 4 Tahap Pembelajaran sebagai Stepper
  const stagesConfig: { stage: BelajarEnergiStage; title: string; subtitle: string; icon: string }[] = [
    {
      stage: 1,
      title: 'Baseline',
      subtitle: 'Pemetaan Kebutuhan & Asesmen Awal Literasi Warga',
      icon: 'assignment',
    },
    {
      stage: 2,
      title: 'Pembelajaran Berbasis Kasus',
      subtitle: 'Studi Masalah PLTS Mangkrak & Solusi Komunal',
      icon: 'auto_stories',
    },
    {
      stage: 3,
      title: 'Praktik',
      subtitle: 'Simulasi Alat, Uji MCB, Logsheet & Keselamatan K3',
      icon: 'handyman',
    },
    {
      stage: 4,
      title: 'Tindak Lanjut',
      subtitle: 'Evaluasi Berkala 3-6 Bulan & Audit Lapangan',
      icon: 'update',
    },
  ];

  const totalPesertaSemuaKelompok = data.pelatihanList.reduce(
    (acc, curr) => acc + (curr.jumlahPeserta || 0),
    0
  );

  const totalKK = activeVillage.connectionsKK || 240;
  const persenKK = Math.round((totalPesertaSemuaKelompok / totalKK) * 100); // 82%

  const totalKelompokSudahTindakLanjut = data.pelatihanList.filter(
    (i) => i.tindakLanjut === 'Sudah'
  ).length;

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-16 text-[#3A4728] min-w-0">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#4B5D2A] text-[#F7F8EE] px-4 py-2.5 rounded-xl shadow-lg border border-[#C5CCAE] text-[12px] font-bold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span className="material-symbols-outlined text-[18px] text-[#A6C98A]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="rounded-[14px] bg-gradient-to-r from-[#4B5D2A] via-[#556930] to-[#5E7336] border border-[#5E7336] p-6 md:p-8 shadow-md text-[#F7F8EE]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#F6E7BD] text-[#825708] border border-[#EED38A]">
                Proses Pendampingan
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FAFBF4] text-[#4B5D2A] border border-[#C5CCAE]">
                Komponen 2 • Belajar Energi
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FAFBF4]/20 text-[#FAFBF4] border border-[#FAFBF4]/30">
                Akses: Pendamping & Pengurus Koperasi
              </span>
              <span className="text-[11px] text-[#D4DCBC]">
                Desa: {activeVillage.name}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAFBF4]/20 text-[#FAFBF4] border border-[#FAFBF4]/30 font-semibold">
                Data ilustratif
              </span>
            </div>

            <h1 className="text-[24px] sm:text-[28px] font-black text-[#F7F8EE] tracking-tight leading-tight">
              Belajar Energi: Pelatihan Literasi Komunal & Pengukuran Kapasitas
            </h1>
            <p className="text-[13px] sm:text-[14px] text-[#F7F8EE]/90 max-w-3xl leading-relaxed">
              Meningkatkan kapasitas praktis warga desa dalam memahami sistem kelistrikan surya, etika beban, keselamatan instalasi, dan pengelolaan iuran tanpa target penurunan konsumsi buatan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <GradientButton
              onClick={() => setIsPublicPortal(true)}
              variant="green-outline"
              size="sm"
              className="inline-flex items-center gap-1.5 font-bold text-[12px] bg-[#FAFBF4] text-[#1F2A14]"
            >
              <span className="material-symbols-outlined text-[16px] text-[#E0A526]">public</span>
              <span>Lihat di Portal Warga</span>
            </GradientButton>

            <GradientButton
              onClick={() => setActivePage('baca-desa')}
              variant="green"
              size="sm"
              className="inline-flex items-center gap-1.5 font-bold text-[12px]"
            >
              <span>Lanjut ke Baca Desa</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </GradientButton>
          </div>
        </div>

        {/* Civic Principle Ribbon */}
        <div className="mt-4 pt-3 border-t border-white/20 text-[12px] text-[#F6E7BD] flex items-center gap-2 font-medium">
          <span className="material-symbols-outlined text-[16px] text-[#E0A526]">school</span>
          <span>Prinsip: Kapasitas lokal tumbuh lewat praktik; fokus pada pemahaman dan keselamatan; tidak ada target penurunan konsumsi listrik.</span>
        </div>
      </div>

      {/* STEPPER: 4 TAHAP PEMBELAJARAN */}
      <div className="bg-[#F3F5EA] p-6 rounded-[14px] border border-[#C5CCAE] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
          <div>
            <h3 className="text-[16px] font-extrabold text-[#1F2A14] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4B5D2A] text-[20px]">stairs</span>
              <span>Stepper 4 Tahap Pembelajaran Kapasitas Komunal</span>
            </h3>
            <p className="text-[12px] text-[#6B7753]">
              Pilih atau perbarui posisi tahapan pembelajaran saat ini di desa dampingan.
            </p>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FAFBF4] border border-[#C5CCAE] text-[#4B5D2A] self-start sm:self-auto">
            Tahap Aktif: {stagesConfig.find((s) => s.stage === data.currentStage)?.title}
          </span>
        </div>

        {/* Stepper Navigation Visual */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {stagesConfig.map((item) => {
            const isCurrent = data.currentStage === item.stage;
            const isPassed = data.currentStage > item.stage;
            return (
              <button
                key={item.stage}
                type="button"
                onClick={() => handleStageChange(item.stage)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between gap-3 relative ${
                  isCurrent
                    ? 'bg-[#FAFBF4] border-2 border-[#4B5D2A] shadow-md ring-2 ring-[#4B5D2A]/20'
                    : isPassed
                    ? 'bg-[#E4E8D6]/80 border-[#C5CCAE] hover:bg-[#FAFBF4]'
                    : 'bg-[#FAFBF4]/50 border-[#C5CCAE]/80 opacity-75 hover:opacity-100 hover:bg-[#FAFBF4]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-[12px] ${
                        isCurrent
                          ? 'bg-[#4B5D2A] text-[#FAFBF4]'
                          : isPassed
                          ? 'bg-[#27602C] text-[#FAFBF4]'
                          : 'bg-[#C5CCAE] text-[#3A4728]'
                      }`}
                    >
                      {isPassed ? (
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      ) : (
                        item.stage
                      )}
                    </span>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#6B7753]">
                      Tahap {item.stage}
                    </span>
                  </div>

                  <span
                    className={`material-symbols-outlined text-[19px] ${
                      isCurrent ? 'text-[#4B5D2A]' : isPassed ? 'text-[#27602C]' : 'text-[#6B7753]'
                    }`}
                  >
                    {item.icon}
                  </span>
                </div>

                <div>
                  <h4 className="text-[13.5px] font-black text-[#1F2A14] leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#6B7753] mt-1 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                {isCurrent && (
                  <div className="pt-1">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-[#E4E8D6] text-[#4B5D2A] border border-[#C5CCAE]">
                      ● Sedang Berjalan
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* RINGKASAN METRIK PELATIHAN (TANPA ANGKA PENURUNAN LISTRIK ATAU TARGET DAMPAK) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <GlowingMetricCard>
          <div className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7753]">
                Kelompok Sasaran Terlibat
              </span>
              <span className="w-8 h-8 rounded-lg bg-[#E4E8D6] text-[#4B5D2A] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">groups_3</span>
              </span>
            </div>
            <div className="text-[26px] font-black text-[#1F2A14]">
              {data.pelatihanList.length} <span className="text-[14px] text-[#6B7753] font-bold">Kelompok</span>
            </div>
            <p className="text-[11px] text-[#3A4728] mt-1 leading-relaxed">
              Mencakup rumah tangga, operator, pengurus koperasi, pelaku usaha, pemuda, dan perempuan.
            </p>
          </div>
        </GlowingMetricCard>

        <GlowingMetricCard>
          <div className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7753]">
                Total Peserta Terlatih
              </span>
              <span className="w-8 h-8 rounded-lg bg-[#E2F0E4] text-[#27602C] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
              </span>
            </div>
            <div className="text-[26px] font-black text-[#27602C]">
              {totalPesertaSemuaKelompok} <span className="text-[14px] text-[#6B7753] font-bold">Warga ({persenKK}% KK)</span>
            </div>
            <p className="text-[11px] text-[#3A4728] mt-1 leading-relaxed">
              Peserta yang menyelesaikan sesi pengukuran pre-test dan evaluasi post-test.
            </p>
          </div>
        </GlowingMetricCard>

        <GlowingMetricCard>
          <div className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7753]">
                Status Tindak Lanjut 3-6 Bulan
              </span>
              <span className="w-8 h-8 rounded-lg bg-[#F6E7BD] text-[#825708] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">event_repeat</span>
              </span>
            </div>
            <div className="text-[26px] font-black text-[#825708]">
              {totalKelompokSudahTindakLanjut} / {data.pelatihanList.length}{' '}
              <span className="text-[14px] font-bold text-[#825708]">Kelompok</span>
            </div>
            <p className="text-[11px] text-[#3A4728] mt-1 leading-relaxed">
              Terjadwal setelah Tahap 3 selesai
            </p>
          </div>
        </GlowingMetricCard>
      </div>

      {/* TABEL PELATIHAN PER KELOMPOK */}
      <div className="bg-[#F3F5EA] p-6 rounded-[14px] border border-[#C5CCAE] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#C5CCAE]">
          <div>
            <h3 className="text-[16px] font-extrabold text-[#1F2A14] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4B5D2A] text-[20px]">table_chart</span>
              <span>Tabel Pelatihan per Kelompok Sasaran Desa</span>
            </h3>
            <p className="text-[12px] text-[#6B7753]">
              Pengurus dan Pendamping dapat memperbarui jumlah peserta, hasil asesmen, dan status tindak lanjut secara manual.
            </p>
          </div>
          <span className="text-[10.5px] px-2.5 py-1 rounded bg-[#FAFBF4] border border-[#C5CCAE] text-[#6B7753] font-bold">
            Data ilustratif • Bebas target numerik konsumsi
          </span>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-xl border border-[#C5CCAE] bg-[#FAFBF4]">
          <table className="w-full text-left text-[12.5px] border-collapse min-w-[950px]">
            <thead>
              <tr className="bg-[#E4E8D6] text-[#1F2A14] font-black text-[12px] border-b border-[#C5CCAE]">
                <th className="py-3 px-3.5 w-[160px]">Kelompok Sasaran</th>
                <th className="py-3 px-3.5 w-[90px] text-center">Jumlah Peserta</th>
                <th className="py-3 px-3.5 min-w-[240px]">Hasil Pre-Test</th>
                <th className="py-3 px-3.5 min-w-[240px]">Hasil Post-Test</th>
                <th className="py-3 px-3.5 w-[150px] text-center">Tindak Lanjut 3-6 Bln</th>
                <th className="py-3 px-3.5 min-w-[240px]">Catatan Tindak Lanjut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C5CCAE]">
              {data.pelatihanList.map((item) => (
                <tr key={item.id} className="hover:bg-[#F3F5EA]/60 transition-colors">
                  {/* Kelompok */}
                  <td className="py-3 px-3.5 font-bold text-[#1F2A14] align-top">
                    <div className="flex items-center gap-2 pt-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#4B5D2A] shrink-0"></span>
                      <span>{item.kelompok}</span>
                    </div>
                  </td>

                  {/* Jumlah Peserta */}
                  <td className="py-3 px-3.5 text-center align-top">
                    <input
                      type="number"
                      min="0"
                      value={item.jumlahPeserta}
                      onChange={(e) =>
                        handleUpdateItem(item.id, {
                          jumlahPeserta: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-16 p-1.5 rounded-lg border border-[#C5CCAE] bg-[#F3F5EA] text-center font-bold text-[#1F2A14] mt-0.5"
                    />
                  </td>

                  {/* Hasil Pre-Test (Wrap text, tooltip on hover) */}
                  <td className="py-3 px-3.5 align-top">
                    <textarea
                      rows={2}
                      title={item.hasilPreTest}
                      value={item.hasilPreTest}
                      onChange={(e) =>
                        handleUpdateItem(item.id, {
                          hasilPreTest: e.target.value,
                        })
                      }
                      className="w-full p-2 rounded-lg border border-[#C5CCAE] bg-[#F3F5EA] text-[12px] text-[#1F2A14] font-medium leading-relaxed whitespace-normal break-words resize-y"
                    />
                  </td>

                  {/* Hasil Post-Test (Wrap text, tooltip on hover) */}
                  <td className="py-3 px-3.5 align-top">
                    <textarea
                      rows={2}
                      title={item.hasilPostTest}
                      value={item.hasilPostTest}
                      onChange={(e) =>
                        handleUpdateItem(item.id, {
                          hasilPostTest: e.target.value,
                        })
                      }
                      className="w-full p-2 rounded-lg border border-[#C5CCAE] bg-[#F3F5EA] text-[12px] text-[#1F2A14] font-medium leading-relaxed whitespace-normal break-words resize-y"
                    />
                  </td>

                  {/* Tindak Lanjut 3-6 Bulan */}
                  <td className="py-3 px-3.5 text-center align-top">
                    <select
                      value={item.tindakLanjut}
                      onChange={(e) =>
                        handleUpdateItem(item.id, {
                          tindakLanjut: e.target.value as 'Belum dilakukan' | 'Sudah' | 'Terjadwal',
                        })
                      }
                      className={`p-1.5 rounded-lg text-[11px] font-extrabold border cursor-pointer mt-0.5 ${
                        item.tindakLanjut === 'Sudah'
                          ? 'bg-[#E2F0E4] text-[#27602C] border-[#C2E0C5]'
                          : item.tindakLanjut === 'Terjadwal'
                          ? 'bg-[#FEF6E9] text-[#96600E] border-[#FCDCA7]'
                          : 'bg-[#F9DFDC] text-[#8B281B] border-[#ECAAA4]'
                      }`}
                    >
                      <option value="Terjadwal">Terjadwal</option>
                      <option value="Sudah">Sudah</option>
                      <option value="Belum dilakukan">Belum dilakukan</option>
                    </select>
                  </td>

                  {/* Catatan Tindak Lanjut (Wrap text, tooltip on hover) */}
                  <td className="py-3 px-3.5 align-top">
                    <textarea
                      rows={2}
                      title={item.catatanTindakLanjut || ''}
                      value={item.catatanTindakLanjut || ''}
                      onChange={(e) =>
                        handleUpdateItem(item.id, {
                          catatanTindakLanjut: e.target.value,
                        })
                      }
                      placeholder="Catatan pendampingan lanjutan..."
                      className="w-full p-2 rounded-lg border border-[#C5CCAE] bg-[#F3F5EA] text-[11.5px] text-[#3A4728] leading-relaxed whitespace-normal break-words resize-y"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="p-5 rounded-[14px] bg-[#FAFBF4] border border-[#C5CCAE] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-[12px] text-[#6B7753] space-y-0.5">
          <div className="flex items-center gap-1.5 font-bold text-[#1F2A14]">
            <span className="material-symbols-outlined text-[#4C9A52] text-[16px]">check_circle</span>
            <span>Data Belajar Energi Tersimpan di State Lokal</span>
          </div>
          <p>
            Hasil pre/post test dan status tindak lanjut dapat ditinjau di <strong>Baca Desa</strong> dan <strong>Portal Warga</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActivePage('dengar-warga')}
            className="px-4 py-2.5 rounded-xl border border-[#4B5D2A] text-[#4B5D2A] text-[13px] font-bold hover:bg-[#E4E8D6] cursor-pointer transition-all"
          >
            Kembali ke Dengar Warga
          </button>
          <GradientButton
            onClick={() => setActivePage('baca-desa')}
            variant="green"
            size="md"
            className="inline-flex items-center gap-2 font-bold text-[13px]"
          >
            <span>Lanjut ke Baca Desa</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </GradientButton>
        </div>
      </div>
    </div>
  );
};
