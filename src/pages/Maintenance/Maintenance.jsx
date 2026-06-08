import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../services/api";

function Maintenance() {

  const [requests, setRequests] = useState([]);

  const [formData, setFormData] = useState({
    tenant: "",
    unit: "",
    title: "",
    description: "",
  });

  const fetchRequests = async () => {
    const res = await API.get("/maintenance");
    setRequests(res.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/maintenance", formData);

    fetchRequests();

    setFormData({
      tenant: "",
      unit: "",
      title: "",
      description: "",
    });
  };

  const handleUpdateStatus = async (id, status) => {
    await API.put(`/maintenance/${id}`, { status });
    fetchRequests();
  };

  return (
    <DashboardLayout>
      <div>

        <h1 className="text-3xl font-bold mb-8">
          Maintenance Requests
        </h1>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-md grid grid-cols-2 gap-4 mb-8"
        >

          <input
            name="tenant"
            placeholder="Tenant ID"
            className="border p-3 rounded-lg"
            onChange={handleChange}
            value={formData.tenant}
          />

          <input
            name="unit"
            placeholder="Unit ID"
            className="border p-3 rounded-lg"
            onChange={handleChange}
            value={formData.unit}
          />

          <input
            name="title"
            placeholder="Issue Title"
            className="border p-3 rounded-lg"
            onChange={handleChange}
            value={formData.title}
          />

          <input
            name="description"
            placeholder="Description"
            className="border p-3 rounded-lg"
            onChange={handleChange}
            value={formData.description}
          />

          <button className="bg-emerald-500 text-white p-3 rounded-lg col-span-2">
            Submit Request
          </button>

        </form>

        {/* TABLE */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <table className="w-full">

            <thead>
              <tr className="border-b text-left">
                <th>Tenant</th>
                <th>Unit</th>
                <th>Issue</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {requests.map((r) => (
                <tr key={r._id} className="border-b">

                  <td>{r.tenant?.fullName}</td>
                  <td>{r.unit?.unitNumber}</td>
                  <td>{r.title}</td>

                  <td>
                    <span className="px-3 py-1 text-white bg-blue-500 rounded-full text-sm">
                      {r.status}
                    </span>
                  </td>

                  <td>

  {r.image && (

    <img
      src={`http://localhost:5000/${r.image}`}
      alt="Issue"
      className="w-16 h-16 object-cover rounded-lg"
    />

  )}

</td>

                  <td className="flex gap-2">

                    <button
                      onClick={() => handleUpdateStatus(r._id, "In Progress")}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Start
                    </button>

                    <button
                      onClick={() => handleUpdateStatus(r._id, "Completed")}
                      className="bg-emerald-500 text-white px-3 py-1 rounded"
                    >
                      Done
                    </button>

                    <button
                      onClick={() => handleUpdateStatus(r._id, "Rejected")}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Reject
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

export default Maintenance;