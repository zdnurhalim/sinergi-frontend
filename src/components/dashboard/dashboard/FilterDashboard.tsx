"use client";
import React from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface FilterBarProps {
  month: string;
  setMonth: (value: string) => void;
  year: string;
  setYear: (value: string) => void;
  position: string;
  setPosition: (value: string) => void;
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const years = ["2024", "2025"];
const positions = [
  "All Positions",
  "Frontend Developer",
  "Backend Developer",
  "UI/UX Designer",
  "Data Analyst",
  "HR Staff"
];

export const FilterDashboard: React.FC<FilterBarProps> = ({
  month,
  setMonth,
  year,
  setYear,
  position,
  setPosition,
}) => {
  return (
    <Card className="mb-6 shadow-sm border border-gray-200">
     <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 place-items-center">
        {/* Filter Bulan */}
        <div className="w-full">
          <label className="block text-sm font-medium mb-1">Month</label>
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger>
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filter Tahun */}
        <div className="w-full">
          <label className="block text-sm font-medium mb-1">Year</label>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger>
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filter Posisi */}
        <div className="w-full">
          <label className="block text-sm font-medium mb-1">Position</label>
          <Select value={position} onValueChange={setPosition}>
            <SelectTrigger>
              <SelectValue placeholder="Select Position" />
            </SelectTrigger>
            <SelectContent>
              {positions.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterDashboard;
