import React, { useState } from 'react';
import { useDesaWatt } from '../context/DesaWattContext';
import { GlowingMetricCard } from '@/components/ui/GlowingMetricCard';
import { GradientButton } from '@/components/ui/gradient-button';
import { MasukanDesainItem } from '../types';

export const DengarWarga: React.FC = () => {
  const {
    activeVillage,
    updateDengarWarga,
    setActivePage,
    setIsPublicPortal,
  } = useDesaWatt();

  const data = activeVillage.dengarWarga || {
    tanggal: '18 Januari 2026',
    jumlahHadir: 142,
    kehadiranKategori: {
      perempuan: 58,
      pemuda: 40,
      kelompokRentan: 18,
      pelakuUsaha: 26,
    },
    daftarPrioritas: [
      '1. Penerangan rumah tangga & darurat poskesdes malam hari (18:00 - 06:00)',
      '2. Pompa air bersih desa & kulkas vaksin Poskesdes (08:00 - 11:30)',
      '3. Sentra pengolahan kopi & mesin jahit UMKM komunal perempuan (09:00 - 14:00)',
      '4. Penerangan jalan lingkungan balai dusun',
    ],
    hambatanAkses: [
      'Jarak kabel ke RT 03 Dusun Barat melintasi lereng bukit rawan dahan tumbang',
      '14 KK lansia tunggal dan prasejahtera kesulitan biaya pasang instalasi awal',
      'Sentra pengeringan emping dan kopi memerlukan stabilitas tegangan siang hari',
    ],
    masukanMengubahDesain: [
      {
        id: 'MMD-1',
        masukan:
          'Kelompok perempuan meminta jadwal listrik pompa air dimajukan pukul 08:00-11:30 agar tidak bertubrukan dengan jam memasak dan aktivitas rumah tangga.',
        perubahanDesain:
          'Pengaturan timer otomatis pompa air di gardu disetel aktif pukul 08:00 - 11:30 saat produksi surya melimpah.',
        pengusul: 'Ibu Fatimah (Kader Posyandu & Pengrajin Kopi)',
      },
      {
        id: 'MMD-2',
        masukan:
          'Warga Dusun Barat meminta tiang jaringan tidak memotong kebun warga melainkan mengikuti jalur jalan setapak desa.',
        perubahanDesain:
          'Trase tiang distribusi digeser 35 meter mengikuti jalan desa dengan penambahan 2 tiang baja galvanis.',
        pengusul: 'Pak Syamsul (Tokoh Warga Dusun Barat)',
      },
      {
        id: 'MMD-3',
        masukan:
          'Pengurus koperasi dan kader mengusulkan subsidi silang iuran untuk 14 KK lansia dan prasejahtera.',
        perubahanDesain:
          'Ditetapkan kuota beban dasar 150 VA dengan tarif afirmasi subsidi silang dari kas bagi hasil unit produktif koperasi.',
        pengusul: 'Ibu Nurbaiti (Koperasi Merah Putih)',
      },
    ],
    isuBelumTerselesaikan: [
      'Penetapan sanksi sosial/denda bagi warga yang mencoba memotong segel MCB pembatas daya.',
      'SOP genset darurat cadangan jika terjadi musim hujan dan cuaca mendung beruntun lebih dari 3 hari.',
    ],
  };

  // State untuk form penambahan interaktif
  const [newPrioritas, setNewPrioritas] = useState('');
  const [newHambatan, setNewHambatan] = useState('');
  const [newIsu, setNewIsu] = useState('');
  const [newPengusul, setNewPengusul] = useState('');
  const [newMasukan, setNewMasukan] = useState('');
  const [newPerubahan, setNewPerubahan] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  const showNotification = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleUpdateBasic = (field: string, value: any) => {
    updateDengarWarga(activeVillage.id, {
      [field]: value,
    });
    showNotification();
  };

  const handleUpdateKategori = (kategori: 'perempuan' | 'pemuda' | 'kelompokRentan' | 'pelakuUsaha', val: number) => {
    const updated = {
      ...data.kehadiranKategori,
      [kategori]: Math.max(0, val),
    };
    const totalCount = updated.perempuan + updated.pemuda + updated.kelompokRentan + updated.pelakuUsaha;
    updateDengarWarga(activeVillage.id, {
      kehadiranKategori: updated,
      jumlahHadir: totalCount > data.jumlahHadir ? totalCount : data.jumlahHadir,
    });
    showNotification();
  };

  const handleAddPrioritas = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrioritas.trim()) return;
    const nextList = [...data.daftarPrioritas, `${data.daftarPrioritas.length + 1}. ${newPrioritas.trim()}`];
    updateDengarWarga(activeVillage.id, { daftarPrioritas: nextList });
    setNewPrioritas('');
    showNotification();
  };

  const handleRemovePrioritas = (index: number) => {
    const nextList = data.daftarPrioritas.filter((_, idx) => idx !== index);
    updateDengarWarga(activeVillage.id, { daftarPrioritas: nextList });
    showNotification();
  };

  const handleMovePrioritas = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= data.daftarPrioritas.length) return;
    const items = [...data.daftarPrioritas];
    const temp = items[index];
    items[index] = items[targetIdx];
    items[targetIdx] = temp;
    updateDengarWarga(activeVillage.id, { daftarPrioritas: items });
    showNotification();
  };

  const handleAddHambatan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHambatan.trim()) return;
    const nextList = [...data.hambatanAkses, newHambatan.trim()];
    updateDengarWarga(activeVillage.id, { hambatanAkses: nextList });
    setNewHambatan('');
    showNotification();
  };

  const handleRemoveHambatan = (index: number) => {
    const nextList = data.hambatanAkses.filter((_, idx) => idx !== index);
    updateDengarWarga(activeVillage.id, { hambatanAkses: nextList });
    showNotification();
  };

  const handleAddMasukanDesain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMasukan.trim() || !newPerubahan.trim()) return;
    const newItem: MasukanDesainItem = {
      id: `MMD-${Date.now()}`,
      pengusul: newPengusul.trim() || 'Warga Musyawarah',
      masukan: newMasukan.trim(),
      perubahanDesain: newPerubahan.trim(),
    };
    const nextList = [...data.masukanMengubahDesain, newItem];
    updateDengarWarga(activeVillage.id, { masukanMengubahDesain: nextList });
    setNewPengusul('');
    setNewMasukan('');
    setNewPerubahan('');
    showNotification();
  };

  const handleRemoveMasukanDesain = (id: string) => {
    const nextList = data.masukanMengubahDesain.filter((item) => item.id !== id);
    updateDengarWarga(activeVillage.id, { masukanMengubahDesain: nextList });
    showNotification();
  };

  const handleAddIsu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIsu.trim()) return;
    const nextList = [...data.isuBelumTerselesaikan, newIsu.trim()];
    updateDengarWarga(activeVillage.id, { isuBelumTerselesaikan: nextList });
    setNewIsu('');
    showNotification();
  };

  const handleRemoveIsu = (index: number) => {
    const nextList = data.isuBelumTerselesaikan.filter((_, idx) => idx !== index);
    updateDengarWarga(activeVillage.id, { isuBelumTerselesaikan: nextList });
    showNotification();
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-16 text-[#3A4728] min-w-0">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#4B5D2A] text-[#F7F8EE] px-4 py-2.5 rounded-xl shadow-lg border border-[#C5CCAE] text-[12px] font-bold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span className="material-symbols-outlined text-[18px] text-[#A6C98A]">check_circle</span>
          <span>Perubahan musyawarah tersimpan di state lokal</span>
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
                Komponen 1 • Dengar Warga
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
              Dengar Warga: Pencatatan Musyawarah & Masukan Desain
            </h1>
            <p className="text-[13px] sm:text-[14px] text-[#F7F8EE]/90 max-w-3xl leading-relaxed">
              Formulir musyawarah untuk menggali kebutuhan riil warga, menghimpun hambatan akses kelompok rentan, serta mendokumentasikan masukan warga yang secara nyata mengubah rancangan teknis dan tata kelola PLTS desa.
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
          <span className="material-symbols-outlined text-[16px] text-[#E0A526]">verified</span>
          <span>Prinsip: Warga ikut menentukan; teknologi mengikuti kebutuhan; tidak ada keputusan otomatis oleh sistem.</span>
        </div>
      </div>

      {/* CALLOUT PENANDA MANDATRI */}
      <div className="rounded-[14px] bg-[#F6E7BD] border-2 border-[#E0A526] p-5 shadow-sm flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-[#FAFBF4] text-[#825708] border border-[#EED38A] flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[24px] text-[#E0A526]">campaign</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10.5px] uppercase font-black px-2 py-0.5 rounded bg-[#825708] text-[#FAFBF4]">
              Penanda Prinsip Partisipasi
            </span>
            <span className="text-[11px] text-[#825708] font-bold">Wajib Diperhatikan Pendamping & Pengurus</span>
          </div>
          <h2 className="text-[16px] sm:text-[17px] font-black text-[#825708] leading-tight">
            &ldquo;Kehadiran saja tidak cukup; catat masukan mana yang mengubah desain.&rdquo;
          </h2>
          <p className="text-[12.5px] text-[#7A4F06] leading-relaxed">
            Kehadiran fisik dalam musyawarah tidak membuktikan partisipasi yang bermakna. Form ini mewajibkan pendamping dan pengurus mencatat bukti konkret: masukan warga mana yang mengubah tata letak tiang, penyesuaian daya listrik, jam operasional pompa, atau perlindungan tarif bagi kelompok rentan.
          </p>
        </div>
      </div>

      {/* BAGIAN 1: FORM PENCATATAN MUSYAWARAH DASAR & KEHADIRAN */}
      <div className="bg-[#F3F5EA] p-6 rounded-[14px] border border-[#C5CCAE] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#C5CCAE]">
          <div>
            <h3 className="text-[16px] font-extrabold text-[#1F2A14] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4B5D2A] text-[20px]">event_note</span>
              <span>1. Data Musyawarah Desa & Keterwakilan Peserta</span>
            </h3>
            <p className="text-[12px] text-[#6B7753]">
              Catat waktu musyawarah dan keterwakilan ragam kelompok masyarakat (Data ilustratif).
            </p>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FAFBF4] border border-[#C5CCAE] text-[#4B5D2A] self-start sm:self-auto">
            Disimpan di state lokal
          </span>
        </div>

        {/* Input Tanggal & Total Hadir */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[12px] font-bold text-[#1F2A14] mb-1.5">
              Tanggal Musyawarah Desa
            </label>
            <input
              type="text"
              value={data.tanggal}
              onChange={(e) => handleUpdateBasic('tanggal', e.target.value)}
              placeholder="Contoh: 18 Januari 2026"
              className="w-full p-2.5 rounded-xl border border-[#C5CCAE] bg-[#FAFBF4] text-[#1F2A14] text-[13px] font-semibold focus:outline-none focus:border-[#4B5D2A]"
            />
            <p className="text-[11px] text-[#6B7753] mt-1">
              Dapat diubah langsung oleh Pendamping Desa atau Pengurus Koperasi.
            </p>
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#1F2A14] mb-1.5">
              Jumlah Warga Hadir Total (Jiwa / KK)
            </label>
            <input
              type="number"
              min="0"
              value={data.jumlahHadir}
              onChange={(e) => handleUpdateBasic('jumlahHadir', parseInt(e.target.value) || 0)}
              className="w-full p-2.5 rounded-xl border border-[#C5CCAE] bg-[#FAFBF4] text-[#1F2A14] text-[13px] font-bold focus:outline-none focus:border-[#4B5D2A]"
            />
            <p className="text-[11px] text-[#6B7753] mt-1">
              Total peserta yang mengisi daftar hadir musdes balai desa.
            </p>
          </div>
        </div>

        {/* Kategori Kehadiran */}
        <div>
          <label className="block text-[12px] font-bold text-[#1F2A14] mb-2">
            Siapa Saja yang Hadir (Kategori Keterwakilan Inklusif):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Perempuan */}
            <div className="p-4 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-[#1F2A14] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[17px] text-[#A65B2A]">female</span>
                  <span>Perempuan</span>
                </span>
                <span className="text-[11px] font-extrabold text-[#4B5D2A] px-2 py-0.5 rounded bg-[#E4E8D6]">
                  {data.jumlahHadir > 0
                    ? Math.round((data.kehadiranKategori.perempuan / data.jumlahHadir) * 100)
                    : 0}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  value={data.kehadiranKategori.perempuan}
                  onChange={(e) => handleUpdateKategori('perempuan', parseInt(e.target.value) || 0)}
                  className="w-full p-2 rounded-lg border border-[#C5CCAE] bg-[#F3F5EA] text-[#1F2A14] text-[14px] font-black text-center"
                />
                <span className="text-[12px] font-semibold text-[#6B7753]">orang</span>
              </div>
              <p className="text-[10.5px] text-[#6B7753]">Kader PKK, pengrajin, ibu rumah tangga.</p>
            </div>

            {/* Pemuda */}
            <div className="p-4 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-[#1F2A14] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[17px] text-[#27602C]">face</span>
                  <span>Pemuda</span>
                </span>
                <span className="text-[11px] font-extrabold text-[#4B5D2A] px-2 py-0.5 rounded bg-[#E4E8D6]">
                  {data.jumlahHadir > 0
                    ? Math.round((data.kehadiranKategori.pemuda / data.jumlahHadir) * 100)
                    : 0}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  value={data.kehadiranKategori.pemuda}
                  onChange={(e) => handleUpdateKategori('pemuda', parseInt(e.target.value) || 0)}
                  className="w-full p-2 rounded-lg border border-[#C5CCAE] bg-[#F3F5EA] text-[#1F2A14] text-[14px] font-black text-center"
                />
                <span className="text-[12px] font-semibold text-[#6B7753]">orang</span>
              </div>
              <p className="text-[10.5px] text-[#6B7753]">Karang taruna, calon kader teknisi.</p>
            </div>

            {/* Kelompok Rentan */}
            <div className="p-4 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-[#1F2A14] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[17px] text-[#B84A3A]">elderly</span>
                  <span>Kelompok Rentan</span>
                </span>
                <span className="text-[11px] font-extrabold text-[#4B5D2A] px-2 py-0.5 rounded bg-[#E4E8D6]">
                  {data.jumlahHadir > 0
                    ? Math.round((data.kehadiranKategori.kelompokRentan / data.jumlahHadir) * 100)
                    : 0}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  value={data.kehadiranKategori.kelompokRentan}
                  onChange={(e) => handleUpdateKategori('kelompokRentan', parseInt(e.target.value) || 0)}
                  className="w-full p-2 rounded-lg border border-[#C5CCAE] bg-[#F3F5EA] text-[#1F2A14] text-[14px] font-black text-center"
                />
                <span className="text-[12px] font-semibold text-[#6B7753]">orang</span>
              </div>
              <p className="text-[10.5px] text-[#6B7753]">Lansia, difabel, KK prasejahtera.</p>
            </div>

            {/* Pelaku Usaha */}
            <div className="p-4 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-[#1F2A14] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[17px] text-[#825708]">store</span>
                  <span>Pelaku Usaha</span>
                </span>
                <span className="text-[11px] font-extrabold text-[#4B5D2A] px-2 py-0.5 rounded bg-[#E4E8D6]">
                  {data.jumlahHadir > 0
                    ? Math.round((data.kehadiranKategori.pelakuUsaha / data.jumlahHadir) * 100)
                    : 0}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  value={data.kehadiranKategori.pelakuUsaha}
                  onChange={(e) => handleUpdateKategori('pelakuUsaha', parseInt(e.target.value) || 0)}
                  className="w-full p-2 rounded-lg border border-[#C5CCAE] bg-[#F3F5EA] text-[#1F2A14] text-[14px] font-black text-center"
                />
                <span className="text-[12px] font-semibold text-[#6B7753]">orang</span>
              </div>
              <p className="text-[10.5px] text-[#6B7753]">Petani kopi, bengkel, nelayan, warung.</p>
            </div>
          </div>
        </div>
      </div>

      {/* BAGIAN 2: DAFTAR PRIORITAS PENGGUNAAN LISTRIK (URUT) & HAMBATAN AKSES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Kolom Kiri: Daftar Prioritas Penggunaan Listrik (urut) */}
        <div className="lg:col-span-7 bg-[#F3F5EA] p-6 rounded-[14px] border border-[#C5CCAE] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#C5CCAE]">
            <div>
              <h3 className="text-[16px] font-extrabold text-[#1F2A14] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4B5D2A] text-[20px]">format_list_numbered</span>
                <span>2. Daftar Prioritas Penggunaan Listrik (Urut)</span>
              </h3>
              <p className="text-[12px] text-[#6B7753]">
                Urutan konsensus beban untuk menjaga keawetan baterai (Prioritas teratas dilayani terlebih dahulu).
              </p>
            </div>
          </div>

          {/* List Prioritas */}
          <div className="space-y-2.5">
            {data.daftarPrioritas.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] flex items-center justify-between gap-3 shadow-xs hover:border-[#4B5D2A] transition-all"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="w-7 h-7 rounded-lg bg-[#4B5D2A] text-[#FAFBF4] flex items-center justify-center font-black text-[12px] shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-[13px] font-bold text-[#1F2A14] leading-snug">
                    {item.replace(/^\d+\.\s*/, '')}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleMovePrioritas(idx, 'up')}
                    disabled={idx === 0}
                    title="Pindahkan ke atas"
                    className="p-1.5 rounded-lg border border-[#C5CCAE] hover:bg-[#E4E8D6] disabled:opacity-30 disabled:hover:bg-transparent text-[#4B5D2A] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMovePrioritas(idx, 'down')}
                    disabled={idx === data.daftarPrioritas.length - 1}
                    title="Pindahkan ke bawah"
                    className="p-1.5 rounded-lg border border-[#C5CCAE] hover:bg-[#E4E8D6] disabled:opacity-30 disabled:hover:bg-transparent text-[#4B5D2A] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemovePrioritas(idx)}
                    title="Hapus prioritas"
                    className="p-1.5 rounded-lg border border-[#ECAAA4] text-[#B84A3A] hover:bg-[#F9DFDC] cursor-pointer ml-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Form Tambah Prioritas */}
          <form onSubmit={handleAddPrioritas} className="pt-2 flex items-center gap-2">
            <input
              type="text"
              value={newPrioritas}
              onChange={(e) => setNewPrioritas(e.target.value)}
              placeholder="Tambah prioritas penggunaan listrik baru..."
              className="flex-1 p-2.5 rounded-xl border border-[#C5CCAE] bg-[#FAFBF4] text-[13px] text-[#1F2A14] font-medium focus:outline-none focus:border-[#4B5D2A]"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-[#4B5D2A] text-[#FAFBF4] text-[12.5px] font-bold hover:bg-[#3F4E2C] shrink-0 cursor-pointer flex items-center gap-1 shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Tambah</span>
            </button>
          </form>
        </div>

        {/* Kolom Kanan: Hambatan Akses yang Ditemukan */}
        <div className="lg:col-span-5 bg-[#F3F5EA] p-6 rounded-[14px] border border-[#C5CCAE] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#C5CCAE]">
            <div>
              <h3 className="text-[16px] font-extrabold text-[#1F2A14] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#B84A3A] text-[20px]">warning_amber</span>
                <span>3. Hambatan Akses yang Ditemukan</span>
              </h3>
              <p className="text-[12px] text-[#6B7753]">
                Kendala geografis, ekonomi, atau sosial yang menghalangi warga mengakses listrik.
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {data.hambatanAkses.map((hambatan, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#FAFBF4] border border-[#ECAAA4]/70 flex items-start justify-between gap-2.5 text-[12.5px]"
              >
                <div className="flex items-start gap-2 text-[#8B281B]">
                  <span className="material-symbols-outlined text-[17px] text-[#B84A3A] shrink-0 mt-0.5">
                    block
                  </span>
                  <span className="font-semibold text-[#1F2A14] leading-snug">{hambatan}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveHambatan(idx)}
                  className="text-[#6B7753] hover:text-[#B84A3A] cursor-pointer p-1"
                  title="Hapus hambatan"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            ))}
          </div>

          {/* Form Tambah Hambatan */}
          <form onSubmit={handleAddHambatan} className="pt-2 flex items-center gap-2">
            <input
              type="text"
              value={newHambatan}
              onChange={(e) => setNewHambatan(e.target.value)}
              placeholder="Catat hambatan akses warga yang ditemukan..."
              className="flex-1 p-2.5 rounded-xl border border-[#C5CCAE] bg-[#FAFBF4] text-[13px] text-[#1F2A14] font-medium focus:outline-none focus:border-[#4B5D2A]"
            />
            <button
              type="submit"
              className="px-3.5 py-2.5 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] text-[#1F2A14] text-[12.5px] font-bold hover:bg-[#E4E8D6] shrink-0 cursor-pointer"
            >
              Tambah
            </button>
          </form>
        </div>
      </div>

      {/* BAGIAN 3: MASUKAN YANG MENGUBAH DESAIN (INTI BUKTI PARTISIPASI) */}
      <div className="bg-[#F3F5EA] p-6 rounded-[14px] border border-[#C5CCAE] shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#C5CCAE]">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10.5px] font-black uppercase tracking-wider bg-[#E2F0E4] text-[#27602C] border border-[#C2E0C5]">
                Bukti Prasyarat #2 & Dimensi #4
              </span>
              <h3 className="text-[17px] font-extrabold text-[#1F2A14]">
                4. &ldquo;Masukan yang Mengubah Desain&rdquo; (Daftar Masukan & Perubahan yang Dihasilkan)
              </h3>
            </div>
            <p className="text-[12.5px] text-[#6B7753] mt-1">
              Setiap baris di bawah membuktikan masukan riil warga yang diakomodasi ke dalam revisi desain teknis, rute tiang kabel, jam operasi, atau aturan tarif komunal.
            </p>
          </div>
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#FAFBF4] border border-[#C5CCAE] text-[#4B5D2A]">
            {data.masukanMengubahDesain.length} Masukan Berdampak
          </span>
        </div>

        {/* Tabel / Kartu Perbandingan Masukan vs Perubahan */}
        <div className="grid grid-cols-1 gap-3.5">
          {data.masukanMengubahDesain.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] shadow-xs flex flex-col md:flex-row md:items-start justify-between gap-4"
            >
              {/* Sisi Masukan Warga */}
              <div className="flex-1 space-y-1.5 border-l-3 border-[#D99A1E] pl-3.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-[#F6E7BD] text-[#825708]">
                    Masukan Warga
                  </span>
                  <span className="text-[11px] font-bold text-[#6B7753]">
                    Pengusul: <strong className="text-[#1F2A14]">{item.pengusul}</strong>
                  </span>
                </div>
                <p className="text-[13px] text-[#1F2A14] font-medium leading-relaxed">
                  &ldquo;{item.masukan}&rdquo;
                </p>
              </div>

              {/* Panah Transformasi */}
              <div className="hidden md:flex items-center justify-center pt-2 text-[#4B5D2A]">
                <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
              </div>

              {/* Sisi Perubahan Desain yang Dihasilkan */}
              <div className="flex-1 space-y-1.5 border-l-3 border-[#4C9A52] pl-3.5 bg-[#E2F0E4]/40 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-[#E2F0E4] text-[#27602C] border border-[#C2E0C5]">
                    Perubahan Desain yang Dihasilkan
                  </span>
                </div>
                <p className="text-[13px] text-[#27602C] font-semibold leading-relaxed">
                  {item.perubahanDesain}
                </p>
              </div>

              {/* Tombol Hapus */}
              <div className="shrink-0 flex md:flex-col justify-end">
                <button
                  type="button"
                  onClick={() => handleRemoveMasukanDesain(item.id)}
                  title="Hapus rekaman perubahan desain ini"
                  className="p-1.5 rounded-lg border border-[#ECAAA4] text-[#B84A3A] hover:bg-[#F9DFDC] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Formulir Tambah Masukan yang Mengubah Desain */}
        <form
          onSubmit={handleAddMasukanDesain}
          className="p-4 rounded-xl bg-[#E4E8D6]/60 border border-[#C5CCAE] space-y-3"
        >
          <div className="text-[12.5px] font-black text-[#1F2A14] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#4B5D2A]">add_circle</span>
            <span>Tambah Catatan Masukan yang Mengubah Desain</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-[#1F2A14] mb-1">
                Pengusul / Kelompok Warga:
              </label>
              <input
                type="text"
                value={newPengusul}
                onChange={(e) => setNewPengusul(e.target.value)}
                placeholder="Contoh: Ibu Fatimah (PKK Dusun Barat)"
                className="w-full p-2.5 rounded-lg border border-[#C5CCAE] bg-[#FAFBF4] text-[12.5px] text-[#1F2A14] focus:outline-none focus:border-[#4B5D2A]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#1F2A14] mb-1">
                Aspirasi / Masukan Warga:
              </label>
              <input
                type="text"
                required
                value={newMasukan}
                onChange={(e) => setNewMasukan(e.target.value)}
                placeholder="Apa yang diusulkan warga?"
                className="w-full p-2.5 rounded-lg border border-[#C5CCAE] bg-[#FAFBF4] text-[12.5px] text-[#1F2A14] focus:outline-none focus:border-[#4B5D2A]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#1F2A14] mb-1">
                Perubahan Desain yang Dihasilkan:
              </label>
              <input
                type="text"
                required
                value={newPerubahan}
                onChange={(e) => setNewPerubahan(e.target.value)}
                placeholder="Perubahan teknis/aturan apa yang dibuat?"
                className="w-full p-2.5 rounded-lg border border-[#C5CCAE] bg-[#FAFBF4] text-[12.5px] text-[#1F2A14] focus:outline-none focus:border-[#4B5D2A]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#4B5D2A] text-[#FAFBF4] font-bold text-[12.5px] hover:bg-[#3F4E2C] shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">save</span>
              <span>Simpan Masukan & Perubahan Desain</span>
            </button>
          </div>
        </form>
      </div>

      {/* BAGIAN 4: ISU BELUM TERSELESAIKAN */}
      <div className="bg-[#F3F5EA] p-6 rounded-[14px] border border-[#C5CCAE] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#C5CCAE]">
          <div>
            <h3 className="text-[16px] font-extrabold text-[#1F2A14] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#E0A526] text-[20px]">pending_actions</span>
              <span>5. &ldquo;Isu Belum Terselesaikan&rdquo; (Pending untuk Musdes Lanjutan)</span>
            </h3>
            <p className="text-[12px] text-[#6B7753]">
              Catatan topik musyawarah yang belum mencapai mufakat, menjadi agenda pendampingan berikutnya.
            </p>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-[#F6E7BD] text-[#825708] border border-[#EED38A]">
            {data.isuBelumTerselesaikan.length} Isu Terbuka
          </span>
        </div>

        <div className="space-y-2.5">
          {data.isuBelumTerselesaikan.map((isu, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#FAFBF4] border border-[#EED38A] flex items-center justify-between gap-3 shadow-xs"
            >
              <div className="flex items-start gap-2.5 text-[#825708] flex-1">
                <span className="material-symbols-outlined text-[18px] text-[#E0A526] shrink-0 mt-0.5">
                  help_outline
                </span>
                <span className="text-[13px] font-semibold text-[#1F2A14] leading-relaxed">
                  {isu}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveIsu(idx)}
                className="text-[#6B7753] hover:text-[#B84A3A] p-1 cursor-pointer"
                title="Tandai telah selesai / Hapus"
              >
                <span className="material-symbols-outlined text-[17px]">close</span>
              </button>
            </div>
          ))}
        </div>

        {/* Form Tambah Isu Belum Terselesaikan */}
        <form onSubmit={handleAddIsu} className="pt-2 flex items-center gap-2">
          <input
            type="text"
            value={newIsu}
            onChange={(e) => setNewIsu(e.target.value)}
            placeholder="Tambah isu musdes yang belum terselesaikan..."
            className="flex-1 p-2.5 rounded-xl border border-[#C5CCAE] bg-[#FAFBF4] text-[13px] text-[#1F2A14] font-medium focus:outline-none focus:border-[#4B5D2A]"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] text-[#1F2A14] text-[12.5px] font-bold hover:bg-[#E4E8D6] shrink-0 cursor-pointer flex items-center gap-1 shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>Tambah Isu</span>
          </button>
        </form>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="p-5 rounded-[14px] bg-[#FAFBF4] border border-[#C5CCAE] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-[12px] text-[#6B7753] space-y-0.5">
          <div className="flex items-center gap-1.5 font-bold text-[#1F2A14]">
            <span className="material-symbols-outlined text-[#4C9A52] text-[16px]">check_circle</span>
            <span>Data Dengar Warga Tersimpan Otomatis di State Lokal</span>
          </div>
          <p>
            Ringkasan musyawarah ini dapat dilihat oleh warga melalui <strong>Portal Warga (tanpa login)</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActivePage('belajar-energi')}
            className="px-4 py-2.5 rounded-xl border border-[#4B5D2A] text-[#4B5D2A] text-[13px] font-bold hover:bg-[#E4E8D6] cursor-pointer transition-all"
          >
            Lanjut ke Belajar Energi
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
