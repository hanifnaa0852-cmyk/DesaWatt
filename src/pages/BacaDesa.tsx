import React, { useState } from 'react';
import { useDesaWatt, DIMENSION_CONFIGS } from '../context/DesaWattContext';
import {
  VillageId,
  DimensionKey,
  DimensionStatus,
  EvidenceStatus,
  DimensionState,
  VillageData,
} from '../types';
import { GlowingMetricCard } from '@/components/ui/GlowingMetricCard';
import { GradientButton } from '@/components/ui/gradient-button';
import { CetakLaporanModal } from '../components/CetakLaporanModal';

export const BacaDesa: React.FC = () => {
  const {
    activeVillage,
    selectedVillageId,
    setSelectedVillageId,
    villages,
    updateDimension,
    readinessLevel,
    lowestDimensions,
    setActivePage,
    addNewVillage,
  } = useDesaWatt();

  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isNewVillageModalOpen, setIsNewVillageModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'semua' | DimensionStatus>('semua');

  // State untuk form "Nilai Profil Desa Baru"
  const [newVillageName, setNewVillageName] = useState('');
  const [newVillageSubdistrict, setNewVillageSubdistrict] = useState('');
  const [newVillageRegency, setNewVillageRegency] = useState('');
  const [newVillageProvince, setNewVillageProvince] = useState('');
  const [newVillageDimensions, setNewVillageDimensions] = useState<
    Record<DimensionKey, DimensionState>
  >({
    potensi_teknis: { status: 'Perlu penguatan', verificationStatus: 'Belum diverifikasi', notes: '' },
    kebutuhan_penggunaan: { status: 'Perlu penguatan', verificationStatus: 'Belum diverifikasi', notes: '' },
    literasi_kapasitas: { status: 'Belum siap', verificationStatus: 'Belum diverifikasi', notes: '' },
    partisipasi_inklusi: { status: 'Perlu penguatan', verificationStatus: 'Belum diverifikasi', notes: '' },
    kelembagaan: { status: 'Belum siap', verificationStatus: 'Belum diverifikasi', notes: '' },
    kelayakan_ekonomi: { status: 'Perlu penguatan', verificationStatus: 'Belum diverifikasi', notes: '' },
    keberlanjutan_om: { status: 'Belum siap', verificationStatus: 'Belum diverifikasi', notes: '' },
    data_akuntabilitas: { status: 'Perlu penguatan', verificationStatus: 'Belum diverifikasi', notes: '' },
  });

  // Hitung jumlah dimensi per status kualitatif
  const currentDimensions = activeVillage?.dimensions || ({} as Record<DimensionKey, DimensionState>);
  const allDimensionEntries = DIMENSION_CONFIGS.map((cfg) => ({
    cfg,
    state: currentDimensions[cfg.key] || {
      status: 'Belum siap' as DimensionStatus,
      verificationStatus: 'Belum diverifikasi' as EvidenceStatus,
      notes: '',
    },
  }));

  const countSiap = allDimensionEntries.filter((d) => d.state.status === 'Siap').length;
  const countPerluPenguatan = allDimensionEntries.filter((d) => d.state.status === 'Perlu penguatan').length;
  const countBelumSiap = allDimensionEntries.filter((d) => d.state.status === 'Belum siap').length;
  const countTerverifikasi = allDimensionEntries.filter(
    (d) => d.state.verificationStatus === 'Terverifikasi lapangan'
  ).length;

  const filteredEntries =
    filterStatus === 'semua'
      ? allDimensionEntries
      : allDimensionEntries.filter((d) => d.state.status === filterStatus);

  const getStatusColorConfig = (status: DimensionStatus) => {
    switch (status) {
      case 'Siap':
        return {
          bgBadge: 'bg-[#EBF7F1] text-[#147A4B] border-[#C1E7D4]',
          barColor: 'bg-[#2E7D32]',
          ringColor: 'border-[#2E7D32]',
          labelColor: 'text-[#147A4B]',
          cardBorder: 'border-l-4 border-l-[#2E7D32]',
          stepActive: 3,
        };
      case 'Perlu penguatan':
        return {
          bgBadge: 'bg-[#FEF6E9] text-[#96600E] border-[#FCDCA7]',
          barColor: 'bg-[#D97706]',
          ringColor: 'border-[#D97706]',
          labelColor: 'text-[#96600E]',
          cardBorder: 'border-l-4 border-l-[#D97706]',
          stepActive: 2,
        };
      case 'Belum siap':
      default:
        return {
          bgBadge: 'bg-[#FDF2F2] text-[#B84A3A] border-[#F8C3C3]',
          barColor: 'bg-[#C2410C]',
          ringColor: 'border-[#C2410C]',
          labelColor: 'text-[#B84A3A]',
          cardBorder: 'border-l-4 border-l-[#C2410C]',
          stepActive: 1,
        };
    }
  };

  const handleCreateVillage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVillageName.trim()) return;

    const newId: VillageId = `desa-${Date.now().toString().slice(-4)}`;
    const newVillageObj: VillageData = {
      id: newId,
      name: newVillageName.trim(),
      subdistrict: newVillageSubdistrict.trim() || 'Kecamatan Percontohan',
      regency: newVillageRegency.trim() || 'Kabupaten Energi',
      province: newVillageProvince.trim() || 'Indonesia',
      capacityKwp: 40,
      batteryKwh: 75,
      connectionsKK: 120,
      dimensions: newVillageDimensions,
      prerequisites: {
        keselamatan_instalasi: { checked: false, evidenceNote: '' },
        proses_partisipasi: { checked: false, evidenceNote: '' },
        rencana_om: { checked: false, evidenceNote: '' },
        penanggung_jawab_operasi: { checked: false, evidenceNote: '' },
        perlindungan_kelompok_rentan: { checked: false, evidenceNote: '' },
      },
      saranRekomendasi: 'Pendampingan diagnosis awal; lengkapi survei partisipatif warga.',
      statusPLTS: 'Waspada',
      statusDescription: 'Tahap inisiasi profil diagnosis desa baru.',
      productionTodayKwh: 0,
      collectionRatePercent: 0,
      saldoDanaOMJuta: 0,
      pengurusName: 'Pengurus Koperasi Desa',
      pendampingName: 'Pendamping Desa',
      technicianName: 'Calon Teknisi',
      technicianPhone: '-',
      targetBatteryFundJuta: 120,
      musdesApproved: false,
      pendampingAssigned: true,
    };

    addNewVillage(newVillageObj);
    setIsNewVillageModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12 text-[#3A4728] min-w-0">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 w-full min-w-0">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#E4E8D6] text-[#4B5D2A] border border-[#C5CCAE]">
              Komponen 3 • Baca Desa
            </span>
            <span className="text-[#C5CCAE]">•</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E8F0FE] text-[#1E3A8A] border border-[#BFDBFE]">
              Didukung sistem
            </span>
            <span className="text-[#C5CCAE]">•</span>
            <span className="px-2 py-0.5 rounded-sm text-[10px] font-bold bg-[#F1F3E9] text-[#6B7753] border border-[#D5DCBF]">
              Data ilustratif
            </span>
          </div>
          <h1 className="text-[26px] sm:text-[28px] font-extrabold text-[#1F2A14] tracking-tight leading-tight">
            Baca Desa: Profil Diagnosis & Daftar Kesenjangan
          </h1>
          <p className="text-[13px] font-semibold text-[#4B5D2A] mt-0.5">
            Hasil Baca Desa adalah PROFIL DIAGNOSIS kualitatif, BUKAN satu angka total dan BUKAN penerimaan/penolakan sepihak.
          </p>
          <p className="text-[14px] text-[#4A5736] mt-1 max-w-3xl leading-relaxed">
            Menyajikan peta kesiapan sosial-teknis pada 8 dimensi utama. DesaWatt hanya membantu menyajikan sinyal;
            status tiap dimensi diperiksa dan diperbarui manual oleh pendamping dan pengurus desa. Keputusan akhir
            sepenuhnya berada pada warga dan musyawarah desa.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <GradientButton
            onClick={() => {
              setNewVillageName('');
              setNewVillageSubdistrict('');
              setNewVillageRegency('');
              setNewVillageProvince('');
              setIsNewVillageModalOpen(true);
            }}
            variant="green"
            size="md"
            className="inline-flex items-center gap-2 cursor-pointer shadow-xs text-[13px] py-2.5 px-4 font-bold"
            title="Tambah profil diagnosis desa baru"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Nilai Desa Baru</span>
          </GradientButton>

          <GradientButton
            onClick={() => setIsPrintModalOpen(true)}
            variant="green-outline"
            size="md"
            className="inline-flex items-center gap-2 cursor-pointer shadow-xs text-[13px] py-2.5 px-4 font-bold"
            title="Buka laporan format cetak A4 1 halaman"
          >
            <span className="material-symbols-outlined text-[18px] text-[#4B5D2A]">print</span>
            <span>Cetak Profil PDF</span>
          </GradientButton>

          <GradientButton
            onClick={() => setActivePage('gerbang-keputusan')}
            variant="green"
            size="md"
            className="inline-flex items-center gap-2 font-bold text-[13px] shadow-sm cursor-pointer group py-2.5 px-4"
          >
            <span>Gerbang Keputusan</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </GradientButton>
        </div>
      </div>

      {/* Village Switcher Pills */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#F3F5EA] border border-[#C5CCAE] rounded-xl p-3 shadow-xs">
        <div className="flex items-center gap-2 text-[12px] font-bold text-[#4B5D2A]">
          <span className="material-symbols-outlined text-[18px] text-[#2E7D32]">location_city</span>
          <span>Pilih Desa Binaan:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {(Object.keys(villages) as VillageId[]).map((vId) => {
            const v = villages[vId];
            const isSelected = vId === selectedVillageId;
            const values = Object.values(v.dimensions || {});
            const readyCount = values.filter((d) => d.status === 'Siap').length;
            const gapCount = values.filter((d) => d.status !== 'Siap').length;

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
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#E4E8D6] text-[#4B5D2A]'
                  }`}
                >
                  {readyCount} Siap • {gapCount} Kesenjangan
                </span>
                <span className="text-[9px] uppercase tracking-wider px-1 py-0.2 rounded bg-black/10">
                  Data ilustratif
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero Overview: Profil Diagnosis Kualitatif 8 Dimensi (Bukan Angka Total) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        {/* Kolom 1: Status Proporsi 8 Dimensi (Bar Horizontal 3 Tingkat) */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-[#C5CCAE] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7753]">
                  Diagnosis 8 Dimensi Desa
                </span>
                <h2 className="text-[18px] font-black text-[#1F2A14] mt-0.5">
                  Profil Kesiapan: {activeVillage.name}
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-semibold text-[#6B7753]">Tingkat Kesiapan Umum:</span>
                <span
                  className={`px-2.5 py-1 rounded-full text-[12px] font-extrabold border ${
                    readinessLevel === 'Tinggi'
                      ? 'bg-[#EBF7F1] text-[#147A4B] border-[#C1E7D4]'
                      : readinessLevel === 'Menengah'
                      ? 'bg-[#FEF6E9] text-[#96600E] border-[#FCDCA7]'
                      : 'bg-[#FDF2F2] text-[#B84A3A] border-[#F8C3C3]'
                  }`}
                >
                  {readinessLevel}
                </span>
              </div>
            </div>

            <p className="text-[13px] text-[#4A5736] mb-4 leading-relaxed">
              Peta kesiapan komprehensif tanpa pembobotan sepihak. Menyoroti dimensi yang sudah matang
              dan dimensi yang membutuhkan pendampingan lapangan sebelum musyawarah desa mengambil keputusan.
            </p>

            {/* Bagan Proporsi Batang Horizontal Berwarna 3 Tingkat */}
            <div className="p-4 rounded-xl bg-[#F8F9F3] border border-[#E0E5D0] mb-4">
              <div className="flex items-center justify-between text-[12px] font-bold mb-2">
                <span className="text-[#3A4728]">Distribusi 8 Dimensi Sosial-Teknis</span>
                <span className="text-[11px] font-semibold text-[#6B7753]">Total: 8 Dimensi</span>
              </div>

              {/* Batang Tersegmentasi Horizontal */}
              <div className="w-full h-5 rounded-full overflow-hidden flex bg-[#EAEFD9] p-0.5 border border-[#D0D7BA]">
                {countSiap > 0 && (
                  <div
                    style={{ width: `${(countSiap / 8) * 100}%` }}
                    className="h-full bg-[#2E7D32] rounded-l-full transition-all duration-500 flex items-center justify-center text-[10px] text-white font-bold"
                    title={`${countSiap} Dimensi Siap`}
                  >
                    {countSiap}
                  </div>
                )}
                {countPerluPenguatan > 0 && (
                  <div
                    style={{ width: `${(countPerluPenguatan / 8) * 100}%` }}
                    className="h-full bg-[#D97706] transition-all duration-500 flex items-center justify-center text-[10px] text-white font-bold"
                    title={`${countPerluPenguatan} Dimensi Perlu Penguatan`}
                  >
                    {countPerluPenguatan}
                  </div>
                )}
                {countBelumSiap > 0 && (
                  <div
                    style={{ width: `${(countBelumSiap / 8) * 100}%` }}
                    className="h-full bg-[#C2410C] rounded-r-full transition-all duration-500 flex items-center justify-center text-[10px] text-white font-bold"
                    title={`${countBelumSiap} Dimensi Belum Siap`}
                  >
                    {countBelumSiap}
                  </div>
                )}
              </div>

              {/* Legenda 3 Tingkat */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#E5EAD5] text-center">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#147A4B]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32]"></span>
                    <span>Siap ({countSiap})</span>
                  </div>
                  <span className="text-[10px] text-[#6B7753] mt-0.5">Bukti memadai</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#96600E]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]"></span>
                    <span>Perlu Penguatan ({countPerluPenguatan})</span>
                  </div>
                  <span className="text-[10px] text-[#6B7753] mt-0.5">Butuh pendampingan</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#B84A3A]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C2410C]"></span>
                    <span>Belum Siap ({countBelumSiap})</span>
                  </div>
                  <span className="text-[10px] text-[#6B7753] mt-0.5">Desain ulang/awal</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#55633C] pt-2 border-t border-[#F0F3E7]">
            <span>Status Verifikasi: <strong>{countTerverifikasi} dari 8</strong> dimensi terverifikasi lapangan</span>
            <span className="italic">Pembaruan manual oleh pengguna</span>
          </div>
        </div>

        {/* Kolom 2: Catatan Prinsip & Ringkasan Aksi */}
        <div className="rounded-2xl bg-[#F3F5EA] border border-[#C5CCAE] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#2E7D32] text-[20px]">psychology_alt</span>
              <h3 className="text-[15px] font-black text-[#1F2A14]">
                Prinsip Diagnostik DesaWatt
              </h3>
            </div>

            <p className="text-[12px] text-[#4A5736] leading-relaxed mb-3">
              DesaWatt hanya menyajikan sinyal diagnostik untuk melengkapi musyawarah warga. Sistem menyarankan langkah penguatan agar perencanaan transparan dan berkeadilan.
            </p>

            <div className="space-y-2 mb-4">
              <div className="p-2.5 rounded-lg bg-white border border-[#D5DCBF] text-[12px]">
                <div className="font-extrabold text-[#2E7D32] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">groups</span>
                  <span>Warga Ikut Menentukan</span>
                </div>
                <p className="text-[11px] text-[#55633C] mt-0.5">
                  Hasil diagnosis dibawa ke forum Dengar Warga dan Musdes sebagai materi diskusi, bukan keputusan final.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white border border-[#D5DCBF] text-[12px]">
                <div className="font-extrabold text-[#D97706] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">build_circle</span>
                  <span>Teknologi Mengikuti Kebutuhan</span>
                </div>
                <p className="text-[11px] text-[#55633C] mt-0.5">
                  Kapasitas panel surya dan baterai disesuaikan dengan kurva beban produktif dan kemampuan bayar nyata warga.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#EAEFD9] border border-[#C5CCAE] text-[11px] text-[#4B5D2A] flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#2E7D32]">info</span>
            <span>
              Saran: Tutup seluruh kesenjangan melalui modul <strong>Dengar Warga</strong> dan <strong>Belajar Energi</strong> sebelum melangkah ke Gerbang Keputusan.
            </span>
          </div>
        </div>
      </div>

      {/* Bagian 1: 8 Dimensi Diagnosis Kualitatif (Pemeriksaan Manual Dropdown) */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-[20px] font-black text-[#1F2A14] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#2E7D32] text-[22px]">checklist</span>
              <span>8 Dimensi Diagnosis Kesiapan Sosial-Teknis</span>
            </h2>
            <p className="text-[13px] text-[#55633C]">
              Ubah status kualitatif dan status verifikasi bukti secara manual lewat dropdown di bawah ini sesuai fakta lapangan.
            </p>
          </div>

          {/* Filter Status */}
          <div className="flex items-center gap-1.5 bg-[#F3F5EA] p-1 rounded-lg border border-[#C5CCAE] shrink-0">
            <span className="text-[11px] font-bold text-[#6B7753] px-2">Filter:</span>
            {(['semua', 'Siap', 'Perlu penguatan', 'Belum siap'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                  filterStatus === st
                    ? 'bg-[#2E7D32] text-white shadow-xs'
                    : 'text-[#4B5D2A] hover:bg-[#E4E8D6]'
                }`}
              >
                {st === 'semua' ? 'Semua (8)' : st}
              </button>
            ))}
          </div>
        </div>

        {/* Grid 8 Kartu Dimensi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEntries.map(({ cfg, state }) => {
            const colors = getStatusColorConfig(state.status);
            const isVerified = state.verificationStatus === 'Terverifikasi lapangan';

            return (
              <div
                key={cfg.key}
                className={`rounded-xl bg-white border border-[#D5DCBF] ${colors.cardBorder} p-4 sm:p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow`}
              >
                <div>
                  {/* Top Bar Dimensi: Nomor, Judul, Status Kualitatif */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-[#F1F3E9] text-[#4B5D2A] text-[11px] font-black flex items-center justify-center border border-[#D1D8BE]">
                        {cfg.number}
                      </span>
                      <h3 className="text-[15px] font-black text-[#1F2A14] leading-snug">
                        {cfg.title}
                      </h3>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border shrink-0 ${colors.bgBadge}`}
                    >
                      {state.status}
                    </span>
                  </div>

                  {/* Visual 3-Level Step Indicator Bar */}
                  <div className="grid grid-cols-3 gap-1 my-2.5">
                    <div
                      className={`h-1.5 rounded-full ${
                        colors.stepActive >= 1 ? 'bg-[#C2410C]' : 'bg-[#EAEFD9]'
                      }`}
                      title="Tingkat 1: Belum Siap"
                    />
                    <div
                      className={`h-1.5 rounded-full ${
                        colors.stepActive >= 2 ? 'bg-[#D97706]' : 'bg-[#EAEFD9]'
                      }`}
                      title="Tingkat 2: Perlu Penguatan"
                    />
                    <div
                      className={`h-1.5 rounded-full ${
                        colors.stepActive >= 3 ? 'bg-[#2E7D32]' : 'bg-[#EAEFD9]'
                      }`}
                      title="Tingkat 3: Siap"
                    />
                  </div>

                  {/* Bukti Minimum yang Perlu Diperiksa (Mandatori Prompt 3A) */}
                  <div className="p-2.5 rounded-lg bg-[#F8F9F4] border border-[#E3E8D3] mb-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#4B5D2A] mb-0.5">
                      <span className="material-symbols-outlined text-[15px] text-[#2E7D32]">verified</span>
                      <span>Satu Kalimat Bukti Minimum:</span>
                    </div>
                    <p className="text-[12px] font-semibold text-[#1F2A14] leading-relaxed">
                      Bukti: {cfg.evidenceMinimum}
                    </p>
                  </div>

                  {/* Deskripsi Aspek */}
                  <p className="text-[12px] text-[#55633C] leading-relaxed mb-3">
                    {cfg.description}
                  </p>

                  {/* Catatan Lapangan Aktif */}
                  {state.notes && (
                    <div className="p-2.5 rounded-md bg-[#FFFBEB] border border-[#FDE68A] text-[11px] text-[#92400E] mb-3 flex items-start gap-1.5">
                      <span className="material-symbols-outlined text-[15px] text-[#D97706] shrink-0 mt-0.5">edit_note</span>
                      <span><strong>Catatan lapangan:</strong> {state.notes}</span>
                    </div>
                  )}
                </div>

                {/* Dropdown Kontrol Manual oleh Pengguna (Pendamping / Pengurus) */}
                <div className="pt-3 border-t border-[#EAEFD9] mt-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#6B7753] mb-1.5">
                    <span>Perbarui Status (Manual):</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-extrabold border ${
                        isVerified
                          ? 'bg-[#EBF7F1] text-[#147A4B] border-[#C1E7D4]'
                          : 'bg-[#FEF6E9] text-[#96600E] border-[#FCDCA7]'
                      }`}
                    >
                      {state.verificationStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {/* Dropdown 1: Status Kualitatif Dimensi */}
                    <div>
                      <label className="block text-[10px] font-semibold text-[#6B7753] mb-0.5">
                        Status Kesiapan:
                      </label>
                      <select
                        value={state.status}
                        onChange={(e) =>
                          updateDimension(selectedVillageId, cfg.key, {
                            status: e.target.value as DimensionStatus,
                          })
                        }
                        className="w-full text-[12px] font-bold py-1.5 px-2 rounded-lg bg-white border border-[#C5CCAE] text-[#1F2A14] focus:outline-hidden focus:ring-2 focus:ring-[#2E7D32] cursor-pointer"
                      >
                        <option value="Siap">Siap (Hijau)</option>
                        <option value="Perlu penguatan">Perlu penguatan (Amber)</option>
                        <option value="Belum siap">Belum siap (Bata)</option>
                      </select>
                    </div>

                    {/* Dropdown 2: Status Verifikasi Bukti */}
                    <div>
                      <label className="block text-[10px] font-semibold text-[#6B7753] mb-0.5">
                        Status Bukti:
                      </label>
                      <select
                        value={state.verificationStatus}
                        onChange={(e) =>
                          updateDimension(selectedVillageId, cfg.key, {
                            verificationStatus: e.target.value as EvidenceStatus,
                          })
                        }
                        className="w-full text-[12px] font-bold py-1.5 px-2 rounded-lg bg-white border border-[#C5CCAE] text-[#1F2A14] focus:outline-hidden focus:ring-2 focus:ring-[#2E7D32] cursor-pointer"
                      >
                        <option value="Terverifikasi lapangan">Terverifikasi lapangan</option>
                        <option value="Belum diverifikasi">Belum diverifikasi</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bagian 2: Daftar Kesenjangan yang Perlu Ditutup (Otomatis dari Dimensi yang bukan "Siap") */}
      <div className="rounded-2xl bg-white border border-[#C5CCAE] p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#EAEFD9]">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#D97706] text-[24px]">assignment_late</span>
              <h2 className="text-[18px] sm:text-[20px] font-black text-[#1F2A14]">
                Daftar Kesenjangan yang Perlu Ditutup
              </h2>
            </div>
            <p className="text-[13px] text-[#55633C] mt-0.5">
              Otomatis dihasilkan dari dimensi yang berstatus <strong>Perlu penguatan</strong> atau <strong>Belum siap</strong> pada {activeVillage.name}.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[12px] font-extrabold bg-[#FEF6E9] text-[#96600E] border border-[#FCDCA7]">
              {lowestDimensions.length} Kesenjangan Terdeteksi
            </span>
          </div>
        </div>

        {lowestDimensions.length === 0 ? (
          <div className="p-6 rounded-xl bg-[#EBF7F1] border border-[#C1E7D4] text-center flex flex-col items-center">
            <span className="material-symbols-outlined text-[36px] text-[#147A4B] mb-2">check_circle</span>
            <h3 className="text-[16px] font-extrabold text-[#147A4B]">
              Seluruh 8 Dimensi Berada pada Status Siap!
            </h3>
            <p className="text-[13px] text-[#3D5A45] mt-1 max-w-xl">
              Desa {activeVillage.name} telah memiliki bukti memadai pada seluruh dimensi.
              Pastikan verifikasi lapangan tetap diperbarui dan bawa dokumen pendukung ke Gerbang Keputusan.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {lowestDimensions.map((cfg) => {
              const state = currentDimensions[cfg.key];
              const isBelumSiap = state?.status === 'Belum siap';

              return (
                <div
                  key={cfg.key}
                  className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                    isBelumSiap
                      ? 'bg-[#FEF2F2] border-[#FCA5A5]'
                      : 'bg-[#FFFBEB] border-[#FDE68A]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-7 h-7 rounded-lg text-[12px] font-black flex items-center justify-center shrink-0 mt-0.5 ${
                        isBelumSiap ? 'bg-[#EF4444] text-white' : 'bg-[#D97706] text-white'
                      }`}
                    >
                      {cfg.number}
                    </span>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-[15px] font-black text-[#1F2A14]">
                          {cfg.title}
                        </h4>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border ${
                            isBelumSiap
                              ? 'bg-white text-[#B84A3A] border-[#F8C3C3]'
                              : 'bg-white text-[#96600E] border-[#FCDCA7]'
                          }`}
                        >
                          Status: {state?.status || 'Belum siap'}
                        </span>
                        <span className="text-[11px] text-[#6B7753]">
                          • Bukti minimum: {cfg.evidenceMinimum}
                        </span>
                      </div>

                      <p className="text-[12px] text-[#4A5736] mt-1 leading-relaxed">
                        <strong>Rekomendasi Tindakan Lapangan:</strong> {cfg.gapActionSuggestion}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    <button
                      onClick={() => {
                        // Tautan kontekstual ke modul pendampingan
                        if (cfg.key === 'partisipasi_inklusi' || cfg.key === 'kebutuhan_penggunaan') {
                          setActivePage('dengar-warga');
                        } else if (cfg.key === 'literasi_kapasitas') {
                          setActivePage('belajar-energi');
                        } else if (cfg.key === 'kelayakan_ekonomi' || cfg.key === 'keberlanjutan_om') {
                          setActivePage('rancang-watt');
                        } else {
                          setActivePage('kelola-bersama');
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white border border-[#C5CCAE] text-[#2E7D32] hover:bg-[#F3F5EA] text-[12px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    >
                      <span>Mulai Pendampingan</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Nilai Profil Desa Baru */}
      {isNewVillageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-[#C5CCAE] my-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAEFD9] mb-4">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F1F3E9] text-[#6B7753] border border-[#D5DCBF] uppercase">
                  Data ilustratif
                </span>
                <h3 className="text-[18px] font-black text-[#1F2A14] mt-1">
                  Tambah Profil Diagnosis Desa Baru
                </h3>
              </div>
              <button
                onClick={() => setIsNewVillageModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 text-gray-500"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateVillage} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#3A4728] mb-1">
                    Nama Desa:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Desa Sinar Harapan"
                    value={newVillageName}
                    onChange={(e) => setNewVillageName(e.target.value)}
                    className="w-full text-[13px] px-3 py-2 rounded-lg border border-[#C5CCAE] focus:ring-2 focus:ring-[#2E7D32] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#3A4728] mb-1">
                    Kecamatan:
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Kec. Rimbo Bujang"
                    value={newVillageSubdistrict}
                    onChange={(e) => setNewVillageSubdistrict(e.target.value)}
                    className="w-full text-[13px] px-3 py-2 rounded-lg border border-[#C5CCAE] focus:ring-2 focus:ring-[#2E7D32] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#3A4728] mb-1">
                    Kabupaten:
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Kab. Tebo"
                    value={newVillageRegency}
                    onChange={(e) => setNewVillageRegency(e.target.value)}
                    className="w-full text-[13px] px-3 py-2 rounded-lg border border-[#C5CCAE] focus:ring-2 focus:ring-[#2E7D32] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#3A4728] mb-1">
                    Provinsi:
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Jambi"
                    value={newVillageProvince}
                    onChange={(e) => setNewVillageProvince(e.target.value)}
                    className="w-full text-[13px] px-3 py-2 rounded-lg border border-[#C5CCAE] focus:ring-2 focus:ring-[#2E7D32] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-[13px] font-bold text-[#1F2A14] mb-2 pt-2 border-t border-[#EAEFD9]">
                  Penetapan Status 8 Dimensi Awal (Kualitatif):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                  {DIMENSION_CONFIGS.map((cfg) => (
                    <div key={cfg.key} className="p-2 rounded-lg bg-[#F8F9F3] border border-[#E0E5D0]">
                      <div className="text-[11px] font-bold text-[#1F2A14] truncate mb-1">
                        {cfg.number}. {cfg.title}
                      </div>
                      <select
                        value={newVillageDimensions[cfg.key]?.status || 'Perlu penguatan'}
                        onChange={(e) =>
                          setNewVillageDimensions((prev) => ({
                            ...prev,
                            [cfg.key]: {
                              status: e.target.value as DimensionStatus,
                              verificationStatus: 'Belum diverifikasi',
                            },
                          }))
                        }
                        className="w-full text-[11px] py-1 px-1.5 rounded bg-white border border-[#C5CCAE]"
                      >
                        <option value="Siap">Siap</option>
                        <option value="Perlu penguatan">Perlu penguatan</option>
                        <option value="Belum siap">Belum siap</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#EAEFD9]">
                <button
                  type="button"
                  onClick={() => setIsNewVillageModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#C5CCAE] text-[12px] font-bold text-[#55633C] hover:bg-gray-50"
                >
                  Batal
                </button>
                <GradientButton type="submit" variant="green" size="md">
                  Simpan & Tampilkan Profil
                </GradientButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Cetak Laporan PDF */}
      <CetakLaporanModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
      />
    </div>
  );
};
