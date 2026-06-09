import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const navigate = useNavigate();

  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [unitRequests, setUnitRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH ANALYTICS
  ========================== */
  const fetchAnalytics = async () => {
    try {
      const response = await API.get("/analytics/dashboard");
      setAnalytics(response.data || null);
    } catch (error) {
      console.log("Analytics Error:", error);
    }
  };

  /* =========================
     FETCH USERS
  ========================== */
  const fetchUsers = async () => {
    try {
      const res = await API.get("/user-management/users");
      setUsers(res.data || []);
    } catch (err) {
      console.log("Users Error:", err);
    }
  };

  /* =========================
     FETCH UNIT REQUESTS
  ========================== */
  const fetchUnitRequests = async () => {
    try {
      const res = await API.get("/tenants/request-unit"); // safer endpoint suggestion
      setUnitRequests(res.data.requests || []);
    } catch (err) {
      console.log("Unit Requests Error:", err);
    }
  };

  /* =========================
     INIT LOAD
  ========================== */
  useEffect(() => {
    const load = async () => {
      setLoading(true);

      await Promise.all([
        fetchAnalytics(),
        fetchUsers(),
        fetchUnitRequests(),
      ]);

      setLoading(false);
    };

    load();
  }, []);

  /* =========================
     LOADING STATE
  ========================== */
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950">
        <p className="text-white text-lg animate-pulse">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  /* =========================
     SAFETY CHECK
  ========================== */
  if (!analytics) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950">
        <p className="text-red-400">Failed to load analytics</p>
      </div>
    );
  }

  /* =========================
     DATA PREPARATION
  ========================== */
  const occupancyData = [
    { name: "Occupied", value: analytics?.occupiedUnits || 0 },
    { name: "Vacant", value: analytics?.vacantUnits || 0 },
  ];

  const paymentData = [
    { name: "Paid", value: analytics?.paymentAnalytics?.paidInvoices || 0 },
    { name: "Partial", value: analytics?.paymentAnalytics?.partialInvoices || 0 },
    { name: "Pending", value: analytics?.paymentAnalytics?.pendingInvoices || 0 },
  ];

  const pendingTenants = users.filter(
    (u) => u.role === "Tenant" && u.status === "Pending"
  );

  const staff = users.filter((u) => u.role !== "Tenant");

  return (
    <DashboardLayout>
      
      {/* ✅ FIX: RESPONSIVE WRAPPER FOR SIDEBAR */}
      <div className="flex">
        
        {/* MAIN CONTENT AREA */}
        <div className="
          flex-1 
          min-h-screen 
          bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 
          p-4 sm:p-6 lg:p-8 
          text-white
  
          /* IMPORTANT: prevents overlap with sidebar */
          md:ml-72
          transition-all
        ">
  
          {/* TOP HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
  
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
                BMTECH Admin Dashboard
              </h1>
              <p className="text-slate-400 mt-1 text-sm sm:text-base">
                Real-time system overview & analytics
              </p>
            </div>
  
            <button
              onClick={() => navigate("/unit-requests")}
              className="bg-emerald-500 hover:bg-emerald-600 px-4 sm:px-5 py-2 sm:py-3 rounded-xl font-semibold shadow-lg w-full md:w-auto"
            >
              Manage Requests
            </button>
  
          </div>
  
          {/* KPI GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
  
            <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-4 sm:p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition">
              <p className="text-slate-300 text-sm">Total Revenue</p>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-emerald-400">
                KES {analytics.totalRevenue || 0}
              </h2>
            </div>
  
            <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-4 sm:p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition">
              <p className="text-slate-300 text-sm">Pending Balances</p>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-red-400">
                KES {analytics.pendingBalances || 0}
              </h2>
            </div>
  
            <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-4 sm:p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition">
              <p className="text-slate-300 text-sm">Occupied Units</p>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-blue-400">
                {analytics.occupiedUnits || 0}
              </h2>
            </div>
  
          </div>
  
          {/* CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-10">
  
            {/* OCCUPANCY CHART */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-4 sm:p-6 rounded-2xl">
              <h2 className="text-lg font-semibold mb-4 text-slate-200">
                Occupancy Overview
              </h2>
  
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={occupancyData}
                    dataKey="value"
                    outerRadius={90}
                    label
                  >
                    <Cell fill="#10B981" />
                    <Cell fill="#3B82F6" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
  
            {/* PAYMENT CHART */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-4 sm:p-6 rounded-2xl">
              <h2 className="text-lg font-semibold mb-4 text-slate-200">
                Payment Status
              </h2>
  
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={paymentData}>
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#06B6D4" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
  
          </div>
  
          {/* UNIT REQUESTS */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-4 sm:p-6 rounded-2xl mb-10">
  
            <h2 className="text-xl font-bold mb-5">Unit Requests</h2>
  
            {unitRequests.length === 0 ? (
              <p className="text-slate-400">No unit requests yet.</p>
            ) : (
              <div className="space-y-3">
  
                {unitRequests.slice(0, 5).map((req) => (
  
                  <div
                    key={req._id}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white/5 p-4 rounded-xl hover:bg-white/10 transition gap-2"
                  >
  
                    <div>
                      <p className="font-semibold">
                        {req.tenant?.fullName || "Unknown Tenant"}
                      </p>
                      <p className="text-sm text-slate-400">
                        Unit {req.unit?.unitNumber || "N/A"}
                      </p>
                    </div>
  
                    <span className="px-3 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-300 w-fit">
                      {req.status}
                    </span>
  
                  </div>
  
                ))}
  
              </div>
            )}
          </div>
  
          {/* USERS SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
  
            {/* TENANTS */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-4 sm:p-6 rounded-2xl">
  
              <h2 className="font-bold mb-4">Pending Tenants</h2>
  
              {pendingTenants.length === 0 ? (
                <p className="text-slate-400">No pending tenants</p>
              ) : (
                pendingTenants.map((u) => (
                  <div key={u._id} className="border-b border-white/10 py-2">
                    {u.fullName || u.name}
                  </div>
                ))
              )}
  
            </div>
  
            {/* STAFF */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-4 sm:p-6 rounded-2xl">
  
              <h2 className="font-bold mb-4">Staff Members</h2>
  
              {staff.length === 0 ? (
                <p className="text-slate-400">No staff found</p>
              ) : (
                staff.map((u) => (
                  <div key={u._id} className="border-b border-white/10 py-2 flex justify-between">
                    <span>{u.fullName || u.name}</span>
                    <span className="text-slate-400 text-sm">{u.role}</span>
                  </div>
                ))
              )}
  
            </div>
  
          </div>
  
        </div>
      </div>
    </DashboardLayout>
  );
  
}
export default Dashboard;