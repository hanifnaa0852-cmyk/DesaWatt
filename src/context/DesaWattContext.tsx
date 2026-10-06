import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  VillageId,
  ReadinessLevel,
  ManagementModel,
  IndicatorKey,
  IndicatorConfig,
  VillageData,
  SimulatorParams,
  CitizenReport,
} from '../types';

export const INDICATOR_CONFIGS: IndicatorConfig[] = [
  {
    key: 'potensi_surya',
    number: '01',
    category: 'Potensi Teknis',
    name: 'Potensi surya & lahan/atap',
    description: 'Ketersediaan lahan terbuka/atap bebas bayangan dan radiasi harian matahari.',
    options: {
      5: { label: 'Rendah', desc: 'Insolasi < 3.5 kWh/m²/hari atau lahan terbatas/berbayang.' },
      10: { label: 'Sedang', desc: 'Insolasi 3.5 - 4.5 kWh/m²/hari, lahan siap izin sewa desa.' },
      15: { label: 'Tinggi', desc: 'Insolasi > 4.5 kWh/m²/hari, lahan kas desa > 1.000 m² bersertifikat & bebas sengketa.' },
    },
    recommendationIfLow: 'Lakukan survei ulang pemetaan bayangan kelapa sawit dan verifikasi legalitas status tanah kas desa bersama BPD.',
  },
  {
    key: 'aksesibilitas',
    number: '02',
    category: 'Potensi Teknis',
    name: 'Aksesibilitas logistik & konektivitas',
    description: 'Kemudahan jalur angkut modul surya, baterai, serta ketersediaan sinyal telemetri.',
    options: {
      5: { label: 'Sulit', desc: 'Hanya bisa roda dua atau perahu, sinyal seluler tidak ada.' },
      10: { label: 'Terbatas', desc: 'Bisa truk sedang, sinyal seluler 3G/4G stabil berkala.' },
      15: { label: 'Baik', desc: 'Jalan aspal mulus, radius < 4 jam dari ibukota kabupaten, sinyal 4G kuat untuk IoT.' },
    },
    recommendationIfLow: 'Petakan jalur logistik darurat alternatif dan siapkan modul penguat sinyal seluler 4G untuk gateway inverter.',
  },
  {
    key: 'anchor_load',
    number: '03',
    category: 'Beban Produktif',
    name: 'Anchor load (cold storage, pabrik es, pengering)',
    description: 'Keberadaan beban listrik produktif di siang hari untuk menyerap energi puncak.',
    options: {
      5: { label: 'Tidak ada', desc: 'Hanya beban lampu penerangan malam warga tanpa kegiatan industri desa.' },
      10: { label: 'Rencana', desc: 'Ada usulan pengadaan mesin penggilingan atau pompa air minum desa.' },
      15: { label: 'Eksisting', desc: 'Sudah beroperasi aktif: cold storage nelayan, pabrik es balok, atau sentra penggilingan gapoktan.' },
    },
    recommendationIfLow: 'Inisiasi program elektrifikasi alat produktif UMKM desa (misal: pendingin tangkapan ikan atau pompa irigasi bersama).',
  },
  {
    key: 'kepastian_pasar',
    number: '04',
    category: 'Beban Produktif',
    name: 'Kepastian pasar hasil usaha',
    description: 'Kelancaran perputaran ekonomi komoditas desa yang didukung energi listrik.',
    options: {
      5: { label: 'Belum', desc: 'Rantai penjualan hasil panen/tangkapan belum stabil dan harga fluktuatif tinggi.' },
      10: { label: 'Sebagian', desc: 'Ada pembeli tetap untuk komoditas utama tetapi kontrak penjualan belum tertulis.' },
      15: { label: 'Pasti', desc: 'Off-taker dan koperasi induk telah mengikat MoU pembelian hasil komoditas olahan secara rutin.' },
    },
    recommendationIfLow: 'Jalin kemitraan pasokan komoditas dengan pedagang besar atau asosiasi pasar terdekat untuk menjamin kelancaran arus kas pelaku usaha.',
  },
  {
    key: 'kapasitas_koperasi',
    number: '05',
    category: 'Kelembagaan',
    name: 'Kapasitas manajemen koperasi',
    description: 'Legalitas badan hukum, tata kelola pengurus, dan sistem pembukuan keuangan.',
    options: {
      5: { label: 'Baru', desc: 'Kepengurusan belum aktif atau pembukuan keuangan belum tercatat rapi.' },
      10: { label: 'Berkembang', desc: 'Badan hukum aktif, ada laporan tahunan berkala walau sistem masih manual.' },
      15: { label: 'Mapan', desc: 'Badan hukum AHU sah, RAT rutin, memiliki unit usaha berjalan dan staf pengelola tetap.' },
    },
    recommendationIfLow: 'Jadwalkan pelatihan tata kelola keuangan unit usaha energi dan tertibkan register pembukuan bersama pendamping desa.',
  },
  {
    key: 'partisipasi_warga',
    number: '06',
    category: 'Kelembagaan',
    name: 'Partisipasi & penerimaan warga',
    description: 'Tingkat dukungan warga desa, persetujuan musyawarah, dan keterlibatan gotong royong.',
    options: {
      5: { label: 'Rendah', desc: 'Banyak warga meragukan keandalan PLTS atau ada konflik kepentingan sumber energi lama.' },
      10: { label: 'Sedang', desc: 'Mayoritas warga setuju dalam sosialisasi awal, namun belum semua menandatangani komitmen tertulis.' },
      15: { label: 'Tinggi', desc: 'Mufakat Musdes 100% didukung, ada kesiapan pemuda desa dilatih menjadi teknisi lokal.' },
    },
    recommendationIfLow: 'Gelar sosialisasi tatap muka tingkat dusun dan libatkan tokoh masyarakat adat untuk menyepakati tata tertib bersama.',
  },
  {
    key: 'kemampuan_bayar',
    number: '07',
    category: 'Keuangan',
    name: 'Kemampuan bayar & arus kas',
    description: 'Kesediaan dan kemampuan rumah tangga membayar iuran rutin listrik per bulan.',
    options: {
      5: { label: 'Lemah', desc: 'Mayoritas warga kesulitan membayar iuran setara tarif genset/minyak tanah sebelumnya.' },
      10: { label: 'Cukup', desc: 'Rata-rata warga mampu mengalokasikan Rp 50.000 - Rp 75.000/bulan secara musiman.' },
      15: { label: 'Kuat', desc: 'Tingkat kepatuhan survey > 95% mampu membayar Rp 75.000/bulan dengan skema pra-bayar/musiman.' },
    },
    recommendationIfLow: 'Terapkan skema iuran fleksibel (pascapanen) dan sediakan skema subsidi silang dari bagi hasil usaha produktif desa.',
  },
  {
    key: 'dana_om',
    number: '08',
    category: 'Keuangan',
    name: 'Kesiapan dana O&M & penggantian baterai',
    description: 'Ketersediaan rekening cadangan (sinking fund) khusus untuk perawatan dan penggantian baterai.',
    options: {
      5: { label: 'Belum', desc: 'Belum ada alokasi kas desa atau rekening khusus pemeliharaan suku cadang PLTS.' },
      10: { label: 'Direncanakan', desc: 'Telah dialokasikan dalam APBDes / rencana modal awal BUMDes tahun berjalan.' },
      15: { label: 'Tersedia', desc: 'Rekening giro/escrow terpisah sudah dibuka di bank dengan saldo awal cadangan operasional siap pakai.' },
    },
    recommendationIfLow: 'Buka rekening cadangan khusus (escrow sinking fund) dan terbitkan Perdes alokasi minimal 15% pendapatan kas untuk tabungan baterai.',
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
    indicators: {
      potensi_surya: 15,
      aksesibilitas: 15,
      anchor_load: 15,
      kepastian_pasar: 10,
      kapasitas_koperasi: 15,
      partisipasi_warga: 15,
      kemampuan_bayar: 15,
      dana_om: 10,
    },
    statusPLTS: 'Waspada',
    statusDescription: 'Inverter Unit 2 terjadwal pembersihan debu filter pendingin sore ini. Pasokan aman.',
    productionTodayKwh: 142,
    collectionRatePercent: 86,
    saldoDanaOMJuta: 46,
    pengurusName: 'Bu Sari',
    pendampingName: 'Pak Budi Hartono',
    technicianName: 'Mas Bambang',
    technicianPhone: '0812-44xx-9821',
    targetBatteryFundJuta: 180,
    musdesApproved: false, // Menunggu Musdes pengesahan Berita Acara
    pendampingAssigned: true,
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
    indicators: {
      potensi_surya: 10,
      aksesibilitas: 10,
      anchor_load: 10,
      kepastian_pasar: 10,
      kapasitas_koperasi: 10,
      partisipasi_warga: 10,
      kemampuan_bayar: 10,
      dana_om: 10,
    },
    statusPLTS: 'Waspada',
    statusDescription: '1 modul panel retak tertimpa dahan sawit (dalam klaim garansi vendor).',
    productionTodayKwh: 105,
    collectionRatePercent: 78,
    saldoDanaOMJuta: 28,
    pengurusName: 'Bu Sari',
    pendampingName: 'Pak Budi Hartono',
    technicianName: 'Pak Hendro',
    technicianPhone: '0813-55xx-4412',
    targetBatteryFundJuta: 140,
    musdesApproved: false,
    pendampingAssigned: true,
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
    indicators: {
      potensi_surya: 10,
      aksesibilitas: 5,
      anchor_load: 5,
      kepastian_pasar: 5,
      kapasitas_koperasi: 5,
      partisipasi_warga: 10,
      kemampuan_bayar: 10,
      dana_om: 5,
    },
    statusPLTS: 'Berisiko Mangkrak',
    statusDescription: 'Baterai soak 2 blok, pengurus koperasi vakum, tunggakan iuran 4 bulan.',
    productionTodayKwh: 38,
    collectionRatePercent: 44.5,
    saldoDanaOMJuta: 6,
    pengurusName: 'Bu Sari',
    pendampingName: 'Pak Budi Hartono',
    technicianName: 'Rahmat',
    technicianPhone: '0852-77xx-1234',
    targetBatteryFundJuta: 100,
    musdesApproved: false,
    pendampingAssigned: false,
  },
};

const INITIAL_REPORTS: CitizenReport[] = [
  {
    id: 'LAP-001',
    villageId: 'sumber-makmur',
    timestamp: 'Hari ini, 08:30 WIB',
    category: 'Lampu Redup / Tegangan Turun',
    description: 'Lampu di RT 03 Dusun Barat sempat berkedip saat jam 19:00 ketika mesin pompa aktif.',
    location: 'RT 03 Dusun Barat',
    isAnonymous: false,
    reporterName: 'Pak Joko (Warga)',
    status: 'Sedang Ditangani',
  },
  {
    id: 'LAP-002',
    villageId: 'sumber-makmur',
    timestamp: 'Kemarin, 14:15 WIB',
    category: 'Pembersihan Panel',
    description: 'Debu tebal terlihat pada deretan modul surya blok utara dekat jalan kebun sawit.',
    location: 'Blok Utara Gardu PLTS',
    isAnonymous: true,
    status: 'Selesai',
  },
];

interface DesaWattContextType {
  selectedVillageId: VillageId;
  setSelectedVillageId: (id: VillageId) => void;
  activeVillage: VillageData;
  villages: Record<VillageId, VillageData>;
  updateIndicator: (villageId: VillageId, key: IndicatorKey, value: 5 | 10 | 15) => void;
  totalScore: number;
  readinessLevel: ReadinessLevel;
  recommendedModel: ManagementModel;
  selectedModelOverride: ManagementModel | null;
  setSelectedModelOverride: (model: ManagementModel | null) => void;
  effectiveModel: ManagementModel;
  isModelMismatch: boolean;
  lowestIndicators: IndicatorConfig[];
  activePage: 'beranda' | 'baca-desa' | 'rancang-watt' | 'gerbang-keputusan' | 'jaga-watt';
  setActivePage: (page: 'beranda' | 'baca-desa' | 'rancang-watt' | 'gerbang-keputusan' | 'jaga-watt') => void;
  isPublicPortal: boolean;
  setIsPublicPortal: (isPublic: boolean) => void;
  // Gate checklist states per village
  musdesApproved: boolean;
  setMusdesApproved: (approved: boolean) => void;
  pendampingAssigned: boolean;
  setPendampingAssigned: (assigned: boolean) => void;
  setVillageMusdesApproved: (villageId: VillageId, approved: boolean) => void;
  setVillagePendampingAssigned: (villageId: VillageId, assigned: boolean) => void;
  calculateGateChecklist: (villageId: VillageId) => import('../types').GateChecklistResult;
  gateChecklist: {
    scorePass: boolean;
    omPlanPass: boolean;
    batteryPlanPass: boolean;
    musdesPass: boolean;
    pendampingPass: boolean;
    allPass: boolean;
    passedCount: number;
    totalCount: number;
  };
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
    organization: string;
  };
  login: (username?: string, role?: string) => Promise<void>;
  logout: () => void;
  // Citizen reports
  citizenReports: CitizenReport[];
  addCitizenReport: (report: Omit<CitizenReport, 'id' | 'timestamp' | 'status'>) => void;
  // Reset
  resetDemoData: () => void;
}

const DesaWattContext = createContext<DesaWattContextType | null>(null);

export function DesaWattProvider({ children }: { children: React.ReactNode }) {
  const [selectedVillageId, setSelectedVillageId] = useState<VillageId>('sumber-makmur');
  const [villages, setVillages] = useState<Record<VillageId, VillageData>>(INITIAL_VILLAGES);
  const [activePage, setActivePage] = useState<'beranda' | 'baca-desa' | 'rancang-watt' | 'gerbang-keputusan' | 'jaga-watt'>('beranda');
  const [isPublicPortal, setIsPublicPortal] = useState<boolean>(false);
  const [selectedModelOverride, setSelectedModelOverride] = useState<ManagementModel | null>(null);
  const [citizenReports, setCitizenReports] = useState<CitizenReport[]>(INITIAL_REPORTS);

  // Authentication state (Default to false so login page appears on initial load)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState({
    name: 'Bu Sari',
    role: 'Pengurus Koperasi',
    organization: 'Koperasi Desa Sumber Makmur Mandiri',
  });

  const login = async (username = 'Bu Sari', role = 'Pengurus Koperasi') => {
    setCurrentUser({
      name: username,
      role: role,
      organization: 'Koperasi Desa Sumber Makmur Mandiri',
    });
    setIsAuthenticated(true);
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
    batteryReplacementCostJuta: 180,
    horizonYears: 15,
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

  const totalScore = useMemo(() => {
    return Object.values(activeVillage.indicators).reduce((acc, curr) => acc + curr, 0);
  }, [activeVillage.indicators]);

  const readinessLevel: ReadinessLevel = useMemo(() => {
    if (totalScore <= 60) return 'Rendah';
    if (totalScore <= 90) return 'Menengah';
    return 'Tinggi';
  }, [totalScore]);

  const recommendedModel: ManagementModel = useMemo(() => {
    if (readinessLevel === 'Tinggi') return 'milik_koperasi';
    if (readinessLevel === 'Menengah') return 'kemitraan';
    return 'eaas';
  }, [readinessLevel]);

  const effectiveModel: ManagementModel = selectedModelOverride || recommendedModel;

  // Threshold rule per model:
  // Milik Koperasi: min 91
  // Kemitraan: min 61
  // EaaS: min 61
  // Below 61: "KEMBALIKAN KE PENDAMPINGAN"
  const isModelMismatch = useMemo(() => {
    if (effectiveModel === 'milik_koperasi' && totalScore < 91) return true;
    if (effectiveModel === 'kemitraan' && totalScore < 61) return true;
    if (effectiveModel === 'eaas' && totalScore < 61) return true;
    return false;
  }, [effectiveModel, totalScore]);

  const lowestIndicators = useMemo(() => {
    const sorted = [...INDICATOR_CONFIGS].sort((a, b) => {
      const valA = activeVillage.indicators[a.key];
      const valB = activeVillage.indicators[b.key];
      return valA - valB;
    });
    return sorted.slice(0, 2);
  }, [activeVillage.indicators]);

  // Calculate gate checklist for any village using identical 5-point verification matrix
  const calculateGateChecklist = (villageId: VillageId): import('../types').GateChecklistResult => {
    const v = villages[villageId];
    const score = Object.values(v.indicators).reduce((acc, curr) => acc + curr, 0);
    const rLevel: ReadinessLevel = score <= 60 ? 'Rendah' : score <= 90 ? 'Menengah' : 'Tinggi';
    const recModel: ManagementModel =
      rLevel === 'Tinggi' ? 'milik_koperasi' : rLevel === 'Menengah' ? 'kemitraan' : 'eaas';
    const effModel = villageId === selectedVillageId && selectedModelOverride ? selectedModelOverride : recModel;

    let mismatch = false;
    if (effModel === 'milik_koperasi' && score < 91) mismatch = true;
    if (effModel === 'kemitraan' && score < 61) mismatch = true;
    if (effModel === 'eaas' && score < 61) mismatch = true;

    // Item 1: Score meets chosen model threshold and score >= 61
    const scorePass = !mismatch && score >= 61;
    // Item 2: OM plan pass (written & funds available)
    const omPlanPass = v.saldoDanaOMJuta > 0;
    // Item 3: Battery replacement plan pass
    const batteryPlanPass = v.targetBatteryFundJuta > 0;
    // Item 4: Musdes approval (stored per village)
    const musdesPass = v.musdesApproved;
    // Item 5: Certified facilitator assigned (stored per village)
    const pendampingPass = v.pendampingAssigned;

    const items = [scorePass, omPlanPass, batteryPlanPass, musdesPass, pendampingPass];
    const passedCount = items.filter(Boolean).length;
    const totalCount = items.length;
    const allPass = passedCount === totalCount;

    let statusText = '';
    let statusStyle = '';
    let modelLabel = '';

    if (effModel === 'milik_koperasi') modelLabel = 'Milik Koperasi';
    else if (effModel === 'kemitraan') modelLabel = 'Kemitraan/EaaS';
    else modelLabel = score < 61 ? 'Pendampingan + pilot kecil' : 'EaaS';

    if (score < 61) {
      statusText = `Kembalikan ke Pendampingan (${passedCount}/${totalCount})`;
      statusStyle = 'bg-[#FDF2F2] text-[#D64545] border border-[#F8C3C3]';
    } else if (allPass) {
      statusText = `Siap Dilanjutkan (${passedCount}/${totalCount})`;
      statusStyle = 'bg-[#EBF7F1] text-[#147A4B] border border-[#C1E7D4]';
    } else {
      if (!musdesPass && passedCount === 4) {
        statusText = `Menunggu Musdes (${passedCount}/${totalCount})`;
        statusStyle = 'bg-[#FEF6E9] text-[#96600E] border border-[#FCDCA7]';
      } else {
        const remaining = totalCount - passedCount;
        statusText = `Menunggu ${remaining} Syarat (${passedCount}/${totalCount})`;
        statusStyle = 'bg-[#FEF6E9] text-[#96600E] border border-[#FCDCA7]';
      }
    }

    return {
      scorePass,
      omPlanPass,
      batteryPlanPass,
      musdesPass,
      pendampingPass,
      allPass,
      passedCount,
      totalCount,
      statusText,
      statusStyle,
      modelLabel,
    };
  };

  const gateChecklist = useMemo(() => {
    return calculateGateChecklist(selectedVillageId);
  }, [selectedVillageId, villages, selectedModelOverride]);

  const gateStatusText = useMemo(() => {
    if (totalScore < 61) {
      return 'KEMBALIKAN KE PENDAMPINGAN';
    }
    if (gateChecklist.allPass) {
      return 'SIAP DILANJUTKAN';
    }
    const diff = gateChecklist.totalCount - gateChecklist.passedCount;
    return `MENUNGGU ${diff} SYARAT`;
  }, [totalScore, gateChecklist]);

  const gateCanProceed = gateChecklist.allPass && totalScore >= 61;

  // Global cash-flow simulator results so all pages share the exact same numbers
  const simulationResults = useMemo(() => {
    const {
      capexJuta,
      tariffPerKwh,
      productiveLoadPercent,
      monthlyContributionPerKK,
      panelDegradationPercentPerYear,
      batteryReplacementCostJuta,
      horizonYears,
    } = simulatorParams;

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
      const energyRevenueJuta = (yearKwh * (productiveLoadPercent / 100) * tariffPerKwh) / 1000000;
      const contributionRevenueJuta =
        (activeVillage.connectionsKK * monthlyContributionPerKK * 12) / 1000000;
      const totalRevenueJuta = energyRevenueJuta + contributionRevenueJuta;
      const routineOpexJuta = capexJuta * 0.025;
      const omAllocationJuta = totalRevenueJuta * 0.2;
      const isBatteryYear = year === 11;
      const batteryCostThisYear = isBatteryYear ? batteryReplacementCostJuta : 0;
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

    const y11 = yearlyData.find((d) => d.year === 11);
    const batteryFundSufficient = (y11?.omFundAccumulationJuta ?? 0) >= 0;

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

  const updateIndicator = (villageId: VillageId, key: IndicatorKey, value: 5 | 10 | 15) => {
    setVillages((prev) => ({
      ...prev,
      [villageId]: {
        ...prev[villageId],
        indicators: {
          ...prev[villageId].indicators,
          [key]: value,
        },
      },
    }));
  };

  const addCitizenReport = (report: Omit<CitizenReport, 'id' | 'timestamp' | 'status'>) => {
    const newReport: CitizenReport = {
      ...report,
      id: `LAP-${Date.now().toString().slice(-4)}`,
      timestamp: 'Baru saja',
      status: 'Menunggu Verifikasi',
    };
    setCitizenReports((prev) => [newReport, ...prev]);
  };

  const resetDemoData = () => {
    setVillages(INITIAL_VILLAGES);
    setSelectedVillageId('sumber-makmur');
    setSelectedModelOverride(null);
    setMusdesApproved(false);
    setPendampingAssigned(true);
    setCitizenReports(INITIAL_REPORTS);
  };

  return (
    <DesaWattContext.Provider
      value={{
        selectedVillageId,
        setSelectedVillageId,
        activeVillage,
        villages,
        updateIndicator,
        totalScore,
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
        resetDemoData,
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
