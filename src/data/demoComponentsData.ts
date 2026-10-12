import {
  DengarWargaData,
  BelajarEnergiData,
  KelolaBersamaData,
  VillageId,
} from '../types';

export const DEMO_DENGAR_WARGA: Record<VillageId, DengarWargaData> = {
  'sumber-makmur': {
    tanggal: '18 Januari 2026',
    jumlahHadir: 142,
    kehadiranKategori: {
      perempuan: 58,
      pemuda: 40,
      kelompokRentan: 18,
      pelakuUsaha: 26,
    },
    daftarPrioritas: [
      '1. Penerangan rumah tangga & darurat poskesdes malam hari (18:00 - 06:00)',
      '2. Pompa air bersih desa & kulkas vaksin Puskesmas Pembantu (08:00 - 11:30)',
      '3. Sentra pengolahan kopi & mesin jahit UMKM komunal perempuan (09:00 - 14:00)',
      '4. Penerangan jalan lingkungan balai dusun',
    ],
    hambatanAkses: [
      'Jarak kabel ke RT 03 Dusun Barat melintasi lereng bukit dan rawan terpaan dahan sawit',
      '14 KK lansia tunggal dan prasejahtera kesulitan membayar biaya sambungan awal',
      'Kebutuhan daya sentra pengeringan emping dan kopi memerlukan stabilitas tegangan siang',
    ],
    masukanMengubahDesain: [
      {
        id: 'MMD-SM-1',
        masukan:
          'Kelompok perempuan pengrajin kopi meminta jadwal listrik pompa air dimajukan pukul 08:00-11:30 agar tidak bentrok dengan jam memasak dan aktivitas rumah.',
        perubahanDesain:
          'Pengaturan timer otomatis pompa air di gardu disetel aktif pukul 08:00 - 11:30 saat produksi surya melimpah.',
        pengusul: 'Ibu Fatimah (Kader Posyandu & Pengrajin Kopi)',
      },
      {
        id: 'MMD-SM-2',
        masukan:
          'Warga Dusun Barat mengusulkan trase tiang kabel tidak memotong kebun warga melainkan mengikuti badan jalan setapak desa.',
        perubahanDesain:
          'Trase tiang distribusi digeser 35 meter mengikuti jalan desa dengan penambahan 2 tiang baja galvanis.',
        pengusul: 'Pak Syamsul (Tokoh Warga Dusun Barat)',
      },
      {
        id: 'MMD-SM-3',
        masukan:
          'Pengurus koperasi dan kader mengusulkan subsidi silang iuran untuk 14 KK lansia dan prasejahtera.',
        perubahanDesain:
          'Ditetapkan kuota beban dasar 150 VA dengan tarif afirmasi subsidi silang dari kas bagi hasil unit produktif koperasi.',
        pengusul: 'Ibu Nurbaiti (Koperasi Merah Putih)',
      },
    ],
    isuBelumTerselesaikan: [
      'Penetapan sanksi sosial/denda bagi warga yang mencoba memotong segel MCB pembatas daya.',
      'SOP genset darurat cadangan jika terjadi musim hujan dan cuaca mendung beruntun lebih dari 3 hari.',
    ],
  },
  'tirta-mukti': {
    tanggal: '24 Januari 2026',
    jumlahHadir: 88,
    kehadiranKategori: {
      perempuan: 34,
      pemuda: 22,
      kelompokRentan: 12,
      pelakuUsaha: 20,
    },
    daftarPrioritas: [
      '1. Penerangan rumah tangga dusun hilir dan dermaga sungai (18:00 - 06:00)',
      '2. Mesin pembuat pakan ikan mandiri kelompok tani (siang 09:30 - 13:30)',
      '3. Pompa distribusi air bersih Dusun Tengah',
      '4. Balai posyandu & sarana ibadah',
    ],
    hambatanAkses: [
      'Tegangan drop di ujung dusun hilir akibat panjangnya bentangan kabel transmisi',
      '18 KK nelayan musiman memiliki siklus penghasilan tidak tetap untuk iuran bulanan flat',
      'Kekhawatiran pohon sawit tua roboh menimpa panel surya darat',
    ],
    masukanMengubahDesain: [
      {
        id: 'MMD-TM-1',
        masukan:
          'Kelompok nelayan meminta opsi pembayaran iuran mingguan saat hasil tangkapan melimpah, bukan denda bulanan.',
        perubahanDesain:
          'Unit usaha BUMDes menyediakan opsi pembayaran fleksibel mingguan dan kartu kontrol iuran nelayan.',
        pengusul: 'Pak Badarudin (Ketua Kelompok Nelayan)',
      },
      {
        id: 'MMD-TM-2',
        masukan:
          'Ibu-ibu pengrajin anyaman rotan meminta penambahan titik lampu di balai kelompok kerja dusun hilir.',
        perubahanDesain:
          'Jalur penerangan ditambah 3 titik lampu LED hemat daya dengan saklar terpisah.',
        pengusul: 'Ibu Halimah (Pengrajin Anyaman Dusun Hilir)',
      },
    ],
    isuBelumTerselesaikan: [
      'SOP tarif afirmasi untuk 18 KK rentan belum disahkan secara formal oleh BPD.',
      'Draf pembentukan rekening sinking fund cadangan baterai masih menunggu persetujuan BUMDes.',
    ],
  },
  'karang-asri': {
    tanggal: '05 Februari 2026 (Musyawarah Awal Pendampingan)',
    jumlahHadir: 35,
    kehadiranKategori: {
      perempuan: 8,
      pemuda: 9,
      kelompokRentan: 6,
      pelakuUsaha: 12,
    },
    daftarPrioritas: [
      '1. Pemulihan lampu penerangan rumah yang sering padam malam hari (darurat)',
      '2. Pompa air minum komunal dusun atas',
      '3. Bengkel las dan pertukangan kayu warga (siang hari)',
    ],
    hambatanAkses: [
      'Baterai PLTS lama soak dan rusak karena kelebihan beban tanpa pembatas daya',
      'Tingginya tunggakan iuran warga (kepatuhan hanya 44%) karena ketidakpercayaan pada pengurus lama',
      'Belum ada penanggung jawab operasi dan teknisi lokal yang terlatih',
      'Jaringan tiang tertutup dahan pohon karet lebat dan rawan korsleting',
    ],
    masukanMengubahDesain: [
      {
        id: 'MMD-KA-1',
        masukan:
          'Warga menolak membayar iuran jika transparansi kas dana baterai tidak dibuka secara berkala di balai desa.',
        perubahanDesain:
          'Disepakati pembentukan Dewan Pengawas Warga dan pemasangan papan pengumuman kas iuran mingguan.',
        pengusul: 'Pak Kusumo (Tokoh Masyarakat Dusun 1)',
      },
      {
        id: 'MMD-KA-2',
        masukan:
          'Pelaku usaha bengkel las bersedia beroperasi bergiliran siang hari bila daya listrik terjamin stabil.',
        perubahanDesain:
          'Kapasitas daya dialokasikan terpisah antara jalur beban produktif siang dan lampu rumah tangga.',
        pengusul: 'Mas Joko (Pemuda Pelaku Usaha Bengkel)',
      },
    ],
    isuBelumTerselesaikan: [
      'Belum disepakatinya penanggung jawab operasi resmi yang ditunjuk oleh musyawarah desa.',
      'Penyelesaian tunggakan iuran masa lalu dan pemulihan rekening sinking fund cadangan baterai.',
      'Pergantian pengurus koperasi yang telah vakum selama 8 bulan.',
    ],
  },
};

export const DEMO_BELAJAR_ENERGI: Record<VillageId, BelajarEnergiData> = {
  'sumber-makmur': {
    currentStage: 3, // Praktik
    pelatihanList: [
      {
        id: 'PEL-SM-1',
        kelompok: 'Rumah Tangga',
        jumlahPeserta: 75,
        hasilPreTest: '38% (Pemahaman etika beban & keselamatan dasar rendah)',
        hasilPostTest: '89% (Paham etika beban malam & pemilihan lampu LED)',
        tindakLanjut: 'Sudah',
        catatanTindakLanjut: 'Pemeriksaan acak MCB rumah dan pembagian stiker etika hemat daya.',
      },
      {
        id: 'PEL-SM-2',
        kelompok: 'Operator',
        jumlahPeserta: 6,
        hasilPreTest: '46% (Pengalaman terbatas genset solar konvensional)',
        hasilPostTest: '94% (Lulus uji SOP baterai, inverter, & keselamatan K3)',
        tindakLanjut: 'Sudah',
        catatanTindakLanjut: 'Pencatatan logsheet bus voltage dan perawatan filter inverter harian.',
      },
      {
        id: 'PEL-SM-3',
        kelompok: 'Pengurus Koperasi',
        jumlahPeserta: 12,
        hasilPreTest: '52% (Pembukuan kas manual buku tulis sederhana)',
        hasilPostTest: '90% (Menguasai rekening escrow sinking fund baterai)',
        tindakLanjut: 'Sudah',
        catatanTindakLanjut: 'Laporan keuangan bulanan kas O&M ditempel di papan transparansi balai desa.',
      },
      {
        id: 'PEL-SM-4',
        kelompok: 'Pelaku Usaha',
        jumlahPeserta: 24,
        hasilPreTest: '41% (Cenderung menyalakan mesin produktif malam hari)',
        hasilPostTest: '88% (Komitmen disiplin shift operasi siang 09:30-13:30)',
        tindakLanjut: 'Sudah',
        catatanTindakLanjut: 'Penjadwalan operasi mesin giling kopi dan pompa air terkoordinasi.',
      },
      {
        id: 'PEL-SM-5',
        kelompok: 'Pemuda',
        jumlahPeserta: 32,
        hasilPreTest: '43% (Belum paham bahaya tegangan DC tinggi)',
        hasilPostTest: '91% (Terlatih tim siaga tanggap ranting & evakuasi darurat)',
        tindakLanjut: 'Sudah',
        catatanTindakLanjut: 'Patroli berkala jalur kabel udara dusun menjelang musim angin.',
      },
      {
        id: 'PEL-SM-6',
        kelompok: 'Kelompok Perempuan',
        jumlahPeserta: 48,
        hasilPreTest: '44% (Khawatir listrik padam mendadak merusak kulkas)',
        hasilPostTest: '92% (Menguasai pembagian beban rumah tangga & usaha kue)',
        tindakLanjut: 'Sudah',
        catatanTindakLanjut: 'Kader posyandu memantau kulkas vaksin dan keluhan layanan warga.',
      },
    ],
  },
  'tirta-mukti': {
    currentStage: 2, // Kasus
    pelatihanList: [
      {
        id: 'PEL-TM-1',
        kelompok: 'Rumah Tangga',
        jumlahPeserta: 54,
        hasilPreTest: '35% (Pemahaman minim tentang kapasitas baterai terbatas)',
        hasilPostTest: '82% (Memahami batas daya per rumah & pemakaian wajar)',
        tindakLanjut: 'Sudah',
        catatanTindakLanjut: 'Distribusi selebaran etika beban saat pembagian token/iuran.',
      },
      {
        id: 'PEL-TM-2',
        kelompok: 'Operator',
        jumlahPeserta: 4,
        hasilPreTest: '50% (Pernah ikut pelatihan dasar listrik sekolah vokasi)',
        hasilPostTest: '86% (Mampu membaca parameter inverter dan baterai)',
        tindakLanjut: 'Sudah',
        catatanTindakLanjut: 'Praktik supervisi mingguan bersama pendamping teknik kabupaten.',
      },
      {
        id: 'PEL-TM-3',
        kelompok: 'Pengurus Koperasi',
        jumlahPeserta: 8,
        hasilPreTest: '44% (Belum terbiasa menghitung biaya depresiasi)',
        hasilPostTest: '80% (Paham pentingnya tabungan baterai 5 tahunan)',
        tindakLanjut: 'Belum dilakukan',
        catatanTindakLanjut: 'Dijadwalkan pelatihan lanjutan tata kelola rekening escrow bulan depan.',
      },
      {
        id: 'PEL-TM-4',
        kelompok: 'Pelaku Usaha',
        jumlahPeserta: 18,
        hasilPreTest: '38% (Menghidupkan mesin pendingin tanpa koordinasi)',
        hasilPostTest: '84% (Sepakat shift operasi siang hari)',
        tindakLanjut: 'Sudah',
        catatanTindakLanjut: 'Pemasangan kwh meter khusus untuk unit pakan ikan komunal.',
      },
      {
        id: 'PEL-TM-5',
        kelompok: 'Pemuda',
        jumlahPeserta: 22,
        hasilPreTest: '40% (Pengetahuan sambungan kabel acak)',
        hasilPostTest: '85% (Memahami jalur keselamatan & isolasi sambungan)',
        tindakLanjut: 'Belum dilakukan',
        catatanTindakLanjut: 'Pembentukan brigade pemangkasan ranting pohon darurat desa.',
      },
      {
        id: 'PEL-TM-6',
        kelompok: 'Kelompok Perempuan',
        jumlahPeserta: 36,
        hasilPreTest: '42% (Takut korsleting saat saklar basah)',
        hasilPostTest: '88% (Memahami pengoperasian alat rumah tangga aman)',
        tindakLanjut: 'Sudah',
        catatanTindakLanjut: 'Arisan dusun menjadi forum evaluasi keterbukaan iuran bulanan.',
      },
    ],
  },
  'karang-asri': {
    currentStage: 1, // Baseline
    pelatihanList: [
      {
        id: 'PEL-KA-1',
        kelompok: 'Rumah Tangga',
        jumlahPeserta: 28,
        hasilPreTest: '24% (Banyak yang tidak tahu penyebab baterai cepat rusak)',
        hasilPostTest: '65% (Mulai memahami bahaya kelebihan beban malam)',
        tindakLanjut: 'Belum dilakukan',
        catatanTindakLanjut: 'Perlu pembelajaran ulang berbasis kasus mengapa PLTS terdahulu mangkrak.',
      },
      {
        id: 'PEL-KA-2',
        kelompok: 'Operator',
        jumlahPeserta: 0,
        hasilPreTest: '0% (Belum ada operator yang ditunjuk)',
        hasilPostTest: '0% (Belum ada operator yang ditunjuk)',
        tindakLanjut: 'Belum dilakukan',
        catatanTindakLanjut: 'Mendesak: Rekrutmen 2 calon teknisi muda untuk dikirim ke pelatihan intensif.',
      },
      {
        id: 'PEL-KA-3',
        kelompok: 'Pengurus Koperasi',
        jumlahPeserta: 5,
        hasilPreTest: '28% (Pengurus lama vakum, tidak ada catatan pembukuan)',
        hasilPostTest: '62% (Memahami dasar pencatatan kas keluar-masuk)',
        tindakLanjut: 'Belum dilakukan',
        catatanTindakLanjut: 'Perlu restrukturisasi pengurus melalui musyawarah desa luar biasa.',
      },
      {
        id: 'PEL-KA-4',
        kelompok: 'Pelaku Usaha',
        jumlahPeserta: 10,
        hasilPreTest: '30% (Kerap menyalakan mesin las tanpa koordinasi beban)',
        hasilPostTest: '70% (Memahami kurva produksi siang hari)',
        tindakLanjut: 'Belum dilakukan',
        catatanTindakLanjut: 'Penyusunan jadwal giliran mesin produktif bersama pendamping.',
      },
      {
        id: 'PEL-KA-5',
        kelompok: 'Pemuda',
        jumlahPeserta: 14,
        hasilPreTest: '29% (Belum terpapar pelatihan kelistrikan surya)',
        hasilPostTest: '74% (Antusias menjadi kader teknisi sukarela)',
        tindakLanjut: 'Belum dilakukan',
        catatanTindakLanjut: 'Seleksi calon operator utama dari pemuda karang taruna dusun.',
      },
      {
        id: 'PEL-KA-6',
        kelompok: 'Kelompok Perempuan',
        jumlahPeserta: 16,
        hasilPreTest: '32% (Kecewa karena sering padam saat anak belajar)',
        hasilPostTest: '75% (Siap mengawal kejujuran iuran jika ada perbaikan)',
        tindakLanjut: 'Belum dilakukan',
        catatanTindakLanjut: 'Keterlibatan ibu-ibu dalam pengawasan iuran tingkat dusun.',
      },
    ],
  },
};

export const DEMO_KELOLA_BERSAMA: Record<VillageId, KelolaBersamaData> = {
  'sumber-makmur': {
    penanggungJawabOperasiNama: 'Ahmad Faisal (29 th) - Teknisi Kepala Gardu PLTS',
    operators: [
      {
        id: 'OP-SM-1',
        nama: 'Ahmad Faisal (29 th)',
        peran: 'Teknisi Kepala Gardu PLTS',
        kontak: '0812-4411-9821',
        pelatihanSertifikasi: 'Pelatihan Sertifikasi Teknisi Komunal Kemenkop/ESDM (Level 2)',
        statusPenugasan: 'Aktif Ditugaskan',
      },
      {
        id: 'OP-SM-2',
        nama: 'Siti Rahma (26 th)',
        peran: 'Operator Logistik & Pembukuan Kas',
        kontak: '0813-8821-3450',
        pelatihanSertifikasi: 'Pelatihan Manajemen Kas & Akuntansi Koperasi Desa',
        statusPenugasan: 'Aktif Ditugaskan',
      },
      {
        id: 'OP-SM-3',
        nama: 'Wahyudi (34 th)',
        peran: 'Teknisi Jaringan & Pemeliharaan Tiang',
        kontak: '0852-1199-0023',
        pelatihanSertifikasi: 'K3 Kelistrikan & Penanganan Jaringan Udara Distribusi',
        statusPenugasan: 'Aktif Ditugaskan',
      },
    ],
    sops: [
      {
        id: 'SOP-SM-1',
        judul: 'SOP Pemantauan Harian Gardu & Tegangan Baterai',
        kategori: 'Teknis Gardu',
        status: 'Tersedia',
        keterangan: 'Pencatatan logsheet pagi & sore, cek ventilasi inverter.',
      },
      {
        id: 'SOP-SM-2',
        judul: 'SOP Pembersihan Modul Surya & Pemangkasan Ranting',
        kategori: 'Perawatan Lapangan',
        status: 'Tersedia',
        keterangan: 'Pembersihan debu tiap 2 minggu dengan air bersih tanpa deterjen keras.',
      },
      {
        id: 'SOP-SM-3',
        judul: 'SOP Penanganan Gangguan Korsleting & MCB Trip Warga',
        kategori: 'Darurat & Layanan',
        status: 'Tersedia',
        keterangan: 'Waktu tanggap maksimal 2 jam setelah laporan masuk ke operator.',
      },
      {
        id: 'SOP-SM-4',
        judul: 'SOP Pengelolaan Rekening Khusus Sinking Fund Baterai',
        kategori: 'Keuangan & Tata Kelola',
        status: 'Tersedia',
        keterangan: 'Penarikan dana wajib persetujuan 2 pihak (Koperasi & BPD).',
      },
      {
        id: 'SOP-SM-5',
        judul: 'SOP Penanganan Keluhan Warga & Keterbukaan Publik',
        kategori: 'Sosial & Pengaduan',
        status: 'Tersedia',
        keterangan: 'Rekapitulasi keluhan Portal Warga diperbarui tiap minggu di balai desa.',
      },
    ],
    pembagianPeran: [
      {
        peran: 'Operator Gardu Desa',
        namaPihak: 'Ahmad Faisal & Tim Teknisi',
        tanggungJawabUtama:
          'Operasional harian gardu, logsheet baterai, penanganan gangguan rumah warga, dan keselamatan teknis.',
      },
      {
        peran: 'Pengurus Koperasi Desa',
        namaPihak: 'Pengurus Koperasi Merah Putih',
        tanggungJawabUtama:
          'Penagihan iuran warga, penyetoran dana sinking fund ke rekening escrow, belanja suku cadang rutin.',
      },
      {
        peran: 'Pendamping Desa',
        namaPihak: 'Ir. Hendra Wijaya',
        tanggungJawabUtama:
          'Fasilitasi musyawarah, audit berkala catatan teknis, pendampingan uji kapasitas warga.',
      },
      {
        peran: 'Badan Pengawas / BPD',
        namaPihak: 'Tim Pengawas Koperasi & Tokoh Adat',
        tanggungJawabUtama:
          'Pemeriksaan buku kas 3 bulanan, mediasi sengketa iuran, penegakan keputusan musdes.',
      },
      {
        peran: 'Warga Konsumen',
        namaPihak: 'Seluruh KK Terhubung (240 KK)',
        tanggungJawabUtama:
          'Disiplin etika beban malam hari, membayar iuran tepat waktu, melaporkan gangguan ke posko.',
      },
    ],
    statusPembukuan: 'Tertib & Terbuka',
    catatanPembukuan:
      'Buku kas iuran warga tercatat rapi, saldo dana O&M cadangan baterai Rp 46 Juta di rekening bank BNI Desa.',
    kontrakLayanan: 'Tersedia & Berlaku',
    catatanKontrak:
      'Perjanjian Kerja Bersama Operasional PLTS antara Koperasi Desa dan Pemerintah Desa disahkan Akta Notaris No. 14/2025.',
  },
  'tirta-mukti': {
    penanggungJawabOperasiNama: 'Rudi Hartono (25 th) - Teknisi Lapangan Terlatih',
    operators: [
      {
        id: 'OP-TM-1',
        nama: 'Rudi Hartono (25 th)',
        peran: 'Teknisi Lapangan PLTS',
        kontak: '0813-5522-4412',
        pelatihanSertifikasi: 'Pelatihan Vokasi Teknisi EBT Balai Latihan Kerja Provinsi',
        statusPenugasan: 'Aktif Ditugaskan',
      },
      {
        id: 'OP-TM-2',
        nama: 'Doni Pratama (23 th)',
        peran: 'Asisten Operator & Pemeliharaan Panel',
        kontak: '0821-7788-1902',
        pelatihanSertifikasi: 'Pelatihan Dasar Kelistrikan Komunal Desa',
        statusPenugasan: 'Calon Operator',
      },
    ],
    sops: [
      {
        id: 'SOP-TM-1',
        judul: 'SOP Pemeriksaan Tegangan Baterai Harian',
        kategori: 'Teknis Gardu',
        status: 'Tersedia',
        keterangan: 'Pencatatan manual di buku kontrol gardu.',
      },
      {
        id: 'SOP-TM-2',
        judul: 'SOP Pembersihan Debu Modul Surya',
        kategori: 'Perawatan Lapangan',
        status: 'Tersedia',
        keterangan: 'Pembersihan berkala dua minggu sekali.',
      },
      {
        id: 'SOP-TM-3',
        judul: 'SOP Penanganan Gangguan Jaringan & MCB Trip',
        kategori: 'Darurat & Layanan',
        status: 'Tersedia',
        keterangan: 'Waktu respon maksimal 4 jam.',
      },
      {
        id: 'SOP-TM-4',
        judul: 'SOP Rekening Escrow Khusus Penggantian Baterai',
        kategori: 'Keuangan & Tata Kelola',
        status: 'Belum',
        keterangan: 'Masih dalam proses perumusan rancangan Perdes bersama BPD.',
      },
      {
        id: 'SOP-TM-5',
        judul: 'SOP Perlindungan & Subsidi Tarif Kelompok Rentan',
        kategori: 'Sosial & Afirmasi',
        status: 'Belum',
        keterangan: 'Draf telah dibuat, menunggu pengesahan musyawarah dusun.',
      },
    ],
    pembagianPeran: [
      {
        peran: 'Operator PLTS Desa',
        namaPihak: 'Rudi Hartono',
        tanggungJawabUtama:
          'Pengawasan harian kondisi baterai dan perbaikan instalasi rumah warga.',
      },
      {
        peran: 'Unit Usaha BUMDes Tirta Jaya',
        namaPihak: 'Pengurus BUMDes',
        tanggungJawabUtama:
          'Penghimpunan iuran bulanan dan pengadaan suku cadang lampu serta MCB.',
      },
      {
        peran: 'Pendamping Desa',
        namaPihak: 'Dewi Lestari, S.T.',
        tanggungJawabUtama:
          'Fasilitasi penyusunan draf aturan O&M dan perbaikan pembukuan kas.',
      },
    ],
    statusPembukuan: 'Dalam Penyesuaian',
    catatanPembukuan:
      'Pencatatan kas operasional ada, saldo cadangan O&M Rp 28 Juta, namun belum dipisahkan ke rekening khusus escrow.',
    kontrakLayanan: 'Dalam Draf Perjanjian',
    catatanKontrak:
      'Draf perjanjian operasional antara Pengelola dan Pemdes sedang ditelaah tim pendamping.',
  },
  'karang-asri': {
    penanggungJawabOperasiNama: '', // KOSONG! Memicu peringatan belum ada penanggung jawab operasi bernama!
    operators: [], // Belum ada operator terlatih bernama!
    sops: [
      {
        id: 'SOP-KA-1',
        judul: 'SOP Pemeriksaan Harian Gardu & Tegangan Baterai',
        kategori: 'Teknis Gardu',
        status: 'Belum',
        keterangan: 'Belum ada SOP tertulis dan belum ada petugas yang ditugaskan.',
      },
      {
        id: 'SOP-KA-2',
        judul: 'SOP Pembersihan Modul Surya & Pemangkasan Ranting',
        kategori: 'Perawatan Lapangan',
        status: 'Belum',
        keterangan: 'Panel tertutup lumut & dahan karet belum pernah dibersihkan rutin.',
      },
      {
        id: 'SOP-KA-3',
        judul: 'SOP Penanganan Gangguan Jaringan & MCB Trip',
        kategori: 'Darurat & Layanan',
        status: 'Belum',
        keterangan: 'Warga memperbaiki instalasi sendiri secara berbahaya.',
      },
      {
        id: 'SOP-KA-4',
        judul: 'SOP Pengelolaan Rekening Khusus Sinking Fund Baterai',
        kategori: 'Keuangan & Tata Kelola',
        status: 'Belum',
        keterangan: 'Rekening khusus tidak ada, dana iuran lama tidak terlacak.',
      },
      {
        id: 'SOP-KA-5',
        judul: 'SOP Penanganan Keluhan Warga & Keterbukaan Publik',
        kategori: 'Sosial & Pengaduan',
        status: 'Belum',
        keterangan: 'Belum ada kanal pengaduan resmi.',
      },
    ],
    pembagianPeran: [
      {
        peran: 'Operator Gardu PLTS',
        namaPihak: 'Belum Ditunjuk (Kosong)',
        tanggungJawabUtama: 'Belum ada penanggung jawab operasi yang ditunjuk secara resmi.',
      },
      {
        peran: 'Pengurus Koperasi',
        namaPihak: 'Dalam Restrukturisasi (Vakum)',
        tanggungJawabUtama: 'Perlu musyawarah desa untuk memilih pengurus baru yang amanah.',
      },
      {
        peran: 'Pendamping Desa',
        namaPihak: 'Tim Pendamping Kabupaten',
        tanggungJawabUtama:
          'Memfasilitasi pemulihan kelembagaan dari tahap Dengar Warga dan Belajar Energi.',
      },
    ],
    statusPembukuan: 'Belum Tersedia',
    catatanPembukuan:
      'Buku kas tidak aktif, saldo kas O&M hanya Rp 6 Juta dan tidak mencukupi untuk penggantian baterai yang soak.',
    kontrakLayanan: 'Belum Ada',
    catatanKontrak:
      'Tidak ada kontrak layanan teknis maupun berita acara serah terima operasi yang sah.',
  },
};
