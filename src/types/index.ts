export type VillageId = 'sumber-makmur' | 'tirta-mukti' | 'karang-asri';

export type ReadinessLevel = 'Rendah' | 'Menengah' | 'Tinggi';

export type AppPage =
  | 'beranda'
  | 'baca-desa'
  | 'rancang-watt'
  | 'gerbang-keputusan'
  | 'jaga-watt'
  | 'ringkasan-wilayah';

export type ManagementModel = 'milik_koperasi' | 'kemitraan' | 'eaas';

export type IndicatorKey =
  | 'potensi_surya'
  | 'aksesibilitas'
  | 'anchor_load'
  | 'kepastian_pasar'
  | 'kapasitas_koperasi'
  | 'partisipasi_warga'
  | 'kemampuan_bayar'
  | 'dana_om';

export interface IndicatorConfig {
  key: IndicatorKey;
  number: string;
  category: 'Potensi Teknis' | 'Beban Produktif' | 'Kelembagaan' | 'Keuangan';
  name: string;
  description: string;
  options: {
    5: { label: string; desc: string };
    10: { label: string; desc: string };
    15: { label: string; desc: string };
  };
  recommendationIfLow: string;
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
  indicators: Record<IndicatorKey, 5 | 10 | 15>;
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
}

export interface SimulatorParams {
  capexJuta: number;
  tariffPerKwh: number;
  productiveLoadPercent: number;
  monthlyContributionPerKK: number;
  panelDegradationPercentPerYear: number;
  batteryReplacementCostJuta: number;
  horizonYears: 10 | 15 | 20;
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
  scorePass: boolean;
  omPlanPass: boolean;
  batteryPlanPass: boolean;
  musdesPass: boolean;
  pendampingPass: boolean;
  allPass: boolean;
  passedCount: number;
  totalCount: number;
  statusText: string;
  statusStyle: string;
  modelLabel: string;
}

export interface CitizenReport {
  id: string;
  villageId: VillageId;
  timestamp: string;
  category: string;
  description: string;
  location: string;
  isAnonymous: boolean;
  reporterName?: string;
  status: 'Menunggu Verifikasi' | 'Sedang Ditangani' | 'Selesai';
}
