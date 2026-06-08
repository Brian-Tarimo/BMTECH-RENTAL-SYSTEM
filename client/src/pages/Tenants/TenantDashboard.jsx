import {
  FaHome,
  FaMoneyBill,
  FaFileInvoiceDollar,
  FaBell,
  FaUser,
  FaBuilding,
  FaCreditCard,
  FaCog,
  } from "react-icons/fa";
  
  import { useEffect, useState } from "react";
  
  import {
  getTenantDashboard,
  getVacantUnits,
  requestUnit,
  getPaymentHistory,
  updateTenantProfile,
  changePassword,
  } from "../../services/tenantService";
  
  function TenantDashboard() {
  const [tenant, setTenant] = useState(null);
  const [vacantUnits, setVacantUnits] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalDue, setTotalDue] = useState(0);
  
  const [activeTab, setActiveTab] = useState("overview");
  
  const [profileForm, setProfileForm] = useState({
  fullName: "",
  phone: "",
  });
  
  const [passwordForm, setPasswordForm] = useState({
  currentPassword: "",
  newPassword: "",
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
  const fetchData = async () => {
  try {
  setLoading(true);
  
  
      const dashboard = await getTenantDashboard();
      const units = await getVacantUnits();
      const payments = await getPaymentHistory();
  
      setTenant(dashboard?.tenant);
      setVacantUnits(units?.units || []);
      setPaymentHistory(payments?.payments || payments || []);
  
      setTotalPaid(dashboard?.totalPaid || 0);
      setTotalDue(dashboard?.totalDue || 0);
  
      setProfileForm({
        fullName: dashboard?.tenant?.fullName || "",
        phone: dashboard?.tenant?.phone || "",
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };
  
  fetchData();
  
  
  }, []);
  
  const handleRequestUnit = async (unitId) => {
  try {
  await requestUnit(unitId);
  alert("Unit request sent successfully");
  } catch (error) {
  alert("Failed to request unit");
  }
  };
  
  const handlePayRent = (amount) => {
  alert(`Trigger M-Pesa STK Push for KES ${amount}`);
  };
  
  const handleProfileUpdate = async () => {
  try {
  await updateTenantProfile(profileForm);
  alert("Profile updated successfully");
  } catch (error) {
  alert("Failed to update profile");
  }
  };
  
  const handlePasswordChange = async () => {
  try {
  await changePassword(passwordForm);
  
  
    alert("Password changed successfully");
  
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
    });
  } catch (error) {
    alert("Failed to change password");
  }
  
  
  };
  
  if (loading) {
  return ( <div className="h-screen flex items-center justify-center bg-slate-100"> <div className="w-14 h-14 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div> </div>
  );
  }
  
  if (error) {
  return ( <div className="h-screen flex items-center justify-center"> <div className="bg-red-100 text-red-600 px-6 py-4 rounded-xl">
  {error} </div> </div>
  );
  }
  
  if (!tenant) {
  return ( <div className="h-screen flex items-center justify-center">
  No tenant found </div>
  );
  }
  
  return ( <div className="flex bg-slate-100 min-h-screen">
  
  ```
    {/* SIDEBAR */}
  
    <aside className="w-72 bg-slate-900 text-white min-h-screen p-6">
  
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          BMTECH
        </h1>
  
        <p className="text-slate-400 text-sm">
          Rental System
        </p>
      </div>
  
      <div className="space-y-3">
  
        <button
          onClick={() => setActiveTab("overview")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
            activeTab === "overview"
              ? "bg-indigo-600"
              : "hover:bg-slate-800"
          }`}
        >
          <FaHome />
          Dashboard
        </button>
  
        <button
          onClick={() => setActiveTab("payments")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
            activeTab === "payments"
              ? "bg-indigo-600"
              : "hover:bg-slate-800"
          }`}
        >
          <FaCreditCard />
          Payments
        </button>
  
        <button
          onClick={() => setActiveTab("units")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
            activeTab === "units"
              ? "bg-indigo-600"
              : "hover:bg-slate-800"
          }`}
        >
          <FaBuilding />
          Available Units
        </button>
  
        <button
          onClick={() => setActiveTab("profile")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
            activeTab === "profile"
              ? "bg-indigo-600"
              : "hover:bg-slate-800"
          }`}
        >
          <FaUser />
          Profile
        </button>
  
      </div>
    </aside>
  
    {/* MAIN CONTENT */}
  
    <main className="flex-1 p-8">
  
      {/* HERO */}
  
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-8 text-white mb-8">
  
        <h1 className="text-3xl font-bold">
          Welcome Back, {tenant.fullName}
        </h1>
  
        <p className="mt-2 opacity-90">
          Manage your apartment, payments and account information.
        </p>
  
      </div>
  
      {/* STATS */}
  
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">
  
        <StatCard
          icon={<FaHome />}
          title="Unit Number"
          value={tenant.unit?.unitNumber || "N/A"}
          color="text-blue-600"
        />
  
        <StatCard
          icon={<FaMoneyBill />}
          title="Monthly Rent"
          value={`KES ${tenant.monthlyRent || 0}`}
          color="text-green-600"
        />
  
        <StatCard
          icon={<FaFileInvoiceDollar />}
          title="Outstanding"
          value={`KES ${totalDue}`}
          color="text-red-500"
        />
  
        <StatCard
          icon={<FaBell />}
          title="Status"
          value={tenant.status}
          color="text-orange-500"
        />
  
      </div>
  
      {/* OVERVIEW */}
  
      {activeTab === "overview" && (
        <>
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
  
            <div className="bg-white rounded-3xl p-8 shadow-lg">
  
              <h2 className="text-xl font-bold mb-4">
                Payment Summary
              </h2>
  
              <div className="space-y-4">
  
                <div className="flex justify-between">
                  <span>Total Paid</span>
                  <strong>KES {totalPaid}</strong>
                </div>
  
                <div className="flex justify-between">
                  <span>Total Due</span>
                  <strong className="text-red-500">
                    KES {totalDue}
                  </strong>
                </div>
  
              </div>
  
            </div>
  
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-lg">
  
              <h2 className="text-2xl font-bold">
                Quick Rent Payment
              </h2>
  
              <p className="mt-3">
                Outstanding Balance
              </p>
  
              <h1 className="text-4xl font-bold mt-2">
                KES {totalDue}
              </h1>
  
              <button
                onClick={() => handlePayRent(totalDue)}
                className="mt-6 bg-white text-green-700 px-6 py-3 rounded-xl font-semibold"
              >
                Pay via M-Pesa
              </button>
  
            </div>
  
          </div>
        </>
      )}
  ```
  ```
    {/* PAYMENTS */}

    {activeTab === "payments" && (
      <div className="bg-white rounded-3xl shadow-lg p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Payment History
          </h2>

          <button
            onClick={() =>
              handlePayRent(tenant.monthlyRent || totalDue)
            }
            className="bg-green-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-green-700"
          >
            Pay via M-Pesa
          </button>

        </div>

        {paymentHistory.length === 0 ? (

          <div className="text-center py-10 text-gray-500">
            No payment records found
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b bg-slate-50">

                  <th className="text-left p-4">
                    Date
                  </th>

                  <th className="text-left p-4">
                    Method
                  </th>

                  <th className="text-left p-4">
                    Amount
                  </th>

                  <th className="text-left p-4">
                    Status
                  </th>

                </tr>
              </thead>

              <tbody>

                {paymentHistory.map((payment) => (

                  <tr
                    key={payment._id}
                    className="border-b hover:bg-slate-50"
                  >

                    <td className="p-4">
                      {payment.createdAt
                        ? new Date(
                            payment.createdAt
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="p-4">
                      {payment.paymentMethod}
                    </td>

                    <td className="p-4 font-semibold">
                      KES {payment.amount}
                    </td>

                    <td className="p-4">

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        {payment.status || "Paid"}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>
    )}

    {/* AVAILABLE UNITS */}

    {activeTab === "units" && (

      <div className="bg-white rounded-3xl shadow-lg p-8">

        <h2 className="text-2xl font-bold mb-6">
          Available Units
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {vacantUnits.length === 0 ? (

            <div className="col-span-full text-center text-gray-500 py-10">
              No vacant units available
            </div>

          ) : (

            vacantUnits.map((unit) => (

              <div
                key={unit._id}
                className="border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition"
              >

                <h3 className="text-xl font-bold">
                  Unit {unit.unitNumber}
                </h3>

                <p className="text-gray-500 mt-2">
                  Monthly Rent
                </p>

                <h2 className="text-2xl font-bold text-indigo-600 mt-1">
                  KES {unit.rent}
                </h2>

                <button
                  onClick={() =>
                    handleRequestUnit(unit._id)
                  }
                  className="mt-5 w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700"
                >
                  Request Unit
                </button>

              </div>

            ))

          )}

        </div>

      </div>

    )}

    {/* PROFILE */}

    {activeTab === "profile" && (

      <div className="grid lg:grid-cols-2 gap-8">

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-xl font-bold mb-6">
            Update Profile
          </h2>

          <input
            type="text"
            placeholder="Full Name"
            value={profileForm.fullName}
            onChange={(e) =>
              setProfileForm({
                ...profileForm,
                fullName: e.target.value,
              })
            }
            className="w-full border rounded-xl p-4 mb-4"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={profileForm.phone}
            onChange={(e) =>
              setProfileForm({
                ...profileForm,
                phone: e.target.value,
              })
            }
            className="w-full border rounded-xl p-4 mb-4"
          />

          <button
            onClick={handleProfileUpdate}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
          >
            Save Changes
          </button>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-xl font-bold mb-6">
            Change Password
          </h2>

          <input
            type="password"
            placeholder="Current Password"
            value={passwordForm.currentPassword}
            onChange={(e) =>
              setPasswordForm({
                ...passwordForm,
                currentPassword:
                  e.target.value,
              })
            }
            className="w-full border rounded-xl p-4 mb-4"
          />

          <input
            type="password"
            placeholder="New Password"
            value={passwordForm.newPassword}
            onChange={(e) =>
              setPasswordForm({
                ...passwordForm,
                newPassword:
                  e.target.value,
              })
            }
            className="w-full border rounded-xl p-4 mb-4"
          />

          <button
            onClick={handlePasswordChange}
            className="bg-green-600 text-white px-6 py-3 rounded-xl"
          >
            Change Password
          </button>

        </div>

      </div>

    )}

  </main>

</div>


);
}

/* STAT CARD */

function StatCard({
icon,
title,
value,
color,
}) {
return ( <div className="bg-white rounded-3xl p-6 shadow-lg">


  <div className={`text-3xl ${color}`}>
    {icon}
  </div>

  <p className="text-gray-500 mt-3">
    {title}
  </p>

  <h2 className="text-2xl font-bold mt-2">
    {value}
  </h2>

</div>


);
}

export default TenantDashboard;
  