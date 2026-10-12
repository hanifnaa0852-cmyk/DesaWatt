import React, { useState } from 'react';
import { useDesaWatt } from '../context/DesaWattContext';
import { DesaWattLogoMark } from '../components/DesaWattLogoMark';
import { GlowingMetricCard } from '@/components/ui/GlowingMetricCard';
import { CountUpNumber } from '@/components/ui/CountUpNumber';

export const PortalWarga: React.FC = () => {
  const {
    activeVillage,
    readinessLevel,
    setIsPublicPortal,
    citizenReports,
    addCitizenReport,
    simulatorParams,
  } = useDesaWatt();

  // Perhitungan dinamis dari data desa dan simulatorParams
  const targetBattery = simulatorParams.batteryReplacementCostJuta || activeVillage.targetBatteryFundJuta || 180;
  const batteryPercent = targetBattery > 0 
    ? Math.round((activeVillage.saldoDanaOMJuta / targetBattery) * 1000) / 10 
    : 0; // Mengikuti asumsi harga ganti baterai dinamis
  const totalKK = activeVillage.connectionsKK || 240;
  // Iuran 206 dari 240 KK = 86% (sudah benar, hitung dari data)
  const paidKK = Math.round((activeVillage.collectionRatePercent / 100) * totalKK);
  const collectionPercent = totalKK > 0 ? Math.round((paidKK / totalKK) * 100) : activeVillage.collectionRatePercent;

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportCategory, setReportCategory] = useState<string>('Panel/Listrik padam');
  const [reportDescription, setReportDescription] = useState('');
  const [reportLocation, setReportLocation] = useState('');
  const [lastSubmittedReport, setLastSubmittedReport] = useState<{ id: string; status: string } | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Filter laporan warga desa aktif
  const villageReports = citizenReports.filter((r) => r.villageId === activeVillage.id);
  const countDiterima = villageReports.filter((r) => r.status === 'Diterima').length;
  const countDitinjau = villageReports.filter((r) => r.status === 'Ditinjau').length;
  const countDitindaklanjuti = villageReports.filter((r) => r.status === 'Ditindaklanjuti').length;
  const totalLaporan = villageReports.length;

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportDescription.trim()) return;

    const newId = `LAP-${Date.now().toString().slice(-4)}`;
    const locationVal = reportLocation.trim() || 'Desa setempat';

    addCitizenReport({
      villageId: activeVillage.id,
      category: reportCategory,
      description: reportDescription,
      location: locationVal,
      isAnonymous: true,
      reporterName: 'Warga',
    });

    setLastSubmittedReport({ id: newId, status: 'Diterima' });
    setReportDescription('');
    setReportLocation('');
    setSubmitSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#E4E8D6] text-[#3A4728] flex flex-col justify-between selection:bg-[#4B5D2A] selection:text-[#F7F8EE]">
      {/* Standalone Public Header (No Sidebar) in Army Theme */}
      <header className="sticky top-0 z-50 bg-[#F3F5EA] border-b border-[#C5CCAE] px-4 sm:px-6 py-2.5 min-h-16 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-1 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] shadow-xs flex items-center justify-center">
            <DesaWattLogoMark size={36} className="shrink-0" />
          </div>
          <div>
            <h1 className="text-[17px] font-black text-[#1F2A14] leading-tight">
              DesaWatt Transparansi Publik
            </h1>
            <p className="text-[11px] text-[#6B7753] font-medium">
              Sistem Keterbukaan Energi Komunal {activeVillage.name}, {activeVillage.regency}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6E7BD] text-[#825708] border border-[#EED38A] text-[12px] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#E0A526]"></span>
            <span>Status: {activeVillage.statusPLTS} (Perawatan Rutin)</span>
          </div>

          <button
            onClick={() => setShowReportModal(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#4B5D2A] text-[#F7F8EE] text-[13px] font-bold hover:bg-[#3F4E2C] shadow-xs cursor-pointer transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">report_problem</span>
            <span>Lapor Masalah</span>
          </button>

          <button
            onClick={() => setIsPublicPortal(false)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#4B5D2A] bg-[#F3F5EA] text-[#3A4728] hover:bg-[#E4E8D6] text-[12px] font-bold transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#4B5D2A]">admin_panel_settings</span>
            <span>Masuk Portal Pengurus</span>
          </button>
        </div>
      </header>

      {/* Main Public Content */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6 flex-1 min-w-0">
        {/* Civic Announcement Banner in Army Green Gradient */}
        <div className="rounded-[14px] bg-gradient-to-r from-[#4B5D2A] via-[#556930] to-[#5E7336] border border-[#5E7336] p-6 shadow-md text-[#F7F8EE] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-extrabold uppercase tracking-wider bg-[#E4E8D6] text-[#4B5D2A] px-2.5 py-0.5 rounded-full border border-[#C5CCAE]">
                Keterbukaan Publik Desa
              </span>
              <span className="text-[11px] font-bold bg-[#FAFBF4] text-[#1F2A14] px-2.5 py-0.5 rounded-full border border-[#C5CCAE]">
                Profil Kesiapan: Level {readinessLevel}
              </span>
              <span className="text-[11px] text-[#D4DCBC]">
                Pembaruan terakhir: 5 Menit Lalu (13:45 WIB)
              </span>
            </div>
            <h2 className="text-[26px] font-black text-[#F7F8EE] tracking-tight">
              Listrik Surya Desa Kita — {activeVillage.name}
            </h2>
            <p className="text-[13px] text-[#F7F8EE]/90 max-w-3xl leading-relaxed">
              Portal pemantauan publik mandiri untuk mengawal keandalan pasokan listrik, pembagian
              beban produktif, dan dana iuran cadangan baterai warga secara transparan dan akuntabel.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowReportModal(true)}
              className="px-4 py-2.5 rounded-xl bg-[#FAFBF4] text-[#1F2A14] text-[13px] font-bold hover:bg-[#E4E8D6] shadow-sm cursor-pointer border border-[#C5CCAE]"
            >
              Lapor Gangguan Listrik
            </button>
          </div>
        </div>

        {/* Operational Status Strip */}
        <div className="bg-[#F6E7BD] border border-[#EED38A] rounded-[14px] p-4.5 flex items-start gap-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-[#FAFBF4] text-[#E0A526] border border-[#EED38A] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">warning</span>
          </div>
          <div>
            <h3 className="text-[14px] font-black text-[#825708]">
              Status Operasional Jaringan: WASPADA (Perawatan Rutin)
            </h3>
            <p className="text-[12px] text-[#7A4F06] mt-0.5 leading-relaxed">
              Pemberitahuan Sistem: Inverter Unit 2 terjadwal pembersihan debu rutin sore ini (16:30
              WIB) oleh {activeVillage.technicianName}. Pasokan rumah warga tetap aman
              dialihkan ke Jalur Sirkuit 1.
            </p>
          </div>
        </div>

        {/* 4 Telemetry Spec Badges with Glowing Effect */}
        <div className="grid grid-cols-1 sm:grid-cols-2 min-[1100px]:grid-cols-4 gap-4 w-full min-w-0">
          <GlowingMetricCard>
            <div className="p-4.5 flex flex-col justify-between h-full">
              <span className="text-[11px] font-bold text-[#6B7753] uppercase block">
                Kapasitas Array Surya
              </span>
              <div className="text-[24px] font-black text-[#1F2A14] mt-0.5">
                <CountUpNumber value={activeVillage.capacityKwp} /> kWp
              </div>
              <span className="text-[11px] text-[#4C9A52] font-bold">140 Modul Monokristalin</span>
            </div>
          </GlowingMetricCard>

          <GlowingMetricCard>
            <div className="p-4.5 flex flex-col justify-between h-full">
              <span className="text-[11px] font-bold text-[#6B7753] uppercase block">
                Sambungan Terlayani
              </span>
              <div className="text-[24px] font-black text-[#1F2A14] mt-0.5">
                <CountUpNumber value={activeVillage.connectionsKK} /> KK
              </div>
              <span className="text-[11px] text-[#3A4728] font-semibold">+ Usaha & Fasum Desa</span>
            </div>
          </GlowingMetricCard>

          <GlowingMetricCard>
            <div className="p-4.5 flex flex-col justify-between h-full">
              <span className="text-[11px] font-bold text-[#6B7753] uppercase block">
                Penyimpanan Baterai
              </span>
              <div className="text-[24px] font-black text-[#1F2A14] mt-0.5">
                <CountUpNumber value={activeVillage.batteryKwh} /> kWh
              </div>
              <span className="text-[11px] text-[#4C9A52] font-bold">
                SOC Saat Ini: <CountUpNumber value={91} />% (Penuh)
              </span>
            </div>
          </GlowingMetricCard>

          <GlowingMetricCard>
            <div className="p-4.5 flex flex-col justify-between h-full">
              <span className="text-[11px] font-bold text-[#6B7753] uppercase block">
                Keandalan (Uptime)
              </span>
              <div className="text-[24px] font-black text-[#1F2A14] mt-0.5">
                <CountUpNumber value={99.4} decimals={1} />%
              </div>
              <span className="text-[11px] text-[#4C9A52] font-bold">Bebas Pemadaman Massal</span>
            </div>
          </GlowingMetricCard>
        </div>

        {/* 3 Main Desktop Dashboard Columns */}
        <div className="grid grid-cols-1 min-[1100px]:grid-cols-3 gap-6 items-start w-full min-w-0">
          {/* Column 1: Produksi Harian */}
          <div className="bg-[#F3F5EA] p-6 rounded-[14px] border border-[#C5CCAE] shadow-xs space-y-4 w-full min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-extrabold text-[#1F2A14]">
                Produksi Surya Hari Ini
              </h3>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#E4E8D6] text-[#4B5D2A] border border-[#C5CCAE]">
                Live Telemetri
              </span>
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <span className="text-[11px] font-bold text-[#6B7753] uppercase">
                  Total Energi Masuk
                </span>
                <div className="text-[36px] font-black text-[#1F2A14] tracking-tight">
                  <CountUpNumber value={activeVillage.productionTodayKwh} />{' '}
                  <span className="text-[16px] text-[#6B7753] font-semibold">kWh</span>
                </div>
                <span className="text-[12px] text-[#4C9A52] font-bold">
                  <CountUpNumber value={88.7} decimals={1} />% dari target harian (160 kWh)
                </span>
              </div>

              {/* Mini Gauge */}
              <div className="w-20 h-20 rounded-full border-4 border-[#4B5D2A] border-t-[#D3D9BE] flex flex-col items-center justify-center font-black text-[15px] text-[#4B5D2A] bg-[#FAFBF4]">
                <CountUpNumber value={88.7} decimals={1} />%
                <span className="text-[8px] text-[#6B7753] font-bold uppercase">Tercapai</span>
              </div>
            </div>

            <div className="p-3 bg-[#FAFBF4] rounded-xl text-[12px] text-[#3A4728] leading-relaxed border border-[#C5CCAE]">
              <strong className="text-[#1F2A14]">Daya tersimpan cukup</strong> untuk menyalakan
              seluruh <CountUpNumber value={activeVillage.connectionsKK} /> KK dan penerangan jalan hingga fajar esok hari.
            </div>

            {/* Environmental badges */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-[#E2F0E4] rounded-xl border border-[#C2E0C5]">
                <span className="text-[10px] font-bold text-[#6B7753] uppercase block">
                  Emisi Terhindar <span className="italic">(estimasi demo)</span>
                </span>
                <div className="text-[16px] font-black text-[#27602C]">
                  <CountUpNumber value={214} /> kg CO₂
                </div>
              </div>
              <div className="p-3 bg-[#F6E7BD] rounded-xl border border-[#EED38A]">
                <span className="text-[10px] font-bold text-[#6B7753] uppercase block">
                  Solar Dihemat <span className="italic">(estimasi demo)</span>
                </span>
                <div className="text-[16px] font-black text-[#825708]">
                  <CountUpNumber value={78} /> Liter
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Alokasi Beban Aktif Desa */}
          <div className="bg-[#F3F5EA] p-6 rounded-[14px] border border-[#C5CCAE] shadow-xs space-y-4 w-full min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-extrabold text-[#1F2A14]">
                Alokasi Beban Aktif Desa
              </h3>
              <span className="text-[11px] font-bold text-[#6B7753]">
                Total: <CountUpNumber value={142} /> kWh
              </span>
            </div>

            <p className="text-[12px] text-[#3A4728] leading-relaxed">
              Penyaluran listrik diatur sesuai mufakat warga untuk ketahanan pangan dan penerangan:
            </p>

            {/* Sector 1 */}
            <div className="p-3 bg-[#FAFBF4] rounded-xl space-y-1.5 border border-[#C5CCAE]">
              <div className="flex justify-between items-center text-[12px] font-bold">
                <span className="text-[#1F2A14]">Rumah Tangga ({activeVillage.connectionsKK} KK)</span>
                <span className="text-[#4C9A52] font-black">
                  <CountUpNumber value={68} />% (<CountUpNumber value={96.5} decimals={1} /> kWh)
                </span>
              </div>
              <div className="w-full bg-[#D3D9BE] h-2 rounded-full overflow-hidden">
                <div className="bg-[#4B5D2A] h-full rounded-full transition-all duration-700" style={{ width: '68%' }}></div>
              </div>
              <span className="text-[10px] text-[#6B7753] block">Rata-rata 400 Wh / rumah</span>
            </div>

            {/* Sector 2 */}
            <div className="p-3 bg-[#FAFBF4] rounded-xl space-y-1.5 border border-[#C5CCAE]">
              <div className="flex justify-between items-center text-[12px] font-bold">
                <span className="text-[#1F2A14]">Cold Storage Nelayan & Sayur</span>
                <span className="text-[#D99A1E] font-black">
                  <CountUpNumber value={21} />% (<CountUpNumber value={29.8} decimals={1} /> kWh)
                </span>
              </div>
              <div className="w-full bg-[#D3D9BE] h-2 rounded-full overflow-hidden">
                <div className="bg-[#E0A526] h-full rounded-full transition-all duration-700" style={{ width: '21%' }}></div>
              </div>
              <span className="text-[10px] text-[#6B7753] block">Suhu stabil -2.4°C</span>
            </div>

            {/* Sector 3 */}
            <div className="p-3 bg-[#FAFBF4] rounded-xl space-y-1.5 border border-[#C5CCAE]">
              <div className="flex justify-between items-center text-[12px] font-bold">
                <span className="text-[#1F2A14]">Pabrik Es & Penggilingan Padi</span>
                <span className="text-[#6B7753] font-black">
                  <CountUpNumber value={11} />% (<CountUpNumber value={15.7} decimals={1} /> kWh)
                </span>
              </div>
              <div className="w-full bg-[#D3D9BE] h-2 rounded-full overflow-hidden">
                <div className="bg-[#6B7753] h-full rounded-full transition-all duration-700" style={{ width: '11%' }}></div>
              </div>
              <span className="text-[10px] text-[#6B7753] block">Jam produktif: 09:00 - 15:00</span>
            </div>
          </div>

          {/* Column 3: Iuran & Dana O&M */}
          <div className="bg-[#F3F5EA] p-6 rounded-[14px] border border-[#C5CCAE] shadow-xs space-y-4 w-full min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-extrabold text-[#1F2A14]">Iuran & Dana O&M</h3>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#E4E8D6] text-[#4B5D2A] border border-[#C5CCAE]">
                Audit Terbuka
              </span>
            </div>

            {/* Iuran bulanan */}
            <div className="p-3.5 bg-[#FAFBF4] rounded-xl space-y-1.5 border border-[#C5CCAE]">
              <div className="flex justify-between items-baseline">
                <span className="text-[12px] text-[#6B7753] font-semibold">
                  Iuran Bulan Berjalan
                </span>
                <span className="text-[16px] font-black text-[#4C9A52]">
                  <CountUpNumber value={collectionPercent} />% Terkumpul
                </span>
              </div>
              <div className="w-full bg-[#D3D9BE] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#4B5D2A] h-full rounded-full transition-all duration-700"
                  style={{ width: `${collectionPercent}%` }}
                ></div>
              </div>
              <span className="text-[11px] text-[#6B7753] block">
                <CountUpNumber value={paidKK} /> dari <CountUpNumber value={totalKK} /> KK Lunas (Rp <CountUpNumber value={75000} /> / KK)
              </span>
            </div>

            {/* Saldo Dana O&M Terpadu */}
            <div className="p-3.5 bg-[#FAFBF4] rounded-xl border border-[#C5CCAE]">
              <span className="text-[11px] text-[#6B7753] font-bold uppercase block">
                Saldo Dana O&M
              </span>
              <div className="text-[22px] font-black text-[#1F2A14] mt-0.5">
                Rp <CountUpNumber value={activeVillage.saldoDanaOMJuta} />.000.000
              </div>
              <span className="text-[11px] text-[#4C9A52] font-semibold block mt-0.5">
                Tersedia untuk suku cadang, kabel, & honor teknisi lokal
              </span>
            </div>

            {/* Kartu Baterai Terpadu */}
            <div className="p-3.5 bg-[#F6E7BD] border border-[#EED38A] rounded-xl space-y-1.5">
              <div className="flex justify-between items-center text-[12px] font-bold text-[#825708]">
                <span>Alokasi Cadangan Penggantian Baterai</span>
                <span>
                  <CountUpNumber value={batteryPercent} decimals={1} />%
                </span>
              </div>
              <div className="w-full bg-[#EED38A] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#E0A526] h-full rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(100, batteryPercent)}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-[#7A4F06] leading-tight">
                Dari Dana O&M Rp <CountUpNumber value={activeVillage.saldoDanaOMJuta} /> Jt, {batteryPercent.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}% dari target penggantian baterai Rp <CountUpNumber value={targetBattery} /> Jt (Asumsi Umur {simulatorParams.batteryLifespanYears} Tahun)
              </p>
            </div>

            {/* Kontak teknisi */}
            <div className="pt-2 border-t border-[#C5CCAE] flex items-center justify-between">
              <div>
                <span className="text-[12px] font-bold text-[#1F2A14] block">
                  {activeVillage.technicianName}
                </span>
                <span className="text-[11px] text-[#6B7753]">
                  Posko Balai Desa • {activeVillage.technicianPhone}
                </span>
              </div>
              <a
                href={`tel:${activeVillage.technicianPhone}`}
                className="w-8 h-8 rounded-full bg-[#E4E8D6] text-[#4B5D2A] border border-[#C5CCAE] flex items-center justify-center hover:bg-[#4B5D2A] hover:text-[#F7F8EE] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
              </a>
            </div>
          </div>
        </div>

        {/* Ringkasan Musyawarah & Kesiapan Pengelolaan Desa (Dengar Warga, Belajar Energi, Kelola Bersama) */}
        <div className="bg-[#F3F5EA] rounded-[14px] p-4 sm:p-6 border border-[#C5CCAE] shadow-xs space-y-6 w-full min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#C5CCAE]">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#F6E7BD] text-[#825708] border border-[#EED38A]">
                  Keterbukaan Musyawarah Komunal
                </span>
                <h3 className="text-[18px] font-black text-[#1F2A14]">
                  Ringkasan Kesiapan & Hasil Pendampingan Warga
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FAFBF4] text-[#4B5D2A] border border-[#C5CCAE]">
                  Data ilustratif
                </span>
              </div>
              <p className="text-[12px] text-[#6B7753] mt-1">
                Transparansi hasil musyawarah Dengar Warga, pelatihan Belajar Energi, dan tata kelola Kelola Bersama yang tercatat di sistem desa.
              </p>
            </div>
          </div>

          {/* 3 Component Summaries Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 1. Ringkasan Dengar Warga */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] space-y-3.5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#C5CCAE]/60">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#4B5D2A] text-[#FAFBF4] flex items-center justify-center font-bold text-[12px]">
                      1
                    </span>
                    <h4 className="text-[14px] font-extrabold text-[#1F2A14]">Dengar Warga</h4>
                  </div>
                  <span className="text-[11px] font-bold text-[#6B7753]">
                    {activeVillage.dengarWarga?.tanggal || 'Musdes Terlaksana'}
                  </span>
                </div>

                {/* Callout Penanda */}
                <div className="p-2.5 rounded-lg bg-[#F6E7BD]/70 border border-[#EED38A] text-[11px] text-[#825708] font-semibold leading-relaxed">
                  &ldquo;Kehadiran saja tidak cukup; catat masukan mana yang mengubah desain.&rdquo;
                </div>

                {/* Partisipasi Kehadiran */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase text-[#6B7753] flex justify-between">
                    <span>Partisipasi Hadir</span>
                    <span className="font-extrabold text-[#1F2A14]">{activeVillage.dengarWarga?.jumlahHadir || 0} Warga</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                    <div className="p-1.5 rounded bg-[#F3F5EA] border border-[#C5CCAE]">
                      Perempuan: <strong>{activeVillage.dengarWarga?.kehadiranKategori?.perempuan || 0}</strong>
                    </div>
                    <div className="p-1.5 rounded bg-[#F3F5EA] border border-[#C5CCAE]">
                      Pemuda: <strong>{activeVillage.dengarWarga?.kehadiranKategori?.pemuda || 0}</strong>
                    </div>
                    <div className="p-1.5 rounded bg-[#F3F5EA] border border-[#C5CCAE]">
                      Kel. Rentan: <strong>{activeVillage.dengarWarga?.kehadiranKategori?.kelompokRentan || 0}</strong>
                    </div>
                    <div className="p-1.5 rounded bg-[#F3F5EA] border border-[#C5CCAE]">
                      Pelaku Usaha: <strong>{activeVillage.dengarWarga?.kehadiranKategori?.pelakuUsaha || 0}</strong>
                    </div>
                  </div>
                </div>

                {/* Prioritas Beban Teratas */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase text-[#6B7753] block">Prioritas Utama:</span>
                  <p className="text-[11.5px] font-medium text-[#1F2A14] bg-[#F3F5EA] p-2 rounded border border-[#C5CCAE] leading-snug">
                    {activeVillage.dengarWarga?.daftarPrioritas?.[0] || '1. Penerangan rumah tangga & darurat poskesdes'}
                  </p>
                </div>

                {/* Masukan yang Mengubah Desain */}
                {activeVillage.dengarWarga?.masukanMengubahDesain && activeVillage.dengarWarga.masukanMengubahDesain.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase text-[#27602C] block">
                      Masukan Mengubah Desain Terpilih:
                    </span>
                    <div className="p-2 rounded bg-[#E2F0E4]/60 border border-[#C2E0C5] text-[11px] text-[#27602C] leading-snug">
                      <strong>{activeVillage.dengarWarga.masukanMengubahDesain[0].pengusul}:</strong>{' '}
                      &ldquo;{activeVillage.dengarWarga.masukanMengubahDesain[0].perubahanDesain}&rdquo;
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Ringkasan Belajar Energi */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] space-y-3.5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#C5CCAE]/60">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#4B5D2A] text-[#FAFBF4] flex items-center justify-center font-bold text-[12px]">
                      2
                    </span>
                    <h4 className="text-[14px] font-extrabold text-[#1F2A14]">Belajar Energi</h4>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#E4E8D6] text-[#4B5D2A]">
                    Tahap {activeVillage.belajarEnergi?.currentStage || 1}: {
                      activeVillage.belajarEnergi?.currentStage === 1
                        ? 'Baseline'
                        : activeVillage.belajarEnergi?.currentStage === 2
                        ? 'Kasus'
                        : activeVillage.belajarEnergi?.currentStage === 3
                        ? 'Praktik'
                        : 'Tindak Lanjut'
                    }
                  </span>
                </div>

                <p className="text-[11.5px] text-[#6B7753] leading-relaxed">
                  Pelatihan berfokus pada etika beban komunal dan keselamatan K3 (bebas target buatan penurunan daya).
                </p>

                {/* Ringkasan Kelompok Terlatih */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase text-[#6B7753] block">Status 6 Kelompok Sasaran:</span>
                  <div className="space-y-1 max-h-[160px] overflow-y-auto pr-1">
                    {(activeVillage.belajarEnergi?.pelatihanList || []).map((pel) => (
                      <div
                        key={pel.id}
                        className="p-1.5 rounded bg-[#F3F5EA] border border-[#C5CCAE] flex items-center justify-between text-[11px]"
                      >
                        <span className="font-bold text-[#1F2A14] truncate max-w-[130px]">{pel.kelompok}</span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[#6B7753]">{pel.jumlahPeserta} org</span>
                          <span
                            className={`px-1.5 py-0.2 rounded text-[9.5px] font-bold ${
                              pel.tindakLanjut === 'Sudah'
                                ? 'bg-[#E2F0E4] text-[#27602C]'
                                : 'bg-[#F9DFDC] text-[#8B281B]'
                            }`}
                          >
                            TL: {pel.tindakLanjut}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Ringkasan Kelola Bersama */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#FAFBF4] border border-[#C5CCAE] space-y-3.5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#C5CCAE]/60">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#4B5D2A] text-[#FAFBF4] flex items-center justify-center font-bold text-[12px]">
                      3
                    </span>
                    <h4 className="text-[14px] font-extrabold text-[#1F2A14]">Kelola Bersama</h4>
                  </div>
                  <span className="text-[11px] font-bold text-[#6B7753]">
                    Tata Kelola & SOP
                  </span>
                </div>

                {/* Alert jika belum ada penanggung jawab operasi bernama */}
                {!activeVillage.kelolaBersama?.penanggungJawabOperasiNama ||
                activeVillage.kelolaBersama.penanggungJawabOperasiNama.trim() === '' ? (
                  <div className="p-2.5 rounded-lg bg-[#F9DFDC] border border-[#B84A3A] space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-black text-[#8B281B]">
                      <span className="material-symbols-outlined text-[16px] text-[#B84A3A]">warning</span>
                      <span>Belum ada penanggung jawab operasi bernama</span>
                    </div>
                    <p className="text-[10.5px] text-[#701E13] leading-relaxed">
                      Sistem berisiko mangkrak tanpa operator harian resmi.
                    </p>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-lg bg-[#E2F0E4] border border-[#C2E0C5] space-y-0.5">
                    <div className="text-[10px] font-bold uppercase text-[#27602C]">Penanggung Jawab Operasi Resmi</div>
                    <div className="text-[12px] font-black text-[#1F2A14]">
                      {activeVillage.kelolaBersama.penanggungJawabOperasiNama}
                    </div>
                  </div>
                )}

                {/* Status SOP & Pembukuan */}
                <div className="space-y-1.5 text-[11px]">
                  <div className="p-2 rounded bg-[#F3F5EA] border border-[#C5CCAE] flex items-center justify-between">
                    <span className="font-medium text-[#1F2A14]">SOP Operasi & K3:</span>
                    <span className="font-bold text-[#4B5D2A]">
                      {(activeVillage.kelolaBersama?.sops || []).filter((s) => s.status === 'Tersedia').length} /{' '}
                      {(activeVillage.kelolaBersama?.sops || []).length} Tersedia
                    </span>
                  </div>

                  <div className="p-2 rounded bg-[#F3F5EA] border border-[#C5CCAE] flex items-center justify-between">
                    <span className="font-medium text-[#1F2A14]">Status Pembukuan Kas:</span>
                    <span className="font-bold text-[#1F2A14]">
                      {activeVillage.kelolaBersama?.statusPembukuan || 'Tertib & Terbuka'}
                    </span>
                  </div>

                  <div className="p-2 rounded bg-[#F3F5EA] border border-[#C5CCAE] flex items-center justify-between">
                    <span className="font-medium text-[#1F2A14]">Kontrak Layanan:</span>
                    <span className="font-bold text-[#1F2A14]">
                      {activeVillage.kelolaBersama?.kontrakLayanan || 'Tersedia & Berlaku'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Civic Reporting & User Submissions List */}
        <div className="bg-[#F3F5EA] rounded-[14px] p-4 sm:p-6 border border-[#C5CCAE] shadow-xs space-y-5 w-full min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#C5CCAE]">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[18px] font-extrabold text-[#1F2A14]">
                  Layanan Partisipasi & Pengaduan Warga
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FAFBF4] text-[#4B5D2A] border border-[#C5CCAE]">
                  Data ilustratif
                </span>
              </div>
              <p className="text-[12px] text-[#6B7753]">
                Laporkan gangguan listrik, iuran dan keuangan, atau transparansi secara terbuka tanpa perlu login.
              </p>
            </div>
            <button
              onClick={() => {
                setSubmitSuccess(false);
                setLastSubmittedReport(null);
                setShowReportModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4B5D2A] text-[#F7F8EE] text-[13px] font-bold hover:bg-[#3F4E2C] shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Buat Pengaduan Baru</span>
            </button>
          </div>

          {/* Ringkasan Publik Laporan Warga */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#FAFBF4] p-3.5 rounded-xl border border-[#C5CCAE] text-center shadow-2xs">
              <span className="text-[11px] font-bold text-[#6B7753] uppercase block">Total Laporan</span>
              <span className="text-[22px] font-black text-[#1F2A14]">
                <CountUpNumber value={totalLaporan} />
              </span>
              <span className="text-[10px] text-[#6B7753] block">Semua pengaduan</span>
            </div>

            <div className="bg-[#FAFBF4] p-3.5 rounded-xl border border-[#C5CCAE] text-center shadow-2xs">
              <span className="text-[11px] font-bold text-[#6B7753] uppercase block">Diterima</span>
              <span className="text-[22px] font-black text-[#3A4728]">
                <CountUpNumber value={countDiterima} />
              </span>
              <span className="text-[10px] text-[#6B7753] block">Menunggu tinjauan</span>
            </div>

            <div className="bg-[#FAFBF4] p-3.5 rounded-xl border border-[#EED38A] text-center shadow-2xs">
              <span className="text-[11px] font-bold text-[#825708] uppercase block">Ditinjau</span>
              <span className="text-[22px] font-black text-[#D99A1E]">
                <CountUpNumber value={countDitinjau} />
              </span>
              <span className="text-[10px] text-[#825708] block">Sedang diverifikasi</span>
            </div>

            <div className="bg-[#FAFBF4] p-3.5 rounded-xl border border-[#C2E0C5] text-center shadow-2xs">
              <span className="text-[11px] font-bold text-[#27602C] uppercase block">Ditindaklanjuti</span>
              <span className="text-[22px] font-black text-[#4C9A52]">
                <CountUpNumber value={countDitindaklanjuti} />
              </span>
              <span className="text-[10px] text-[#27602C] block">Penanganan aktif</span>
            </div>
          </div>

          {/* List of citizen reports */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#6B7753] block">
                Daftar Laporan Warga Terkini ({villageReports.length})
              </span>
              <span className="text-[11px] text-[#6B7753]">
                Alur Status: <strong className="text-[#3A4728]">Diterima</strong> → <strong className="text-[#825708]">Ditinjau</strong> → <strong className="text-[#27602C]">Ditindaklanjuti</strong>
              </span>
            </div>

            {villageReports.length === 0 ? (
              <div className="p-6 text-center text-[12px] text-[#6B7753] bg-[#FAFBF4] rounded-xl border border-[#C5CCAE]">
                Belum ada laporan dari warga untuk desa ini. Klik "Buat Pengaduan Baru" untuk membuat laporan simulasi.
              </div>
            ) : (
              villageReports.map((rep) => (
                <div
                  key={rep.id}
                  className="p-4 rounded-xl border border-[#C5CCAE] bg-[#FAFBF4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#E4E8D6] text-[#4B5D2A] border border-[#C5CCAE]">
                        {rep.id}
                      </span>
                      <span className="text-[13px] font-extrabold text-[#1F2A14]">
                        {rep.category}
                      </span>
                      <span className="text-[#C5CCAE]">•</span>
                      <span className="text-[11px] text-[#3A4728]">{rep.location}</span>
                    </div>
                    <p className="text-[12px] text-[#3A4728] leading-relaxed">{rep.description}</p>
                    <div className="text-[11px] text-[#6B7753] flex items-center gap-2 pt-0.5">
                      <span>Oleh: {rep.reporterName || 'Warga'}</span>
                      <span>•</span>
                      <span>{rep.timestamp}</span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold border ${
                        rep.status === 'Ditindaklanjuti'
                          ? 'bg-[#E2F0E4] text-[#27602C] border-[#C2E0C5]'
                          : rep.status === 'Ditinjau'
                          ? 'bg-[#F6E7BD] text-[#825708] border-[#EED38A]'
                          : 'bg-[#F3F5EA] text-[#4B5D2A] border-[#C5CCAE]'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          rep.status === 'Ditindaklanjuti'
                            ? 'bg-[#4C9A52]'
                            : rep.status === 'Ditinjau'
                            ? 'bg-[#E0A526]'
                            : 'bg-[#4B5D2A]'
                        }`}
                      ></span>
                      {rep.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Report Modal in Army theme */}
        {showReportModal && (
          <div className="fixed inset-0 bg-[#1F2A14]/60 backdrop-blur-[3px] z-50 flex items-center justify-center p-4">
            <div className="bg-[#F3F5EA] border border-[#C5CCAE] rounded-[14px] max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150 text-[#3A4728]">
              <div className="flex items-center justify-between pb-3 border-b border-[#C5CCAE]">
                <div>
                  <h3 className="text-[17px] font-extrabold text-[#1F2A14]">
                    Formulir Lapor Masalah Warga
                  </h3>
                  <p className="text-[11px] text-[#6B7753]">
                    Tanpa perlu login akun • Data ilustratif
                  </p>
                </div>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="w-8 h-8 rounded-lg hover:bg-[#E4E8D6] flex items-center justify-center text-[#6B7753] hover:text-[#1F2A14] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              {submitSuccess && lastSubmittedReport ? (
                <div className="p-6 text-center space-y-3 bg-[#FAFBF4] rounded-xl border border-[#C5CCAE]">
                  <span className="material-symbols-outlined text-[#4C9A52] text-[48px]">
                    check_circle
                  </span>
                  <h4 className="text-[16px] font-black text-[#1F2A14]">Laporan Berhasil Dikirim!</h4>
                  <div className="p-3 bg-[#E4E8D6] rounded-lg border border-[#C5CCAE] space-y-1">
                    <div className="text-[12px] font-bold text-[#6B7753]">Nomor Laporan Anda:</div>
                    <div className="text-[18px] font-black text-[#4B5D2A]">{lastSubmittedReport.id}</div>
                    <div className="text-[12px] text-[#3A4728] pt-1">
                      Status Saat Ini: <span className="font-extrabold px-2 py-0.5 rounded bg-[#FAFBF4] border border-[#C5CCAE] text-[#4B5D2A]">{lastSubmittedReport.status}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#6B7753] leading-relaxed">
                    Alur penanganan: <strong>Diterima</strong> → <strong>Ditinjau</strong> → <strong>Ditindaklanjuti</strong>. Pengurus Koperasi dan Pendamping Desa dapat meninjau dan memperbarui status di halaman Jaga Watt.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setShowReportModal(false);
                      setSubmitSuccess(false);
                      setLastSubmittedReport(null);
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#4B5D2A] text-[#F7F8EE] font-bold text-[13px] hover:bg-[#3F4E2C] cursor-pointer"
                  >
                    Tutup & Lihat Daftar Laporan
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitReport} className="space-y-4 text-[13px]">
                  <div>
                    <label className="block text-[#1F2A14] font-bold mb-1">Kategori Masalah</label>
                    <select
                      value={reportCategory}
                      onChange={(e) => setReportCategory(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#C5CCAE] bg-[#FAFBF4] text-[#1F2A14] font-medium"
                    >
                      <option value="Panel/Listrik padam">Panel/Listrik padam</option>
                      <option value="Iuran dan keuangan">Iuran dan keuangan</option>
                      <option value="Transparansi">Transparansi</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#1F2A14] font-bold mb-1">
                      Nama RT / Dusun <span className="text-[#6B7753] font-normal text-[11px]">(Opsional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: RT 02 Dusun Barat"
                      value={reportLocation}
                      onChange={(e) => setReportLocation(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#C5CCAE] bg-[#FAFBF4] text-[#1F2A14] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[#1F2A14] font-bold mb-1">
                      Deskripsi Singkat Masalah <span className="text-[#B84A3A]">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Tuliskan kendala yang dihadapi secara singkat..."
                      value={reportDescription}
                      onChange={(e) => setReportDescription(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#C5CCAE] bg-[#FAFBF4] text-[#1F2A14] font-medium"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowReportModal(false)}
                      className="px-4 py-2 rounded-xl border border-[#4B5D2A] bg-[#F3F5EA] text-[#3A4728] font-bold hover:bg-[#E4E8D6] cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#4B5D2A] text-[#F7F8EE] font-bold hover:bg-[#3F4E2C] shadow-xs cursor-pointer"
                    >
                      Kirim Laporan
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Standalone Public Footer in Army theme */}
      <footer className="w-full py-3 border-t border-[#C5CCAE] bg-[#F3F5EA] px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[#6B7753] text-[12px] font-medium select-none shadow-[0_-1px_3px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4C9A52]"></span>
          <span className="text-[#3A4728]">Data demo bersifat ilustratif, bukan hasil pengukuran lapangan.</span>
        </div>
        <div className="text-[#6B7753]">
          <span>Koperasi Merah Putih Mandiri Energi © 2026</span>
        </div>
      </footer>
    </div>
  );
};
