"use client";
import React, { useState, useEffect } from "react";
import SummaryCards from "@/components/dashboard/dashboard/SummaryCards";
import ApplicantsTrendChart from "@/components/dashboard/dashboard/ApplicantsTrendChart";
import ApplicantsByPositionChart from "@/components/dashboard/dashboard/ApplicantsByPositionChart";
import ApplicationStatusChart from "@/components/dashboard/dashboard/ApplicationStatusChart";
import GenderCompositionChart from "@/components/dashboard/dashboard/GenderCompositionChart";
import RecruitmentFunnelChart from "@/components/dashboard/dashboard/RecruitmentFunnelChart";
import FilterDashboard from "@/components/dashboard/dashboard/FilterDashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const MainDashboard: React.FC = () => {
  const [month, setMonth] = useState("January");
  const [year, setYear] = useState("2025");
  const [position, setPosition] = useState("All Positions");
  const [loading, setLoading] = useState(true);

  // Simulasi loading data (bisa diganti API fetch)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // 1 detik loading
    return () => clearTimeout(timer);
  }, [month, year, position]);

  return (
    <div className="space-y-6 p-6">
      {/* 🔹 Filter di bagian atas */}
      <FilterDashboard
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
        position={position}
        setPosition={setPosition}
      />

      {/* 🔹 Summary Cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="border border-gray-200 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <SummaryCards month={month} year={year} position={position} />
      )}

      {/* 🔹 Line Chart: Jumlah pelamar per minggu/bulan */}
      {loading ? (
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <Skeleton className="h-8 w-40 mb-4" />
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
      ) : (
        <ApplicantsTrendChart month={month} year={year} />
      )}

      {/* 🔹 Bar Chart dan Stacked Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <>
            {[...Array(2)].map((_, i) => (
              <Card key={i} className="border border-gray-200 shadow-sm">
                <CardContent className="p-4">
                  <Skeleton className="h-8 w-48 mb-4" />
                  <Skeleton className="h-[320px] w-full" />
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <>
            <ApplicantsByPositionChart
              month={month}
              year={year}
              position={position}
            />
            <ApplicationStatusChart
              month={month}
              year={year}
              position={position}
            />
          </>
        )}
      </div>

      {/* 🔹 Donut Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <>
            {[...Array(2)].map((_, i) => (
              <Card key={i} className="border border-gray-200 shadow-sm">
                <CardContent className="p-4">
                  <Skeleton className="h-8 w-48 mb-4" />
                  <Skeleton className="h-[320px] w-full" />
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <>
            <GenderCompositionChart month={month} year={year} />
            <RecruitmentFunnelChart month={month} year={year} />
          </>
        )}
      </div>
    </div>
  );
};

export default MainDashboard;
