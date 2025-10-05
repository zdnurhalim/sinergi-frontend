import React from "react";
import Chart from "react-apexcharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { applicantsTrend } from "@/dummydata/DataDashboard";

interface ApplicantsTrendChartProps {
  month: string;
  year: string;
}

const ApplicantsTrendChart: React.FC<ApplicantsTrendChartProps> = ({
  month,
  year,
}) => {
  // Ambil data sesuai bulan & tahun
  const trendData =
    applicantsTrend.find((item) => item.month === month && item.year === year) ||
    applicantsTrend[0];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
      fontFamily: "inherit",
    },
    stroke: { curve: "smooth", width: 3 },
    dataLabels: { enabled: false },
    markers: {
      size: 5,
      colors: ["#3B82F6"],
      strokeColors: "#fff",
      strokeWidth: 2,
    },
    xaxis: {
      categories: trendData.categories,
      labels: { style: { colors: "#6B7280", fontSize: "12px" } },
    },
    yaxis: {
      labels: { style: { colors: "#6B7280", fontSize: "12px" } },
    },
    grid: { borderColor: "#E5E7EB", strokeDashArray: 4 },
    colors: ["#3B82F6"],
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Total Applicant / Week ({month} {year})
                </h3>
                <Chart
          options={options}
          series={trendData.series}
          type="line"
          height={300}
        />
    </div>
  );
};

export default ApplicantsTrendChart;
