import React, { useState } from 'react';
import { useDesaWatt } from '../context/DesaWattContext';
import { ManagementModel, ReadinessLevel, DemandScenario } from '../types';
import { GlowingMetricCard } from '@/components/ui/GlowingMetricCard';
import { CountUpNumber } from '@/components/ui/CountUpNumber';
import { GradientButton } from '@/components/ui/gradient-button';

export const RancangWatt: React.FC = () => {
  const {
    activeVillage,
    readinessLevel,
    recommendedModel,
    effectiveModel,
    setSelectedModelOverride,
    isModelMismatch,
    simulatorParams,
    setSimulatorParams,
    simulationResults,
    setActivePage,
  } = useDesaWatt();

  const {
    capexJuta,
    tariffPerKwh,
    productiveLoadPercent,
    monthlyContributionPerKK,
    horizonYears,
    panelDegradationPercentPerYear,
    batteryLifespanYears,
    batteryReplacementCostJuta,
    demandScenario = 'normal',
    stressScenarios = {
      pendapatanUsahaRendah: false,
      biayaBateraiNaik: false,
      gangguanLebihLama: false,
      keterlambatanPembayaran: false,
      perlindunganRumahTanggaRentan: false,
    },
    productiveLoadChecklist = {
      adaPermintaan: true,
      adaOperator: true,
      adaPasar: true,
      biayaLayak: true,
    },
  } = simulatorParams;

  // 6 Komponen Biaya Siklus Hidup Mikrogrid
  const costBreakdown = {
    biayaAwalCapexJuta: capexJuta,
    operasiRutinJutaPerThn: Math.round(capexJuta * 0.015 * 10) / 10,
    penggantianKomponenJuta: batteryReplacementCostJuta,
    degradasiTahunanPersen: panelDegradationPercentPerYear,
    biayaPengelolaJutaPerThn: Math.round(capexJuta * 0.01 * 10) / 10,
    danaDaruratJutaPerThn: Math.round(capexJuta * 0.008 * 10) / 10,
  };

  const isProductiveChecklistComplete =
    productiveLoadChecklist.adaPermintaan &&
    productiveLoadChecklist.adaOperator &&
    productiveLoadChecklist.adaPasar &&
    productiveLoadChecklist.biayaLayak;

  const handleToggleChecklist = (field: keyof typeof productiveLoadChecklist) => {
    setSimulatorParams((prev) => ({
      ...prev,
      productiveLoadChecklist: {
        ...prev.productiveLoadChecklist!,
        [field]: !prev.productiveLoadChecklist![field],
      },
    }));
  };

  const handleToggleStress = (field: keyof typeof stressScenarios) => {
    setSimulatorParams((prev) => ({
      ...prev,
      stressScenarios: {
        ...prev.stressScenarios!,
        [field]: !prev.stressScenarios![field],
      },
    }));
  };

  const handleDemandChange = (scenario: DemandScenario) => {
    setSimulatorParams((prev) => ({
      ...prev,
      demandScenario: scenario,
    }));
  };

  const modelsConfig: {
    id: ManagementModel;
    title: string;
    subtitle: string;
    description: string;
    targetLevel: ReadinessLevel;
    pros: string[];
    cons: string[];
  }[] = [
    {
      id: 'milik_koperasi',
      title: 'Milik Koperasi Penuh',
      subtitle: 'Kepemilikan Mandiri 100% Desa',
      description:
        'Koperasi Desa menguasai penuh aset PLTS, mengelola penjualan listrik langsung, dan menanggung dana cadangan baterai mandiri.',
      targetLevel: 'Tinggi',
      pros: ['Kedaulatan energi penuh', 'Seluruh laba masuk kas koperasi desa'],
      cons: ['Risiko capex penggantian baterai ditanggung desa 100%'],
    },
    {
      id: 'kemitraan',
      title: 'Kemitraan (JV BUMDes / Swasta)',
      subtitle: 'Bagi Hasil & Supervisi Teknis',
      description:
        'Kerja sama operasi dengan pengembang terpercaya. Risiko teknis dan capex baterai ditanggung bersama dengan pembagian hasil transparan.',
      targetLevel: 'Menengah',
      pros: ['Pendampingan teknis berkelanjutan', 'Bagi risiko suku cadang'],
      cons: ['Marjin kas bersih terbagi', 'Butuh regulasi SPK kemitraan yang ketat'],
    },
    {
      id: 'eaas',
      title: 'Energy-as-a-Service (EaaS)',
      subtitle: 'Sewa Jasa Energi Tanpa Beban Capex',
      description:
        'Desa hanya membayar listrik yang terpakai. Pihak ketiga memiliki aset dan bertanggung jawab 100% atas baterai, inverter, dan operasional.',
      targetLevel: 'Rendah',
      pros: ['Bebas beban penggantian baterai', 'Jaminan SLA uptime tinggi'],
      cons: ['Aset bukan milik desa', 'Tarif ditentukan kontrak jangka panjang'],
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-16 text-[#3A4728] min-w-0">
      {/* Page Title & Navigation Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 w-full min-w-0">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#E4E8D6] text-[#4B5D2A] border border-[#C5CCAE]">
              Komponen 4 • Rancang Watt
            </span>
            <span className="text-[#C5CCAE]">•</span>
            <span className="text-[12px] font-semibold text-[#6B7753]">
              Desa: {activeVillage.name} (Kesiapan: Level {readinessLevel})
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAFBF4] border border-[#C5CCAE] text-[#6B7753] font-bold">
              Data ilustratif
            </span>
          </div>
          <h1 className="text-[26px] sm:text-[28px] font-black text-[#1F2A14] tracking-tight leading-tight">
            Rancang Watt: Komponen Biaya, Uji Skenario & Model Pengelolaan
          </h1>
          <p className="text-[13.5px] sm:text-[14px] text-[#3A4728] mt-1 max-w-3xl leading-relaxed">
            Menghitung 6 komponen biaya siklus hidup, menguji ketahanan finansial desa terhadap skenario permintaan dan guncangan risiko, serta memastikan beban produktif tidak dimasukkan tanpa bukti kelayakan riil.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <GradientButton
            onClick={() => setActivePage('gerbang-keputusan')}
            variant="green"
            size="md"
            className="inline-flex items-center gap-2 font-bold text-[13px] shadow-sm cursor-pointer group py-2.5 px-5"
          >
            <span>Lanjut ke Gerbang Keputusan</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </GradientButton>
        </div>
      </div>

      {/* CATATAN PENTING MANDATRI */}
      <div className="rounded-[14px] bg-[#F6E7BD] border-2 border-[#E0A526] p-4.5 shadow-xs flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-[#FAFBF4] text-[#825708] border border-[#EED38A] flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[24px] text-[#E0A526]">warning</span>
        </div>
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[10.5px] uppercase font-black px-2 py-0.5 rounded bg-[#825708] text-[#FAFBF4]">
              Prinsip Kehati-hatian Finansial
            </span>
            <span className="text-[11px] text-[#825708] font-bold">Catatan Verifikasi Data</span>
          </div>
          <p className="text-[13.5px] sm:text-[14px] font-bold text-[#825708] leading-snug">
            &ldquo;Nilai NPV, payback, dan saldo O&M baru dihitung setelah data beban, tarif, CAPEX/OPEX, garansi, dan penawaran pemasok tersedia.&rdquo;
          </p>
          <p className="text-[12px] text-[#7A4F06] leading-relaxed">
            Angka-angka dalam simulator ini bersifat estimasi awal simulasi (data ilustratif). Keputusan investasi dan penetapan tarif wajib didasarkan pada penawaran riil vendor dan hasil konsultasi musyawarah desa.
          </p>
        </div>
      </div>

      {/* BAGIAN 1: PEMISAHAN 6 KOMPONEN BIAYA */}
      <div className="bg-[#F3F5EA] p-6 rounded-[14px] border border-[#C5CCAE] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#C5CCAE]">
          <div>
            <h3 className="text-[16px] font-extrabold text-[#1F2A14] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4B5D2A] text-[20px]">account_tree</span>
              <span>1. Pemisahan 6 Komponen Biaya Siklus Hidup PLTS</span>
            </h3>
            <p className="text-[12px] text-[#6B7753]">
              Transparansi seluruh pos biaya: awal, rutin, penggantian, degradasi, pengelola, dan dana darurat.
            </p>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded bg-[#FAFBF4] border border-[#C5CCAE] text-[#4B5D2A] self-start sm:self-auto">
            Struktur Biaya Komprehensif
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 1. Biaya Awal (CAPEX) */}
          <div className="p-4.5 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] shadow-xs space-y-1.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-extrabold uppercase text-[#6B7753]">
                  1. Biaya Awal (CAPEX)
                </span>
                <span className="w-2 h-2 rounded-full bg-[#4B5D2A]"></span>
              </div>
              <div className="text-[22px] font-black text-[#1F2A14]">
                Rp <CountUpNumber value={costBreakdown.biayaAwalCapexJuta} /> Juta
              </div>
              <p className="text-[11.5px] text-[#3A4728] mt-1 leading-relaxed">
                Pengadaan panel surya, inverter, baterai tahap-1, tiang distribusi kabel, instalasi penangkal petir, dan sertifikat SLO.
              </p>
            </div>
            <div className="pt-2 text-[10.5px] text-[#6B7753] border-t border-[#C5CCAE]/60">
              Dibayarkan di Tahun ke-0
            </div>
          </div>

          {/* 2. Operasi Rutin (OPEX) */}
          <div className="p-4.5 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] shadow-xs space-y-1.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-extrabold uppercase text-[#6B7753]">
                  2. Operasi Rutin (OPEX)
                </span>
                <span className="w-2 h-2 rounded-full bg-[#4C9A52]"></span>
              </div>
              <div className="text-[22px] font-black text-[#1F2A14]">
                Rp <CountUpNumber value={costBreakdown.operasiRutinJutaPerThn} /> Jt / thn
              </div>
              <p className="text-[11.5px] text-[#3A4728] mt-1 leading-relaxed">
                Pembersihan debu modul surya, filter udara inverter, penggantian sekring, pemangkasan dahan pohon, dan logistik lapangan.
              </p>
            </div>
            <div className="pt-2 text-[10.5px] text-[#6B7753] border-t border-[#C5CCAE]/60">
              Rata-rata 1.5% - 2.5% Capex per tahun
            </div>
          </div>

          {/* 3. Penggantian Komponen */}
          <div className="p-4.5 rounded-xl bg-[#FAFBF4] border border-[#EED38A] bg-amber-50/40 shadow-xs space-y-1.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-extrabold uppercase text-[#825708]">
                  3. Penggantian Komponen
                </span>
                <span className="w-2 h-2 rounded-full bg-[#E0A526]"></span>
              </div>
              <div className="text-[22px] font-black text-[#825708]">
                Rp <CountUpNumber value={costBreakdown.penggantianKomponenJuta} /> Juta
              </div>
              <p className="text-[11.5px] text-[#3A4728] mt-1 leading-relaxed">
                Penggantian bank baterai komunal di Tahun ke-{batteryLifespanYears} serta peremajaan inverter di siklus umur teknis.
              </p>
            </div>
            <div className="pt-2 text-[10.5px] text-[#825708] font-bold border-t border-[#EED38A]/60">
              Momen kritis dana cadangan (sinking fund)
            </div>
          </div>

          {/* 4. Degradasi Tahunan */}
          <div className="p-4.5 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] shadow-xs space-y-1.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-extrabold uppercase text-[#6B7753]">
                  4. Penurunan Kapasitas (Degradasi)
                </span>
                <span className="w-2 h-2 rounded-full bg-[#A65B2A]"></span>
              </div>
              <div className="text-[22px] font-black text-[#1F2A14]">
                {costBreakdown.degradasiTahunanPersen}% / tahun
              </div>
              <p className="text-[11.5px] text-[#3A4728] mt-1 leading-relaxed">
                Degradasi fotovoltaik alami modul surya dan penuaan sel baterai yang mengurangi output energi harian secara bertahap.
              </p>
            </div>
            <div className="pt-2 text-[10.5px] text-[#6B7753] border-t border-[#C5CCAE]/60">
              Diperhitungkan dalam produksi energi tahunan
            </div>
          </div>

          {/* 5. Biaya Pengelola */}
          <div className="p-4.5 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] shadow-xs space-y-1.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-extrabold uppercase text-[#6B7753]">
                  5. Biaya Pengelola & Honor
                </span>
                <span className="w-2 h-2 rounded-full bg-[#27602C]"></span>
              </div>
              <div className="text-[22px] font-black text-[#1F2A14]">
                Rp <CountUpNumber value={costBreakdown.biayaPengelolaJutaPerThn} /> Jt / thn
              </div>
              <p className="text-[11.5px] text-[#3A4728] mt-1 leading-relaxed">
                Insentif/honor 3 teknisi lokal terlatih, biaya administrasi pembukuan kas koperasi, dan rapat pengawas pertanggungjawaban.
              </p>
            </div>
            <div className="pt-2 text-[10.5px] text-[#6B7753] border-t border-[#C5CCAE]/60">
              Menjaga motivasi & dedikasi operator lokal
            </div>
          </div>

          {/* 6. Dana Darurat */}
          <div className="p-4.5 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] shadow-xs space-y-1.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-extrabold uppercase text-[#6B7753]">
                  6. Alokasi Dana Darurat
                </span>
                <span className="w-2 h-2 rounded-full bg-[#B84A3A]"></span>
              </div>
              <div className="text-[22px] font-black text-[#1F2A14]">
                Rp <CountUpNumber value={costBreakdown.danaDaruratJutaPerThn} /> Jt / thn
              </div>
              <p className="text-[11.5px] text-[#3A4728] mt-1 leading-relaxed">
                Cadangan kontinjensi untuk kerusakan mendadak akibat petir, tiang tumbang tertimpa pohon, atau bencana cuaca ekstrem.
              </p>
            </div>
            <div className="pt-2 text-[10.5px] text-[#6B7753] border-t border-[#C5CCAE]/60">
              Mencegah pemadaman total berlarut-larut
            </div>
          </div>
        </div>
      </div>

      {/* BAGIAN 2: DISIPLIN BEBAN PRODUKTIF & CHECKLIST 4 SYARAT */}
      <div className="bg-[#F3F5EA] p-6 rounded-[14px] border border-[#C5CCAE] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#C5CCAE]">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10.5px] font-black uppercase bg-[#F6E7BD] text-[#825708] border border-[#EED38A]">
                Disiplin Asesmen
              </span>
              <h3 className="text-[16px] font-extrabold text-[#1F2A14]">
                2. Checklist Kelayakan Beban Produktif
              </h3>
            </div>
            <p className="text-[12px] text-[#6B7753] mt-0.5">
              Beban produktif hanya boleh dipilih bila ada permintaan, operator, pasar, dan biaya layak. Jangan dimasukkan hanya untuk memperindah kelayakan.
            </p>
          </div>
          <span
            className={`text-[11px] font-extrabold px-3 py-1 rounded-full border self-start sm:self-auto ${
              isProductiveChecklistComplete
                ? 'bg-[#E2F0E4] text-[#27602C] border-[#C2E0C5]'
                : 'bg-[#F9DFDC] text-[#8B281B] border-[#ECAAA4]'
            }`}
          >
            {isProductiveChecklistComplete ? '✓ Syarat Lengkap' : '⚠️ Belum Lengkap (Beban = 0%)'}
          </span>
        </div>

        {/* 4 Checklist Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Syarat 1: Permintaan */}
          <label className="p-3.5 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] hover:border-[#4B5D2A] flex items-start gap-3 cursor-pointer transition-all">
            <input
              type="checkbox"
              checked={productiveLoadChecklist.adaPermintaan}
              onChange={() => handleToggleChecklist('adaPermintaan')}
              className="w-4 h-4 rounded text-[#4B5D2A] mt-0.5 cursor-pointer accent-[#4B5D2A]"
            />
            <div className="text-[12px]">
              <strong className="text-[#1F2A14] block">1. Ada Permintaan Riil</strong>
              <span className="text-[#6B7753] text-[11px] leading-snug block mt-0.5">
                Ada usaha produktif warga (penggilingan kopi, pompa, bengkel las) yang benar-benar membutuhkan daya.
              </span>
            </div>
          </label>

          {/* Syarat 2: Operator */}
          <label className="p-3.5 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] hover:border-[#4B5D2A] flex items-start gap-3 cursor-pointer transition-all">
            <input
              type="checkbox"
              checked={productiveLoadChecklist.adaOperator}
              onChange={() => handleToggleChecklist('adaOperator')}
              className="w-4 h-4 rounded text-[#4B5D2A] mt-0.5 cursor-pointer accent-[#4B5D2A]"
            />
            <div className="text-[12px]">
              <strong className="text-[#1F2A14] block">2. Ada Operator Terlatih</strong>
              <span className="text-[#6B7753] text-[11px] leading-snug block mt-0.5">
                Ada tenaga pengelola mesin yang memahami etika menyalakan alat hanya pada siang hari (09:00 - 14:00).
              </span>
            </div>
          </label>

          {/* Syarat 3: Pasar */}
          <label className="p-3.5 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] hover:border-[#4B5D2A] flex items-start gap-3 cursor-pointer transition-all">
            <input
              type="checkbox"
              checked={productiveLoadChecklist.adaPasar}
              onChange={() => handleToggleChecklist('adaPasar')}
              className="w-4 h-4 rounded text-[#4B5D2A] mt-0.5 cursor-pointer accent-[#4B5D2A]"
            />
            <div className="text-[12px]">
              <strong className="text-[#1F2A14] block">3. Ada Pasar / Pembeli</strong>
              <span className="text-[#6B7753] text-[11px] leading-snug block mt-0.5">
                Hasil produksi komoditas desa memiliki penyerap atau pembeli rutin yang menjamin perputaran ekonomi.
              </span>
            </div>
          </label>

          {/* Syarat 4: Biaya Layak */}
          <label className="p-3.5 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] hover:border-[#4B5D2A] flex items-start gap-3 cursor-pointer transition-all">
            <input
              type="checkbox"
              checked={productiveLoadChecklist.biayaLayak}
              onChange={() => handleToggleChecklist('biayaLayak')}
              className="w-4 h-4 rounded text-[#4B5D2A] mt-0.5 cursor-pointer accent-[#4B5D2A]"
            />
            <div className="text-[12px]">
              <strong className="text-[#1F2A14] block">4. Biaya Layak & Masuk Akal</strong>
              <span className="text-[#6B7753] text-[11px] leading-snug block mt-0.5">
                Tarif listrik yang dibayar usaha mampu menutup biaya listrik dan menghasilkan keuntungan bersih wajar.
              </span>
            </div>
          </label>
        </div>

        {/* Warning jika checklist belum lengkap */}
        {!isProductiveChecklistComplete && (
          <div className="p-4 rounded-xl bg-[#F9DFDC] border border-[#ECAAA4] flex items-start gap-3 text-[12px] text-[#8B281B]">
            <span className="material-symbols-outlined text-[20px] text-[#B84A3A] shrink-0 mt-0.5">
              block
            </span>
            <div className="leading-relaxed">
              <strong>Peringatan Disiplin Kelayakan:</strong> Porsi beban produktif dinonaktifkan (dianggap 0% dalam simulasi). Jangan memasukkan asumsi beban produktif hanya untuk membuat grafik kelayakan terlihat bagus, kecuali keempat prasyarat telah diverifikasi nyata di lapangan.
            </div>
          </div>
        )}
      </div>

      {/* BAGIAN 3: PEMILIH SKENARIO & STRESS-TEST */}
      <div className="bg-[#F3F5EA] p-6 rounded-[14px] border border-[#C5CCAE] shadow-xs space-y-5">
        <div className="pb-3 border-b border-[#C5CCAE]">
          <h3 className="text-[16px] font-extrabold text-[#1F2A14] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4B5D2A] text-[20px]">psychology_alt</span>
            <span>3. Pemilih Skenario Permintaan & Uji Ketahanan (Stress Test)</span>
          </h3>
          <p className="text-[12px] text-[#6B7753] mt-0.5">
            Uji sensitivitas model keuangan mikrogrid jika terjadi ketidakpastian ekonomi atau gangguan teknis di masa depan.
          </p>
        </div>

        {/* Pemilih Skenario Permintaan (Rendah / Normal / Tinggi) */}
        <div>
          <label className="block text-[12px] font-bold text-[#1F2A14] mb-2">
            Tingkat Permintaan Listrik Warga & Usaha:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(['rendah', 'normal', 'tinggi'] as const).map((sc) => (
              <button
                key={sc}
                type="button"
                onClick={() => handleDemandChange(sc)}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  demandScenario === sc
                    ? 'bg-[#FAFBF4] border-2 border-[#4B5D2A] shadow-sm font-black ring-2 ring-[#4B5D2A]/20'
                    : 'bg-[#FAFBF4]/70 border-[#C5CCAE] hover:bg-[#FAFBF4]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-extrabold capitalize text-[#1F2A14]">
                    Permintaan {sc}
                  </span>
                  <span className="text-[11px] font-bold text-[#6B7753]">
                    {sc === 'rendah' ? '-20% Beban' : sc === 'tinggi' ? '+20% Beban' : 'Baseline 100%'}
                  </span>
                </div>
                <p className="text-[11px] text-[#6B7753] mt-1 leading-snug">
                  {sc === 'rendah'
                    ? 'Konsumsi warga berhati-hati, alat produktif hanya beroperasi paruh waktu.'
                    : sc === 'normal'
                    ? 'Pola pemakaian stabil sesuai survei pemetaan beban awal musdes.'
                    : 'Aktivitas UMKM berkembang pesat dan sambungan rumah bertambah.'}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* 5 Skenario Stress-Test Khusus */}
        <div>
          <label className="block text-[12px] font-bold text-[#1F2A14] mb-2">
            Skenario Sensitivitas & Guncangan Risiko (Aktifkan untuk simulasi skenario buruk):
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* 1. Pendapatan usaha lebih rendah */}
            <div
              onClick={() => handleToggleStress('pendapatanUsahaRendah')}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                stressScenarios.pendapatanUsahaRendah
                  ? 'bg-[#F9DFDC]/80 border-[#B84A3A]'
                  : 'bg-[#FAFBF4] border-[#C5CCAE] hover:border-[#4B5D2A]'
              }`}
            >
              <input
                type="checkbox"
                checked={stressScenarios.pendapatanUsahaRendah}
                onChange={() => {}}
                className="w-4 h-4 rounded text-[#B84A3A] mt-0.5 cursor-pointer accent-[#B84A3A]"
              />
              <div className="text-[11.5px]">
                <strong className="text-[#1F2A14] block">Pendapatan Usaha Lebih Rendah</strong>
                <span className="text-[#6B7753] leading-snug block mt-0.5">
                  Hasil penjualan listrik UMKM merosot 25% dari proyeksi awal.
                </span>
              </div>
            </div>

            {/* 2. Biaya baterai naik */}
            <div
              onClick={() => handleToggleStress('biayaBateraiNaik')}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                stressScenarios.biayaBateraiNaik
                  ? 'bg-[#F9DFDC]/80 border-[#B84A3A]'
                  : 'bg-[#FAFBF4] border-[#C5CCAE] hover:border-[#4B5D2A]'
              }`}
            >
              <input
                type="checkbox"
                checked={stressScenarios.biayaBateraiNaik}
                onChange={() => {}}
                className="w-4 h-4 rounded text-[#B84A3A] mt-0.5 cursor-pointer accent-[#B84A3A]"
              />
              <div className="text-[11.5px]">
                <strong className="text-[#1F2A14] block">Biaya Baterai Naik (+30%)</strong>
                <span className="text-[#6B7753] leading-snug block mt-0.5">
                  Harga penggantian baterai di pasar melonjak 30% pada tahun penggantian.
                </span>
              </div>
            </div>

            {/* 3. Gangguan lebih lama */}
            <div
              onClick={() => handleToggleStress('gangguanLebihLama')}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                stressScenarios.gangguanLebihLama
                  ? 'bg-[#F9DFDC]/80 border-[#B84A3A]'
                  : 'bg-[#FAFBF4] border-[#C5CCAE] hover:border-[#4B5D2A]'
              }`}
            >
              <input
                type="checkbox"
                checked={stressScenarios.gangguanLebihLama}
                onChange={() => {}}
                className="w-4 h-4 rounded text-[#B84A3A] mt-0.5 cursor-pointer accent-[#B84A3A]"
              />
              <div className="text-[11.5px]">
                <strong className="text-[#1F2A14] block">Gangguan Lebih Lama (+25% OPEX)</strong>
                <span className="text-[#6B7753] leading-snug block mt-0.5">
                  Kerusakan cuaca berulang menambah frekuensi perbaikan dan biaya teknisi.
                </span>
              </div>
            </div>

            {/* 4. Keterlambatan pembayaran */}
            <div
              onClick={() => handleToggleStress('keterlambatanPembayaran')}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                stressScenarios.keterlambatanPembayaran
                  ? 'bg-[#F9DFDC]/80 border-[#B84A3A]'
                  : 'bg-[#FAFBF4] border-[#C5CCAE] hover:border-[#4B5D2A]'
              }`}
            >
              <input
                type="checkbox"
                checked={stressScenarios.keterlambatanPembayaran}
                onChange={() => {}}
                className="w-4 h-4 rounded text-[#B84A3A] mt-0.5 cursor-pointer accent-[#B84A3A]"
              />
              <div className="text-[11.5px]">
                <strong className="text-[#1F2A14] block">Keterlambatan Pembayaran (-15%)</strong>
                <span className="text-[#6B7753] leading-snug block mt-0.5">
                  Kepatuhan pembayaran iuran warga menurun 15% pada musim paceklik.
                </span>
              </div>
            </div>

            {/* 5. Kebutuhan perlindungan rumah tangga rentan */}
            <div
              onClick={() => handleToggleStress('perlindunganRumahTanggaRentan')}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                stressScenarios.perlindunganRumahTanggaRentan
                  ? 'bg-[#F6E7BD] border-[#E0A526]'
                  : 'bg-[#FAFBF4] border-[#C5CCAE] hover:border-[#4B5D2A]'
              }`}
            >
              <input
                type="checkbox"
                checked={stressScenarios.perlindunganRumahTanggaRentan}
                onChange={() => {}}
                className="w-4 h-4 rounded text-[#E0A526] mt-0.5 cursor-pointer accent-[#E0A526]"
              />
              <div className="text-[11.5px]">
                <strong className="text-[#1F2A14] block">Perlindungan Rumah Tangga Rentan</strong>
                <span className="text-[#6B7753] leading-snug block mt-0.5">
                  Alokasi subsidi silang tarif dasar afirmasi untuk keluarga lansia/prasejahtera.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HASIL SIMULASI ARUS KAS & KPI HASIL UJI */}
      <div className="grid grid-cols-1 min-[1100px]:grid-cols-12 gap-6 items-start w-full min-w-0">
        {/* Sliders Kontrol (5 cols) */}
        <div className="min-[1100px]:col-span-5 bg-[#F3F5EA] p-6 rounded-[14px] border border-[#C5CCAE] shadow-xs space-y-4.5 w-full min-w-0">
          <div className="pb-3 border-b border-[#C5CCAE]">
            <h4 className="text-[15px] font-extrabold text-[#1F2A14]">
              Parameter Finansial Dasar
            </h4>
            <p className="text-[11px] text-[#6B7753]">
              Sesuaikan besaran variabel untuk analisis sensitivitas
            </p>
          </div>

          {/* Slider 1: Capex */}
          <div>
            <div className="flex justify-between items-center text-[12px] font-bold mb-1">
              <span className="text-[#3A4728]">Belanja Modal (Capex PLTS)</span>
              <span className="text-[#4B5D2A] font-black">
                Rp <CountUpNumber value={capexJuta} /> Juta
              </span>
            </div>
            <input
              type="range"
              min="300"
              max="1200"
              step="50"
              value={capexJuta}
              onChange={(e) =>
                setSimulatorParams((p) => ({ ...p, capexJuta: Number(e.target.value) }))
              }
              className="w-full accent-[#4B5D2A] cursor-pointer"
            />
          </div>

          {/* Slider 2: Tarif Listrik */}
          <div>
            <div className="flex justify-between items-center text-[12px] font-bold mb-1">
              <span className="text-[#3A4728]">Tarif Listrik Produktif</span>
              <span className="text-[#4B5D2A] font-black">
                Rp <CountUpNumber value={tariffPerKwh} /> / kWh
              </span>
            </div>
            <input
              type="range"
              min="1500"
              max="4000"
              step="100"
              value={tariffPerKwh}
              onChange={(e) =>
                setSimulatorParams((p) => ({ ...p, tariffPerKwh: Number(e.target.value) }))
              }
              className="w-full accent-[#4B5D2A] cursor-pointer"
            />
          </div>

          {/* Slider 3: Beban Produktif % (Hanya jika checklist lengkap) */}
          <div className={!isProductiveChecklistComplete ? 'opacity-50 pointer-events-none' : ''}>
            <div className="flex justify-between items-center text-[12px] font-bold mb-1">
              <span className="text-[#3A4728]">Porsi Beban Produktif UMKM</span>
              <span className="text-[#4B5D2A] font-black">
                {isProductiveChecklistComplete ? productiveLoadPercent : 0}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="70"
              step="5"
              disabled={!isProductiveChecklistComplete}
              value={productiveLoadPercent}
              onChange={(e) =>
                setSimulatorParams((p) => ({
                  ...p,
                  productiveLoadPercent: Number(e.target.value),
                }))
              }
              className="w-full accent-[#4B5D2A] cursor-pointer"
            />
          </div>

          {/* Slider 4: Iuran Bulanan per KK */}
          <div>
            <div className="flex justify-between items-center text-[12px] font-bold mb-1">
              <span className="text-[#3A4728]">Iuran Rutin per KK</span>
              <span className="text-[#4B5D2A] font-black">
                Rp <CountUpNumber value={monthlyContributionPerKK} /> / bln
              </span>
            </div>
            <input
              type="range"
              min="30000"
              max="150000"
              step="5000"
              value={monthlyContributionPerKK}
              onChange={(e) =>
                setSimulatorParams((p) => ({
                  ...p,
                  monthlyContributionPerKK: Number(e.target.value),
                }))
              }
              className="w-full accent-[#4B5D2A] cursor-pointer"
            />
          </div>

          {/* Horizon Selection */}
          <div className="pt-2 border-t border-[#C5CCAE]/60">
            <span className="text-[12px] font-bold text-[#3A4728] block mb-1.5">
              Horizon Simulasi
            </span>
            <div className="grid grid-cols-3 gap-2">
              {([10, 15, 20] as const).map((h) => (
                <button
                  key={h}
                  onClick={() => setSimulatorParams((p) => ({ ...p, horizonYears: h }))}
                  className={`py-1.5 rounded-lg text-[12px] font-bold transition-all cursor-pointer ${
                    horizonYears === h
                      ? 'bg-[#4B5D2A] text-[#F7F8EE] shadow-xs'
                      : 'bg-[#FAFBF4] text-[#3A4728] hover:bg-[#E4E8D6] border border-[#C5CCAE]'
                  }`}
                >
                  {h} Tahun
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Outcomes (7 cols) */}
        <div className="min-[1100px]:col-span-7 space-y-4 w-full min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <GlowingMetricCard>
              <div className="p-4.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7753]">
                  Net Present Value (NPV)
                </span>
                <div
                  className={`text-[20px] font-black mt-1 ${
                    simulationResults.npvJuta >= 0 ? 'text-[#4C9A52]' : 'text-[#B84A3A]'
                  }`}
                >
                  Rp <CountUpNumber value={simulationResults.npvJuta} /> Jt
                </div>
                <span className="text-[10.5px] text-[#6B7753]">
                  {simulationResults.npvJuta >= 0 ? '✓ Arus Kas Positif' : '⚠️ Defisit Nilai Sekarang'}
                </span>
              </div>
            </GlowingMetricCard>

            <GlowingMetricCard>
              <div className="p-4.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7753]">
                  Payback Period
                </span>
                <div className="text-[20px] font-black text-[#1F2A14] mt-1">
                  <CountUpNumber value={simulationResults.paybackPeriodYears} /> Tahun
                </div>
                <span className="text-[10.5px] text-[#4C9A52] font-bold">
                  Rata-rata: Rp <CountUpNumber value={simulationResults.netAnnualAverageJuta} /> Jt/thn
                </span>
              </div>
            </GlowingMetricCard>

            <GlowingMetricCard>
              <div className="p-4.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7753]">
                  Kecukupan Sinking Fund
                </span>
                <div
                  className={`text-[20px] font-black mt-1 ${
                    simulationResults.batteryFundSufficient ? 'text-[#4C9A52]' : 'text-[#D99A1E]'
                  }`}
                >
                  {simulationResults.batteryFundSufficient ? 'TERPENUHI' : 'DEFISIT DANA'}
                </div>
                <span className="text-[10.5px] text-[#6B7753]">
                  Tahun ke-{batteryLifespanYears}: Ganti Baterai
                </span>
              </div>
            </GlowingMetricCard>
          </div>

          {/* Cumulative Cash-Flow Chart */}
          <div className="bg-[#F3F5EA] p-5 rounded-[14px] border border-[#C5CCAE] shadow-xs w-full min-w-0">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-[14px] font-extrabold text-[#1F2A14]">
                  Proyeksi Saldo Akumulasi Dana O&M (Horizon {horizonYears} Tahun)
                </h4>
                <p className="text-[11px] text-[#6B7753]">
                  Penanda amber (Tahun ke-{batteryLifespanYears}) menandai momen kritis penggantian baterai
                </p>
              </div>
            </div>

            <div className="overflow-x-auto w-full pb-2">
              <div className="w-full min-w-[340px] h-40 flex items-end gap-1.5 pt-4 pb-2 border-b border-[#D3D9BE]">
                {simulationResults.yearlyData.map((d) => {
                  const maxVal = Math.max(
                    ...simulationResults.yearlyData.map((x) => Math.abs(x.omFundAccumulationJuta)),
                    200
                  );
                  const heightPercent = Math.min(
                    Math.max((Math.abs(d.omFundAccumulationJuta) / maxVal) * 100, 10),
                    100
                  );
                  const isPositive = d.omFundAccumulationJuta >= 0;

                  return (
                    <div
                      key={d.year}
                      className="flex-1 flex flex-col items-center justify-end h-full group relative"
                    >
                      <div className="absolute -top-10 hidden group-hover:flex bg-[#1F2A14] text-[#F7F8EE] text-[10px] px-2 py-1 rounded shadow-md z-20 whitespace-nowrap border border-[#C5CCAE]">
                        Thn {d.year}: Rp {d.omFundAccumulationJuta} Jt
                      </div>

                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t-sm transition-all duration-500 ${
                          d.isBatteryYear
                            ? 'bg-[#E0A526] ring-2 ring-[#E0A526]/50'
                            : isPositive
                            ? 'bg-[#4B5D2A]'
                            : 'bg-[#B84A3A]'
                        }`}
                      ></div>
                      <span className="text-[9px] font-bold text-[#6B7753] mt-1">
                        {d.year}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#6B7753] pt-2.5 flex-wrap gap-2">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#4B5D2A]"></span>
                Saldo Dana O&M Surplus
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#E0A526]"></span>
                Tahun ke-{batteryLifespanYears} (Ganti Baterai)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#B84A3A]"></span>
                Defisit Kas
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* BAGIAN 4: PILIHAN MODEL KEPEMILIKAN */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[16px] font-extrabold text-[#1F2A14]">
            4. Pilihan Model Kepemilikan & Tata Kelola
          </h3>
          <span className="text-[12px] text-[#6B7753]">
            Sinyal rekomendasi sistem:{' '}
            <strong className="text-[#4B5D2A]">
              {recommendedModel === 'milik_koperasi'
                ? 'Milik Koperasi'
                : recommendedModel === 'kemitraan'
                ? 'Kemitraan (JV BUMDes)'
                : 'EaaS'}
            </strong>
          </span>
        </div>

        <div className="grid grid-cols-1 min-[900px]:grid-cols-3 gap-4 w-full min-w-0">
          {modelsConfig.map((m) => {
            const isSelected = effectiveModel === m.id;
            const isRecommended = recommendedModel === m.id;

            return (
              <div
                key={m.id}
                onClick={() => setSelectedModelOverride(m.id)}
                className={`p-5 rounded-[14px] border transition-all cursor-pointer flex flex-col justify-between relative ${
                  isSelected
                    ? 'border-[#4B5D2A] bg-[#FAFBF4] ring-2 ring-[#4B5D2A]/30 shadow-md'
                    : 'border-[#C5CCAE] bg-[#F3F5EA] hover:border-[#4B5D2A] shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7753]">
                      Target Kesiapan: Level {m.targetLevel}
                    </span>
                    {isRecommended && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-[#E4E8D6] text-[#4B5D2A] border border-[#C5CCAE]">
                        Disarankan
                      </span>
                    )}
                  </div>

                  <h4 className="text-[17px] font-black text-[#1F2A14]">{m.title}</h4>
                  <span className="text-[12px] font-bold text-[#4B5D2A] block mb-2">
                    {m.subtitle}
                  </span>
                  <p className="text-[12px] text-[#3A4728] leading-relaxed mb-4">
                    {m.description}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-[#C5CCAE] text-[11px]">
                    <div className="text-[#3A4728]">
                      <strong className="text-[#4C9A52]">Kelebihan:</strong> {m.pros.join(', ')}
                    </div>
                    <div className="text-[#6B7753]">
                      <strong className="text-[#D99A1E]">Tantangan:</strong> {m.cons.join(', ')}
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#C5CCAE] flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#6B7753]">
                    Klik untuk memilih model
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? 'border-[#4B5D2A] bg-[#4B5D2A] text-[#F7F8EE]'
                        : 'border-[#C5CCAE] bg-white'
                    }`}
                  >
                    {isSelected && (
                      <span className="material-symbols-outlined text-[14px]">done</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="p-5 rounded-[14px] bg-[#FAFBF4] border border-[#C5CCAE] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-[12px] text-[#6B7753] space-y-0.5">
          <div className="flex items-center gap-1.5 font-bold text-[#1F2A14]">
            <span className="material-symbols-outlined text-[#4C9A52] text-[16px]">check_circle</span>
            <span>DesaWatt Alat Bantu Analisis Finansial Terpadu</span>
          </div>
          <p>
            Keputusan model kepemilikan dan penetapan tarif wajib disepakati lewat musyawarah desa.
          </p>
        </div>

        <GradientButton
          onClick={() => setActivePage('gerbang-keputusan')}
          variant="green"
          size="md"
          className="inline-flex items-center gap-2 font-bold text-[13px]"
        >
          <span>Lanjut ke Gerbang Keputusan</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </GradientButton>
      </div>
    </div>
  );
};
