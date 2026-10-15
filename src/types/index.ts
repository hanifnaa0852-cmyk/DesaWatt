export type DemoVillageId = 'sumber-makmur' | 'tirta-mukti' | 'karang-asri';
export type VillageId = DemoVillageId | (string & {});

export type ReadinessLevel = 'Rendah' | 'Menengah' | 'Tinggi';

export type AppPage =
  | 'beranda'
  | 'dengar-warga'
  | 'belajar-energi'
  | 'baca-desa'
  | 'rancang-watt'
  | 'gerbang-keputusan'
  | 'kelola-bersama'
  | 'jaga-watt'
  | 'ringkasan-wilayah';

export type ManagementModel = 'milik_koperasi' | 'kemitraan' | 'eaas';

// 8 Dimensi Diagnosis Kualitatif Baca Desa
export type DimensionKey =
  | 'potensi_teknis'
  | 'kebutuhan_penggunaan'
  | 'literasi_kapasitas'
  | 'partisipasi_inklusi'
  | 'kelembagaan'
  | 'kelayakan_ekonomi'
  | 'keberlanjutan_om'
  | 'data_akuntabilitas';

export type DimensionStatus = 'Siap' | 'Perlu penguatan' | 'Belum siap';
export type EvidenceStatus = 'Terverifikasi lapangan' | 'Belum diverifikasi';

export interface DimensionConfig {
  key: DimensionKey;
  number: string;
  title: string;
  evidenceMinimum: string;
  description: string;
  gapActionSuggestion: string;
}

export interface DimensionState {
  status: DimensionStatus;
  verificationStatus: EvidenceStatus;
  notes?: string;
}

// 5 Prasyarat Mutlak Gerbang Keputusan
export type PrerequisiteKey =
  | 'keselamatan_instalasi'
  | 'proses_partisipasi'
  | 'rencana_om'
  | 'penanggung_jawab_operasi'
  | 'perlindungan_kelompok_rentan';

export interface PrerequisiteConfig {
  id: PrerequisiteKey;
  number: number;
  title: string;
  description: string;
}

export interface PrerequisiteState {
  checked: boolean;
  evidenceNote: string;
}

export interface VillageData {
  id: VillageId;
  name: string;
  subdistrict: string;
  regency: string;
  province: string;
  capacityKwp: number;
  batteryKwh: number;
  connectionsKK: number;
  dimensions: Record<DimensionKey, DimensionState>;
  prerequisites: Record<PrerequisiteKey, PrerequisiteState>;
  saranRekomendasi?: string;
  statusPLTS: 'Sehat' | 'Waspada' | 'Berisiko Mangkrak';
  statusDescription: string;
  productionTodayKwh: number;
  collectionRatePercent: number;
  saldoDanaOMJuta: number;
  pengurusName: string;
  pendampingName: string;
  technicianName: string;
  technicianPhone: string;
  targetBatteryFundJuta: number;
  musdesApproved: boolean;
  pendampingAssigned: boolean;
  musdesDate?: string;
  musdesAttendeesCount?: number;
  musdesResult?: 'Setuju' | 'Setuju dengan catatan' | 'Belum setuju';
  dengarWarga?: DengarWargaData;
  belajarEnergi?: BelajarEnergiData;
  kelolaBersama?: KelolaBersamaData;
  perluDitinjau?: boolean;
  perluDitinjauCatatan?: string;
}

export type DemandScenario = 'rendah' | 'normal' | 'tinggi';

export interface StressScenarioConfig {
  pendapatanUsahaRendah: boolean;
  biayaBateraiNaik: boolean;
  gangguanLebihLama: boolean;
  keterlambatanPembayaran: boolean;
  perlindunganRumahTanggaRentan: boolean;
}

export interface ProductiveLoadChecklist {
  adaPermintaan: boolean;
  adaOperator: boolean;
  adaPasar: boolean;
  biayaLayak: boolean;
}

export interface CostBreakdown {
  biayaAwalCapexJuta: number;
  operasiRutinJutaPerThn: number;
  penggantianKomponenJuta: number;
  degradasiTahunanPersen: number;
  biayaPengelolaJutaPerThn: number;
  danaDaruratJutaPerThn: number;
}

export interface SimulatorParams {
  capexJuta: number;
  tariffPerKwh: number;
  productiveLoadPercent: number;
  monthlyContributionPerKK: number;
  panelDegradationPercentPerYear: number;
  batteryLifespanYears: number;
  batteryReplacementCostJuta: number;
  horizonYears: 10 | 15 | 20;
  demandScenario?: DemandScenario;
  stressScenarios?: StressScenarioConfig;
  productiveLoadChecklist?: ProductiveLoadChecklist;
  costBreakdown?: CostBreakdown;
}

export interface SimulationYearData {
  year: number;
  yearKwh: number;
  revenueJuta: number;
  netCashFlowJuta: number;
  cumulativeCashJuta: number;
  omFundAccumulationJuta: number;
  isBatteryYear: boolean;
}

export interface SimulationResults {
  yearlyData: SimulationYearData[];
  npvJuta: number;
  paybackPeriodYears: number | string;
  batteryFundSufficient: boolean;
  netAnnualAverageJuta: number;
}

export interface GateChecklistResult {
  allPass: boolean;
  passedCount: number;
  totalCount: number;
  statusText: string;
  statusStyle: string;
  saranRekomendasi: string;
  modelLabel: string;
  prerequisites: Record<PrerequisiteKey, PrerequisiteState>;
}

export type CitizenReportStatus = 'Diterima' | 'Ditinjau' | 'Ditindaklanjuti';

export interface CitizenReport {
  id: string;
  villageId: VillageId;
  timestamp: string;
  category: 'Panel/Listrik padam' | 'Iuran dan keuangan' | 'Transparansi' | 'Lainnya' | string;
  description: string;
  location: string;
  isAnonymous: boolean;
  reporterName?: string;
  status: CitizenReportStatus;
}

// 1) Dengar Warga
export interface MasukanDesainItem {
  id: string;
  masukan: string;
  perubahanDesain: string;
  pengusul: string;
}

export interface DengarWargaData {
  tanggal: string;
  jumlahHadir: number;
  kehadiranKategori: {
    perempuan: number;
    pemuda: number;
    kelompokRentan: number;
    pelakuUsaha: number;
  };
  daftarPrioritas: string[];
  hambatanAkses: string[];
  masukanMengubahDesain: MasukanDesainItem[];
  isuBelumTerselesaikan: string[];
}

// 2) Belajar Energi
export type KelompokPelatihan =
  | 'Rumah Tangga'
  | 'Operator'
  | 'Pengurus Koperasi'
  | 'Pelaku Usaha'
  | 'Pemuda'
  | 'Kelompok Perempuan';

export interface PelatihanKelompokItem {
  id: string;
  kelompok: KelompokPelatihan;
  jumlahPeserta: number;
  hasilPreTest: string;
  hasilPostTest: string;
  tindakLanjut: 'Belum dilakukan' | 'Sudah' | 'Terjadwal';
  catatanTindakLanjut?: string;
}

export type BelajarEnergiStage = 1 | 2 | 3 | 4;

export interface BelajarEnergiData {
  currentStage: BelajarEnergiStage;
  pelatihanList: PelatihanKelompokItem[];
}

// 3) Kelola Bersama
export interface OperatorTerlatih {
  id: string;
  nama: string;
  peran: string;
  kontak: string;
  pelatihanSertifikasi: string;
  statusPenugasan: 'Aktif Ditugaskan' | 'Calon Operator' | 'Belum Ditugaskan';
}

export interface SopItem {
  id: string;
  judul: string;
  kategori: string;
  status: 'Tersedia' | 'Belum';
  keterangan: string;
}

export interface PembagianTanggungJawabItem {
  peran: string;
  namaPihak: string;
  tanggungJawabUtama: string;
}

export interface KelolaBersamaData {
  penanggungJawabOperasiNama: string;
  operators: OperatorTerlatih[];
  sops: SopItem[];
  pembagianPeran: PembagianTanggungJawabItem[];
  statusPembukuan: 'Tertib & Terbuka' | 'Dalam Penyesuaian' | 'Belum Tersedia';
  catatanPembukuan: string;
  kontrakLayanan: 'Tersedia & Berlaku' | 'Dalam Draf Perjanjian' | 'Belum Ada';
  catatanKontrak: string;
}

