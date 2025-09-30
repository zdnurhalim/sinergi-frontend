// Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/onboarding/Navbar";
import Footer from "@/components/onboarding/Footer";

const Layout: React.FC = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-slate-600/5 text-white font-sans antialiased">
      <Navbar />
      <main className="flex-1">
        <Outlet /> {/* Render children route di sini */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
