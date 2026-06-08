import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Topbar() {

  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center rounded-xl">

      <h2 className="text-2xl font-semibold">
        Dashboard
      </h2>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>

    </div>
  );
}

export default Topbar;