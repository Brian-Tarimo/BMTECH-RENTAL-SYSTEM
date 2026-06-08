import { useEffect, useState } from "react";
import API from "../../services/api";

function UnitRequests() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/unit-requests");
      setRequests(res.data.requests);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approve = async (id) => {
    try {
      console.log("Approving:", id);
  
      await API.put(`/unit-requests/approve/${id}`);
  
      alert("Request approved");
  
      fetchRequests(); // refresh UI
    } catch (err) {
      console.log("APPROVE ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Approval failed");
    }
  };
  
  const reject = async (id) => {
    try {
      console.log("Rejecting:", id);
  
      await API.put(`/unit-requests/reject/${id}`);
  
      alert("Request rejected");
  
      fetchRequests();
    } catch (err) {
      console.log("REJECT ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Rejection failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Unit Requests
      </h1>

      {requests.length === 0 ? (
        <p>No requests found</p>
      ) : (
        requests.map((req) => (
          <div
            key={req._id}
            className="border p-4 mb-3 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-bold">
                {req.tenant?.fullName}
              </p>
              <p>Unit: {req.unit?.unitNumber}</p>
              <p>Status: {req.status}</p>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => approve(req._id)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Approve
              </button>

              <button
                onClick={() => reject(req._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default UnitRequests;