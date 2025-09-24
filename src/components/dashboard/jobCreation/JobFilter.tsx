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

interface JobsFilterProps {
  category: string;
  onCategoryChange: (value: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  onReset: () => void;
}

export const JobsFilter: React.FC<JobsFilterProps> = ({
  category,
  onCategoryChange,
  search,
  onSearchChange,
  onReset,
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
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
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
