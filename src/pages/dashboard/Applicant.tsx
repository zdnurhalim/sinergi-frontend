import React, { useState } from "react";
import ApplicantList, { ApplicantListProps } from '@/components/dashboard/applicant/ApplicantList';
import { ApplicantFilter } from "@/components/dashboard/applicant/ApplicantFilter";

export default function PageApplicant() {
  const applicantsData: ApplicantListProps[] = [
    {id: 1,name: 'Sarah Johnson', email: 'sarah.johnson@email.com', status: 'shortlisted', appliedAt: '2024-01-16'},
    {id: 2, name: 'Michael Chen', email: 'michael.chen@email.com', status: 'scheduled', appliedAt: '2024-01-17'},
    {id: 3, name: 'Emma Rodriguez', email: 'emma.rodriguez@email.com', status: 'applied', appliedAt: '2024-01-18'},
    { id: 4, name: 'John Doe', email: 'johndoe@gmail.com', status: 'scheduled', appliedAt: '2024-01-18' },
    { id: 5, name: 'Jane Smith', email: 'janesmith@gmail.com', status: 'hired', appliedAt: '2024-01-19' },
    { id: 6, name: 'Michelle Smith', email: 'janesmith@gmail.com', status: 'rejected', appliedAt: '2024-01-19' },
  ];
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredApplicants = applicantsData.filter((a) => {
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
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
            onReset={() => {
            setStatusFilter("all");
            setSearch("");
            }}
        />

        <ApplicantList applicants={filteredApplicants} onSelect={(applicant) => console.log("lihat detail", applicant)} />
    </div>
  );
}
