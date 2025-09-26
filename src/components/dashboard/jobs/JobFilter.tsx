import React from "react";
import { useNavigate } from "react-router-dom";
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

interface Option {
  value: string;
  label: string;
}

interface JobsFilterProps {
  category: string;
  onCategoryChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  onReset: () => void;
  categoryOptions: Option[];
  statusOptions: Option[];
}

export const JobsFilter: React.FC<JobsFilterProps> = ({
  category,
  onCategoryChange,
  status,
  onStatusChange,
  search,
  onSearchChange,
  onReset,
  categoryOptions,
  statusOptions,
}) => {
  const navigate = useNavigate();
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 border-b pb-4">
          Filter Jobs
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 🔹 Region Search + Category */}
        <div className="flex gap-6">
          {/* Left column: Search */}
          <div className="flex-1 space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Search</h4>
            <Input
              type="text"
              placeholder="Search by job title..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* Right column: Category */}
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
                <SelectValue placeholder="Filter by category" />
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

        {/* 🔹 Region Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" size="default" onClick={onReset}>
            Reset Filters
          </Button>
          <Button variant="default"  size="default" onClick={() => { navigate("/dashboard/create-job"); }}>
            Create New Job
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
