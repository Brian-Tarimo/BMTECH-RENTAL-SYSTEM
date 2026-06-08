import API from "./api";

/* =========================
   DASHBOARD
========================= */
export const getTenantDashboard = async () => {
  const token = localStorage.getItem("token");

  const res = await API.get("/tenants/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

/* =========================
   VACANT UNITS
========================= */
export const getVacantUnits = async () => {
  const token = localStorage.getItem("token");

  const res = await API.get("/tenants/vacant-units", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

/* =========================
   REQUEST UNIT
========================= */
export const requestUnit = async (unitId) => {
  const token = localStorage.getItem("token");

  const res = await API.post(
    "/tenants/request-unit",
    { unitId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

/* =========================
   🟢 OPTIONAL (SAFE EXTENSIONS)
   Add backend later (DO NOT BREAK APP)
========================= */

/* PAYMENT HISTORY */
export const getPaymentHistory = async () => {
  const token = localStorage.getItem("token");

  const res = await API.get("/tenants/payments", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

/* UPDATE PROFILE */
export const updateTenantProfile = async (data) => {
  const token = localStorage.getItem("token");

  const res = await API.put("/tenants/profile", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

/* CHANGE PASSWORD */
export const changePassword = async (data) => {
  const token = localStorage.getItem("token");

  const res = await API.put("/tenants/change-password", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};