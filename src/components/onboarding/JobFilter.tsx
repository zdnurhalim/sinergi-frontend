import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface FilterJobsProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  onReset: () => void;
  categoryOptions: { value: string; label: string }[];
  statusOptions: { value: string; label: string }[];
}

const JobFilter: React.FC<FilterJobsProps> = ({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  onReset,
  categoryOptions,
  statusOptions
}) => {
  return (
    <Card className="border border-gray-200 shadow-sm mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 border-b pb-4">
          Filter Jobs
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 🔹 Search + Category + Status */}
        <div className="flex gap-6">
          <div className="flex-1 space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Search</h4>
            <Input
              type="text"
              placeholder="Search by job title..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <div className="flex-1 space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Category</h4>
            <Select value={category} onValueChange={onCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Job Status</h4>
            <Select value={status} onValueChange={onStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 🔹 Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" size="default" onClick={onReset}>
            Reset Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobFilter;
