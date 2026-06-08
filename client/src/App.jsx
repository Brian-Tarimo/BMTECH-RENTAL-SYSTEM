import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// AUTH
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// DASHBOARDS
import Dashboard from "./pages/Dashboard/Dashboard";
import TenantDashboard from "./pages/Tenants/TenantDashboard";

// ADMIN PAGES
import Apartments from "./pages/Apartments/Apartments";
import Units from "./pages/Units/Units";
import Tenants from "./pages/Tenants/Tenants";
import Billing from "./pages/Billing/Billing";
import Payments from "./pages/Payments/Payments";
import Expenses from "./pages/Expenses/Expenses";
import Maintenance from "./pages/Maintenance/Maintenance";
import Notifications from "./pages/Notifications/Notifications";
import Insights from "./pages/Insights/Insights";
import Forecast from "./pages/Forecast/Forecast";
import UserManagement from "./pages/Admin/UserManagement";
import UnitRequests from "./pages/Admin/UnitRequests";

// GUARDS
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleProtected from "./components/RoleProtected";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* ADMIN ROUTES */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/apartments" element={<ProtectedRoute><Apartments /></ProtectedRoute>} />
        <Route path="/units" element={<ProtectedRoute><Units /></ProtectedRoute>} />
        <Route path="/tenants" element={<ProtectedRoute><Tenants /></ProtectedRoute>} />
        <Route path="/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
        <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
        <Route path="/expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
        <Route path="/maintenance" element={<ProtectedRoute><Maintenance /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/insights" element={<ProtectedRoute><Insights /></ProtectedRoute>} />
        <Route path="/forecast" element={<ProtectedRoute><Forecast /></ProtectedRoute>} />

        {/* UNIT REQUESTS (ADMIN ONLY) */}
        <Route
          path="/unit-requests"
          element={
            <ProtectedRoute>
              <UnitRequests />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ONLY PAGE */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <UserManagement />
            </ProtectedRoute>
          }
        />

        {/* TENANT */}
        <Route
          path="/tenant-dashboard"
          element={
            <RoleProtected allowedRoles={["Tenant"]}>
              <TenantDashboard />
            </RoleProtected>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;