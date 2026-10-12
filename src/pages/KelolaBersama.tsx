import React, { useState } from 'react';
import { useDesaWatt } from '../context/DesaWattContext';
import { GlowingMetricCard } from '@/components/ui/GlowingMetricCard';
import { GradientButton } from '@/components/ui/gradient-button';
import {
  OperatorTerlatih,
  SopItem,
  PembagianTanggungJawabItem,
} from '../types';

export const KelolaBersama: React.FC = () => {
  const {
    activeVillage,
    updateKelolaBersama,
    setActivePage,
    setIsPublicPortal,
  } = useDesaWatt();

  const data = activeVillage.kelolaBersama || {
    penanggungJawabOperasiNama: 'Ahmad Faisal (29 th) - Teknisi Kepala Gardu PLTS',
    operators: [
      {
        id: 'OP-1',
        nama: 'Ahmad Faisal (29 th)',
        peran: 'Teknisi Kepala Gardu PLTS',
        kontak: '0812-4411-9821',
        pelatihanSertifikasi: 'Pelatihan Sertifikasi Teknisi Komunal Kemenkop/ESDM (Level 2)',
        statusPenugasan: 'Aktif Ditugaskan' as const,
      },
      {
        id: 'OP-2',
        nama: 'Siti Rahma (26 th)',
        peran: 'Operator Logistik & Pembukuan Kas',
        kontak: '0813-8821-3450',
        pelatihanSertifikasi: 'Pelatihan Manajemen Kas & Akuntansi Koperasi Desa',
        statusPenugasan: 'Aktif Ditugaskan' as const,
      },
    ],
    sops: [
      {
        id: 'SOP-1',
        judul: 'SOP Pemantauan Harian Gardu & Tegangan Baterai',
        kategori: 'Teknis Gardu',
        status: 'Tersedia' as const,
        keterangan: 'Pencatatan logsheet pagi & sore, cek ventilasi inverter.',
      },
      {
        id: 'SOP-2',
        judul: 'SOP Pembersihan Modul Surya & Pemangkasan Ranting',
        kategori: 'Perawatan Lapangan',
        status: 'Tersedia' as const,
        keterangan: 'Pembersihan debu tiap 2 minggu dengan air bersih tanpa deterjen keras.',
      },
      {
        id: 'SOP-3',
        judul: 'SOP Penanganan Gangguan Korsleting & MCB Trip Warga',
        kategori: 'Darurat & Layanan',
        status: 'Tersedia' as const,
        keterangan: 'Waktu tanggap maksimal 2 jam setelah laporan masuk ke operator.',
      },
      {
        id: 'SOP-4',
        judul: 'SOP Pengelolaan Rekening Khusus Sinking Fund Baterai',
        kategori: 'Keuangan & Tata Kelola',
        status: 'Tersedia' as const,
        keterangan: 'Penarikan dana wajib persetujuan 2 pihak (Koperasi & BPD).',
      },
      {
        id: 'SOP-5',
        judul: 'SOP Penanganan Keluhan Warga & Keterbukaan Publik',
        kategori: 'Sosial & Pengaduan',
        status: 'Tersedia' as const,
        keterangan: 'Rekapitulasi keluhan Portal Warga diperbarui tiap minggu di balai desa.',
      },
    ],
    pembagianPeran: [
      {
        peran: 'Operator Gardu Desa',
        namaPihak: 'Ahmad Faisal & Tim Teknisi',
        tanggungJawabUtama:
          'Operasional harian gardu, logsheet baterai, penanganan gangguan rumah warga, dan keselamatan teknis.',
      },
      {
        peran: 'Pengurus Koperasi Desa',
        namaPihak: 'Pengurus Koperasi Merah Putih',
        tanggungJawabUtama:
          'Penagihan iuran warga, penyetoran dana sinking fund ke rekening escrow, belanja suku cadang rutin.',
      },
      {
        peran: 'Pendamping Desa',
        namaPihak: 'Ir. Hendra Wijaya',
        tanggungJawabUtama:
          'Fasilitasi musyawarah, audit berkala catatan teknis, pendampingan uji kapasitas warga.',
      },
    ],
    statusPembukuan: 'Tertib & Terbuka' as const,
    catatanPembukuan:
      'Buku kas iuran warga tercatat rapi, saldo dana O&M cadangan baterai Rp 46 Juta di rekening bank BNI Desa.',
    kontrakLayanan: 'Tersedia & Berlaku' as const,
    catatanKontrak:
      'Perjanjian Kerja Bersama Operasional PLTS antara Koperasi Desa dan Pemerintah Desa disahkan Akta Notaris No. 14/2025.',
  };

  const [activeTab, setActiveTab] = useState<'operator' | 'sop' | 'tanggungjawab' | 'keuangan'>('operator');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form input untuk operator baru
  const [newOpNama, setNewOpNama] = useState('');
  const [newOpPeran, setNewOpPeran] = useState('');
  const [newOpKontak, setNewOpKontak] = useState('');
  const [newOpSertifikasi, setNewOpSertifikasi] = useState('');
  const [newOpStatus, setNewOpStatus] = useState<'Aktif Ditugaskan' | 'Calon Operator' | 'Belum Ditugaskan'>('Aktif Ditugaskan');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Cek apakah ada penanggung jawab operasi bernama
  const hasNamedOperator = Boolean(
    data.penanggungJawabOperasiNama && data.penanggungJawabOperasiNama.trim().length > 0
  );

  const handleUpdatePenanggungJawab = (nama: string) => {
    updateKelolaBersama(activeVillage.id, {
      penanggungJawabOperasiNama: nama,
    });
    triggerToast('Nama penanggung jawab operasi diperbarui');
  };

  const handleToggleSopStatus = (id: string) => {
    const nextSops = data.sops.map((sop) =>
      sop.id === id
        ? {
            ...sop,
            status: (sop.status === 'Tersedia' ? 'Belum' : 'Tersedia') as 'Tersedia' | 'Belum',
          }
        : sop
    );
    updateKelolaBersama(activeVillage.id, { sops: nextSops });
    triggerToast('Status SOP diperbarui');
  };

  const handleAddOperator = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOpNama.trim()) return;

    const newOp: OperatorTerlatih = {
      id: `OP-${Date.now()}`,
      nama: newOpNama.trim(),
      peran: newOpPeran.trim() || 'Teknisi Operasional PLTS',
      kontak: newOpKontak.trim() || '-',
      pelatihanSertifikasi: newOpSertifikasi.trim() || 'Pelatihan Dasar Kelistrikan Komunal',
      statusPenugasan: newOpStatus,
    };

    const nextOperators = [...data.operators, newOp];
    // Jika belum ada penanggung jawab operasi bernama dan statusnya Aktif Ditugaskan, isi otomatis bila diminta
    let nextPj = data.penanggungJawabOperasiNama;
    if (!nextPj || nextPj.trim() === '') {
      nextPj = `${newOp.nama} - ${newOp.peran}`;
    }

    updateKelolaBersama(activeVillage.id, {
      operators: nextOperators,
      penanggungJawabOperasiNama: nextPj,
    });

    setNewOpNama('');
    setNewOpPeran('');
    setNewOpKontak('');
    setNewOpSertifikasi('');
    triggerToast('Operator baru berhasil ditambahkan');
  };

  const handleRemoveOperator = (id: string) => {
    const nextOperators = data.operators.filter((op) => op.id !== id);
    updateKelolaBersama(activeVillage.id, { operators: nextOperators });
    triggerToast('Operator dihapus dari daftar');
  };

  const handleUpdatePembukuan = (
    status: 'Tertib & Terbuka' | 'Dalam Penyesuaian' | 'Belum Tersedia',
    catatan: string
  ) => {
    updateKelolaBersama(activeVillage.id, {
      statusPembukuan: status,
      catatanPembukuan: catatan,
    });
    triggerToast('Status pembukuan diperbarui');
  };

  const handleUpdateKontrak = (
    kontrak: 'Tersedia & Berlaku' | 'Dalam Draf Perjanjian' | 'Belum Ada',
    catatan: string
  ) => {
    updateKelolaBersama(activeVillage.id, {
      kontrakLayanan: kontrak,
      catatanKontrak: catatan,
    });
    triggerToast('Status kontrak layanan diperbarui');
  };

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
                Komponen 5 • Kelola Bersama
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
              Kelola Bersama: Operator Terlatih, SOP, Pembagian Peran & Tata Kelola
            </h1>
            <p className="text-[13px] sm:text-[14px] text-[#F7F8EE]/90 max-w-3xl leading-relaxed">
              Memastikan ketersediaan penanggung jawab operasi bernama, kejelasan SOP pemeliharaan dan keselamatan, pembagian tanggung jawab lintas lembaga desa, serta keterbukaan pembukuan kas sinking fund baterai.
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
          <span className="material-symbols-outlined text-[16px] text-[#E0A526]">hub</span>
          <span>Prinsip: Manfaat dan biaya transparan; peran terbagi jelas; ada nama yang bertanggung jawab; tidak ada ketergantungan sepihak.</span>
        </div>
      </div>

      {/* PERINGATAN BILA BELUM ADA PENANGGUNG JAWAB OPERASI BERNAMA (WAJIB SESUAI BRIEF) */}
      {!hasNamedOperator ? (
        <div className="rounded-[14px] bg-[#F9DFDC] border-2 border-[#B84A3A] p-5 shadow-md flex items-start gap-4 animate-in fade-in">
          <div className="w-11 h-11 rounded-xl bg-[#FAFBF4] text-[#B84A3A] border border-[#ECAAA4] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[28px] text-[#B84A3A]">error</span>
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase font-black px-2.5 py-0.5 rounded bg-[#B84A3A] text-[#FAFBF4]">
                Peringatan Krusial
              </span>
              <span className="text-[11px] text-[#8B281B] font-bold">
                Prasyarat #4 Mutlak Belum Terpenuhi
              </span>
            </div>
            <h2 className="text-[16px] sm:text-[17px] font-black text-[#8B281B] leading-tight">
              Belum ada penanggung jawab operasi bernama!
            </h2>
            <p className="text-[13px] text-[#701E13] leading-relaxed">
              Sistem mikrogrid PLTS berisiko tinggi mangkrak jika tidak ada teknisi atau operator lokal yang ditugaskan secara resmi oleh musyawarah desa atau pengurus koperasi. Silakan tentukan dan ketik nama penanggung jawab operasi di bawah ini atau tambahkan operator terlatih.
            </p>

            {/* Quick Set Name */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
              <input
                type="text"
                placeholder="Ketik nama penanggung jawab operasi resmi..."
                onChange={(e) => handleUpdatePenanggungJawab(e.target.value)}
                className="w-full sm:max-w-md p-2.5 rounded-xl border border-[#B84A3A] bg-[#FAFBF4] text-[13px] font-bold text-[#1F2A14]"
              />
              <span className="text-[11px] text-[#8B281B] italic">
                (Ketik nama langsung untuk menetapkan)
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-[14px] bg-[#E2F0E4] border border-[#C2E0C5] p-4.5 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FAFBF4] text-[#27602C] border border-[#C2E0C5] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px] text-[#27602C]">verified_user</span>
            </div>
            <div>
              <div className="text-[11px] uppercase font-bold text-[#27602C]">
                Penanggung Jawab Operasi Resmi Bernama
              </div>
              <div className="text-[14px] font-black text-[#1F2A14]">
                {data.penanggungJawabOperasiNama}
              </div>
            </div>
          </div>

          <button
            onClick={() => handleUpdatePenanggungJawab('')}
            className="text-[11px] font-bold text-[#6B7753] hover:text-[#B84A3A] underline cursor-pointer"
          >
            Ubah / Kosongkan
          </button>
        </div>
      )}

      {/* TAB NAVIGATION DALAM HALAMAN KELOLA BERSAMA */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[#C5CCAE]">
        <button
          onClick={() => setActiveTab('operator')}
          className={`px-4 py-2.5 rounded-xl text-[13px] font-bold flex items-center gap-2 cursor-pointer transition-all ${
            activeTab === 'operator'
              ? 'bg-[#4B5D2A] text-[#FAFBF4] shadow-xs font-black'
              : 'bg-[#F3F5EA] text-[#3A4728] hover:bg-[#E4E8D6]'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">engineering</span>
          <span>1. Daftar Operator Terlatih ({data.operators.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('sop')}
          className={`px-4 py-2.5 rounded-xl text-[13px] font-bold flex items-center gap-2 cursor-pointer transition-all ${
            activeTab === 'sop'
              ? 'bg-[#4B5D2A] text-[#FAFBF4] shadow-xs font-black'
              : 'bg-[#F3F5EA] text-[#3A4728] hover:bg-[#E4E8D6]'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">description</span>
          <span>
            2. SOP Operasi & Perawatan ({data.sops.filter((s) => s.status === 'Tersedia').length}/{data.sops.length})
          </span>
        </button>

        <button
          onClick={() => setActiveTab('tanggungjawab')}
          className={`px-4 py-2.5 rounded-xl text-[13px] font-bold flex items-center gap-2 cursor-pointer transition-all ${
            activeTab === 'tanggungjawab'
              ? 'bg-[#4B5D2A] text-[#FAFBF4] shadow-xs font-black'
              : 'bg-[#F3F5EA] text-[#3A4728] hover:bg-[#E4E8D6]'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">account_tree</span>
          <span>3. Pembagian Tanggung Jawab</span>
        </button>

        <button
          onClick={() => setActiveTab('keuangan')}
          className={`px-4 py-2.5 rounded-xl text-[13px] font-bold flex items-center gap-2 cursor-pointer transition-all ${
            activeTab === 'keuangan'
              ? 'bg-[#4B5D2A] text-[#FAFBF4] shadow-xs font-black'
              : 'bg-[#F3F5EA] text-[#3A4728] hover:bg-[#E4E8D6]'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">receipt_long</span>
          <span>4. Status Pembukuan & Kontrak</span>
        </button>
      </div>

      {/* TAB 1: DAFTAR OPERATOR TERLATIH */}
      {activeTab === 'operator' && (
        <div className="space-y-6">
          <div className="bg-[#F3F5EA] p-6 rounded-[14px] border border-[#C5CCAE] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#C5CCAE]">
              <div>
                <h3 className="text-[16px] font-extrabold text-[#1F2A14] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4B5D2A] text-[20px]">badge</span>
                  <span>Daftar Operator Terlatih PLTS Desa</span>
                </h3>
                <p className="text-[12px] text-[#6B7753]">
                  Warga lokal yang telah menyelesaikan pelatihan teknis dan bersiap menjalankan tugas harian.
                </p>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-[#FAFBF4] border border-[#C5CCAE] text-[#4B5D2A]">
                {data.operators.length} Operator Terdata
              </span>
            </div>

            {data.operators.length === 0 ? (
              <div className="p-8 text-center rounded-xl bg-[#FAFBF4] border border-dashed border-[#C5CCAE] space-y-2">
                <span className="material-symbols-outlined text-[36px] text-[#6B7753]">person_off</span>
                <h4 className="text-[14px] font-bold text-[#1F2A14]">Belum Ada Operator Terdaftar</h4>
                <p className="text-[12px] text-[#6B7753] max-w-md mx-auto">
                  Belum ada calon operator lokal yang dimasukkan. Silakan gunakan formulir di bawah untuk mendaftarkan nama teknisi/operator pertama.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.operators.map((op) => (
                  <div
                    key={op.id}
                    className="p-4 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] shadow-xs flex flex-col justify-between gap-3 hover:border-[#4B5D2A] transition-all"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[14px] font-black text-[#1F2A14]">{op.nama}</span>
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded border ${
                            op.statusPenugasan === 'Aktif Ditugaskan'
                              ? 'bg-[#E2F0E4] text-[#27602C] border-[#C2E0C5]'
                              : op.statusPenugasan === 'Calon Operator'
                              ? 'bg-[#F6E7BD] text-[#825708] border-[#EED38A]'
                              : 'bg-[#F3F5EA] text-[#6B7753] border-[#C5CCAE]'
                          }`}
                        >
                          {op.statusPenugasan}
                        </span>
                      </div>

                      <div className="text-[12px] font-bold text-[#4B5D2A]">{op.peran}</div>
                      <p className="text-[11.5px] text-[#6B7753] leading-relaxed">
                        Sertifikasi: <strong>{op.pelatihanSertifikasi}</strong>
                      </p>
                      <div className="text-[11px] text-[#6B7753] flex items-center gap-1.5 pt-1">
                        <span className="material-symbols-outlined text-[15px]">call</span>
                        <span>{op.kontak}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#C5CCAE]/50 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleUpdatePenanggungJawab(`${op.nama} - ${op.peran}`)}
                        className="text-[11px] font-bold text-[#4B5D2A] hover:underline cursor-pointer"
                      >
                        Jadikan Penanggung Jawab Utama
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRemoveOperator(op.id)}
                        className="text-[11px] font-bold text-[#B84A3A] hover:underline cursor-pointer"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Form Tambah Operator Baru */}
            <form
              onSubmit={handleAddOperator}
              className="p-4 rounded-xl bg-[#E4E8D6]/60 border border-[#C5CCAE] space-y-3"
            >
              <div className="text-[12.5px] font-black text-[#1F2A14] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#4B5D2A]">person_add</span>
                <span>Tambah Operator Terlatih Baru</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#1F2A14] mb-1">
                    Nama Operator:
                  </label>
                  <input
                    type="text"
                    required
                    value={newOpNama}
                    onChange={(e) => setNewOpNama(e.target.value)}
                    placeholder="Contoh: Rian Saputra (24 th)"
                    className="w-full p-2 rounded-lg border border-[#C5CCAE] bg-[#FAFBF4] text-[12px] text-[#1F2A14]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1F2A14] mb-1">
                    Peran / Tugas:
                  </label>
                  <input
                    type="text"
                    value={newOpPeran}
                    onChange={(e) => setNewOpPeran(e.target.value)}
                    placeholder="Contoh: Teknisi Harian Gardu"
                    className="w-full p-2 rounded-lg border border-[#C5CCAE] bg-[#FAFBF4] text-[12px] text-[#1F2A14]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1F2A14] mb-1">
                    Pelatihan / Sertifikasi:
                  </label>
                  <input
                    type="text"
                    value={newOpSertifikasi}
                    onChange={(e) => setNewOpSertifikasi(e.target.value)}
                    placeholder="Contoh: BLK EBT Provinsi / Mandiri"
                    className="w-full p-2 rounded-lg border border-[#C5CCAE] bg-[#FAFBF4] text-[12px] text-[#1F2A14]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1F2A14] mb-1">
                    Status Penugasan:
                  </label>
                  <select
                    value={newOpStatus}
                    onChange={(e) => setNewOpStatus(e.target.value as any)}
                    className="w-full p-2 rounded-lg border border-[#C5CCAE] bg-[#FAFBF4] text-[12px] text-[#1F2A14] font-medium"
                  >
                    <option value="Aktif Ditugaskan">Aktif Ditugaskan</option>
                    <option value="Calon Operator">Calon Operator</option>
                    <option value="Belum Ditugaskan">Belum Ditugaskan</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#4B5D2A] text-[#FAFBF4] font-bold text-[12px] hover:bg-[#3F4E2C] shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>Simpan Operator</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: SOP OPERASI DAN PERAWATAN */}
      {activeTab === 'sop' && (
        <div className="bg-[#F3F5EA] p-6 rounded-[14px] border border-[#C5CCAE] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#C5CCAE]">
            <div>
              <h3 className="text-[16px] font-extrabold text-[#1F2A14] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4B5D2A] text-[20px]">rule</span>
                <span>Daftar SOP Operasi & Perawatan (Status Tersedia / Belum)</span>
              </h3>
              <p className="text-[12px] text-[#6B7753]">
                Panduan operasional tertulis yang wajib disepakati dan tersedia di gardu PLTS maupun kantor koperasi.
              </p>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-[#FAFBF4] border border-[#C5CCAE] text-[#4B5D2A]">
              Klik tombol status untuk mengubah manual
            </span>
          </div>

          <div className="space-y-3">
            {data.sops.map((sop) => (
              <div
                key={sop.id}
                className="p-4 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs hover:border-[#4B5D2A] transition-all"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#E4E8D6] text-[#4B5D2A]">
                      {sop.kategori}
                    </span>
                    <h4 className="text-[13.5px] font-bold text-[#1F2A14]">{sop.judul}</h4>
                  </div>
                  <p className="text-[12px] text-[#6B7753] leading-relaxed">{sop.keterangan}</p>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleSopStatus(sop.id)}
                    className={`px-3 py-1.5 rounded-xl text-[12px] font-black border flex items-center gap-1.5 cursor-pointer transition-all shadow-xs ${
                      sop.status === 'Tersedia'
                        ? 'bg-[#E2F0E4] text-[#27602C] border-[#C2E0C5] hover:bg-[#c2e0c5]'
                        : 'bg-[#F9DFDC] text-[#8B281B] border-[#ECAAA4] hover:bg-[#ecaaa4]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {sop.status === 'Tersedia' ? 'check_circle' : 'cancel'}
                    </span>
                    <span>Status: {sop.status}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PEMBAGIAN TANGGUNG JAWAB */}
      {activeTab === 'tanggungjawab' && (
        <div className="bg-[#F3F5EA] p-6 rounded-[14px] border border-[#C5CCAE] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#C5CCAE]">
            <div>
              <h3 className="text-[16px] font-extrabold text-[#1F2A14] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4B5D2A] text-[20px]">group_work</span>
                <span>Matriks Pembagian Tanggung Jawab Pengelolaan PLTS</span>
              </h3>
              <p className="text-[12px] text-[#6B7753]">
                Mencegah saling lempar tanggung jawab antara pengurus koperasi, teknisi, pemdes, dan warga.
              </p>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-[#FAFBF4] border border-[#C5CCAE] text-[#4B5D2A]">
              Hasil Musyawarah Bersama
            </span>
          </div>

          <div className="space-y-3">
            {data.pembagianPeran.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] shadow-xs flex flex-col md:flex-row md:items-start justify-between gap-3"
              >
                <div className="md:w-1/3 space-y-0.5">
                  <div className="text-[10.5px] font-black uppercase text-[#6B7753]">Peran Lembaga</div>
                  <div className="text-[14px] font-black text-[#1F2A14]">{item.peran}</div>
                  <div className="text-[11.5px] font-semibold text-[#4B5D2A]">{item.namaPihak}</div>
                </div>

                <div className="md:w-2/3 border-t md:border-t-0 md:border-l md:pl-4 pt-2 md:pt-0 border-[#C5CCAE] space-y-1">
                  <div className="text-[10.5px] font-black uppercase text-[#6B7753]">
                    Tanggung Jawab Utama
                  </div>
                  <p className="text-[12.5px] text-[#3A4728] leading-relaxed">
                    {item.tanggungJawabUtama}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: STATUS PEMBUKUAN & KONTRAK LAYANAN */}
      {activeTab === 'keuangan' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status Pembukuan */}
          <div className="bg-[#F3F5EA] p-6 rounded-[14px] border border-[#C5CCAE] shadow-xs space-y-4">
            <div className="pb-2 border-b border-[#C5CCAE]">
              <h3 className="text-[16px] font-extrabold text-[#1F2A14] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4B5D2A] text-[20px]">account_balance_wallet</span>
                <span>Status Pembukuan Kas & Sinking Fund</span>
              </h3>
              <p className="text-[12px] text-[#6B7753]">
                Kerapian pencatatan iuran warga dan pemisahan rekening tabungan baterai.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11.5px] font-bold text-[#1F2A14] mb-1">
                  Status Pembukuan Saat Ini:
                </label>
                <select
                  value={data.statusPembukuan}
                  onChange={(e) =>
                    handleUpdatePembukuan(e.target.value as any, data.catatanPembukuan)
                  }
                  className={`w-full p-2.5 rounded-xl border text-[13px] font-extrabold cursor-pointer ${
                    data.statusPembukuan === 'Tertib & Terbuka'
                      ? 'bg-[#E2F0E4] text-[#27602C] border-[#C2E0C5]'
                      : data.statusPembukuan === 'Dalam Penyesuaian'
                      ? 'bg-[#F6E7BD] text-[#825708] border-[#EED38A]'
                      : 'bg-[#F9DFDC] text-[#8B281B] border-[#ECAAA4]'
                  }`}
                >
                  <option value="Tertib & Terbuka">Tertib & Terbuka</option>
                  <option value="Dalam Penyesuaian">Dalam Penyesuaian</option>
                  <option value="Belum Tersedia">Belum Tersedia</option>
                </select>
              </div>

              <div>
                <label className="block text-[11.5px] font-bold text-[#1F2A14] mb-1">
                  Catatan Pembukuan:
                </label>
                <textarea
                  rows={3}
                  value={data.catatanPembukuan}
                  onChange={(e) =>
                    handleUpdatePembukuan(data.statusPembukuan, e.target.value)
                  }
                  className="w-full p-2.5 rounded-xl border border-[#C5CCAE] bg-[#FAFBF4] text-[12.5px] text-[#1F2A14] leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Kontrak Layanan */}
          <div className="bg-[#F3F5EA] p-6 rounded-[14px] border border-[#C5CCAE] shadow-xs space-y-4">
            <div className="pb-2 border-b border-[#C5CCAE]">
              <h3 className="text-[16px] font-extrabold text-[#1F2A14] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4B5D2A] text-[20px]">handshake</span>
                <span>Kontrak Layanan & Perjanjian Pengelolaan</span>
              </h3>
              <p className="text-[12px] text-[#6B7753]">
                Dokumen legal kesepakatan tingkat layanan (SLA) pengelola dengan pemerintah desa & warga.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11.5px] font-bold text-[#1F2A14] mb-1">
                  Status Kontrak Layanan:
                </label>
                <select
                  value={data.kontrakLayanan}
                  onChange={(e) =>
                    handleUpdateKontrak(e.target.value as any, data.catatanKontrak)
                  }
                  className={`w-full p-2.5 rounded-xl border text-[13px] font-extrabold cursor-pointer ${
                    data.kontrakLayanan === 'Tersedia & Berlaku'
                      ? 'bg-[#E2F0E4] text-[#27602C] border-[#C2E0C5]'
                      : data.kontrakLayanan === 'Dalam Draf Perjanjian'
                      ? 'bg-[#F6E7BD] text-[#825708] border-[#EED38A]'
                      : 'bg-[#F9DFDC] text-[#8B281B] border-[#ECAAA4]'
                  }`}
                >
                  <option value="Tersedia & Berlaku">Tersedia & Berlaku</option>
                  <option value="Dalam Draf Perjanjian">Dalam Draf Perjanjian</option>
                  <option value="Belum Ada">Belum Ada</option>
                </select>
              </div>

              <div>
                <label className="block text-[11.5px] font-bold text-[#1F2A14] mb-1">
                  Catatan Kontrak & Legalitas:
                </label>
                <textarea
                  rows={3}
                  value={data.catatanKontrak}
                  onChange={(e) =>
                    handleUpdateKontrak(data.kontrakLayanan, e.target.value)
                  }
                  className="w-full p-2.5 rounded-xl border border-[#C5CCAE] bg-[#FAFBF4] text-[12.5px] text-[#1F2A14] leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER ACTIONS */}
      <div className="p-5 rounded-[14px] bg-[#FAFBF4] border border-[#C5CCAE] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-[12px] text-[#6B7753] space-y-0.5">
          <div className="flex items-center gap-1.5 font-bold text-[#1F2A14]">
            <span className="material-symbols-outlined text-[#4C9A52] text-[16px]">check_circle</span>
            <span>Data Kelola Bersama Tersimpan di State Lokal</span>
          </div>
          <p>
            Ringkasan status operator, SOP, dan pembukuan dapat dipantau warga di <strong>Portal Warga</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActivePage('belajar-energi')}
            className="px-4 py-2.5 rounded-xl border border-[#4B5D2A] text-[#4B5D2A] text-[13px] font-bold hover:bg-[#E4E8D6] cursor-pointer transition-all"
          >
            Kembali ke Belajar Energi
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
