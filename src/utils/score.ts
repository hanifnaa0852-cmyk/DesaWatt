import { ReadinessLevel, ManagementModel, DimensionKey, DimensionState } from '../types';

/**
 * Evaluasi Profil Diagnosis Kualitatif (Tanpa Angka & Tanpa Bobot)
 * Hasil Baca Desa adalah PROFIL DIAGNOSIS dan daftar kesenjangan.
 */
export const SCORE_THRESHOLDS = {
  KEMITRAAN_MIN: 51,
  KOPERASI_MIN: 76,
};

export function toScore100(val: number): number {
  return typeof val === 'number' ? Math.round(val) : 0;
}

/**
 * Menentukan tingkat kesiapan secara kualitatif berdasarkan 8 dimensi:
 * - Tinggi: Mayoritas dimensi "Siap" (minimal 6) dan tidak ada yang "Belum siap"
 * - Menengah: Dimensi campuran ("Siap" dan "Perlu penguatan")
 * - Rendah: Sebagian besar dimensi "Belum siap"
 */
export function getReadinessLevelFromDimensions(
  dimensions?: Record<DimensionKey, DimensionState>
): ReadinessLevel {
  if (!dimensions) return 'Menengah';
  const values = Object.values(dimensions);
  const siapCount = values.filter((d) => d.status === 'Siap').length;
  const belumSiapCount = values.filter((d) => d.status === 'Belum siap').length;

  if (siapCount >= 6 && belumSiapCount === 0) return 'Tinggi';
  if (belumSiapCount >= 4) return 'Rendah';
  return 'Menengah';
}

/**
 * Menentukan rekomendasi model tata kelola dari tingkat kesiapan
 */
export function getRecommendedModelFromLevel(level: ReadinessLevel): ManagementModel {
  if (level === 'Tinggi') return 'milik_koperasi';
  if (level === 'Menengah') return 'kemitraan';
  return 'eaas';
}

// Backward-compatible qualitative helpers
export function getReadinessLevel(arg?: any): ReadinessLevel {
  if (typeof arg === 'object' && arg !== null) {
    return getReadinessLevelFromDimensions(arg);
  }
  return 'Menengah';
}

export function getRecommendedModel(arg?: any): ManagementModel {
  if (typeof arg === 'string') {
    return getRecommendedModelFromLevel(arg as ReadinessLevel);
  }
  return 'kemitraan';
}
