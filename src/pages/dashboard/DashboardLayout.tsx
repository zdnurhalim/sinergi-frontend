import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="h-screen flex">
      {/* <aside className="w-[217px] flex-shrink-0 border-r bg-white"> */}
        <Sidebar />
      {/* </aside> */}

      <div className="flex-1 flex flex-col min-w-0 bg-gray-50">
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
