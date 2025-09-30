export interface JobRequirement {
    id: number;
    benefits: string[];
    industry: string;
    salary_max: string;
    salary_min: string;
    daily_tasks: string;
    company_name: string;
    company_size: string;
    age_limitation: string;
    desired_position: string;
    specific_details: string[];
    work_arrangement: string;
    gender_preference: string;
    other_information: string;
    skills_requirement: string[];
    application_process: string;
    education_requirement: string;
    description: string;
    experience_requirement: string[];
    vacancy_deadline: string;
}

export interface GenerateContent {
    job_requirement_id: number;
    parsed_response: {
        version_1: {
            job_requirement: JobRequirement;
        };
        version_2: {
            job_requirement: JobRequirement;
        };
    };
    status: string;
}

export interface JobRequirementResponse {
    id: number;
    company_description: string;
    talent_description: string;
    specific_details: string[] | null;
    created_at: string;
    claim_token: string;
    updated_at: string;
    generate_content: GenerateContent[];
}

export interface JobAd {
  id: number;
  recruiter_id: number;
  job_requirement_id: number;
  status: string;
  step: string | null;
  generated_content: string | null;
  created_at: string;
  updated_at: string;
  job_requirement: JobRequirementDetail;
}

export interface JobRequirementDetail {
  id: number;
  recruiter_id: number;
  position: string;
  daily_tasks: string;
  salary_min: number;
  salary_max: number;
  specific_details: string[] | null;
  claim_token: string | null;
  guest_email: string | null;
  created_at: string;
  updated_at: string;
  company_description: string;
  talent_description: string;
  age_limitation: string;
  gender_preference: string;
  work_arrangement: string;
  benefits: string | null;
  skills_requirement: string[] | null;
  education_requirement: string;
  experience_requirement: string[];
  vacancy_deadline: string;
}

export const jobListSample: JobRequirement[] = [
{"id":1,"benefits":["Asuransi kesehatan","Tunjangan makan"],"industry":"Teknologi Informasi","salary_max":"15000000","salary_min":"10000000","daily_tasks":"Mengembangkan fitur baru dan memperbaiki bug aplikasi.","company_name":"TechNova Solutions","company_size":"200+ karyawan","age_limitation":"25-35 tahun","desired_position":"Software Engineer","specific_details":["Menguasai React dan Node.js"],"work_arrangement":"Hybrid","gender_preference":"Tidak ada","other_information":"Bersedia ditempatkan di Bandung.","skills_requirement":["React.js","Node.js","Git"],"application_process":"Submit CV dan portofolio melalui website perusahaan.","education_requirement":"Minimal S1 Informatika","description":"Bertanggung jawab atas pengembangan aplikasi berbasis web menggunakan stack modern untuk mendukung kebutuhan klien global.","experience_requirement":["Minimal 2 tahun di bidang serupa"],"vacancy_deadline":"2025-10-30"},
{"id":2,"benefits":["BPJS","Bonus tahunan"],"industry":"Perbankan","salary_max":"20000000","salary_min":"12000000","daily_tasks":"Menganalisis data keuangan dan menyiapkan laporan risiko kredit.","company_name":"Bank Nusantara","company_size":"500+ karyawan","age_limitation":"27-40 tahun","desired_position":"Financial Analyst","specific_details":["Kemampuan analisis tinggi"],"work_arrangement":"Onsite","gender_preference":"Tidak ada","other_information":"Disediakan pelatihan internal.","skills_requirement":["Excel","SQL","Financial Modeling"],"application_process":"Kirim CV melalui portal karier Bank Nusantara.","education_requirement":"S1 Akuntansi/Keuangan","description":"Melakukan analisis keuangan dan perencanaan strategis untuk mendukung keputusan bisnis bank.","experience_requirement":["Minimal 3 tahun di bidang keuangan"],"vacancy_deadline":"2025-11-15"},
{"id":3,"benefits":["Asuransi jiwa","Cuti tambahan"],"industry":"Kesehatan","salary_max":"18000000","salary_min":"12000000","daily_tasks":"Menangani pasien dan memberikan konsultasi medis.","company_name":"RS Medika Sehat","company_size":"300+ karyawan","age_limitation":"28-45 tahun","desired_position":"Dokter Umum","specific_details":["Memiliki STR aktif"],"work_arrangement":"Onsite","gender_preference":"Tidak ada","other_information":"Bersedia bekerja shift.","skills_requirement":["Diagnosis medis","Komunikasi pasien"],"application_process":"Melalui HRD RS Medika Sehat.","education_requirement":"Profesi Dokter","description":"Memberikan layanan medis umum kepada pasien serta membantu tim dalam program kesehatan masyarakat.","experience_requirement":["Minimal 1 tahun pengalaman praktik"],"vacancy_deadline":"2025-10-20"},
{"id":4,"benefits":["Tunjangan transport","BPJS"],"industry":"Pendidikan","salary_max":"8000000","salary_min":"6000000","daily_tasks":"Mengajar siswa dan membuat rencana pembelajaran.","company_name":"SMA Harapan Bangsa","company_size":"100+ karyawan","age_limitation":"25-40 tahun","desired_position":"Guru Matematika","specific_details":["Mampu mengajar dengan metode interaktif"],"work_arrangement":"Onsite","gender_preference":"Tidak ada","other_information":"Lingkungan kerja edukatif.","skills_requirement":["Komunikasi","Penguasaan materi matematika"],"application_process":"Kirim lamaran via email sekolah.","education_requirement":"S1 Pendidikan Matematika","description":"Mengajar dan membimbing siswa SMA dalam bidang Matematika serta berpartisipasi dalam kegiatan akademik.","experience_requirement":["Minimal 2 tahun mengajar"],"vacancy_deadline":"2025-10-25"},
{"id":5,"benefits":["Bonus penjualan","Kendaraan operasional"],"industry":"Ritel","salary_max":"10000000","salary_min":"7000000","daily_tasks":"Menjalin relasi dengan pelanggan dan mencapai target penjualan.","company_name":"MegaMart Indonesia","company_size":"1000+ karyawan","age_limitation":"23-35 tahun","desired_position":"Sales Executive","specific_details":["Target-oriented"],"work_arrangement":"Onsite","gender_preference":"Tidak ada","other_information":"Dapat bekerja di bawah tekanan.","skills_requirement":["Negosiasi","Komunikasi"],"application_process":"Melalui situs karier resmi perusahaan.","education_requirement":"Minimal D3 Semua Jurusan","description":"Mengembangkan jaringan pelanggan dan memastikan pencapaian target penjualan dengan strategi yang efektif.","experience_requirement":["Minimal 1 tahun di bidang sales"],"vacancy_deadline":"2025-10-28"},
{"id":6,"benefits":["Asuransi","Bonus kinerja"],"industry":"Manufaktur","salary_max":"14000000","salary_min":"9000000","daily_tasks":"Mengatur jalannya proses produksi dan kontrol kualitas.","company_name":"PT Astra Component","company_size":"2000+ karyawan","age_limitation":"30-45 tahun","desired_position":"Production Supervisor","specific_details":["Pengalaman di pabrik otomotif diutamakan"],"work_arrangement":"Onsite","gender_preference":"Tidak ada","other_information":"Siap bekerja shift.","skills_requirement":["Leadership","Analisis data produksi"],"application_process":"Daftar melalui portal karier Astra Group.","education_requirement":"S1 Teknik Industri","description":"Memastikan operasional produksi berjalan sesuai target dan standar kualitas perusahaan.","experience_requirement":["Minimal 5 tahun di bidang manufaktur"],"vacancy_deadline":"2025-11-01"},
{"id":7,"benefits":["BPJS","Tunjangan komunikasi"],"industry":"Telekomunikasi","salary_max":"13000000","salary_min":"8000000","daily_tasks":"Memonitor jaringan dan menanggapi gangguan sistem.","company_name":"NetConnect Indonesia","company_size":"400+ karyawan","age_limitation":"23-35 tahun","desired_position":"Network Engineer","specific_details":["Bersertifikat CCNA diutamakan"],"work_arrangement":"Hybrid","gender_preference":"Tidak ada","other_information":"Tersedia fasilitas remote monitoring.","skills_requirement":["Cisco","Linux","Troubleshooting"],"application_process":"Apply melalui portal karier NetConnect.","education_requirement":"S1 Teknik Informatika","description":"Mengelola dan menjaga stabilitas jaringan perusahaan agar tetap handal dan aman.","experience_requirement":["Minimal 2 tahun sebagai network engineer"],"vacancy_deadline":"2025-10-22"},
{"id":8,"benefits":["Tunjangan proyek","Bonus performa"],"industry":"Konstruksi","salary_max":"17000000","salary_min":"12000000","daily_tasks":"Mengelola proyek pembangunan gedung dan memastikan waktu serta biaya sesuai target.","company_name":"PT Adi Karya Mandiri","company_size":"1000+ karyawan","age_limitation":"30-45 tahun","desired_position":"Project Manager","specific_details":["Memiliki pengalaman manajemen proyek besar"],"work_arrangement":"Onsite","gender_preference":"Tidak ada","other_information":"Bersedia ditempatkan di luar kota.","skills_requirement":["Manajemen proyek","MS Project"],"application_process":"Melalui rekrutmen online perusahaan.","education_requirement":"S1 Teknik Sipil","description":"Memimpin perencanaan, pelaksanaan, dan evaluasi proyek konstruksi dengan fokus pada efisiensi dan kualitas.","experience_requirement":["Minimal 7 tahun di proyek konstruksi"],"vacancy_deadline":"2025-11-10"},
{"id":9,"benefits":["Tunjangan makan","Cuti keluarga"],"industry":"Kuliner","salary_max":"7000000","salary_min":"5000000","daily_tasks":"Menyiapkan dan memasak menu sesuai standar restoran.","company_name":"Resto Nusantara","company_size":"150+ karyawan","age_limitation":"20-35 tahun","desired_position":"Chef de Partie","specific_details":["Menguasai masakan Asia dan Barat"],"work_arrangement":"Onsite","gender_preference":"Tidak ada","other_information":"Shift bergilir.","skills_requirement":["Memasak","Manajemen dapur"],"application_process":"Melamar langsung ke outlet atau via email HR.","education_requirement":"SMK Tata Boga / sederajat","description":"Mengelola area dapur dan memastikan semua hidangan disajikan dengan kualitas terbaik dan tepat waktu.","experience_requirement":["Minimal 3 tahun di restoran profesional"],"vacancy_deadline":"2025-10-27"},
{"id":10,"benefits":["Bonus tahunan","BPJS Ketenagakerjaan"],"industry":"Perhotelan","salary_max":"9000000","salary_min":"6000000","daily_tasks":"Melayani tamu dan mengatur reservasi kamar.","company_name":"Hotel Grand Vista","company_size":"300+ karyawan","age_limitation":"21-35 tahun","desired_position":"Front Office Staff","specific_details":["Berpenampilan rapi dan sopan"],"work_arrangement":"Onsite","gender_preference":"Tidak ada","other_information":"Tersedia mess karyawan.","skills_requirement":["Hospitality","Bahasa Inggris"],"application_process":"Apply melalui situs karier hotel.","education_requirement":"Minimal D3 Perhotelan","description":"Memberikan pelayanan terbaik kepada tamu hotel serta memastikan pengalaman menginap yang nyaman dan profesional.","experience_requirement":["Minimal 1 tahun di bidang hospitality"],"vacancy_deadline":"2025-11-05"},
];