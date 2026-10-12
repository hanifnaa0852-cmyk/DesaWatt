import React from 'react';
import { useDesaWatt } from '../context/DesaWattContext';
import { VillageId } from '../types';
import { GlowingMetricCard } from '@/components/ui/GlowingMetricCard';
import { CountUpNumber } from '@/components/ui/CountUpNumber';
import { GradientButton } from '@/components/ui/gradient-button';

export const Beranda: React.FC = () => {
  const {
    activeVillage,
    selectedVillageId,
    setSelectedVillageId,
    villages,
    readinessLevel,
    effectiveModel,
    simulationResults,
    setActivePage,
    currentUser,
    setIsPublicPortal,
  } = useDesaWatt();

  const getModelLabel = (model: string) => {
    if (model === 'milik_koperasi') return 'Milik Koperasi';
    if (model === 'kemitraan') return 'Kemitraan (JV BUMDes)';
    return 'Energy-as-a-Service (EaaS)';
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12 text-[#3A4728] min-w-0">
      {/* Top Hero Banner */}
      <div className="w-full min-w-0 rounded-[14px] bg-gradient-to-r from-[#4B5D2A] via-[#556930] to-[#5E7336] border border-[#5E7336] p-6 md:p-8 shadow-md text-[#F7F8EE]">
        <div className="grid grid-cols-1 min-[1100px]:grid-cols-[minmax(0,1fr)_minmax(260px,360px)] gap-6 items-center">
          <div className="space-y-2.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border ${
                  activeVillage.statusPLTS === 'Sehat'
                    ? 'bg-[#E2F0E4] text-[#27602C] border-[#C2E0C5]'
                    : activeVillage.statusPLTS === 'Waspada'
                    ? 'bg-[#F6E7BD] text-[#825708] border-[#EED38A]'
                    : 'bg-[#F9DFDC] text-[#8B281B] border-[#ECAAA4]'
                }`}
              >
                STATUS PLTS: {activeVillage.statusPLTS.toUpperCase()}
              </span>
              <span className="text-[#D4DCBC]">•</span>
              <span className="text-[12px] font-bold text-[#D4DCBC]">
                Unit Usaha Koperasi Desa Merah Putih
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAFBF4]/20 text-[#FAFBF4] border border-[#FAFBF4]/30">
                Data ilustratif
              </span>
            </div>

            <h1 className="text-[24px] sm:text-[30px] font-black text-[#F7F8EE] tracking-tight leading-snug">
              DesaWatt: Dari Akses Energi ke Kemandirian Desa
            </h1>

            <p className="text-[13px] sm:text-[14px] text-[#F7F8EE]/95 max-w-2xl leading-relaxed font-medium">
              Platform pendampingan keputusan PLTS komunal untuk{' '}
              <strong className="text-white underline decoration-[#E0A526]">
                {activeVillage.name}
              </strong>
              , {activeVillage.subdistrict}, {activeVillage.regency}. DesaWatt membantu menyajikan data dan memberi sinyal; keputusan sepenuhnya ada pada warga, pengurus koperasi, pendamping, dan musyawarah desa.
            </p>

            <div className="flex items-center gap-4 pt-1 text-[12px] text-[#D4DCBC] font-semibold flex-wrap">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#E0A526]">bolt</span>
                Kapasitas: <CountUpNumber value={activeVillage.capacityKwp} /> kWp
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#E0A526]">
                  battery_charging_full
                </span>
                Bank Baterai: <CountUpNumber value={activeVillage.batteryKwh} /> kWh LiFePO4
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#E0A526]">groups</span>
                Cakupan: <CountUpNumber value={activeVillage.connectionsKK} /> KK & Fasilitas Desa
              </span>
            </div>
          </div>

          {/* Quick Telemetry Box */}
          <div className="w-full max-w-[360px] min-w-0 bg-[#F3F5EA] border border-[#C5CCAE] rounded-[14px] p-4.5 flex flex-col justify-between shadow-sm text-[#1F2A14] justify-self-center min-[1100px]:justify-self-end">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#6B7753]">
                  Daya Sesaat (Ilustratif)
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#E4E8D6] text-[#4B5D2A] font-bold">
                  Live Feed
                </span>
              </div>
              <div className="text-[26px] font-black text-[#1F2A14] mt-0.5 tracking-tight">
                <CountUpNumber value={38.4} decimals={1} /> kW
              </div>
              <div className="text-[12px] text-[#6B7753] mt-1 flex justify-between font-medium">
                <span>
                  Beban: <CountUpNumber value={64} />%
                </span>
                <span className="text-[#4C9A52] font-bold">
                  Cadangan: <CountUpNumber value={21.2} decimals={1} /> kW
                </span>
              </div>
            </div>
            <div className="pt-3 mt-3 border-t border-[#C5CCAE] flex items-center justify-between text-[11px] font-bold text-[#4B5D2A]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4C9A52]"></span>
                Inverter <CountUpNumber value={50.02} decimals={2} /> Hz Sinkron
              </span>
              <button
                onClick={() => setIsPublicPortal(true)}
                className="text-[10.5px] text-[#825708] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Portal Warga</span>
                <span className="material-symbols-outlined text-[13px]">open_in_new</span>
              </button>
            </div>
          </div>
        </div>

        {/* Civic Empowerment Motto Ribbon */}
        <div className="mt-5 pt-3.5 border-t border-white/20 text-[12.5px] text-[#F6E7BD] flex items-center gap-2 font-bold flex-wrap">
          <span className="material-symbols-outlined text-[18px] text-[#E0A526]">verified</span>
          <span>"Warga ikut menentukan; teknologi mengikuti kebutuhan; manfaat dan biaya transparan; kapasitas lokal tumbuh."</span>
        </div>
      </div>

      {/* SECTION: ALUR ENAM KOMPONEN PEMBERDAYAAN (2 baris x 3 kartu) */}
      <div className="w-full min-w-0 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-[20px] font-black text-[#1F2A14] tracking-tight">
              Alur Enam Komponen Pemberdayaan Masyarakat
            </h2>
            <p className="text-[12.5px] text-[#6B7753]">
              Proses berurutan dari pemetaan aspirasi hingga perawatan aset komunal yang berkeadilan.
            </p>
          </div>
          <div className="flex items-center gap-3 text-[11.5px] font-bold">
            <span className="inline-flex items-center gap-1.5 text-[#825708]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E0A526]"></span>
              <span>Proses pendampingan</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#27602C]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4C9A52]"></span>
              <span>Didukung sistem</span>
            </span>
          </div>
        </div>

        {/* Grid 2 baris x 3 kartu (1 kolom di layar kecil) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full min-w-0">
          
          {/* KARTU 1: Dengar Warga */}
          <div className="bg-[#F3F5EA] rounded-[14px] border border-[#C5CCAE] p-5 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-[#E0A526] transition-all min-w-0">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold uppercase tracking-wider bg-[#F6E7BD] text-[#825708] border border-[#EED38A]">
                  Proses pendampingan
                </span>
                <span className="text-[11px] font-bold text-[#6B7753]">Komponen 1</span>
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-8 h-8 rounded-lg bg-[#FAFBF4] border border-[#C5CCAE] text-[#825708] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">forum</span>
                </span>
                <h3 className="text-[17px] font-extrabold text-[#1F2A14]">1. Dengar Warga</h3>
              </div>
              <p className="text-[12px] text-[#3A4728] leading-relaxed mb-4">
                Pemetaan kebutuhan riil masyarakat, musyawarah dusun, perlindungan kelompok rentan, dan kesepakatan prioritas penggunaan listrik komunal.
              </p>

              <div className="p-3 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] mb-4 space-y-1 text-[11px]">
                <div className="flex justify-between text-[#1F2A14] font-bold">
                  <span>Kelompok Rentan:</span>
                  <span className="text-[#825708]">28 KK Terdata</span>
                </div>
                <div className="flex justify-between text-[#6B7753]">
                  <span>Prioritas:</span>
                  <span>Posyandu, Air Bersih, UMKM</span>
                </div>
              </div>
            </div>

            <GradientButton
              onClick={() => setActivePage('dengar-warga')}
              variant="green"
              size="sm"
              className="w-full flex items-center justify-center gap-1.5 cursor-pointer shadow-xs text-[12.5px] py-2 px-3"
            >
              <span>Buka Dengar Warga</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </GradientButton>
          </div>

          {/* KARTU 2: Belajar Energi */}
          <div className="bg-[#F3F5EA] rounded-[14px] border border-[#C5CCAE] p-5 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-[#E0A526] transition-all min-w-0">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold uppercase tracking-wider bg-[#F6E7BD] text-[#825708] border border-[#EED38A]">
                  Proses pendampingan
                </span>
                <span className="text-[11px] font-bold text-[#6B7753]">Komponen 2</span>
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-8 h-8 rounded-lg bg-[#FAFBF4] border border-[#C5CCAE] text-[#825708] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">school</span>
                </span>
                <h3 className="text-[17px] font-extrabold text-[#1F2A14]">2. Belajar Energi</h3>
              </div>
              <p className="text-[12px] text-[#3A4728] leading-relaxed mb-4">
                Literasi energi berbasis praktik langsung warga: keselamatan listrik, kebiasaan hemat daya, dan peningkatan pemahaman yang diukur sebelum dan sesudah pelatihan.
              </p>

              <div className="p-3 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] mb-4 space-y-1 text-[11px]">
                <div className="flex justify-between text-[#1F2A14] font-bold">
                  <span>Warga Terlatih:</span>
                  <span className="text-[#27602C]">191 Warga (80% KK)</span>
                </div>
                <div className="flex justify-between text-[#6B7753]">
                  <span>Peningkatan:</span>
                  <span className="font-bold text-[#27602C]">Pre 41% → Post 91%</span>
                </div>
              </div>
            </div>

            <GradientButton
              onClick={() => setActivePage('belajar-energi')}
              variant="green"
              size="sm"
              className="w-full flex items-center justify-center gap-1.5 cursor-pointer shadow-xs text-[12.5px] py-2 px-3"
            >
              <span>Buka Belajar Energi</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </GradientButton>
          </div>

          {/* KARTU 3: Baca Desa */}
          <div className="bg-[#F3F5EA] rounded-[14px] border border-[#C5CCAE] p-5 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-[#4B5D2A] transition-all min-w-0">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold uppercase tracking-wider bg-[#E2F0E4] text-[#27602C] border border-[#C2E0C5]">
                  Didukung sistem
                </span>
                <span className="text-[11px] font-bold text-[#6B7753]">Komponen 3</span>
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-8 h-8 rounded-lg bg-[#FAFBF4] border border-[#C5CCAE] text-[#4B5D2A] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">fact_check</span>
                </span>
                <h3 className="text-[17px] font-extrabold text-[#1F2A14]">3. Baca Desa</h3>
              </div>
              <p className="text-[12px] text-[#3A4728] leading-relaxed mb-4">
                Profil kesiapan sosial-teknis desa dan daftar kesenjangan multidimensi (bukan sekadar angka tunggal) untuk memetakan kekuatan serta kebutuhan pendampingan.
              </p>

              <div className="p-3 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] mb-4 space-y-1 text-[11px]">
                <div className="flex justify-between text-[#1F2A14] font-bold">
                  <span>Profil Kesiapan:</span>
                  <span className="text-[#4B5D2A]">Level {readinessLevel}</span>
                </div>
                <div className="flex justify-between text-[#6B7753]">
                  <span>Fokus Kesenjangan:</span>
                  <span>Kapasitas O&M & Perdes</span>
                </div>
              </div>
            </div>

            <GradientButton
              onClick={() => setActivePage('baca-desa')}
              variant="green"
              size="sm"
              className="w-full flex items-center justify-center gap-1.5 cursor-pointer shadow-xs text-[12.5px] py-2 px-3"
            >
              <span>Buka Profil Baca Desa</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </GradientButton>
          </div>

          {/* KARTU 4: Rancang Watt */}
          <div className="bg-[#F3F5EA] rounded-[14px] border border-[#C5CCAE] p-5 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-[#4B5D2A] transition-all min-w-0">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold uppercase tracking-wider bg-[#E2F0E4] text-[#27602C] border border-[#C2E0C5]">
                  Didukung sistem
                </span>
                <span className="text-[11px] font-bold text-[#6B7753]">Komponen 4</span>
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-8 h-8 rounded-lg bg-[#FAFBF4] border border-[#C5CCAE] text-[#4B5D2A] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">tune</span>
                </span>
                <h3 className="text-[17px] font-extrabold text-[#1F2A14]">4. Rancang Watt</h3>
              </div>
              <p className="text-[12px] text-[#3A4728] leading-relaxed mb-4">
                Perencanaan biaya siklus hidup PLTS dan pengujian berbagai skenario ekonomi, termasuk rencana iuran dan kecukupan tabungan O&M penggantian baterai.
              </p>

              <div className="p-3 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] mb-4 space-y-1 text-[11px]">
                <div className="flex justify-between text-[#1F2A14] font-bold">
                  <span>Model Disarankan:</span>
                  <span className="text-[#4B5D2A]">{getModelLabel(effectiveModel)}</span>
                </div>
                <div className="flex justify-between text-[#6B7753]">
                  <span>Arus Kas O&M:</span>
                  <span>~Rp <CountUpNumber value={simulationResults.netAnnualAverageJuta} /> Jt / th</span>
                </div>
              </div>
            </div>

            <GradientButton
              onClick={() => setActivePage('rancang-watt')}
              variant="green"
              size="sm"
              className="w-full flex items-center justify-center gap-1.5 cursor-pointer shadow-xs text-[12.5px] py-2 px-3"
            >
              <span>Buka Rancang Watt</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </GradientButton>
          </div>

          {/* KARTU 5: Kelola Bersama */}
          <div className="bg-[#F3F5EA] rounded-[14px] border border-[#C5CCAE] p-5 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-[#E0A526] transition-all min-w-0">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold uppercase tracking-wider bg-[#F6E7BD] text-[#825708] border border-[#EED38A]">
                  Proses pendampingan
                </span>
                <span className="text-[11px] font-bold text-[#6B7753]">Komponen 5</span>
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-8 h-8 rounded-lg bg-[#FAFBF4] border border-[#C5CCAE] text-[#825708] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">hub</span>
                </span>
                <h3 className="text-[17px] font-extrabold text-[#1F2A14]">5. Kelola Bersama</h3>
              </div>
              <p className="text-[12px] text-[#3A4728] leading-relaxed mb-4">
                Pelatihan operator dan teknisi warga, penetapan Standar Operasional Prosedur (SOP), pembagian tanggung jawab yang adil, serta pembukuan iuran terbuka.
              </p>

              <div className="p-3 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] mb-4 space-y-1 text-[11px]">
                <div className="flex justify-between text-[#1F2A14] font-bold">
                  <span>Teknisi Terlatih:</span>
                  <span className="text-[#825708]">3 Pemuda Siaga</span>
                </div>
                <div className="flex justify-between text-[#6B7753]">
                  <span>SOP Disepakati:</span>
                  <span>Harian, Mingguan, Cuaca Ekstrem</span>
                </div>
              </div>
            </div>

            <GradientButton
              onClick={() => setActivePage('kelola-bersama')}
              variant="green"
              size="sm"
              className="w-full flex items-center justify-center gap-1.5 cursor-pointer shadow-xs text-[12.5px] py-2 px-3"
            >
              <span>Buka Kelola Bersama</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </GradientButton>
          </div>

          {/* KARTU 6: Jaga Watt */}
          <div className="bg-[#F3F5EA] rounded-[14px] border border-[#C5CCAE] p-5 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-[#4B5D2A] transition-all min-w-0">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold uppercase tracking-wider bg-[#E2F0E4] text-[#27602C] border border-[#C2E0C5]">
                  Didukung sistem
                </span>
                <span className="text-[11px] font-bold text-[#6B7753]">Komponen 6</span>
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-8 h-8 rounded-lg bg-[#FAFBF4] border border-[#C5CCAE] text-[#4B5D2A] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">monitor_heart</span>
                </span>
                <h3 className="text-[17px] font-extrabold text-[#1F2A14]">6. Jaga Watt</h3>
              </div>
              <p className="text-[12px] text-[#3A4728] leading-relaxed mb-4">
                Pemantauan teknis dan keuangan yang berujung pada tindakan cepat, kanal pengaduan warga via Portal Warga, serta pelaporan transparansi publik tanpa login.
              </p>

              <div className="p-3 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] mb-4 space-y-1 text-[11px]">
                <div className="flex justify-between text-[#1F2A14] font-bold">
                  <span>Kepatuhan Iuran:</span>
                  <span className="text-[#4C9A52]"><CountUpNumber value={activeVillage.collectionRatePercent} />% Tertib</span>
                </div>
                <div className="flex justify-between text-[#6B7753]">
                  <span>Pencegahan Aset:</span>
                  <span>Deteksi Anomali Dini</span>
                </div>
              </div>
            </div>

            <GradientButton
              onClick={() => setActivePage('jaga-watt')}
              variant="green"
              size="sm"
              className="w-full flex items-center justify-center gap-1.5 cursor-pointer shadow-xs text-[12.5px] py-2 px-3"
            >
              <span>Buka Jaga Watt</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </GradientButton>
          </div>

        </div>
      </div>

      {/* TAHAP PENGHUBUNG: GERBANG KEPUTUSAN (Jembatan antara Asesmen & Implementasi) */}
      <div className="w-full min-w-0 bg-[#FAFBF4] border-2 border-[#C5CCAE] rounded-[16px] p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-[#E4E8D6] text-[#4B5D2A] border border-[#C5CCAE] flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
            <span className="material-symbols-outlined text-[24px]">verified_user</span>
          </div>
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-extrabold uppercase tracking-wider bg-[#F6E7BD] text-[#825708] px-2.5 py-0.5 rounded-full border border-[#EED38A]">
                Tahap Penghubung Musyawarah
              </span>
              <h3 className="text-[16px] font-black text-[#1F2A14]">
                Gerbang Keputusan (Daftar Periksa Persiapan)
              </h3>
            </div>
            <p className="text-[12.5px] text-[#3A4728] leading-relaxed max-w-3xl">
              Tahap penghubung setelah <strong>Baca Desa</strong> dan <strong>Rancang Watt</strong> sebelum masuk ke tata kelola <strong>Kelola Bersama</strong> & <strong>Jaga Watt</strong>. Menyajikan daftar periksa persiapan: kesepakatan berita acara musdes, persetujuan warga, legalitas lahan, dan penetapan pendamping.
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <GradientButton
            onClick={() => setActivePage('gerbang-keputusan')}
            variant="green"
            size="md"
            className="flex items-center gap-1.5 cursor-pointer font-bold text-[13px] py-2.5 px-4 shadow-xs"
          >
            <span>Tinjau Gerbang Keputusan</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </GradientButton>
        </div>
      </div>

      {/* STRIP PERBANDINGAN TINGKAT KESIAPAN DESA BINAAN (Tanpa angka total) */}
      <div className="bg-[#F3F5EA] p-5 sm:p-6 rounded-[14px] border border-[#C5CCAE] shadow-xs w-full min-w-0">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h3 className="text-[15px] font-extrabold text-[#1F2A14] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4B5D2A] text-[19px]">
              compare_arrows
            </span>
            <span>Tinjauan Profil Kesiapan Sosial-Teknis Antar Desa Binaan</span>
          </h3>
          <span className="text-[11px] text-[#6B7753]">
            Pilih desa untuk meninjau profil pendampingan
          </span>
        </div>

        <div className="grid grid-cols-1 min-[800px]:grid-cols-2 min-[1200px]:grid-cols-3 gap-4 w-full min-w-0">
          {(Object.keys(villages) as VillageId[]).map((vId) => {
            const v = villages[vId];
            const isSelected = selectedVillageId === vId;

            // Qualitative level without numbers
            const levelLabel =
              vId === 'sumber-makmur'
                ? 'Tinggi'
                : vId === 'tirta-mukti'
                ? 'Menengah'
                : 'Rendah';

            const statusClass =
              levelLabel === 'Tinggi'
                ? 'bg-[#E2F0E4] text-[#27602C] border-[#C2E0C5]'
                : levelLabel === 'Menengah'
                ? 'bg-[#F6E7BD] text-[#825708] border-[#EED38A]'
                : 'bg-[#F9DFDC] text-[#8B281B] border-[#ECAAA4]';

            return (
              <div
                key={vId}
                onClick={() => setSelectedVillageId(vId)}
                className={`p-4 rounded-[12px] border transition-all cursor-pointer min-w-0 ${
                  isSelected
                    ? 'border-[#4B5D2A] bg-[#FAFBF4] ring-2 ring-[#4B5D2A]/30 shadow-xs'
                    : 'border-[#C5CCAE] bg-[#F3F5EA] hover:bg-[#FAFBF4]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5 gap-2">
                  <span className="font-extrabold text-[14px] text-[#1F2A14] truncate">{v.name}</span>
                  {isSelected && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#4B5D2A] text-[#F7F8EE] shrink-0">
                      Desa Aktif
                    </span>
                  )}
                </div>
                <div className="text-[12px] text-[#6B7753] mb-2 truncate">
                  Kapasitas: <CountUpNumber value={v.capacityKwp} /> kWp • {v.subdistrict}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#C5CCAE] text-[12px]">
                  <span className="font-bold text-[#6B7753]">Tingkat Kesiapan</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${statusClass}`}>
                    Level {levelLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
