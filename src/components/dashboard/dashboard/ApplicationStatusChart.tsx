// 📁 src/components/dashboard/dashboard/ApplicantsByPositionStatusChart.tsx
import React from "react";
import ReactApexChart from "react-apexcharts";
import { applicantsByPositionAndStatus } from "@/dummydata/DataDashboard";

interface ApplicantsByPositionStatusChartProps {
  month: string;
  year: string;
  position: string;
}

const ApplicantsByPositionStatusChart: React.FC<ApplicantsByPositionStatusChartProps> = ({
  month,
  year,
  position,
}) => {
  // 🔹 Ambil data berdasarkan bulan & tahun
  const dataset = applicantsByPositionAndStatus.find(
    (d) => d.month === month && d.year === year
  );

  if (!dataset) {
    return (
      <div className="bg-white rounded-2xl shadow p-6">
        <p className="text-gray-500 text-center">No data available</p>
      </div>
    );
  }

  // 🔹 Filter berdasarkan posisi (kalau ada)
  let categories = dataset.categories;
  let series = dataset.series;

  if (position && position !== "All") {
    const posIndex = dataset.categories.indexOf(position);
    if (posIndex !== -1) {
      categories = [dataset.categories[posIndex]];
      series = dataset.series.map((s) => ({
        name: s.name,
        data: [s.data[posIndex]],
      }));
    }
  }

  // 🔹 Opsi chart
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 6,
      },
    },
    dataLabels: { enabled: false },
    xaxis: { categories },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
    fill: { opacity: 1 },
    colors: ["#60a5fa", "#34d399", "#fbbf24", "#6366f1", "#f87171"],
    tooltip: {
      y: { formatter: (val) => `${val} Applicants` },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Applicants by Position & Status
      </h3>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default ApplicantsByPositionStatusChart;
