import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.post("/auth/login", formData);

      const user = response.data.user;
      const token = response.data.token;

      console.log("LOGIN RESPONSE:", response.data);

      // ❗ TENANT APPROVAL CHECK (FRONTEND SAFETY)
      if (user.role === "Tenant" && user.status !== "Active") {
        alert("Your account is pending admin approval");
        return;
      }

      login(user, token);

      const role = user.role?.trim();

      switch (role) {
        case "Super Admin":
        case "Landlord":
          navigate("/dashboard");
          break;

        case "Accountant":
          navigate("/payments");
          break;

        case "Caretaker":
          navigate("/maintenance");
          break;

        case "Tenant":
          navigate("/tenant-dashboard");
          break;

        default:
          navigate("/dashboard");
      }
    } catch (error) {
      console.log("LOGIN ERROR:", error);

      alert(
        error?.response?.data?.message ||
          "Invalid credentials or account not approved"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          BMTECH Portal
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Login to access your dashboard
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-lg transition duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* REGISTER LINK */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-emerald-600 font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;