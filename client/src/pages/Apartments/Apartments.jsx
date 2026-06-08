import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import API from "../../services/api";

function Apartments() {

  const [apartments, setApartments] =
    useState([]);

  const [formData, setFormData] =
    useState({
      name: "",
      location: "",
      totalUnits: "",
      occupiedUnits: "",
      vacantUnits: "",
      description: "",
    });

  const fetchApartments = async () => {

    const response =
      await API.get("/apartments");

    setApartments(response.data);
  };

  useEffect(() => {

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
      "/apartments",
      formData
    );

    fetchApartments();

    setFormData({
      name: "",
      location: "",
      totalUnits: "",
      occupiedUnits: "",
      vacantUnits: "",
      description: "",
    });
  };

  const handleDelete = async (id) => {

    await API.delete(
      `/apartments/${id}`
    );

    fetchApartments();
  };

  return (
    <DashboardLayout>

      <div>

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            Apartments
          </h1>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-md mb-8 grid grid-cols-2 gap-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Apartment Name"
            className="border p-3 rounded-lg"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            className="border p-3 rounded-lg"
            value={formData.location}
            onChange={handleChange}
          />

          <input
            type="number"
            name="totalUnits"
            placeholder="Total Units"
            className="border p-3 rounded-lg"
            value={formData.totalUnits}
            onChange={handleChange}
          />

          <input
            type="number"
            name="occupiedUnits"
            placeholder="Occupied Units"
            className="border p-3 rounded-lg"
            value={formData.occupiedUnits}
            onChange={handleChange}
          />

          <input
            type="number"
            name="vacantUnits"
            placeholder="Vacant Units"
            className="border p-3 rounded-lg"
            value={formData.vacantUnits}
            onChange={handleChange}
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            className="border p-3 rounded-lg"
            value={formData.description}
            onChange={handleChange}
          />

          <button
            className="bg-emerald-500 text-white p-3 rounded-lg col-span-2"
          >
            Add Apartment
          </button>

        </form>

        {/* Apartment Table */}

        <div className="bg-white p-6 rounded-2xl shadow-md overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b text-left">

                <th className="pb-4">
                  Name
                </th>

                <th className="pb-4">
                  Location
                </th>

                <th className="pb-4">
                  Units
                </th>

                <th className="pb-4">
                  Occupied
                </th>

                <th className="pb-4">
                  Vacant
                </th>

                <th className="pb-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {apartments.map((apartment) => (

                <tr
                  key={apartment._id}
                  className="border-b"
                >

                  <td className="py-4">
                    {apartment.name}
                  </td>

                  <td>
                    {apartment.location}
                  </td>

                  <td>
                    {apartment.totalUnits}
                  </td>

                  <td>
                    {apartment.occupiedUnits}
                  </td>

                  <td>
                    {apartment.vacantUnits}
                  </td>

                  <td>

                    <button
                      onClick={() =>
                        handleDelete(
                          apartment._id
                        )
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

export default Apartments;