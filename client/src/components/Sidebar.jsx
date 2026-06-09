import {
  FaHome,
  FaBuilding,
  FaUsers,
  FaMoneyBill,
  FaFileInvoiceDollar,
  FaTools,
  FaChartBar,
  FaWallet,
  FaBell,
  FaUserShield,
  FaSearch,
  FaBars,
  FaCogs,
  FaChartPie,
  FaChartLine,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import API from "../services/api";

function Sidebar() {

  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("sidebarCollapsed") === "true";
  });
  
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed);
  
    document.documentElement.style.setProperty(
      "--sidebar-width",
      collapsed ? "80px" : "288px"
    );
  }, [collapsed]);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState({});

  const isActive = (path) =>
    location.pathname === path
      ? "bg-emerald-500 text-white shadow-md"
      : "hover:bg-slate-800/60";

  // LIVE STATS
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/stats");
        setStats(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      collapsed ? "80px" : "288px"
    );
  }, []);

  const menu = [
    { name: "Dashboard", path: "/", icon: <FaHome /> },
    { name: "Apartments", path: "/apartments", icon: <FaBuilding /> },
    { name: "Units", path: "/units", icon: <FaBuilding /> },
    { name: "Tenants", path: "/tenants", icon: <FaUsers />, badge: stats.pendingTenants || 0 },
    { name: "Billing", path: "/billing", icon: <FaFileInvoiceDollar /> },
    { name: "Payments", path: "/payments", icon: <FaMoneyBill /> },
    { name: "Maintenance", path: "/maintenance", icon: <FaTools /> },
    { name: "Reports", path: "/reports", icon: <FaChartBar /> },
    { name: "Expenses", path: "/expenses", icon: <FaWallet /> },
    { name: "Insights", path: "/insights", icon: <FaChartPie /> },
    { name: "Forecast", path: "/forecast", icon: <FaChartLine /> },

    { name: "Admin Approval", path: "/admin", icon: <FaUserShield />, adminOnly: true, badge: stats.pendingTenants || 0 },
    { name: "User Management", path: "/admin/users", icon: <FaUsers />, adminOnly: true },
    { name: "System Settings", path: "/settings", icon: <FaCogs />, adminOnly: true },

    { name: "Notifications", path: "/notifications", icon: <FaBell /> },
  ];

  const filteredMenu = menu.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>

      {/* MOBILE TOGGLE BUTTON */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-slate-900 text-white p-3 rounded-lg shadow-lg"
        onClick={() => setMobileOpen(true)}
      >
        <FaBars />
      </button>

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-slate-900 text-white z-50
          border-r border-slate-800
          flex flex-col

          transition-all duration-300 ease-in-out

          ${collapsed ? "w-20" : "w-72"}

          md:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >

        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">

          {!collapsed && (
            <h1 className="text-2xl font-bold text-emerald-400 tracking-wide">
              BMTECH
            </h1>
          )}

          <div className="flex items-center gap-2">

            {/* COLLAPSE BTN (DESKTOP) */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:block text-gray-300 hover:text-white"
            >
              ⟷
            </button>

            {/* CLOSE BTN (MOBILE) */}
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden text-gray-300 text-xl"
            >
              ✕
            </button>

          </div>

        </div>

        {/* SEARCH */}
        {!collapsed && (
          <div className="p-3">
            <div className="flex items-center bg-slate-800/70 p-2 rounded-lg">
              <FaSearch className="mr-2 text-gray-400" />
              <input
                placeholder="Search menu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>
          </div>
        )}

        {/* MENU */}
        <nav className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">

          {filteredMenu.map((item, i) => {

            if (item.adminOnly && user?.role !== "Super Admin") {
              return null;
            }

            return (
              <Link
                key={i}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center justify-between
                  px-3 py-2 rounded-lg
                  transition-all duration-200
                  ${isActive(item.path)}
                `}
              >

                <div className="flex items-center gap-3">

                  <span className="text-lg">
                    {item.icon}
                  </span>

                  {!collapsed && (
                    <span className="text-sm font-medium">
                      {item.name}
                    </span>
                  )}

                </div>

                {/* BADGE */}
                {!collapsed && item.badge > 0 && (
                  <span className="bg-red-500 text-xs px-2 py-1 rounded-full animate-pulse">
                    {item.badge}
                  </span>
                )}

              </Link>
            );
          })}

        </nav>

        {/* FOOTER */}
        {!collapsed && (
          <div className="p-3 border-t border-slate-800 text-xs text-gray-400">
            Logged in as: {user?.role}
          </div>
        )}

      </div>
    </>
  );
}

export default Sidebar;