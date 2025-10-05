// 📁 src/components/dashboard/dashboard/RecruitmentFunnelChart.tsx
import React from "react";
import ReactApexChart from "react-apexcharts";
import { recruitmentFunnel } from "@/dummydata/DataDashboard";

interface RecruitmentFunnelChartProps {
  month: string;
  year: string;
}

const RecruitmentFunnelChart: React.FC<RecruitmentFunnelChartProps> = ({
  month,
  year,
}) => {
  // 🔹 Cari data sesuai bulan dan tahun
  const dataset = recruitmentFunnel.find(
    (d) => d.month === month && d.year === year
  );

  if (!dataset) {
    return (
      <div className="bg-white rounded-2xl shadow p-6">
        <p className="text-gray-500 text-center">No data available</p>
      </div>
    );
  }

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 6,
        barHeight: "60%",
      },
    },
    xaxis: {
      categories: dataset.labels,
      title: { text: "Number of Applicants" },
    },
    colors: ["#3B82F6"],
    dataLabels: {
      enabled: true,
      style: { colors: ["#fff"] },
      formatter: (val) => `${val}`,
    },
    grid: { borderColor: "#f3f4f6" },
    tooltip: {
      y: {
        formatter: (val) => `${val} Applicants`,
      },
    },
  };

  const series = [
    {
      name: "Candidates",
      data: dataset.series,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Recruitment Funnel
      </h3>
      <ReactApexChart options={options} series={series} type="bar" height={300} />
    </div>
  );
};

export default RecruitmentFunnelChart;
