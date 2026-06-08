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

  const [collapsed, setCollapsed] = useState(false);
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

  // MENU
  const menu = [

    { name: "Dashboard", path: "/", icon: <FaHome /> },

    { name: "Apartments", path: "/apartments", icon: <FaBuilding /> },

    { name: "Units", path: "/units", icon: <FaBuilding /> },

    {
      name: "Tenants",
      path: "/tenants",
      icon: <FaUsers />,
      badge: stats.pendingTenants || 0
    },

    { name: "Billing", path: "/billing", icon: <FaFileInvoiceDollar /> },

    { name: "Payments", path: "/payments", icon: <FaMoneyBill /> },

    { name: "Maintenance", path: "/maintenance", icon: <FaTools /> },

    { name: "Reports", path: "/reports", icon: <FaChartBar /> },

    { name: "Expenses", path: "/expenses", icon: <FaWallet /> },

    // ANALYTICS
    { name: "Insights", path: "/insights", icon: <FaChartPie /> },

    { name: "Forecast", path: "/forecast", icon: <FaChartLine /> },

    // ADMIN ONLY
    {
      name: "Admin Approval",
      path: "/admin",
      icon: <FaUserShield />,
      adminOnly: true,
      badge: stats.pendingTenants || 0
    },

    {
      name: "User Management",
      path: "/admin/users",
      icon: <FaUsers />,
      adminOnly: true
    },

    {
      name: "System Settings",
      path: "/settings",
      icon: <FaCogs />,
      adminOnly: true
    },

    { name: "Notifications", path: "/notifications", icon: <FaBell /> },

  ];

  const filteredMenu = menu.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>

      {/* MOBILE BUTTON */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-slate-900 text-white p-2 rounded-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <FaBars />
      </button>

      {/* OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-slate-900 text-white z-40
          transition-all duration-300 border-r border-slate-800

          ${collapsed ? "w-20" : "w-72"}

          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >

        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">

          {!collapsed && (
            <h1 className="text-2xl font-bold text-emerald-400">
              BMTECH
            </h1>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-300 hover:text-white"
          >
            ⟷
          </button>

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
        <nav className="flex flex-col gap-1 p-2">

          {filteredMenu.map((item, i) => {

            if (item.adminOnly && user?.role !== "Super Admin") {
              return null;
            }

            return (
              <Link
                key={i}
                to={item.path}
                className={`relative flex items-center justify-between px-3 py-2 rounded-lg transition ${isActive(item.path)}`}
              >

                <div className="flex items-center gap-3">

                  {item.icon}

                  {!collapsed && (
                    <span className="text-sm font-medium">
                      {item.name}
                    </span>
                  )}

                </div>

                {/* BADGE */}
                {!collapsed && item.badge > 0 && (
                  <span className="bg-red-500 text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}

              </Link>
            );

          })}

        </nav>

      </div>
    </>
  );
}

export default Sidebar;