"use client";
import React from "react";
import { summaryMetrics } from "@/dummydata/DataDashboard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface SummaryCardsProps {
  month: string;
  year: string;
  position?: string;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ month, year, position }) => {
  // 🔹 Filter data sesuai bulan & tahun
  const filteredMetrics = summaryMetrics.filter(
    (item) => item.month === month && item.year === year
  );

  return (
    <div className="space-y-4">
      {/* 🔹 Info Filter */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
        <p>
          Showing metrics for{" "}
          <span className="font-semibold text-gray-700">
            {month} {year}
          </span>
        </p>
        {position && position !== "All Positions" && (
          <p>
            Position:{" "}
            <span className="font-semibold text-gray-700">{position}</span>
          </p>
        )}
      </div>

      {/* 🔹 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredMetrics.length > 0 ? (
          filteredMetrics.map((item, index) => (
            <Card
              key={index}
              className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center py-8">
            No data available for {month} {year}
          </p>
        )}
      </div>
    </div>
  );
};

export default SummaryCards;
