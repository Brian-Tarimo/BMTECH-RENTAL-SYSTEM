import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import API from "../../services/api";

function Tenants() {

  const [tenants, setTenants] =
    useState([]);

  const [units, setUnits] =
    useState([]);

  const [documents, setDocuments] =
    useState([]);

  const [formData, setFormData] =
    useState({
      fullName: "",
      nationalId: "",
      phone: "",
      email: "",
      emergencyContact: "",
      leaseStart: "",
      leaseEnd: "",
      unit: "",
    });

  // FETCH TENANTS

  const fetchTenants = async () => {

    try {

      const response =
        await API.get("/tenants");

      setTenants(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  // FETCH VACANT UNITS

  const fetchUnits = async () => {

    try {

      const response =
        await API.get("/units");

      const vacantUnits =
        response.data.filter(
          (unit) =>
            unit.status === "Vacant"
        );

      setUnits(vacantUnits);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchTenants();

    fetchUnits();

  }, []);

  // HANDLE INPUT CHANGE

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  // HANDLE FILE CHANGE

  const handleFileChange = (e) => {

    setDocuments(
      e.target.files
    );

  };

  // SUBMIT TENANT

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data =
        new FormData();

      // APPEND FORM FIELDS

      Object.keys(formData).forEach(
        (key) => {

          data.append(
            key,
            formData[key]
          );

        }
      );

      // APPEND FILES

      for (
        let i = 0;
        i < documents.length;
        i++
      ) {

        data.append(
          "documents",
          documents[i]
        );

      }

      await API.post(
        "/tenants",
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      fetchTenants();

      fetchUnits();

      // RESET FORM

      setFormData({
        fullName: "",
        nationalId: "",
        phone: "",
        email: "",
        emergencyContact: "",
        leaseStart: "",
        leaseEnd: "",
        unit: "",
      });

      setDocuments([]);

    } catch (error) {

      console.log(error);

    }
  };

  // MOVE OUT

  const handleMoveOut = async (
    id
  ) => {

    try {

      await API.put(
        `/tenants/moveout/${id}`
      );

      fetchTenants();

      fetchUnits();

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <DashboardLayout>

      <div className="p-6">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-4xl font-black text-slate-800">
            Tenant Management
          </h1>

          <p className="text-slate-500 mt-2">
            Manage tenants,
            documents, and
            occupancy.
          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-3xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-5 mb-10"
        >

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="border border-slate-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="nationalId"
            placeholder="National ID"
            className="border border-slate-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={formData.nationalId}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="border border-slate-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="border border-slate-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="emergencyContact"
            placeholder="Emergency Contact"
            className="border border-slate-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={formData.emergencyContact}
            onChange={handleChange}
          />

          <select
            name="unit"
            className="border border-slate-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={formData.unit}
            onChange={handleChange}
            required
          >

            <option value="">
              Select Vacant Unit
            </option>

            {units.map((unit) => (

              <option
                key={unit._id}
                value={unit._id}
              >
                {unit.unitNumber}
                {" - "}
                {unit.apartment?.name}
              </option>

            ))}

          </select>

          <input
            type="date"
            name="leaseStart"
            className="border border-slate-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={formData.leaseStart}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="leaseEnd"
            className="border border-slate-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={formData.leaseEnd}
            onChange={handleChange}
            required
          />

          {/* FILE UPLOAD */}

          <div className="md:col-span-2">

            <label className="block mb-2 font-semibold text-slate-700">
              Upload Documents
            </label>

            <input
              type="file"
              multiple
              onChange={
                handleFileChange
              }
              className="border border-slate-300 p-4 rounded-xl w-full"
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 text-white font-bold py-4 rounded-2xl md:col-span-2 shadow-lg"
          >
            Register Tenant
          </button>

        </form>

        {/* TENANT TABLE */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="p-6 border-b">

            <h2 className="text-2xl font-bold text-slate-800">
              Tenant Records
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-100">

                <tr>

                  <th className="text-left p-4">
                    Tenant
                  </th>

                  <th className="text-left p-4">
                    Phone
                  </th>

                  <th className="text-left p-4">
                    Apartment
                  </th>

                  <th className="text-left p-4">
                    Unit
                  </th>

                  <th className="text-left p-4">
                    Status
                  </th>

                  <th className="text-left p-4">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {tenants.map(
                  (tenant) => (

                    <tr
                      key={
                        tenant._id
                      }
                      className="border-b hover:bg-slate-50 transition-all"
                    >

                      <td className="p-4 font-semibold text-slate-700">
                        {
                          tenant.fullName
                        }
                      </td>

                      <td className="p-4">
                        {
                          tenant.phone
                        }
                      </td>

                      <td className="p-4">
                        {
                          tenant.unit
                            ?.apartment
                            ?.name
                        }
                      </td>

                      <td className="p-4">
                        {
                          tenant.unit
                            ?.unitNumber
                        }
                      </td>

                      <td className="p-4">

                        <span
                          className={`px-4 py-2 rounded-full text-white text-sm font-semibold ${
                            tenant.status ===
                            "Active"
                              ? "bg-emerald-500"
                              : "bg-red-500"
                          }`}
                        >

                          {
                            tenant.status
                          }

                        </span>

                      </td>

                      <td className="p-4">

                        {tenant.status ===
                          "Active" && (

                          <button
                            onClick={() =>
                              handleMoveOut(
                                tenant._id
                              )
                            }
                            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition-all"
                          >
                            Move Out
                          </button>

                        )}

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Tenants;