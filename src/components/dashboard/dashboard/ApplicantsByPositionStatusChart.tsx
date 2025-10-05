// 📁 src/components/dashboard/dashboard/ApplicantsByPositionStatusChart.tsx
import React from "react";
import ReactApexChart from "react-apexcharts";
import { applicantsByPositionAndStatus } from "@/dummydata/DataDashboard";

interface ApplicantsByPositionStatusChartProps {
  month: string;
  year: string;
  position?: string;
}

const ApplicantsByPositionStatusChart: React.FC<ApplicantsByPositionStatusChartProps> = ({
  month,
  year,
  position,
}) => {
  // 🔹 Cari dataset sesuai bulan dan tahun
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

  // 🔹 Jika position difilter, ambil hanya data untuk posisi itu
  let categories = dataset.categories;
  let series = dataset.series;

  if (position) {
    const index = dataset.categories.indexOf(position);
    if (index !== -1) {
      categories = [position];
      series = dataset.series.map((s) => ({
        name: s.name,
        data: [s.data[index]],
      }));
    } else {
      series = dataset.series.map((s) => ({ ...s, data: [] }));
    }
  }

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
        columnWidth: "55%",
      },
    },
    xaxis: {
      categories: categories,
      title: { text: "Positions" },
    },
    legend: { position: "bottom" },
    colors: ["#3B82F6", "#10B981", "#F59E0B", "#6366F1", "#EF4444"],
    grid: { borderColor: "#f3f4f6" },
    tooltip: {
      y: {
        formatter: (val) => `${val} Applicants`,
      },
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
        height={320}
      />
    </div>
  );
};

export default ApplicantsByPositionStatusChart;
