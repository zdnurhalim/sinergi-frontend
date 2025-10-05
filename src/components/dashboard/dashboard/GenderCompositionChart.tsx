// 📁 src/components/dashboard/dashboard/GenderCompositionChart.tsx
import React from "react";
import ReactApexChart from "react-apexcharts";
import { genderComposition } from "@/dummydata/DataDashboard";

interface GenderCompositionChartProps {
  month: string;
  year: string;
}

const GenderCompositionChart: React.FC<GenderCompositionChartProps> = ({
  month,
  year,
}) => {
  // 🔹 Ambil data berdasarkan bulan dan tahun
  const dataset = genderComposition.find(
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
    chart: { type: "donut" },
    labels: dataset.labels,
    colors: ["#60A5FA", "#F472B6"],
    legend: {
      position: "bottom",
      labels: { colors: "#4B5563" },
    },
    dataLabels: { enabled: true },
    stroke: { width: 2 },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              formatter: () =>
                dataset.series.reduce((sum, val) => sum + val, 0).toString(),
            },
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Gender Composition
      </h3>
      <ReactApexChart
        options={options}
        series={dataset.series}
        type="donut"
        height={320}
      />
    </div>
  );
};

export default GenderCompositionChart;
