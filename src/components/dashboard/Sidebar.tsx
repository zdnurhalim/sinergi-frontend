import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { List, Briefcase, PlusCircle, Building2, User, LogOut, LayoutDashboard, ChevronDown, ChevronRight, ContactRound} from "lucide-react"; // icon lucide-react

import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "@/store/AuthSlice";
import { AuthenticationService } from "@/services/AuthenticationService";
import { RootState } from "@/store/store";

const menu = [
  { name: "Dashboard", to: "/dashboard/mainDashboard", icon: LayoutDashboard },
  {
    name: "Jobs",
    to: "-",
    icon: Briefcase,
    children: [
      {
        name: "Job List",
        to: "/dashboard/jobs",
        icon: List,
      },
      {
        name: "Create Job",
        to: "/dashboard/create-job",
        icon: PlusCircle,
      },
    ],
  },
  { name: "Applicant", to: "/dashboard/applicant", icon: ContactRound },
  { name: "Company Profile", to: "/dashboard/company", icon: Building2 },
];

export default function Sidebar() {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
    Jobs: location.pathname.startsWith("/dashboard/jobs") || location.pathname.startsWith("/dashboard/create-job"),
  });
  const handleToggle = (name: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const authService = new AuthenticationService();

  const handleLogout = async () => {
      try {
          if (auth.token) {
              await authService.logout(auth.token);
          }
      } catch (err) {
          console.error("Logout failed", err);
      } finally {
          dispatch(clearAuth());
          localStorage.removeItem("authToken");
          window.location.href = "/login";
      }
  };

  return (
    <nav className="p-4 w-72 min-h-screen bg-white border-r flex flex-col">
      {/* Logo */}
      <div className="flex w-[167px] h-9 justify-center items-center mb-6">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/3886b63a2367e7ff19c79c759b2c8243ad5e17ed?width=342"
          alt="Sinergi AI Platform Logo"
          className="w-[171px] h-9 object-contain"
        />
      </div>

      <div className="mb-3 px-2 border-t pt-4">
        <h2 className="text-lg font-semibold">Admin</h2>
      </div>

      {/* Menu utama */}
      <ul className="space-y-2 flex-1">
        {menu.map(({ name, to, icon: Icon, children }) => (
          <li key={to}>
            {children ? (
              <>
                <button
                  type="button"
                  onClick={() => handleToggle(name)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md w-full transition-colors ${
                    location.pathname.startsWith(to)
                      ? "bg-blue-100 text-blue-500 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{name}</span>
                  <span className="ml-auto">
                    {openMenus[name] ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </span>
                </button>
                {openMenus[name] && (
                  <ul className="ml-8 mt-1 space-y-2">
                    {children.map(({ name, to, icon: SubIcon }) => (
                      <li key={to}>
                        <NavLink
                          to={to}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                              isActive
                                ? "bg-blue-50 text-blue-600 font-semibold"
                                : "text-gray-600 hover:bg-gray-50"
                            }`
                          }
                        >
                          <SubIcon className="w-4 h-4" />
                          <span>{name}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-500 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{name}</span>
              </NavLink>
            )}
          </li>
        ))}
      </ul>

      {/* Menu bawah */}
      <div className="border-t pt-4 space-y-2">
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
              isActive
                ? "bg-blue-100 text-blue-500"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <User className="w-5 h-5" />
          <span>My Profile</span>
        </NavLink>
        <button onClick={handleLogout} 
          className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}