import React from "react";
import Chart from "react-apexcharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { applicantsByPosition } from "@/dummydata/DataDashboard";

interface ApplicantsByPositionChartProps {
  month: string;
  year: string;
  position: string;
}

const ApplicantsByPositionChart: React.FC<ApplicantsByPositionChartProps> = ({
  month,
  year,
  position,
}) => {
  // 🔹 Cari data sesuai bulan & tahun
  const dataByMonthYear = applicantsByPosition.find(
    (item) => item.month === month && item.year === year
  );

  // Jika data tidak ditemukan, tampilkan kosong
  if (!dataByMonthYear) {
    return (
      <Card className="shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-gray-700">
            Applicants by Position ({month} {year})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-sm">No Data Available.</p>
        </CardContent>
      </Card>
    );
  }

  // Ambil data mentah
  const { categories, series } = dataByMonthYear.data;

  // 🔹 Jika posisi bukan "All", filter hanya posisi itu
  const filteredData =
    position && position !== "All Positions"
      ? {
          categories: [position],
          series: [
            {
              name: "Applicants",
              data: [series[0].data[categories.indexOf(position)] ?? 0],
            },
          ],
        }
      : {
          // 🔹 Kalau "All", tampilkan semua posisi apa adanya
          categories,
          series,
        };

  // 🔹 Opsi chart
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      fontFamily: "inherit",
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        horizontal: false,
        columnWidth: "50%",
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: filteredData.categories,
      labels: { style: { colors: "#6B7280", fontSize: "12px" } },
    },
    yaxis: {
      labels: { style: { colors: "#6B7280", fontSize: "12px" } },
    },
    grid: { borderColor: "#E5E7EB", strokeDashArray: 4 },
    colors: ["#60A5FA"],
  };

  return (
        <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Total Applicant by Position
            </h3>
            <Chart
            options={options}
            series={filteredData.series}
            type="bar"
            height={300}
        />
        </div>
  );
};

export default ApplicantsByPositionChart;
