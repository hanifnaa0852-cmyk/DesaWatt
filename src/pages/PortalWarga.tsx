import React, { useState } from 'react';
import { useDesaWatt } from '../context/DesaWattContext';
import { DesaWattLogoMark } from '../components/DesaWattLogoMark';
import { GlowingMetricCard } from '@/components/ui/GlowingMetricCard';

export const PortalWarga: React.FC = () => {
  const { activeVillage, setIsPublicPortal, citizenReports, addCitizenReport } = useDesaWatt();

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportCategory, setReportCategory] = useState('Lampu Redup / Tegangan Turun');
  const [reportDescription, setReportDescription] = useState('');
  const [reportLocation, setReportLocation] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [reporterName, setReporterName] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportDescription.trim() || !reportLocation.trim()) return;

    addCitizenReport({
      villageId: activeVillage.id,
      category: reportCategory,
      description: reportDescription,
      location: reportLocation,
      isAnonymous,
      reporterName: isAnonymous ? undefined : reporterName || 'Warga Desa',
    });

    setReportDescription('');
    setReportLocation('');
    setReporterName('');
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowReportModal(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#E4E8D6] text-[#3A4728] flex flex-col justify-between selection:bg-[#4B5D2A] selection:text-[#F7F8EE]">
      {/* Standalone Public Header (No Sidebar) in Army Theme */}
      <header className="sticky top-0 z-50 bg-[#F3F5EA] border-b border-[#C5CCAE] px-6 h-18 flex items-center justify-between shadow-xs">
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
      <main className="max-w-7xl mx-auto w-full px-6 py-8 space-y-6 flex-1">
        {/* Civic Announcement Banner in Army Green Gradient */}
        <div className="rounded-[14px] bg-gradient-to-r from-[#4B5D2A] via-[#556930] to-[#5E7336] border border-[#5E7336] p-6 shadow-md text-[#F7F8EE] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider bg-[#E4E8D6] text-[#4B5D2A] px-2.5 py-0.5 rounded-full border border-[#C5CCAE]">
                Keterbukaan Publik Desa
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
              WIB) oleh Teknisi Desa ({activeVillage.technicianName}). Pasokan rumah warga tetap aman
              dialihkan ke Jalur Sirkuit 1.
            </p>
          </div>
        </div>

        {/* 4 Telemetry Spec Badges with Glowing Effect */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <GlowingMetricCard>
            <div className="p-4.5 flex flex-col justify-between h-full">
              <span className="text-[11px] font-bold text-[#6B7753] uppercase block">
                Kapasitas Array Surya
              </span>
              <div className="text-[24px] font-black text-[#1F2A14] mt-0.5">
                {activeVillage.capacityKwp} kWp
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
                {activeVillage.connectionsKK} KK
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
                {activeVillage.batteryKwh} kWh
              </div>
              <span className="text-[11px] text-[#4C9A52] font-bold">SOC Saat Ini: 91% (Penuh)</span>
            </div>
          </GlowingMetricCard>

          <GlowingMetricCard>
            <div className="p-4.5 flex flex-col justify-between h-full">
              <span className="text-[11px] font-bold text-[#6B7753] uppercase block">
                Keandalan (Uptime)
              </span>
              <div className="text-[24px] font-black text-[#1F2A14] mt-0.5">99.4%</div>
              <span className="text-[11px] text-[#4C9A52] font-bold">Bebas Pemadaman Massal</span>
            </div>
          </GlowingMetricCard>
        </div>

        {/* 3 Main Desktop Dashboard Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Column 1: Produksi Harian (4 cols) */}
          <div className="lg:col-span-4 bg-[#F3F5EA] p-6 rounded-[14px] border border-[#C5CCAE] shadow-xs space-y-4">
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
                  {activeVillage.productionTodayKwh}{' '}
                  <span className="text-[16px] text-[#6B7753] font-semibold">kWh</span>
                </div>
                <span className="text-[12px] text-[#4C9A52] font-bold">
                  88.7% dari target harian (160 kWh)
                </span>
              </div>

              {/* Mini Gauge */}
              <div className="w-20 h-20 rounded-full border-4 border-[#4B5D2A] border-t-[#D3D9BE] flex flex-col items-center justify-center font-black text-[15px] text-[#4B5D2A] bg-[#FAFBF4]">
                88.7%
                <span className="text-[8px] text-[#6B7753] font-bold uppercase">Tercapai</span>
              </div>
            </div>

            <div className="p-3 bg-[#FAFBF4] rounded-xl text-[12px] text-[#3A4728] leading-relaxed border border-[#C5CCAE]">
              <strong className="text-[#1F2A14]">Daya tersimpan cukup</strong> untuk menyalakan
              seluruh {activeVillage.connectionsKK} KK dan penerangan jalan hingga fajar esok hari.
            </div>

            {/* Environmental badges */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-[#E2F0E4] rounded-xl border border-[#C2E0C5]">
                <span className="text-[10px] font-bold text-[#6B7753] uppercase block">
                  Emisi Terhindar <span className="italic">(estimasi demo)</span>
                </span>
                <div className="text-[16px] font-black text-[#27602C]">214 kg CO₂</div>
              </div>
              <div className="p-3 bg-[#F6E7BD] rounded-xl border border-[#EED38A]">
                <span className="text-[10px] font-bold text-[#6B7753] uppercase block">
                  Solar Dihemat <span className="italic">(estimasi demo)</span>
                </span>
                <div className="text-[16px] font-black text-[#825708]">78 Liter</div>
              </div>
            </div>
          </div>

          {/* Column 2: Alokasi Beban Aktif Desa (4 cols) */}
          <div className="lg:col-span-4 bg-[#F3F5EA] p-6 rounded-[14px] border border-[#C5CCAE] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-extrabold text-[#1F2A14]">
                Alokasi Beban Aktif Desa
              </h3>
              <span className="text-[11px] font-bold text-[#6B7753]">Total: 142 kWh</span>
            </div>

            <p className="text-[12px] text-[#3A4728] leading-relaxed">
              Penyaluran listrik diatur sesuai mufakat warga untuk ketahanan pangan dan penerangan:
            </p>

            {/* Sector 1 */}
            <div className="p-3 bg-[#FAFBF4] rounded-xl space-y-1.5 border border-[#C5CCAE]">
              <div className="flex justify-between items-center text-[12px] font-bold">
                <span className="text-[#1F2A14]">Rumah Tangga ({activeVillage.connectionsKK} KK)</span>
                <span className="text-[#4C9A52] font-black">68% (96.5 kWh)</span>
              </div>
              <div className="w-full bg-[#D3D9BE] h-2 rounded-full overflow-hidden">
                <div className="bg-[#4B5D2A] h-full rounded-full" style={{ width: '68%' }}></div>
              </div>
              <span className="text-[10px] text-[#6B7753] block">Rata-rata 400 Wh / rumah</span>
            </div>

            {/* Sector 2 */}
            <div className="p-3 bg-[#FAFBF4] rounded-xl space-y-1.5 border border-[#C5CCAE]">
              <div className="flex justify-between items-center text-[12px] font-bold">
                <span className="text-[#1F2A14]">Cold Storage Nelayan & Sayur</span>
                <span className="text-[#D99A1E] font-black">21% (29.8 kWh)</span>
              </div>
              <div className="w-full bg-[#D3D9BE] h-2 rounded-full overflow-hidden">
                <div className="bg-[#E0A526] h-full rounded-full" style={{ width: '21%' }}></div>
              </div>
              <span className="text-[10px] text-[#6B7753] block">Suhu stabil -2.4°C</span>
            </div>

            {/* Sector 3 */}
            <div className="p-3 bg-[#FAFBF4] rounded-xl space-y-1.5 border border-[#C5CCAE]">
              <div className="flex justify-between items-center text-[12px] font-bold">
                <span className="text-[#1F2A14]">Pabrik Es & Penggilingan Padi</span>
                <span className="text-[#6B7753] font-black">11% (15.7 kWh)</span>
              </div>
              <div className="w-full bg-[#D3D9BE] h-2 rounded-full overflow-hidden">
                <div className="bg-[#6B7753] h-full rounded-full" style={{ width: '11%' }}></div>
              </div>
              <span className="text-[10px] text-[#6B7753] block">Jam produktif: 09:00 - 15:00</span>
            </div>
          </div>

          {/* Column 3: Iuran & Dana O&M (4 cols) */}
          <div className="lg:col-span-4 bg-[#F3F5EA] p-6 rounded-[14px] border border-[#C5CCAE] shadow-xs space-y-4">
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
                  {activeVillage.collectionRatePercent}% Terkumpul
                </span>
              </div>
              <div className="w-full bg-[#D3D9BE] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#4B5D2A] h-full rounded-full"
                  style={{ width: `${activeVillage.collectionRatePercent}%` }}
                ></div>
              </div>
              <span className="text-[11px] text-[#6B7753] block">
                206 dari {activeVillage.connectionsKK} KK Lunas (Rp 75.000 / KK)
              </span>
            </div>

            {/* Saldo Dana O&M Terpadu */}
            <div className="p-3.5 bg-[#FAFBF4] rounded-xl border border-[#C5CCAE]">
              <span className="text-[11px] text-[#6B7753] font-bold uppercase block">
                Saldo Dana O&M
              </span>
              <div className="text-[22px] font-black text-[#1F2A14] mt-0.5">
                Rp {activeVillage.saldoDanaOMJuta}.000.000
              </div>
              <span className="text-[11px] text-[#4C9A52] font-semibold block mt-0.5">
                Tersedia untuk suku cadang, kabel, & honor teknisi lokal
              </span>
            </div>

            {/* Kartu Baterai Terpadu */}
            <div className="p-3.5 bg-[#F6E7BD] border border-[#EED38A] rounded-xl space-y-1.5">
              <div className="flex justify-between items-center text-[12px] font-bold text-[#825708]">
                <span>Alokasi Cadangan Penggantian Baterai</span>
                <span>25,5%</span>
              </div>
              <div className="w-full bg-[#EED38A] h-2 rounded-full overflow-hidden">
                <div className="bg-[#E0A526] h-full rounded-full" style={{ width: '25.5%' }}></div>
              </div>
              <p className="text-[11px] text-[#7A4F06] leading-tight">
                Dari Dana O&M Rp{activeVillage.saldoDanaOMJuta} Jt, 25,5% dari target penggantian baterai Rp{activeVillage.targetBatteryFundJuta} Jt
              </p>
            </div>

            {/* Kontak teknisi */}
            <div className="pt-2 border-t border-[#C5CCAE] flex items-center justify-between">
              <div>
                <span className="text-[12px] font-bold text-[#1F2A14] block">
                  {activeVillage.technicianName} (Teknisi Desa)
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

        {/* Civic Reporting & User Submissions List */}
        <div className="bg-[#F3F5EA] rounded-[14px] p-6 border border-[#C5CCAE] shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#C5CCAE]">
            <div>
              <h3 className="text-[18px] font-extrabold text-[#1F2A14]">
                Layanan Partisipasi & Pengaduan Warga
              </h3>
              <p className="text-[12px] text-[#6B7753]">
                Laporkan gangguan listrik, meteran bermasalah, atau pantau status penanganan secara
                transparan.
              </p>
            </div>
            <button
              onClick={() => setShowReportModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4B5D2A] text-[#F7F8EE] text-[13px] font-bold hover:bg-[#3F4E2C] shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Buat Pengaduan Baru</span>
            </button>
          </div>

          {/* List of citizen reports */}
          <div className="space-y-3">
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#6B7753] block">
              Daftar Laporan Warga Terkini ({citizenReports.length})
            </span>

            {citizenReports.map((rep) => (
              <div
                key={rep.id}
                className="p-4 rounded-xl border border-[#C5CCAE] bg-[#FAFBF4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-bold text-[#6B7753]">{rep.id}</span>
                    <span className="text-[#C5CCAE]">•</span>
                    <span className="text-[13px] font-extrabold text-[#1F2A14]">
                      {rep.category}
                    </span>
                    <span className="text-[#C5CCAE]">•</span>
                    <span className="text-[11px] text-[#3A4728]">{rep.location}</span>
                  </div>
                  <p className="text-[12px] text-[#3A4728] leading-relaxed">{rep.description}</p>
                  <div className="text-[11px] text-[#6B7753] flex items-center gap-2 pt-0.5">
                    <span>Oleh: {rep.isAnonymous ? 'Warga Anonim' : rep.reporterName}</span>
                    <span>•</span>
                    <span>{rep.timestamp}</span>
                  </div>
                </div>

                <div className="shrink-0">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${
                      rep.status === 'Selesai'
                        ? 'bg-[#E2F0E4] text-[#27602C] border-[#C2E0C5]'
                        : rep.status === 'Sedang Ditangani'
                        ? 'bg-[#F6E7BD] text-[#825708] border-[#EED38A]'
                        : 'bg-[#FAFBF4] text-[#6B7753] border-[#C5CCAE]'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        rep.status === 'Selesai'
                          ? 'bg-[#4C9A52]'
                          : rep.status === 'Sedang Ditangani'
                          ? 'bg-[#E0A526]'
                          : 'bg-[#6B7753]'
                      }`}
                    ></span>
                    {rep.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Report Modal in Army theme */}
        {showReportModal && (
          <div className="fixed inset-0 bg-[#1F2A14]/60 backdrop-blur-[3px] z-50 flex items-center justify-center p-4">
            <div className="bg-[#F3F5EA] border border-[#C5CCAE] rounded-[14px] max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150 text-[#3A4728]">
              <div className="flex items-center justify-between pb-3 border-b border-[#C5CCAE]">
                <h3 className="text-[17px] font-extrabold text-[#1F2A14]">
                  Formulir Pengaduan / Keluhan Warga
                </h3>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="w-8 h-8 rounded-lg hover:bg-[#E4E8D6] flex items-center justify-center text-[#6B7753] hover:text-[#1F2A14] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              {submitSuccess ? (
                <div className="p-6 text-center space-y-2">
                  <span className="material-symbols-outlined text-[#4C9A52] text-[48px]">
                    check_circle
                  </span>
                  <h4 className="text-[16px] font-bold text-[#1F2A14]">Laporan Terkirim!</h4>
                  <p className="text-[12px] text-[#3A4728]">
                    Pengaduan Anda telah diteruskan ke teknisi desa ({activeVillage.technicianName})
                    dan masuk ke buku pemantauan terbuka.
                  </p>
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
                      <option value="Lampu Redup / Tegangan Turun">
                        Lampu Redup / Tegangan Turun
                      </option>
                      <option value="MCB Sering Turun">MCB / Pembatas Sering Turun</option>
                      <option value="Kabel Distribusi Kendur">Kabel Distribusi Kendur</option>
                      <option value="Pembersihan Modul">Pembersihan Modul Berdebu</option>
                      <option value="Pertanyaan Iuran">Pertanyaan Iuran & Pembayaran</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#1F2A14] font-bold mb-1">
                      Lokasi (RT / Dusun / Titik Sambungan)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: RT 02 Dusun Timur, dekat Musholla"
                      value={reportLocation}
                      onChange={(e) => setReportLocation(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#C5CCAE] bg-[#FAFBF4] text-[#1F2A14] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[#1F2A14] font-bold mb-1">Deskripsi Gangguan</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Jelaskan kendala yang dialami secara singkat..."
                      value={reportDescription}
                      onChange={(e) => setReportDescription(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#C5CCAE] bg-[#FAFBF4] text-[#1F2A14] font-medium"
                    ></textarea>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-[#3A4728]">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded accent-[#4B5D2A] w-4 h-4"
                      />
                      <span>Kirim sebagai Warga Anonim</span>
                    </label>
                  </div>

                  {!isAnonymous && (
                    <div>
                      <label className="block text-[#1F2A14] font-bold mb-1">
                        Nama Pelapor (Opsional)
                      </label>
                      <input
                        type="text"
                        placeholder="Nama Anda"
                        value={reporterName}
                        onChange={(e) => setReporterName(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-[#C5CCAE] bg-[#FAFBF4] text-[#1F2A14] font-medium"
                      />
                    </div>
                  )}

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowReportModal(false)}
                      className="px-4 py-2 rounded-xl border border-[#4B5D2A] bg-[#F3F5EA] text-[#3A4728] font-bold hover:bg-[#E4E8D6]"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#4B5D2A] text-[#F7F8EE] font-bold hover:bg-[#3F4E2C] shadow-xs"
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
      <footer className="w-full h-12 border-t border-[#C5CCAE] bg-[#F3F5EA] px-6 flex items-center justify-between text-[#6B7753] text-[12px] font-medium select-none shadow-[0_-1px_3px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4C9A52]"></span>
          <span className="text-[#3A4728]">Data simulasi - prototipe konseptual | DesaWatt, gagasan HORIZON 2026</span>
        </div>
        <div className="text-[#6B7753]">
          <span>Koperasi Merah Putih Mandiri Energi © 2026</span>
        </div>
      </footer>
    </div>
  );
};
