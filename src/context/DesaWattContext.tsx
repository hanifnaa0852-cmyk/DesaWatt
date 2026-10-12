import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import {
  VillageId,
  ReadinessLevel,
  AppPage,
  ManagementModel,
  VillageData,
  SimulatorParams,
  CitizenReport,
  DimensionKey,
  DimensionConfig,
  DimensionState,
  DimensionStatus,
  EvidenceStatus,
  PrerequisiteKey,
  PrerequisiteConfig,
  PrerequisiteState,
  GateChecklistResult,
  DengarWargaData,
  BelajarEnergiData,
  KelolaBersamaData,
} from '../types';
import {
  SCORE_THRESHOLDS,
  toScore100,
  getReadinessLevel,
  getRecommendedModel,
  getReadinessLevelFromDimensions,
  getRecommendedModelFromLevel,
} from '../utils/score';
import {
  DEMO_DENGAR_WARGA,
  DEMO_BELAJAR_ENERGI,
  DEMO_KELOLA_BERSAMA,
} from '../data/demoComponentsData';

export { SCORE_THRESHOLDS, toScore100 };

export const DIMENSION_CONFIGS: DimensionConfig[] = [
  {
    key: 'potensi_teknis',
    number: '01',
    title: 'Potensi teknis dan keselamatan',
    evidenceMinimum: 'data teknis dan survei tenaga kompeten',
    description: 'Analisis potensi radiasi matahari harian, kelayakan lahan/atap, proteksi petir, dan keselamatan instalasi microgrid.',
    gapActionSuggestion: 'Lakukan survei teknis terperinci bersama tenaga kompeten bersertifikat untuk memvalidasi radiasi, struktur pondasi, dan standar keselamatan kelistrikan.',
  },
  {
    key: 'kebutuhan_penggunaan',
    number: '02',
    title: 'Kebutuhan dan penggunaan',
    evidenceMinimum: 'pemetaan partisipatif dan profil beban terukur',
    description: 'Profil kebutuhan listrik warga dan beban produktif siang hari (mesin pengolah, pendingin ikan/pangan, pompa air).',
    gapActionSuggestion: 'Laksanakan survei pemetaan partisipatif untuk mendata kebutuhan riil KK dan mengukur kurva beban puncak usaha warga.',
  },
  {
    key: 'literasi_kapasitas',
    number: '03',
    title: 'Literasi dan kapasitas',
    evidenceMinimum: 'pre-test, praktik, asesmen kapasitas',
    description: 'Pemahaman warga mengenai penggunaan hemat energi, keselamatan listrik dasar, dan kesiapan teknisi lokal.',
    gapActionSuggestion: 'Selenggarakan pelatihan literasi energi komunal melalui modul Belajar Energi, lakukan pre/post-test, dan latih calon operator pemuda.',
  },
  {
    key: 'partisipasi_inklusi',
    number: '04',
    title: 'Partisipasi dan inklusi',
    evidenceMinimum: 'catatan forum dan bukti perubahan desain akibat masukan warga',
    description: 'Keterlibatan kelompok perempuan, petani, nelayan, dan keluarga pra-sejahtera dalam musyawarah penentuan prioritas.',
    gapActionSuggestion: 'Adakan forum Dengar Warga inklusif, catat notulensi aspirasi warga, dan buktikan perubahan desain/skema tarif yang mengakomodasi masukan tersebut.',
  },
  {
    key: 'kelembagaan',
    number: '05',
    title: 'Kelembagaan',
    evidenceMinimum: 'dokumen peran, SOP, mekanisme pengaduan',
    description: 'Kesiapan organisasi Koperasi Desa / BUMDes, kejelasan pembagian tanggung jawab pengurus, dan SOP layanan.',
    gapActionSuggestion: 'Sahkan susunan pengurus unit energi koperasi, terbitkan SOP operasional baku, dan aktifkan kanal penanganan aduan masyarakat.',
  },
  {
    key: 'kelayakan_ekonomi',
    number: '06',
    title: 'Kelayakan ekonomi',
    evidenceMinimum: 'analisis skenario/sensitivitas, konsultasi tarif',
    description: 'Ketahanan model arus kas, kemampuan bayar warga, dan kesepakatan struktur tarif listrik yang adil.',
    gapActionSuggestion: 'Uji simulasi sensitivitas arus kas di Rancang Watt dan lakukan konsultasi publik mengenai kesepakatan besaran iuran/tarif listrik.',
  },
  {
    key: 'keberlanjutan_om',
    number: '07',
    title: 'Keberlanjutan O&M',
    evidenceMinimum: 'rencana tertulis, penanggung jawab, sumber dana',
    description: 'Rencana jangka panjang pemeliharaan rutin, jadwal perawatan inverter, dan tabungan penggantian baterai.',
    gapActionSuggestion: 'Susun dokumen rencana O&M tertulis, tetapkan teknisi penanggung jawab berkala, dan buka rekening penampung tabungan baterai.',
  },
  {
    key: 'data_akuntabilitas',
    number: '08',
    title: 'Data dan akuntabilitas',
    evidenceMinimum: 'protokol data, keterbukaan laporan',
    description: 'Pencatatan data operasional yang tertib, keterbukaan kas iuran, dan akses informasi publik tanpa syarat.',
    gapActionSuggestion: 'Terapkan protokol pencatatan data log harian dan publikasikan saldo kas iuran secara transparan melalui Portal Warga.',
  },
];

export const INDICATOR_CONFIGS = DIMENSION_CONFIGS;

export const PREREQUISITE_CONFIGS: PrerequisiteConfig[] = [
  {
    id: 'keselamatan_instalasi',
    number: 1,
    title: 'Keselamatan instalasi sudah dikaji pihak kompeten',
    description: 'Hasil kajian teknis keselamatan, proteksi grounding petir, dan kelayakan ruang baterai telah diperiksa oleh tenaga ahli/instansi teknis kompeten.',
  },
  {
    id: 'proses_partisipasi',
    number: 2,
    title: 'Proses partisipasi terdokumentasi (notulensi, daftar prioritas, catatan perubahan desain akibat masukan)',
    description: 'Tersedia notulensi forum musyawarah, daftar urutan prioritas penerima manfaat, dan bukti bahwa rancangan sistem disesuaikan dengan masukan warga.',
  },
  {
    id: 'rencana_om',
    number: 3,
    title: 'Rencana O&M tertulis yang masuk akal (termasuk penggantian baterai dan sumber dananya)',
    description: 'Dokumen tertulis tata cara operasi, jadwal pemeliharaan suku cadang, dan kepastian sumber dana tabungan (sinking fund) penggantian baterai.',
  },
  {
    id: 'penanggung_jawab_operasi',
    number: 4,
    title: 'Penanggung jawab operasi sudah ditetapkan dan terlatih',
    description: 'Teknisi dan pengelola operasional harian lokal telah ditunjuk resmi oleh pengurus koperasi serta telah menyelesaikan pelatihan teknis.',
  },
  {
    id: 'perlindungan_kelompok_rentan',
    number: 5,
    title: 'Aturan perlindungan kelompok rentan tersedia (keterjangkauan, akses, keluhan)',
    description: 'Regulasi/kesepakatan desa yang menjamin keterjangkauan tarif bagi keluarga pra-sejahtera, jaminan akses listrik dasar, serta kanal aduan warga.',
  },
];

const INITIAL_VILLAGES: Record<VillageId, VillageData> = {
  'sumber-makmur': {
    id: 'sumber-makmur',
    name: 'Desa Sumber Makmur',
    subdistrict: 'Kec. Lubuk Pinang',
    regency: 'Kab. Mukomuko',
    province: 'Bengkulu',
    capacityKwp: 65,
    batteryKwh: 120,
    connectionsKK: 240,
    dimensions: {
      potensi_teknis: { status: 'Siap', verificationStatus: 'Terverifikasi lapangan', notes: 'Survei radiasi solar 4.8 kWh/m²/hari dan lahan bebas sengketa.' },
      kebutuhan_penggunaan: { status: 'Siap', verificationStatus: 'Terverifikasi lapangan', notes: 'Beban produktif cold storage & pompa air minum terdata rapi.' },
      literasi_kapasitas: { status: 'Siap', verificationStatus: 'Terverifikasi lapangan', notes: 'Pelatihan keselamatan warga selesai, 3 kader pemuda bersertifikasi.' },
      partisipasi_inklusi: { status: 'Perlu penguatan', verificationStatus: 'Terverifikasi lapangan', notes: 'Forum dengar warga aktif, perlu penajaman dokumentasi revisi desain kelompok perempuan.' },
      kelembagaan: { status: 'Siap', verificationStatus: 'Terverifikasi lapangan', notes: 'Struktur pengurus Koperasi Desa Merah Putih sah berbadan hukum AHU.' },
      kelayakan_ekonomi: { status: 'Siap', verificationStatus: 'Terverifikasi lapangan', notes: 'Konsultasi tarif disepakati Rp 2.500/kWh, kepatuhan iuran warga 86%.' },
      keberlanjutan_om: { status: 'Siap', verificationStatus: 'Terverifikasi lapangan', notes: 'SOP harian/mingguan berjalan, rekening tabungan baterai terisi Rp 46 Jt.' },
      data_akuntabilitas: { status: 'Perlu penguatan', verificationStatus: 'Belum diverifikasi', notes: 'Laporan manual rutin, sistem telemetri IoT publikasi digital sedang disinkronkan.' },
    },
    prerequisites: {
      keselamatan_instalasi: { checked: true, evidenceNote: 'Audit teknis kelistrikan & sertifikat kelaikan operasi (SLO) lengkap.' },
      proses_partisipasi: { checked: true, evidenceNote: 'Berita acara musdes 100% KK & bukti revisi tata letak tiang lengkap.' },
      rencana_om: { checked: true, evidenceNote: 'Buku rekening escrow sinking fund aktif dengan alokasi kas teratur.' },
      penanggung_jawab_operasi: { checked: true, evidenceNote: '3 teknisi terlatih bertugas dengan jadwal piket harian.' },
      perlindungan_kelompok_rentan: { checked: true, evidenceNote: 'Perdes perlindungan kelompok rentan & posko aduan warga aktif.' },
    },
    saranRekomendasi: 'Semua prasyarat terpenuhi; siap diajukan ke forum musyawarah desa untuk penetapan.',
    statusPLTS: 'Waspada',
    statusDescription: 'Inverter Unit 2 terjadwal pembersihan debu filter pendingin sore ini. Pasokan aman.',
    productionTodayKwh: 142,
    collectionRatePercent: 86,
    saldoDanaOMJuta: 46,
    pengurusName: 'Pengurus Koperasi Desa (KDKMP/BUMDes)',
    pendampingName: 'Pendamping Desa',
    technicianName: 'Teknisi PLTS Desa',
    technicianPhone: '0812-44xx-9821',
    targetBatteryFundJuta: 180,
    musdesApproved: true,
    pendampingAssigned: true,
    dengarWarga: DEMO_DENGAR_WARGA['sumber-makmur'],
    belajarEnergi: DEMO_BELAJAR_ENERGI['sumber-makmur'],
    kelolaBersama: DEMO_KELOLA_BERSAMA['sumber-makmur'],
    perluDitinjau: true,
    perluDitinjauCatatan: 'Perlu ditinjau pengurus dan forum warga',
  },
  'tirta-mukti': {
    id: 'tirta-mukti',
    name: 'Desa Tirta Mukti',
    subdistrict: 'Kec. Ipuh',
    regency: 'Kab. Mukomuko',
    province: 'Bengkulu',
    capacityKwp: 50,
    batteryKwh: 90,
    connectionsKK: 180,
    dimensions: {
      potensi_teknis: { status: 'Siap', verificationStatus: 'Terverifikasi lapangan', notes: 'Lahan atap dan darat siap pakai, bebas naungan pohon sawit.' },
      kebutuhan_penggunaan: { status: 'Perlu penguatan', verificationStatus: 'Terverifikasi lapangan', notes: 'Kebutuhan listrik rumah tangga terpetakan, mesin olah pakan masih tahap uji coba.' },
      literasi_kapasitas: { status: 'Perlu penguatan', verificationStatus: 'Terverifikasi lapangan', notes: 'Sosialisasi awal terlaksana, perlu pelatihan praktik lanjutan keselamatan teknisi.' },
      partisipasi_inklusi: { status: 'Perlu penguatan', verificationStatus: 'Terverifikasi lapangan', notes: 'Aspirasi warga tercatat, keterlibatan kelompok rentan perlu ditingkatkan.' },
      kelembagaan: { status: 'Siap', verificationStatus: 'Terverifikasi lapangan', notes: 'Unit usaha BUMDes aktif dengan pembukuan kas bulanan teratur.' },
      kelayakan_ekonomi: { status: 'Perlu penguatan', verificationStatus: 'Belum diverifikasi', notes: 'Simulasi arus kas moderat, skema iuran musiman nelayan perlu difinalkan.' },
      keberlanjutan_om: { status: 'Perlu penguatan', verificationStatus: 'Belum diverifikasi', notes: 'Rencana O&M tertulis ada, tabungan cadangan baterai baru mencapai Rp 28 Jt.' },
      data_akuntabilitas: { status: 'Siap', verificationStatus: 'Belum diverifikasi', notes: 'Papan transparansi kas desa terbuka di balai dusun.' },
    },
    prerequisites: {
      keselamatan_instalasi: { checked: true, evidenceNote: 'Kajian teknis panel & grounding dinyatakan aman oleh teknisi ahli.' },
      proses_partisipasi: { checked: true, evidenceNote: 'Notulensi musyawarah & penyesuaian jalur kabel terdokumentasi.' },
      rencana_om: { checked: false, evidenceNote: 'Rencana dana cadangan baterai masih dalam draf rancangan BUMDes.' },
      penanggung_jawab_operasi: { checked: true, evidenceNote: '2 operator pemuda desa telah lulus sertifikasi dasar.' },
      perlindungan_kelompok_rentan: { checked: false, evidenceNote: 'SOP tarif afirmasi untuk 18 KK rentan belum disahkan.' },
    },
    saranRekomendasi: 'Dampingi untuk menutup 2 kesenjangan, lalu tinjau ulang.',
    statusPLTS: 'Waspada',
    statusDescription: '1 modul panel retak tertimpa dahan sawit (dalam klaim garansi vendor).',
    productionTodayKwh: 105,
    collectionRatePercent: 78,
    saldoDanaOMJuta: 28,
    pengurusName: 'Pengurus Koperasi Desa (KDKMP/BUMDes)',
    pendampingName: 'Pendamping Desa',
    technicianName: 'Teknisi PLTS Desa',
    technicianPhone: '0813-55xx-4412',
    targetBatteryFundJuta: 140,
    musdesApproved: false,
    pendampingAssigned: true,
    dengarWarga: DEMO_DENGAR_WARGA['tirta-mukti'],
    belajarEnergi: DEMO_BELAJAR_ENERGI['tirta-mukti'],
    kelolaBersama: DEMO_KELOLA_BERSAMA['tirta-mukti'],
    perluDitinjau: false,
    perluDitinjauCatatan: '',
  },
  'karang-asri': {
    id: 'karang-asri',
    name: 'Desa Karang Asri',
    subdistrict: 'Kec. Penarik',
    regency: 'Kab. Mukomuko',
    province: 'Bengkulu',
    capacityKwp: 30,
    batteryKwh: 50,
    connectionsKK: 110,
    dimensions: {
      potensi_teknis: { status: 'Belum siap', verificationStatus: 'Belum diverifikasi', notes: 'Lokasi berbayang pohon karet dan instalasi lama mengalami degradasi.' },
      kebutuhan_penggunaan: { status: 'Belum siap', verificationStatus: 'Belum diverifikasi', notes: 'Belum ada data profil beban harian warga dan beban industri nihil.' },
      literasi_kapasitas: { status: 'Belum siap', verificationStatus: 'Belum diverifikasi', notes: 'Pemahaman hemat daya minim, sering terjadi kelebihan beban malam hari.' },
      partisipasi_inklusi: { status: 'Perlu penguatan', verificationStatus: 'Belum diverifikasi', notes: 'Warga mengeluh sering padam, musyawarah dusun belum pernah digelar.' },
      kelembagaan: { status: 'Belum siap', verificationStatus: 'Belum diverifikasi', notes: 'Pengurus koperasi vakum dan tidak ada pembukuan kas yang dapat diaudit.' },
      kelayakan_ekonomi: { status: 'Belum siap', verificationStatus: 'Belum diverifikasi', notes: 'Tunggakan iuran tinggi (kepatuhan hanya 44%), kas operasional defisit.' },
      keberlanjutan_om: { status: 'Belum siap', verificationStatus: 'Belum diverifikasi', notes: 'Tidak ada alokasi sinking fund baterai, saldo kas O&M hanya Rp 6 Jt.' },
      data_akuntabilitas: { status: 'Perlu penguatan', verificationStatus: 'Belum diverifikasi', notes: 'Pencatatan data kwh meter manual dan tidak dipublikasikan ke warga.' },
    },
    prerequisites: {
      keselamatan_instalasi: { checked: true, evidenceNote: 'Survei awal dinas ESDM mencatat titik instalasi bebas genangan banjir.' },
      proses_partisipasi: { checked: false, evidenceNote: 'Notulensi musyawarah dusun dan daftar prioritas belum dihimpun.' },
      rencana_om: { checked: false, evidenceNote: 'Alokasi sinking fund penggantian baterai belum disepakati.' },
      penanggung_jawab_operasi: { checked: false, evidenceNote: 'Operator warga belum ditunjuk dan belum mengikuti pelatihan.' },
      perlindungan_kelompok_rentan: { checked: true, evidenceNote: 'Pendataan KK pra-sejahtera awal telah tersedia.' },
    },
    saranRekomendasi: 'Pendampingan dan desain ulang; mulai dari Dengar Warga dan Belajar Energi.',
    statusPLTS: 'Berisiko Mangkrak',
    statusDescription: 'Baterai soak 2 blok, pengurus koperasi vakum, tunggakan iuran 4 bulan.',
    productionTodayKwh: 38,
    collectionRatePercent: 44.5,
    saldoDanaOMJuta: 6,
    pengurusName: 'Pengurus Koperasi Desa (KDKMP/BUMDes)',
    pendampingName: 'Pendamping Desa',
    technicianName: 'Teknisi PLTS Desa',
    technicianPhone: '0852-77xx-1234',
    targetBatteryFundJuta: 100,
    musdesApproved: false,
    pendampingAssigned: false,
    dengarWarga: DEMO_DENGAR_WARGA['karang-asri'],
    belajarEnergi: DEMO_BELAJAR_ENERGI['karang-asri'],
    kelolaBersama: DEMO_KELOLA_BERSAMA['karang-asri'],
    perluDitinjau: true,
    perluDitinjauCatatan: 'Perlu ditinjau pengurus dan forum warga (baterai soak & defisit kas)',
  },
};

const INITIAL_REPORTS: CitizenReport[] = [
  {
    id: 'LAP-001',
    villageId: 'sumber-makmur',
    timestamp: 'Hari ini, 08:30 WIB',
    category: 'Panel/Listrik padam',
    description: 'Lampu di RT 03 Dusun Barat sempat berkedip saat jam 19:00 ketika mesin pompa aktif.',
    location: 'RT 03 Dusun Barat',
    isAnonymous: false,
    reporterName: 'Warga RT 03',
    status: 'Ditindaklanjuti',
  },
  {
    id: 'LAP-002',
    villageId: 'sumber-makmur',
    timestamp: 'Kemarin, 14:15 WIB',
    category: 'Panel/Listrik padam',
    description: 'Debu tebal terlihat pada deretan modul surya blok utara dekat jalan kebun sawit.',
    location: 'Blok Utara Gardu PLTS',
    isAnonymous: true,
    status: 'Ditinjau',
  },
  {
    id: 'LAP-003',
    villageId: 'sumber-makmur',
    timestamp: '2 hari lalu',
    category: 'Iuran dan keuangan',
    description: 'Konfirmasi bukti setor iuran bulanan kelompok tani blok selatan untuk kas O&M.',
    location: 'RT 01 Dusun Selatan',
    isAnonymous: false,
    reporterName: 'Warga Kelompok Tani Dusun Selatan',
    status: 'Diterima',
  },
];

interface DesaWattContextType {
  selectedVillageId: VillageId;
  setSelectedVillageId: (id: VillageId) => void;
  activeVillage: VillageData;
  villages: Record<VillageId, VillageData>;
  updateDimension: (villageId: VillageId, key: DimensionKey, updates: Partial<DimensionState>) => void;
  updatePrerequisite: (villageId: VillageId, id: PrerequisiteKey, checked: boolean, evidenceNote?: string) => void;
  updateDengarWarga: (villageId: VillageId, updates: Partial<DengarWargaData>) => void;
  updateBelajarEnergi: (villageId: VillageId, updates: Partial<BelajarEnergiData>) => void;
  updateKelolaBersama: (villageId: VillageId, updates: Partial<KelolaBersamaData>) => void;
  toggleManualReview: (villageId: VillageId, perluDitinjau: boolean, catatan?: string) => void;
  updateIndicator: (villageId: VillageId, key: any, value: any) => void;
  batchUpdateIndicators: (villageId: VillageId, updates: any) => void;
  simulationResetKey: number;
  totalScore: number;
  rawTotalScore: number;
  readinessLevel: ReadinessLevel;
  recommendedModel: ManagementModel;
  selectedModelOverride: ManagementModel | null;
  setSelectedModelOverride: (model: ManagementModel | null) => void;
  effectiveModel: ManagementModel;
  isModelMismatch: boolean;
  lowestDimensions: DimensionConfig[];
  lowestIndicators: any[];
  activePage: AppPage;
  setActivePage: (page: AppPage) => void;
  isPublicPortal: boolean;
  setIsPublicPortal: (isPublic: boolean) => void;
  // Gate checklist states per village
  musdesApproved: boolean;
  setMusdesApproved: (approved: boolean) => void;
  pendampingAssigned: boolean;
  setPendampingAssigned: (assigned: boolean) => void;
  setVillageMusdesApproved: (villageId: VillageId, approved: boolean) => void;
  setVillagePendampingAssigned: (villageId: VillageId, assigned: boolean) => void;
  calculateGateChecklist: (villageId: VillageId) => GateChecklistResult;
  gateChecklist: GateChecklistResult;
  gateStatusText: string;
  gateCanProceed: boolean;
  // Simulator
  simulatorParams: SimulatorParams;
  setSimulatorParams: React.Dispatch<React.SetStateAction<SimulatorParams>>;
  simulationResults: import('../types').SimulationResults;
  // Authentication state
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  currentUser: {
    name: string;
    role: string;
    initial?: string;
    organization: string;
  };
  login: (username?: string, role?: string, initial?: string) => Promise<void>;
  logout: () => void;
  // Citizen reports
  citizenReports: CitizenReport[];
  addCitizenReport: (report: Omit<CitizenReport, 'id' | 'timestamp' | 'status'>) => void;
  updateCitizenReportStatus: (reportId: string, status: import('../types').CitizenReportStatus) => void;
  // Musdes input details
  setVillageMusdesData: (
    villageId: VillageId,
    data: {
      musdesDate?: string;
      musdesAttendeesCount?: number;
      musdesResult?: 'Setuju' | 'Setuju dengan catatan' | 'Belum setuju';
    }
  ) => void;
  // Interactive Walkthrough Tour
  isTourOpen: boolean;
  setIsTourOpen: (open: boolean) => void;
  startTour: () => void;
  // Sidebar Responsive Collapse
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
  // Reset
  resetDemoData: () => void;
  // Session custom village evaluation
  addNewVillage: (village: VillageData) => void;
}

const DesaWattContext = createContext<DesaWattContextType | null>(null);

export function DesaWattProvider({ children }: { children: React.ReactNode }) {
  const [selectedVillageId, setSelectedVillageId] = useState<VillageId>('sumber-makmur');
  const [villages, setVillages] = useState<Record<VillageId, VillageData>>(INITIAL_VILLAGES);
  const [activePage, setActivePage] = useState<AppPage>('beranda');
  const [isPublicPortal, setIsPublicPortal] = useState<boolean>(false);
  const [selectedModelOverride, setSelectedModelOverride] = useState<ManagementModel | null>(null);
  const [citizenReports, setCitizenReports] = useState<CitizenReport[]>(INITIAL_REPORTS);
  const [simulationResetKey, setSimulationResetKey] = useState<number>(0);

  // Authentication state (Default to false so login page appears on initial load)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState({
    name: 'Pengurus Koperasi Desa (KDKMP/BUMDes)',
    role: 'Pengurus Koperasi Desa (KDKMP/BUMDes)',
    initial: 'PK',
    organization: 'Koperasi Desa Sumber Makmur Mandiri',
  });

  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1100;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1100) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const startTour = () => {
    setIsTourOpen(true);
  };

  const login = async (
    username = 'Pengurus Koperasi Desa (KDKMP/BUMDes)',
    role = 'Pengurus Koperasi Desa (KDKMP/BUMDes)',
    initial = 'PK'
  ) => {
    setCurrentUser({
      name: username,
      role: role,
      initial: initial,
      organization: 'Koperasi Desa Sumber Makmur Mandiri',
    });
    setIsAuthenticated(true);
    // Check if user has already seen tour
    try {
      const hasCompleted = localStorage.getItem('desawatt_tour_completed');
      if (!hasCompleted) {
        // Automatically open tour for first-time login
        setTimeout(() => {
          setIsTourOpen(true);
        }, 600);
      }
    } catch {
      // Fallback
      setIsTourOpen(true);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const [simulatorParams, setSimulatorParams] = useState<SimulatorParams>({
    capexJuta: 650,
    tariffPerKwh: 2500,
    productiveLoadPercent: 32,
    monthlyContributionPerKK: 75000,
    panelDegradationPercentPerYear: 0.7,
    batteryLifespanYears: 11,
    batteryReplacementCostJuta: 180,
    horizonYears: 15,
    demandScenario: 'normal',
    stressScenarios: {
      pendapatanUsahaRendah: false,
      biayaBateraiNaik: false,
      gangguanLebihLama: false,
      keterlambatanPembayaran: false,
      perlindunganRumahTanggaRentan: false,
    },
    productiveLoadChecklist: {
      adaPermintaan: true,
      adaOperator: true,
      adaPasar: true,
      biayaLayak: true,
    },
    costBreakdown: {
      biayaAwalCapexJuta: 650,
      operasiRutinJutaPerThn: 10,
      penggantianKomponenJuta: 180,
      degradasiTahunanPersen: 0.7,
      biayaPengelolaJutaPerThn: 6.5,
      danaDaruratJutaPerThn: 5.2,
    },
  });

  const activeVillage = villages[selectedVillageId];

  // Musdes and pendamping status stored per village
  const musdesApproved = activeVillage.musdesApproved;
  const pendampingAssigned = activeVillage.pendampingAssigned;

  const setVillageMusdesApproved = (villageId: VillageId, approved: boolean) => {
    setVillages((prev) => ({
      ...prev,
      [villageId]: {
        ...prev[villageId],
        musdesApproved: approved,
      },
    }));
  };

  const setVillagePendampingAssigned = (villageId: VillageId, assigned: boolean) => {
    setVillages((prev) => ({
      ...prev,
      [villageId]: {
        ...prev[villageId],
        pendampingAssigned: assigned,
      },
    }));
  };

  const setMusdesApproved = (approved: boolean) => {
    setVillageMusdesApproved(selectedVillageId, approved);
  };

  const setPendampingAssigned = (assigned: boolean) => {
    setVillagePendampingAssigned(selectedVillageId, assigned);
  };

  const toggleManualReview = (villageId: VillageId, perluDitinjau: boolean, catatan?: string) => {
    setVillages((prev) => {
      const v = prev[villageId];
      if (!v) return prev;
      return {
        ...prev,
        [villageId]: {
          ...v,
          perluDitinjau,
          perluDitinjauCatatan: catatan !== undefined ? catatan : v.perluDitinjauCatatan,
        },
      };
    });
  };

  const rawTotalScore = 0;
  const totalScore = 0;

  const readinessLevel: ReadinessLevel = useMemo(() => {
    return getReadinessLevelFromDimensions(activeVillage?.dimensions);
  }, [activeVillage?.dimensions]);

  const recommendedModel: ManagementModel = useMemo(() => {
    return getRecommendedModelFromLevel(readinessLevel);
  }, [readinessLevel]);

  const effectiveModel: ManagementModel = selectedModelOverride || recommendedModel;
  const isModelMismatch = false;

  const lowestDimensions = useMemo(() => {
    if (!activeVillage?.dimensions) return [];
    return DIMENSION_CONFIGS.filter(
      (cfg) => activeVillage.dimensions[cfg.key]?.status !== 'Siap'
    );
  }, [activeVillage?.dimensions]);

  const lowestIndicators = lowestDimensions;

  // Calculate gate checklist for any village using the 5 non-negotiable PRASYARAT
  const calculateGateChecklist = (villageId: VillageId): GateChecklistResult => {
    const v = villages[villageId];
    if (!v || !v.prerequisites) {
      return {
        allPass: false,
        passedCount: 0,
        totalCount: 5,
        statusText: 'Perlu dilengkapi: 5 prasyarat',
        statusStyle: 'bg-[#FEF6E9] text-[#96600E] border border-[#FCDCA7]',
        saranRekomendasi: 'Pendampingan dan desain ulang.',
        modelLabel: 'Musyawarah Warga & Koperasi',
        prerequisites: {} as any,
      };
    }

    const prereqList: PrerequisiteKey[] = [
      'keselamatan_instalasi',
      'proses_partisipasi',
      'rencana_om',
      'penanggung_jawab_operasi',
      'perlindungan_kelompok_rentan',
    ];

    const passedCount = prereqList.filter((k) => v.prerequisites[k]?.checked).length;
    const totalCount = 5;
    const allPass = passedCount === totalCount;
    const missingCount = totalCount - passedCount;

    let statusText = '';
    let statusStyle = '';

    if (allPass) {
      statusText = 'Siap ditinjau';
      statusStyle = 'bg-[#EBF7F1] text-[#147A4B] border border-[#C1E7D4]';
    } else {
      statusText = `Perlu dilengkapi: ${missingCount} prasyarat`;
      statusStyle = 'bg-[#FEF6E9] text-[#96600E] border border-[#FCDCA7]';
    }

    let saranRekomendasi = v.saranRekomendasi;
    if (!saranRekomendasi) {
      if (villageId === 'karang-asri') {
        saranRekomendasi = 'Pendampingan dan desain ulang; mulai dari Dengar Warga dan Belajar Energi.';
      } else if (villageId === 'tirta-mukti') {
        saranRekomendasi = 'Dampingi untuk menutup 2 kesenjangan, lalu tinjau ulang.';
      } else if (villageId === 'sumber-makmur') {
        saranRekomendasi = 'Semua prasyarat terpenuhi; siap ditinjau bersama musyawarah desa dan pengurus koperasi.';
      } else {
        saranRekomendasi = allPass
          ? 'Semua prasyarat terpenuhi; siap ditinjau bersama musyawarah desa dan pengurus koperasi.'
          : `Perlu dilengkapi: ${missingCount} prasyarat sebelum tinjauan lanjut.`;
      }
    }

    return {
      allPass,
      passedCount,
      totalCount,
      statusText,
      statusStyle,
      saranRekomendasi,
      modelLabel: 'Musyawarah Warga & Koperasi',
      prerequisites: v.prerequisites,
    };
  };

  const gateChecklist = useMemo(() => {
    return calculateGateChecklist(selectedVillageId);
  }, [selectedVillageId, villages, selectedModelOverride]);

  const gateStatusText = gateChecklist.statusText;
  const gateCanProceed = gateChecklist.allPass;

  // Global cash-flow simulator results so all pages share the exact same numbers
  const simulationResults = useMemo(() => {
    const {
      capexJuta,
      tariffPerKwh,
      productiveLoadPercent,
      monthlyContributionPerKK,
      panelDegradationPercentPerYear,
      batteryLifespanYears,
      batteryReplacementCostJuta,
      horizonYears,
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

    // Disiplin checklist: Beban produktif HANYA boleh dihitung bila keempat syarat terpenuhi
    const isProductiveChecklistComplete =
      productiveLoadChecklist.adaPermintaan &&
      productiveLoadChecklist.adaOperator &&
      productiveLoadChecklist.adaPasar &&
      productiveLoadChecklist.biayaLayak;

    const effectiveProductiveLoadPercent = isProductiveChecklistComplete ? productiveLoadPercent : 0;

    // Skenario Permintaan (demand multiplier)
    const demandMultiplier = demandScenario === 'rendah' ? 0.8 : demandScenario === 'tinggi' ? 1.2 : 1.0;

    // Skenario Stress Test
    const businessMultiplier = (stressScenarios.pendapatanUsahaRendah ? 0.75 : 1.0) * demandMultiplier;
    const effectiveBatteryCost = stressScenarios.biayaBateraiNaik
      ? Math.round(batteryReplacementCostJuta * 1.3)
      : batteryReplacementCostJuta;
    const routineOpexMultiplier = stressScenarios.gangguanLebihLama ? 1.25 : 1.0;
    const contributionMultiplier =
      (stressScenarios.keterlambatanPembayaran ? 0.85 : 1.0) *
      (stressScenarios.perlindunganRumahTanggaRentan ? 0.92 : 1.0);

    const baseAnnualKwh = activeVillage.capacityKwp * 3.8 * 365;
    const discountRate = 0.08;
    const years = Array.from({ length: horizonYears }, (_, i) => i + 1);

    let cumulativeCash = -capexJuta;
    let omFundAccumulation = activeVillage.saldoDanaOMJuta;
    let paybackYear: number | null = null;
    let npv = -capexJuta * 1000000;

    const yearlyData = years.map((year) => {
      const degradationFactor = Math.pow(1 - panelDegradationPercentPerYear / 100, year - 1);
      const yearKwh = baseAnnualKwh * degradationFactor;
      const energyRevenueJuta =
        ((yearKwh * (effectiveProductiveLoadPercent / 100) * tariffPerKwh) / 1000000) * businessMultiplier;
      const contributionRevenueJuta =
        ((activeVillage.connectionsKK * monthlyContributionPerKK * 12) / 1000000) * contributionMultiplier;
      const totalRevenueJuta = energyRevenueJuta + contributionRevenueJuta;
      const routineOpexJuta = capexJuta * 0.025 * routineOpexMultiplier;
      const omAllocationJuta = totalRevenueJuta * 0.2;
      const isBatteryYear = year === batteryLifespanYears;
      const batteryCostThisYear = isBatteryYear ? effectiveBatteryCost : 0;
      const netCashFlowJuta = totalRevenueJuta - routineOpexJuta - batteryCostThisYear;
      cumulativeCash += netCashFlowJuta;
      omFundAccumulation = omFundAccumulation + omAllocationJuta - batteryCostThisYear;

      const discountedCashFlow = (netCashFlowJuta * 1000000) / Math.pow(1 + discountRate, year);
      npv += discountedCashFlow;

      if (paybackYear === null && cumulativeCash >= 0) {
        paybackYear = year;
      }

      return {
        year,
        yearKwh: Math.round(yearKwh),
        revenueJuta: Math.round(totalRevenueJuta * 10) / 10,
        netCashFlowJuta: Math.round(netCashFlowJuta * 10) / 10,
        cumulativeCashJuta: Math.round(cumulativeCash * 10) / 10,
        omFundAccumulationJuta: Math.round(omFundAccumulation * 10) / 10,
        isBatteryYear,
      };
    });

    const targetBatYearData = yearlyData.find((d) => d.year === batteryLifespanYears);
    const batteryFundSufficient = targetBatYearData
      ? targetBatYearData.omFundAccumulationJuta >= 0
      : (yearlyData[yearlyData.length - 1]?.omFundAccumulationJuta ?? 0) >= 0;

    return {
      yearlyData,
      npvJuta: Math.round(npv / 1000000),
      paybackPeriodYears: paybackYear || (cumulativeCash < 0 ? `> ${horizonYears}` : horizonYears),
      batteryFundSufficient,
      netAnnualAverageJuta:
        Math.round(
          (yearlyData.reduce((acc, curr) => acc + curr.netCashFlowJuta, 0) / horizonYears) * 10
        ) / 10,
    };
  }, [activeVillage, simulatorParams]);

  const updateDimension = (
    villageId: VillageId,
    key: DimensionKey,
    updates: Partial<DimensionState>
  ) => {
    setVillages((prev) => {
      const v = prev[villageId];
      if (!v) return prev;
      return {
        ...prev,
        [villageId]: {
          ...v,
          dimensions: {
            ...v.dimensions,
            [key]: {
              ...v.dimensions[key],
              ...updates,
            },
          },
        },
      };
    });
  };

  const updatePrerequisite = (
    villageId: VillageId,
    id: PrerequisiteKey,
    checked: boolean,
    evidenceNote?: string
  ) => {
    setVillages((prev) => {
      const v = prev[villageId];
      if (!v) return prev;
      return {
        ...prev,
        [villageId]: {
          ...v,
          prerequisites: {
            ...v.prerequisites,
            [id]: {
              checked,
              evidenceNote:
                evidenceNote !== undefined
                  ? evidenceNote
                  : v.prerequisites[id]?.evidenceNote || '',
            },
          },
        },
      };
    });
  };

  const updateDengarWarga = (villageId: VillageId, updates: Partial<DengarWargaData>) => {
    setVillages((prev) => {
      const v = prev[villageId];
      if (!v) return prev;
      return {
        ...prev,
        [villageId]: {
          ...v,
          dengarWarga: {
            ...(v.dengarWarga || DEMO_DENGAR_WARGA[villageId] || {}),
            ...updates,
          } as DengarWargaData,
        },
      };
    });
  };

  const updateBelajarEnergi = (villageId: VillageId, updates: Partial<BelajarEnergiData>) => {
    setVillages((prev) => {
      const v = prev[villageId];
      if (!v) return prev;
      return {
        ...prev,
        [villageId]: {
          ...v,
          belajarEnergi: {
            ...(v.belajarEnergi || DEMO_BELAJAR_ENERGI[villageId] || {}),
            ...updates,
          } as BelajarEnergiData,
        },
      };
    });
  };

  const updateKelolaBersama = (villageId: VillageId, updates: Partial<KelolaBersamaData>) => {
    setVillages((prev) => {
      const v = prev[villageId];
      if (!v) return prev;
      return {
        ...prev,
        [villageId]: {
          ...v,
          kelolaBersama: {
            ...(v.kelolaBersama || DEMO_KELOLA_BERSAMA[villageId] || {}),
            ...updates,
          } as KelolaBersamaData,
        },
      };
    });
  };

  const updateIndicator = (_villageId: VillageId, _key: any, _value: any) => {
    // compatibility stub
  };

  const batchUpdateIndicators = (_villageId: VillageId, _updates: any) => {
    // compatibility stub
  };

  const addCitizenReport = (report: Omit<CitizenReport, 'id' | 'timestamp' | 'status'>) => {
    const newReport: CitizenReport = {
      ...report,
      id: `LAP-${Date.now().toString().slice(-4)}`,
      timestamp: 'Baru saja',
      status: 'Diterima',
    };
    setCitizenReports((prev) => [newReport, ...prev]);
  };

  const updateCitizenReportStatus = (reportId: string, status: import('../types').CitizenReportStatus) => {
    setCitizenReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status } : r))
    );
  };

  const setVillageMusdesData = (
    villageId: VillageId,
    data: {
      musdesDate?: string;
      musdesAttendeesCount?: number;
      musdesResult?: 'Setuju' | 'Setuju dengan catatan' | 'Belum setuju';
    }
  ) => {
    setVillages((prev) => {
      const current = prev[villageId];
      if (!current) return prev;
      const newResult = data.musdesResult !== undefined ? data.musdesResult : current.musdesResult;
      // Status syarat hanya terpenuhi bila hasilnya Setuju atau Setuju dengan catatan
      const newApproved = newResult === 'Setuju' || newResult === 'Setuju dengan catatan';
      return {
        ...prev,
        [villageId]: {
          ...current,
          musdesDate: data.musdesDate !== undefined ? data.musdesDate : current.musdesDate,
          musdesAttendeesCount:
            data.musdesAttendeesCount !== undefined
              ? data.musdesAttendeesCount
              : current.musdesAttendeesCount,
          musdesResult: newResult,
          musdesApproved: newApproved,
        },
      };
    });
  };

  const addNewVillage = (village: VillageData) => {
    setVillages((prev) => ({
      ...prev,
      [village.id]: village,
    }));
    setSelectedVillageId(village.id);
    setSelectedModelOverride(null);
  };

  const resetDemoData = () => {
    setVillages(INITIAL_VILLAGES);
    setSelectedVillageId('sumber-makmur');
    setSelectedModelOverride(null);
    setMusdesApproved(false);
    setPendampingAssigned(true);
    setCitizenReports(INITIAL_REPORTS);
    setSimulationResetKey((k) => k + 1);
    setSimulatorParams({
      capexJuta: 650,
      tariffPerKwh: 2500,
      productiveLoadPercent: 32,
      monthlyContributionPerKK: 75000,
      panelDegradationPercentPerYear: 0.7,
      batteryLifespanYears: 11,
      batteryReplacementCostJuta: 180,
      horizonYears: 15,
      demandScenario: 'normal',
      stressScenarios: {
        pendapatanUsahaRendah: false,
        biayaBateraiNaik: false,
        gangguanLebihLama: false,
        keterlambatanPembayaran: false,
        perlindunganRumahTanggaRentan: false,
      },
      productiveLoadChecklist: {
        adaPermintaan: true,
        adaOperator: true,
        adaPasar: true,
        biayaLayak: true,
      },
      costBreakdown: {
        biayaAwalCapexJuta: 650,
        operasiRutinJutaPerThn: 10,
        penggantianKomponenJuta: 180,
        degradasiTahunanPersen: 0.7,
        biayaPengelolaJutaPerThn: 6.5,
        danaDaruratJutaPerThn: 5.2,
      },
    });
  };

  return (
    <DesaWattContext.Provider
      value={{
        selectedVillageId,
        setSelectedVillageId,
        activeVillage,
        villages,
        updateDimension,
        updatePrerequisite,
        updateDengarWarga,
        updateBelajarEnergi,
        updateKelolaBersama,
        toggleManualReview,
        lowestDimensions,
        updateIndicator,
        batchUpdateIndicators,
        simulationResetKey,
        totalScore,
        rawTotalScore,
        readinessLevel,
        recommendedModel,
        selectedModelOverride,
        setSelectedModelOverride,
        effectiveModel,
        isModelMismatch,
        lowestIndicators,
        activePage,
        setActivePage,
        isPublicPortal,
        setIsPublicPortal,
        isAuthenticated,
        setIsAuthenticated,
        currentUser,
        login,
        logout,
        musdesApproved,
        setMusdesApproved,
        pendampingAssigned,
        setPendampingAssigned,
        setVillageMusdesApproved,
        setVillagePendampingAssigned,
        calculateGateChecklist,
        gateChecklist,
        gateStatusText,
        gateCanProceed,
        simulatorParams,
        setSimulatorParams,
        simulationResults,
        citizenReports,
        addCitizenReport,
        updateCitizenReportStatus,
        setVillageMusdesData,
        isTourOpen,
        setIsTourOpen,
        startTour,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        toggleSidebar,
        resetDemoData,
        addNewVillage,
      }}
    >
      {children}
    </DesaWattContext.Provider>
  );
}

export function useDesaWatt() {
  const context = useContext(DesaWattContext);
  if (!context) {
    throw new Error('useDesaWatt must be used within a DesaWattProvider');
  }
  return context;
}
