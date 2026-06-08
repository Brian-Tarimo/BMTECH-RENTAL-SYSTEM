import {
    useEffect,
    useState,
  } from "react";
  
  import DashboardLayout from "../../layouts/DashboardLayout";
  
  import API from "../../services/api";
  
  function Units() {
  
    const [units, setUnits] =
      useState([]);
  
    const [apartments, setApartments] =
      useState([]);
  
    const [formData, setFormData] =
      useState({
        apartment: "",
        unitNumber: "",
        floor: "",
        type: "Bedsitter",
        monthlyRent: "",
        deposit: "",
        status: "Vacant",
        tenantAssigned: "",
      });
  
    const fetchUnits = async () => {
  
      const response =
        await API.get("/units");
  
      setUnits(response.data);
    };
  
    const fetchApartments = async () => {
  
      const response =
        await API.get("/apartments");
  
      setApartments(response.data);
    };
  
    useEffect(() => {
  
      fetchUnits();
  
      fetchApartments();
  
    }, []);
  
    const handleChange = (e) => {
  
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
  
    };
  
    const handleSubmit = async (e) => {
  
      e.preventDefault();
  
      await API.post(
        "/units",
        formData
      );
  
      fetchUnits();
  
      setFormData({
        apartment: "",
        unitNumber: "",
        floor: "",
        type: "Bedsitter",
        monthlyRent: "",
        deposit: "",
        status: "Vacant",
        tenantAssigned: "",
      });
    };
  
    const handleDelete = async (id) => {
  
      await API.delete(`/units/${id}`);
  
      fetchUnits();
    };
  
    return (
      <DashboardLayout>
  
        <div>
  
          <h1 className="text-3xl font-bold mb-8">
            Units Management
          </h1>
  
          {/* Form */}
  
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow-md grid grid-cols-2 gap-4 mb-8"
          >
  
            <select
              name="apartment"
              className="border p-3 rounded-lg"
              value={formData.apartment}
              onChange={handleChange}
            >
  
              <option value="">
                Select Apartment
              </option>
  
              {apartments.map((apartment) => (
  
                <option
                  key={apartment._id}
                  value={apartment._id}
                >
                  {apartment.name}
                </option>
  
              ))}
  
            </select>
  
            <input
              type="text"
              name="unitNumber"
              placeholder="Unit Number"
              className="border p-3 rounded-lg"
              value={formData.unitNumber}
              onChange={handleChange}
            />
  
            <input
              type="text"
              name="floor"
              placeholder="Floor"
              className="border p-3 rounded-lg"
              value={formData.floor}
              onChange={handleChange}
            />
  
            <select
              name="type"
              className="border p-3 rounded-lg"
              value={formData.type}
              onChange={handleChange}
            >
  
              <option>
                Bedsitter
              </option>
  
              <option>
                Studio
              </option>
  
              <option>
                1BR
              </option>
  
              <option>
                2BR
              </option>
  
              <option>
                3BR
              </option>
  
            </select>
  
            <input
              type="number"
              name="monthlyRent"
              placeholder="Monthly Rent"
              className="border p-3 rounded-lg"
              value={formData.monthlyRent}
              onChange={handleChange}
            />
  
            <input
              type="number"
              name="deposit"
              placeholder="Deposit"
              className="border p-3 rounded-lg"
              value={formData.deposit}
              onChange={handleChange}
            />
  
            <select
              name="status"
              className="border p-3 rounded-lg"
              value={formData.status}
              onChange={handleChange}
            >
  
              <option>
                Vacant
              </option>
  
              <option>
                Occupied
              </option>
  
              <option>
                Reserved
              </option>
  
              <option>
                Maintenance
              </option>
  
            </select>
  
            <input
              type="text"
              name="tenantAssigned"
              placeholder="Tenant Assigned"
              className="border p-3 rounded-lg"
              value={formData.tenantAssigned}
              onChange={handleChange}
            />
  
            <button
              className="bg-emerald-500 text-white p-3 rounded-lg col-span-2"
            >
              Add Unit
            </button>
  
          </form>
  
          {/* Units Table */}
  
          <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">
  
            <table className="w-full">
  
              <thead>
  
                <tr className="border-b text-left">
  
                  <th className="pb-4">
                    Apartment
                  </th>
  
                  <th className="pb-4">
                    Unit
                  </th>
  
                  <th className="pb-4">
                    Type
                  </th>
  
                  <th className="pb-4">
                    Rent
                  </th>
  
                  <th className="pb-4">
                    Status
                  </th>
  
                  <th className="pb-4">
                    Tenant
                  </th>
  
                  <th className="pb-4">
                    Actions
                  </th>
  
                </tr>
  
              </thead>
  
              <tbody>
  
                {units.map((unit) => (
  
                  <tr
                    key={unit._id}
                    className="border-b"
                  >
  
                    <td className="py-4">
                      {unit.apartment?.name}
                    </td>
  
                    <td>
                      {unit.unitNumber}
                    </td>
  
                    <td>
                      {unit.type}
                    </td>
  
                    <td>
                      KES {unit.monthlyRent}
                    </td>
  
                    <td>
  
                      <span className={`px-3 py-1 rounded-full text-white text-sm ${
                        unit.status === "Occupied"
                          ? "bg-emerald-500"
                          : unit.status === "Vacant"
                          ? "bg-blue-500"
                          : unit.status === "Reserved"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}>
                        {unit.status}
                      </span>
  
                    </td>
  
                    <td>
                      {unit.tenantAssigned || "-"}
                    </td>
  
                    <td>
  
                      <button
                        onClick={() =>
                          handleDelete(unit._id)
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
  
                    </td>
  
                  </tr>
  
                ))}
  
              </tbody>
  
            </table>
  
          </div>
  
        </div>
  
      </DashboardLayout>
    );
  }
  
  export default Units;