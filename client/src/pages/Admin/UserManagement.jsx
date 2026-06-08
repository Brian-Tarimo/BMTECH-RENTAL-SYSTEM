import { useEffect, useState } from "react";
import API from "../../services/api";

function UserManagement() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await API.get("/user-management/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const approveUser = async (id) => {
    await API.put(`/user-management/approve/${id}`);
    fetchUsers();
  };

  const suspendUser = async (id) => {
    await API.put(`/user-management/status/${id}`, {
      status: "Suspended",
    });
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await API.delete(`/user-management/${id}`);
    fetchUsers();
  };

  return (
    <div className="p-6 bg-slate-950 min-h-screen text-white">

      <h1 className="text-3xl font-bold mb-6">
        User Management
      </h1>

      <div className="grid gap-4">

        {users.map((user) => (
          <div
            key={user._id}
            className="bg-slate-800 p-4 rounded-xl flex justify-between items-center"
          >

            <div>
              <p className="font-bold">{user.name}</p>
              <p className="text-sm text-gray-400">
                {user.email}
              </p>

              <p className="text-xs mt-1">
                Role: {user.role} | Status: {user.status}
              </p>
            </div>

            <div className="flex gap-2">

              {user.role === "Tenant" &&
                user.status !== "Active" && (
                  <button
                    onClick={() => approveUser(user._id)}
                    className="bg-green-500 px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                )}

              <button
                onClick={() => suspendUser(user._id)}
                className="bg-yellow-500 px-3 py-1 rounded"
              >
                Suspend
              </button>

              <button
                onClick={() => deleteUser(user._id)}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default UserManagement;