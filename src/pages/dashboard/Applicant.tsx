import React, { useState } from "react";
import ApplicantList from '@/components/dashboard/applicant/ApplicantList';
import { ApplicantFilter } from "@/components/dashboard/applicant/ApplicantFilter";
import { applicants as applicantsData } from "@/types/ApplicantType";

export default function PageApplicant() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [appliedPosition, onAppliedPositionChange] = useState("all");
  const filteredApplicants = applicantsData.filter((a) => {
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    const matchPosition =  appliedPosition === "all" ||  a.appliedPosition === appliedPosition;
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch && matchPosition;
  });
  return (
    <div className="max-w-6xl mx-auto space-y-6">
        {/* title */}
        <div className="flex justify-between items-center mb-7">
            <h1 className="text-2xl font-bold text-gray-900">Applicant List</h1>
            <div className="space-x-2">
            {/* right component */}
            </div>
        </div>

        <ApplicantFilter
            status={statusFilter}
            onStatusChange={setStatusFilter}
            search={search}
            onSearchChange={setSearch}
            appliedPosition={appliedPosition}
            onAppliedPositionChange = {onAppliedPositionChange}
            onReset={() => {
              setStatusFilter("all");
              onAppliedPositionChange("all");
              setSearch("");
            }}
        />

        <ApplicantList applicants={filteredApplicants} onSelect={(applicant) => console.log("lihat detail", applicant)} />
    </div>
  );
}
