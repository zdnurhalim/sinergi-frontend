import React from "react";
import {CompanySettings} from "@/components/dashboard/company/CompanySettings";

export default function CompanyPage() {
  return (
    <div className="max-w-6xl mx-auto p-2">
      {/* <h1 className="text-2xl font-semibold mb-4">Company Settings</h1> */}
      <CompanySettings />
    </div>
  );
}
