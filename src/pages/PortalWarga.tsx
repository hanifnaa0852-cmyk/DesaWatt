import React, { useState } from 'react';
import { useDesaWatt } from '../context/DesaWattContext';
import { DesaWattLogoMark } from '../components/DesaWattLogoMark';

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
    <div className="min-h-screen bg-[#F6F8F7] text-[#131B2E] flex flex-col justify-between">
      {/* Standalone Public Header (No Sidebar) */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 h-18 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <DesaWattLogoMark size={40} className="shadow-xs shrink-0" />
          <div>
            <h1 className="text-[17px] font-extrabold text-[#131B2E] leading-tight">
              DesaWatt Transparansi Publik
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">
              Sistem Keterbukaan Energi Komunal {activeVillage.name}, {activeVillage.regency}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF6E9] text-[#96600E] border border-[#FCDCA7] text-[12px] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#FEAE2C] animate-pulse"></span>
            <span>Status: {activeVillage.statusPLTS} (Perawatan Rutin)</span>
          </div>

          <button
            onClick={() => setShowReportModal(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#147A4B] text-white text-[13px] font-bold hover:bg-[#005F38] shadow-sm cursor-pointer transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">report_problem</span>
            <span>Lapor Masalah</span>
          </button>

          <button
            onClick={() => setIsPublicPortal(false)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 text-[12px] font-semibold hover:bg-slate-100 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
            <span>Masuk Portal Pengurus</span>
          </button>
        </div>
      </header>

      {/* Main Public Content */}
      <main className="max-w-7xl mx-auto w-full px-6 py-8 space-y-6 flex-1">
        {/* Civic Announcement Banner */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider bg-[#EBF7F1] text-[#147A4B] px-2.5 py-0.5 rounded-full border border-[#C1E7D4]">
                Keterbukaan Publik Desa
              </span>
              <span className="text-[11px] text-slate-400">
                Pembaruan terakhir: 5 Menit Lalu (13:45 WIB)
              </span>
            </div>
            <h2 className="text-[26px] font-black text-[#131B2E] tracking-tight">
              Listrik Surya Desa Kita — {activeVillage.name}
            </h2>
            <p className="text-[13px] text-slate-600 max-w-3xl leading-relaxed">
              Portal pemantauan publik mandiri untuk mengawal keandalan pasokan listrik, pembagian
              beban produktif, dan dana iuran cadangan baterai warga secara transparan dan akuntabel.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowReportModal(true)}
              className="px-4 py-2.5 rounded-xl bg-[#147A4B] text-white text-[13px] font-bold hover:bg-[#005F38] shadow-sm cursor-pointer"
            >
              Lapor Gangguan Listrik
            </button>
          </div>
        </div>

        {/* Operational Status Strip */}
        <div className="bg-[#FEF6E9] border border-[#FCDCA7] rounded-2xl p-4.5 flex items-start gap-3 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-[#FEAE2C] text-[#6B4500] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">warning</span>
          </div>
          <div>
            <h3 className="text-[14px] font-black text-[#96600E]">
              Status Operasional Jaringan: WASPADA (Perawatan Rutin)
            </h3>
            <p className="text-[12px] text-[#96600E]/90 mt-0.5 leading-relaxed">
              Pemberitahuan Sistem: Inverter Unit 2 terjadwal pembersihan debu rutin sore ini (16:30
              WIB) oleh Teknisi Desa ({activeVillage.technicianName}). Pasokan rumah warga tetap aman
              dialihkan ke Jalur Sirkuit 1.
            </p>
          </div>
        </div>

        {/* 4 Telemetry Spec Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase block">
              Kapasitas Array Surya
            </span>
            <div className="text-[24px] font-black text-[#131B2E] mt-0.5">
              {activeVillage.capacityKwp} kWp
            </div>
            <span className="text-[11px] text-[#147A4B] font-semibold">140 Modul Monokristalin</span>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase block">
              Sambungan Terlayani
            </span>
            <div className="text-[24px] font-black text-[#131B2E] mt-0.5">
              {activeVillage.connectionsKK} KK
            </div>
            <span className="text-[11px] text-slate-500">+ Usaha & Fasum Desa</span>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase block">
              Penyimpanan Baterai
            </span>
            <div className="text-[24px] font-black text-[#131B2E] mt-0.5">
              {activeVillage.batteryKwh} kWh
            </div>
            <span className="text-[11px] text-[#147A4B] font-semibold">SOC Saat Ini: 91% (Penuh)</span>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase block">
              Keandalan (Uptime)
            </span>
            <div className="text-[24px] font-black text-[#131B2E] mt-0.5">99.4%</div>
            <span className="text-[11px] text-[#147A4B] font-semibold">Bebas Pemadaman Massal</span>
          </div>
        </div>

        {/* 3 Main Desktop Dashboard Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Column 1: Produksi Harian (4 cols) */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-extrabold text-[#131B2E]">
                Produksi Surya Hari Ini
              </h3>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#EBF7F1] text-[#147A4B]">
                Live Telemetri
              </span>
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">
                  Total Energi Masuk
                </span>
                <div className="text-[36px] font-black text-[#147A4B] tracking-tight">
                  {activeVillage.productionTodayKwh}{' '}
                  <span className="text-[16px] text-slate-400 font-semibold">kWh</span>
                </div>
                <span className="text-[12px] text-[#147A4B] font-bold">
                  88.7% dari target harian (160 kWh)
                </span>
              </div>

              {/* Mini Gauge */}
              <div className="w-20 h-20 rounded-full border-4 border-[#147A4B] border-t-slate-200 flex flex-col items-center justify-center font-black text-[15px] text-[#147A4B]">
                88.7%
                <span className="text-[8px] text-slate-400 font-bold uppercase">Tercapai</span>
              </div>
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-xl text-[12px] text-slate-600 leading-relaxed">
              <strong className="text-[#131B2E]">Daya tersimpan cukup</strong> untuk menyalakan
              seluruh {activeVillage.connectionsKK} KK dan penerangan jalan hingga fajar esok hari.
            </div>

            {/* Environmental badges with (estimasi demo) per correction 3 */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-[#EBF7F1]/60 rounded-xl border border-[#C1E7D4]">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">
                  Emisi Terhindar <span className="italic">(estimasi demo)</span>
                </span>
                <div className="text-[16px] font-black text-[#147A4B]">214 kg CO₂</div>
              </div>
              <div className="p-3 bg-[#FEF6E9]/60 rounded-xl border border-[#FCDCA7]">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">
                  Solar Dihemat <span className="italic">(estimasi demo)</span>
                </span>
                <div className="text-[16px] font-black text-[#96600E]">78 Liter</div>
              </div>
            </div>
          </div>

          {/* Column 2: Alokasi Beban Aktif Desa (4 cols) */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-extrabold text-[#131B2E]">
                Alokasi Beban Aktif Desa
              </h3>
              <span className="text-[11px] font-bold text-slate-400">Total: 142 kWh</span>
            </div>

            <p className="text-[12px] text-slate-500 leading-relaxed">
              Penyaluran listrik diatur sesuai mufakat warga untuk ketahanan pangan dan penerangan:
            </p>

            {/* Sector 1 */}
            <div className="p-3 bg-[#F8FAFC] rounded-xl space-y-1.5">
              <div className="flex justify-between items-center text-[12px] font-bold">
                <span className="text-[#131B2E]">Rumah Tangga ({activeVillage.connectionsKK} KK)</span>
                <span className="text-[#147A4B] font-black">68% (96.5 kWh)</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-[#147A4B] h-full rounded-full" style={{ width: '68%' }}></div>
              </div>
              <span className="text-[10px] text-slate-400 block">Rata-rata 400 Wh / rumah</span>
            </div>

            {/* Sector 2 */}
            <div className="p-3 bg-[#F8FAFC] rounded-xl space-y-1.5">
              <div className="flex justify-between items-center text-[12px] font-bold">
                <span className="text-[#131B2E]">Cold Storage Nelayan & Sayur</span>
                <span className="text-[#96600E] font-black">21% (29.8 kWh)</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-[#FEAE2C] h-full rounded-full" style={{ width: '21%' }}></div>
              </div>
              <span className="text-[10px] text-slate-400 block">Suhu stabil -2.4°C</span>
            </div>

            {/* Sector 3 */}
            <div className="p-3 bg-[#F8FAFC] rounded-xl space-y-1.5">
              <div className="flex justify-between items-center text-[12px] font-bold">
                <span className="text-[#131B2E]">Pabrik Es & Penggilingan Padi</span>
                <span className="text-slate-700 font-black">11% (15.7 kWh)</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-slate-400 h-full rounded-full" style={{ width: '11%' }}></div>
              </div>
              <span className="text-[10px] text-slate-400 block">Jam produktif: 09:00 - 15:00</span>
            </div>
          </div>

          {/* Column 3: Iuran & Dana O&M (4 cols) */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-extrabold text-[#131B2E]">Iuran & Dana O&M</h3>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#EBF7F1] text-[#147A4B]">
                Audit Terbuka
              </span>
            </div>

            {/* Iuran bulanan */}
            <div className="p-3.5 bg-[#F8FAFC] rounded-xl space-y-1.5">
              <div className="flex justify-between items-baseline">
                <span className="text-[12px] text-slate-500 font-semibold">
                  Iuran Bulan Berjalan
                </span>
                <span className="text-[16px] font-black text-[#147A4B]">
                  {activeVillage.collectionRatePercent}% Terkumpul
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#147A4B] h-full rounded-full"
                  style={{ width: `${activeVillage.collectionRatePercent}%` }}
                ></div>
              </div>
              <span className="text-[11px] text-slate-400 block">
                206 dari {activeVillage.connectionsKK} KK Lunas (Rp 75.000 / KK)
              </span>
            </div>

            {/* Saldo Dana O&M Terpadu */}
            <div className="p-3.5 bg-[#F8FAFC] rounded-xl">
              <span className="text-[11px] text-slate-400 font-bold uppercase block">
                Saldo Dana O&M
              </span>
              <div className="text-[22px] font-black text-[#131B2E] mt-0.5">
                Rp {activeVillage.saldoDanaOMJuta}.000.000
              </div>
              <span className="text-[11px] text-[#147A4B] font-semibold block mt-0.5">
                Tersedia untuk suku cadang, kabel, & honor teknisi lokal
              </span>
            </div>

            {/* Kartu Baterai Terpadu */}
            <div className="p-3.5 bg-[#FEF6E9]/60 border border-[#FCDCA7] rounded-xl space-y-1.5">
              <div className="flex justify-between items-center text-[12px] font-bold text-[#96600E]">
                <span>Alokasi Cadangan Penggantian Baterai</span>
                <span>25,5%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-[#FEAE2C] h-full rounded-full" style={{ width: '25.5%' }}></div>
              </div>
              <p className="text-[11px] text-slate-600 leading-tight">
                Dari Dana O&M Rp{activeVillage.saldoDanaOMJuta} Jt, 25,5% dari target penggantian baterai Rp{activeVillage.targetBatteryFundJuta} Jt
              </p>
            </div>

            {/* Kontak teknisi */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[12px] font-bold text-[#131B2E] block">
                  {activeVillage.technicianName} (Teknisi Desa)
                </span>
                <span className="text-[11px] text-slate-400">
                  Posko Balai Desa • {activeVillage.technicianPhone}
                </span>
              </div>
              <a
                href={`tel:${activeVillage.technicianPhone}`}
                className="w-8 h-8 rounded-full bg-[#EBF7F1] text-[#147A4B] flex items-center justify-center hover:bg-[#147A4B] hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
              </a>
            </div>
          </div>
        </div>

        {/* Civic Reporting & User Submissions List */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-[18px] font-extrabold text-[#131B2E]">
                Layanan Partisipasi & Pengaduan Warga
              </h3>
              <p className="text-[12px] text-slate-500">
                Laporkan gangguan listrik, meteran bermasalah, atau pantau status penanganan secara
                transparan.
              </p>
            </div>
            <button
              onClick={() => setShowReportModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#147A4B] text-white text-[13px] font-bold hover:bg-[#005F38] shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Buat Pengaduan Baru</span>
            </button>
          </div>

          {/* List of citizen reports */}
          <div className="space-y-3">
            <span className="text-[12px] font-bold uppercase tracking-wider text-slate-400 block">
              Daftar Laporan Warga Terkini ({citizenReports.length})
            </span>

            {citizenReports.map((rep) => (
              <div
                key={rep.id}
                className="p-4 rounded-xl border border-slate-200/80 bg-[#F8FAFC] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-bold text-slate-400">{rep.id}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[13px] font-extrabold text-[#131B2E]">
                      {rep.category}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[11px] text-slate-500">{rep.location}</span>
                  </div>
                  <p className="text-[12px] text-slate-600 leading-relaxed">{rep.description}</p>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2 pt-0.5">
                    <span>Oleh: {rep.isAnonymous ? 'Warga Anonim' : rep.reporterName}</span>
                    <span>•</span>
                    <span>{rep.timestamp}</span>
                  </div>
                </div>

                <div className="shrink-0">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${
                      rep.status === 'Selesai'
                        ? 'bg-[#EBF7F1] text-[#147A4B]'
                        : rep.status === 'Sedang Ditangani'
                        ? 'bg-[#FEF6E9] text-[#96600E]'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        rep.status === 'Selesai'
                          ? 'bg-[#147A4B]'
                          : rep.status === 'Sedang Ditangani'
                          ? 'bg-[#FEAE2C]'
                          : 'bg-slate-500'
                      }`}
                    ></span>
                    {rep.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Report Modal */}
        {showReportModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-[17px] font-extrabold text-[#131B2E]">
                  Formulir Pengaduan / Keluhan Warga
                </h3>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              {submitSuccess ? (
                <div className="p-6 text-center space-y-2">
                  <span className="material-symbols-outlined text-[#147A4B] text-[48px]">
                    check_circle
                  </span>
                  <h4 className="text-[16px] font-bold text-[#131B2E]">Laporan Terkirim!</h4>
                  <p className="text-[12px] text-slate-500">
                    Pengaduan Anda telah diteruskan ke teknisi desa ({activeVillage.technicianName})
                    dan masuk ke buku pemantauan terbuka.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReport} className="space-y-4 text-[13px]">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Kategori Masalah</label>
                    <select
                      value={reportCategory}
                      onChange={(e) => setReportCategory(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium"
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
                    <label className="block text-slate-700 font-bold mb-1">
                      Lokasi (RT / Dusun / Titik Sambungan)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: RT 02 Dusun Timur, dekat Musholla"
                      value={reportLocation}
                      onChange={(e) => setReportLocation(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Deskripsi Gangguan</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Jelaskan kendala yang dialami secara singkat..."
                      value={reportDescription}
                      onChange={(e) => setReportDescription(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
                    ></textarea>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded accent-[#147A4B] w-4 h-4"
                      />
                      <span>Kirim sebagai Warga Anonim</span>
                    </label>
                  </div>

                  {!isAnonymous && (
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        Nama Pelapor (Opsional)
                      </label>
                      <input
                        type="text"
                        placeholder="Nama Anda"
                        value={reporterName}
                        onChange={(e) => setReporterName(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
                      />
                    </div>
                  )}

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowReportModal(false)}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#147A4B] text-white font-bold hover:bg-[#005F38] shadow-sm"
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

      {/* Standalone Public Footer (Correction 1) */}
      <footer className="w-full h-12 border-t border-slate-200/80 bg-white px-6 flex items-center justify-between text-slate-500 text-[12px] font-medium select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#147A4B]"></span>
          <span>Data simulasi - prototipe konseptual | DesaWatt, gagasan HORIZON 2026</span>
        </div>
        <div className="text-slate-400">
          <span>Koperasi Merah Putih Mandiri Energi © 2026</span>
        </div>
      </footer>
    </div>
  );
};
