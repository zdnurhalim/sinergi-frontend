import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { applicants, ApplicantIterface } from "@/types/ApplicantType";

interface ApplicantFilterProps {
  status: string;
  appliedPosition: string;
  onStatusChange: (value: string) => void;
  onAppliedPositionChange: (value: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  onReset: () => void;
}

export const ApplicantFilter: React.FC<ApplicantFilterProps> = ({
  status,
  appliedPosition,
  onStatusChange,
  onAppliedPositionChange,
  search,
  onSearchChange,
  onReset,
}) => {
  // Ambil list unique applied positions dari data applicants
  const appliedPositions = Array.from(
    new Set(applicants.map((a) => a.appliedPosition).filter(Boolean))
  );

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 border-b pb-4">
          Filter Applicants
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex gap-6">
          {/* Left column: Search */}
          <div className="flex-1 space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Search</h4>
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* Middle column: Status */}
          <div className="flex-1 space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Status</h4>
            <Select value={status} onValueChange={onStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Right column: Applied Position */}
          <div className="flex-1 space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Applied Position</h4>
            <Select value={appliedPosition} onValueChange={onAppliedPositionChange}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {appliedPositions.map((position) => (
                  <SelectItem key={position} value={position}>
                    {position}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Region Actions */}
        <div className="flex justify-end">
          <Button variant="outline" onClick={onReset}>
            Reset Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
