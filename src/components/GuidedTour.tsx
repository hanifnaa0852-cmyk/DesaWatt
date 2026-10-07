import React, { useState, useEffect } from 'react';
import { useDesaWatt } from '../context/DesaWattContext';

interface TourStep {
  title: string;
  badge: string;
  icon: string;
  page: 'beranda' | 'baca-desa' | 'rancang-watt' | 'gerbang-keputusan' | 'jaga-watt';
  targetSelector?: string;
  description: string;
  tip: string;
}

export const GuidedTour: React.FC = () => {
  const { isTourOpen, setIsTourOpen, setActivePage, setIsPublicPortal } = useDesaWatt();
  const [currentStep, setCurrentStep] = useState(0);

  const steps: TourStep[] = [
    {
      title: 'Selamat Datang di DesaWatt!',
      badge: 'Pengenalan Sistem',
      icon: 'explore',
      page: 'beranda',
      description:
        'DesaWatt adalah sistem pendukung keputusan dan tata kelola PLTS Komunal Desa berbasis Koperasi Merah Putih untuk mencegah proyek listrik surya mangkrak.',
      tip: 'Anda dapat memilih desa percontohan (Kab. Mukomuko) di menu atas kapan saja untuk melihat dinamika data simulasi yang berbeda.',
    },
    {
      title: 'Beranda: Dasbor Kendali & KPI Operasional',
      badge: 'Menu 1 • Beranda',
      icon: 'dashboard',
      page: 'beranda',
      description:
        'Pantau feed telemetri real-time daya sesaat (kW), produksi harian kWh, rasio iuran warga terkumpul, estimasi emisi terhindar, serta kecukupan saldo dana cadangan O&M.',
      tip: 'Kartu ringkasan di bagian bawah memungkinkan Anda membandingkan skor kesiapan antar desa binaan.',
    },
    {
      title: 'Pilar 1: Baca Desa (Diagnostik 8 Indikator)',
      badge: 'Menu 2 • Baca Desa',
      icon: 'fact_check',
      page: 'baca-desa',
      description:
        'Evaluasi mandiri kesiapan desa melalui 8 indikator kunci yang dipetakan ke dalam grafik radar 4 dimensi: Potensi Teknis, Beban Produktif, Kesiapan Fiskal, dan Tata Kelola Koperasi.',
      tip: 'Skor agregat (0–120) otomatis menentukan rekomendasi model bisnis yang paling aman bagi desa.',
    },
    {
      title: 'Pilar 2: Rancang Watt (Simulasi Model & Arus Kas)',
      badge: 'Menu 3 • Rancang Watt',
      icon: 'solar_power',
      page: 'rancang-watt',
      description:
        'Pilih model kepemilikan aset (Milik Koperasi, Kemitraan JV, atau EaaS) dan uji ketahanan fiskal desa melalui simulasi arus kas 15–20 tahun dengan pelacak penggantian baterai di tahun ke-11.',
      tip: 'Jika memilih model yang melebihi kesiapan desa, sistem akan memunculkan peringatan inkonsistensi.',
    },
    {
      title: 'Gerbang Keputusan: Validasi Musdes & Kelayakan',
      badge: 'Menu 4 • Gerbang',
      icon: 'verified_user',
      page: 'gerbang-keputusan',
      description:
        'Pintu verifikasi kelayakan mutlak 5 syarat sebelum dana desa atau APBN dialokasikan untuk pembangunan fisik PLTS. Mencegah komisioning terburu-buru tanpa komitmen musyawarah warga.',
      tip: 'Semua 5 kriteria harus berstatus HIJAU agar surat rekomendasi kesiapan dapat dicetak.',
    },
    {
      title: 'Pilar 3: Jaga Watt (M&E, Baterai & Cegah Mangkrak)',
      badge: 'Menu 5 • Jaga Watt',
      icon: 'monitor_heart',
      page: 'jaga-watt',
      description:
        'Sistem pemantauan telemetri kurva surya vs beban desa 24 jam, status kesehatan modul baterai LiFePO4 per cell, serta sistem deteksi dini 4 dimensi operasional.',
      tip: 'Peringatan dini aktif jika suhu baterai di atas batas wajar atau rasio iuran warga menurun tajam.',
    },
    {
      title: 'Portal Warga: Transparansi Publik Terbuka',
      badge: 'Keterbukaan Publik',
      icon: 'public',
      page: 'beranda',
      description:
        'Akses mandiri yang ramah masyarakat desa untuk melihat performa listrik dan dana iuran warga secara transparan, lengkap dengan formulir Lapor Masalah Gangguan.',
      tip: 'Dapat diakses oleh siapa saja tanpa akun melalui tombol "Portal Warga" di bar navigasi atas.',
    },
  ];

  useEffect(() => {
    if (isTourOpen) {
      const step = steps[currentStep];
      if (step) {
        setIsPublicPortal(false);
        setActivePage(step.page);
      }
    }
  }, [currentStep, isTourOpen]);

  if (!isTourOpen) return null;

  const step = steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLast) {
      handleComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    try {
      localStorage.setItem('desawatt_tour_completed', 'true');
    } catch {
      // Ignored
    }
    setIsTourOpen(false);
    setCurrentStep(0);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 select-none">
      {/* Soft translucent backdrop */}
      <div
        onClick={handleComplete}
        className="fixed inset-0 bg-[#1F2A14]/60 backdrop-blur-[3px] transition-opacity"
      />

      {/* Tour Dialog Card in Army / Warm Olive Theme */}
      <div className="relative z-10 w-full max-w-xl bg-[#F3F5EA] border border-[#C5CCAE] rounded-[14px] shadow-2xl p-6 md:p-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#C5CCAE]">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#E4E8D6] text-[#4B5D2A] border border-[#C5CCAE] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">{step.icon}</span>
            </span>
            <div className="flex flex-col">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#6B7753]">
                {step.badge}
              </span>
              <span className="text-[12px] font-bold text-[#1F2A14]">
                Langkah {currentStep + 1} dari {steps.length}
              </span>
            </div>
          </div>

          <button
            onClick={handleComplete}
            title="Tutup Tur"
            className="w-8 h-8 rounded-lg text-[#6B7753] hover:text-[#1F2A14] hover:bg-[#E4E8D6] flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="py-5 space-y-4">
          <h3 className="text-[20px] md:text-[22px] font-black text-[#1F2A14] tracking-tight leading-snug">
            {step.title}
          </h3>

          <p className="text-[14px] text-[#3A4728] leading-relaxed">
            {step.description}
          </p>

          {/* Warm Amber Tip Box */}
          <div className="bg-[#FAFBF4] border border-[#C5CCAE] rounded-xl p-3.5 flex items-start gap-3">
            <span className="material-symbols-outlined text-[#E0A526] text-[20px] shrink-0 mt-0.5">
              lightbulb
            </span>
            <p className="text-[12px] text-[#3A4728] leading-relaxed">
              <strong className="text-[#1F2A14]">Tips Navigasi: </strong>
              {step.tip}
            </p>
          </div>
        </div>

        {/* Step dots indicator */}
        <div className="flex items-center justify-center gap-1.5 pb-5">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentStep
                  ? 'w-6 bg-[#4B5D2A]'
                  : 'w-2 bg-[#C5CCAE] hover:bg-[#6B7753]'
              }`}
              title={`Buka langkah ${idx + 1}`}
            />
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-[#C5CCAE]">
          <button
            onClick={handleComplete}
            className="text-[12px] font-bold text-[#6B7753] hover:text-[#1F2A14] underline underline-offset-4 cursor-pointer"
          >
            Lewati Tur
          </button>

          <div className="flex items-center gap-2.5">
            {!isFirst && (
              <button
                onClick={handlePrev}
                className="px-4 py-2 rounded-xl border border-[#4B5D2A] bg-[#F3F5EA] hover:bg-[#E4E8D6] text-[#3A4728] text-[13px] font-bold transition-all cursor-pointer"
              >
                Sebelumnya
              </button>
            )}
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#4B5D2A] hover:bg-[#3F4E2C] text-[#F7F8EE] text-[13px] font-bold shadow-sm transition-all cursor-pointer"
            >
              <span>{isLast ? 'Selesai & Jelajahi' : 'Lanjut'}</span>
              <span className="material-symbols-outlined text-[16px]">
                {isLast ? 'check' : 'arrow_forward'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
