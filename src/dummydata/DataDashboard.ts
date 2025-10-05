// Dummy data untuk Dashboard HR Admin Sinergi.AI

// 🔹 1️⃣ Summary Metrics (berdasarkan bulan & tahun)
export const summaryMetrics = [
  { month: "January", year: "2025", title: "Total Job Ads", value: 124 },
  { month: "January", year: "2025", title: "Total Applicants", value: 1870 },
  { month: "January", year: "2025", title: "Active Jobs", value: 18 },
  { month: "January", year: "2025", title: "Hires This Month", value: 32 },
  { month: "February", year: "2025", title: "Total Job Ads", value: 98 },
  { month: "February", year: "2025", title: "Total Applicants", value: 1540 },
  { month: "February", year: "2025", title: "Active Jobs", value: 15 },
  { month: "February", year: "2025", title: "Hires This Month", value: 28 },
];

// 🔹 2️⃣ Line Chart - Jumlah pelamar per minggu/bulan
export const applicantsTrend = [
  {
    month: "January",
    year: "2025",
    categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
    series: [{ name: "Applicants", data: [220, 340, 280, 400] }],
  },
  {
    month: "February",
    year: "2025",
    categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
    series: [{ name: "Applicants", data: [300, 360, 310, 420] }],
  },
];

// 🔹 3️⃣ Bar Chart - Jumlah pelamar per posisi
export const applicantsByPosition = [
  {
    month: "January",
    year: "2025",
    data: {
      categories: [
        "Frontend Developer",
        "Backend Developer",
        "UI/UX Designer",
        "Data Analyst",
        "HR Staff",
      ],
      series: [{ name: "Applicants", data: [320, 450, 210, 180, 150] }],
    },
  },
  {
    month: "February",
    year: "2025",
    data: {
      categories: [
        "Frontend Developer",
        "Backend Developer",
        "UI/UX Designer",
        "Data Analyst",
        "HR Staff",
      ],
      series: [{ name: "Applicants", data: [280, 400, 230, 190, 120] }],
    },
  },
];

// 🔹 4️⃣ Donut Chart - Status lamaran
export const applicationStatus = [
  {
    month: "January",
    year: "2025",
    labels: ["Applied", "Shortlisted", "Interviewed", "Hired", "Rejected"],
    series: [720, 280, 190, 80, 600],
  },
  {
    month: "February",
    year: "2025",
    labels: ["Applied", "Shortlisted", "Interviewed", "Hired", "Rejected"],
    series: [680, 260, 200, 90, 500],
  },
];

// 🔹 4️⃣b Donut Chart - Gender composition
export const genderComposition = [
  {
    month: "January",
    year: "2025",
    labels: ["Male", "Female"],
    series: [1120, 730],
  },
  {
    month: "February",
    year: "2025",
    labels: ["Male", "Female"],
    series: [1020, 740],
  },
];

// 🔹 5️⃣ Funnel Chart - Recruitment stages
export const recruitmentFunnel = [
  {
    month: "January",
    year: "2025",
    labels: ["Applied", "Shortlisted", "Interviewed", "Hired"],
    series: [1870, 700, 300, 120],
  },
  {
    month: "February",
    year: "2025",
    labels: ["Applied", "Shortlisted", "Interviewed", "Hired"],
    series: [1540, 680, 260, 110],
  },
];

// 🔹 6️⃣ Stacked Bar Chart - Jumlah pelamar per posisi berdasarkan status
export const applicantsByPositionAndStatus = [
  {
    month: "January",
    year: "2025",
    categories: [
      "Frontend Developer",
      "Backend Developer",
      "UI/UX Designer",
      "Data Analyst",
      "HR Staff",
    ],
    series: [
      { name: "Applied", data: [200, 250, 120, 90, 60] },
      { name: "Shortlisted", data: [60, 80, 40, 50, 20] },
      { name: "Interviewed", data: [40, 70, 30, 20, 10] },
      { name: "Hired", data: [20, 30, 20, 10, 5] },
      { name: "Rejected", data: [60, 100, 50, 30, 55] },
    ],
  },
  {
    month: "February",
    year: "2025",
    categories: [
      "Frontend Developer",
      "Backend Developer",
      "UI/UX Designer",
      "Data Analyst",
      "HR Staff",
    ],
    series: [
      { name: "Applied", data: [180, 230, 140, 95, 55] },
      { name: "Shortlisted", data: [70, 85, 35, 45, 15] },
      { name: "Interviewed", data: [50, 60, 25, 15, 8] },
      { name: "Hired", data: [25, 28, 22, 12, 6] },
      { name: "Rejected", data: [55, 90, 45, 25, 50] },
    ],
  },
];

export default {
  summaryMetrics,
  applicantsTrend,
  applicantsByPosition,
  applicationStatus,
  genderComposition,
  recruitmentFunnel,
  applicantsByPositionAndStatus,
};
