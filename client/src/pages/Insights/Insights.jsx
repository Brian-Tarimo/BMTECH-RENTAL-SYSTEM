import { useEffect, useState } from "react";
import API from "../../services/api";
import DashboardLayout from "../../layouts/DashboardLayout";

function Insights() {

  const [data, setData] = useState(null);

  const fetchInsights = async () => {
    const res = await API.get("/insights");
    setData(res.data);
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* KPI CARDS */}
        <div className="grid grid-cols-2 gap-4">

          <div className="bg-emerald-500 text-white p-6 rounded-2xl">
            <h3>Revenue</h3>
            <p className="text-2xl font-bold">
              KES {data.revenue}
            </p>
          </div>

          <div className="bg-red-500 text-white p-6 rounded-2xl">
            <h3>Expenses</h3>
            <p className="text-2xl font-bold">
              KES {data.totalExpenses}
            </p>
          </div>

          <div className="bg-blue-500 text-white p-6 rounded-2xl">
            <h3>Profit</h3>
            <p className="text-2xl font-bold">
              KES {data.profit}
            </p>
          </div>

          <div className="bg-purple-500 text-white p-6 rounded-2xl">
            <h3>Occupancy</h3>
            <p className="text-2xl font-bold">
              {data.occupancyRate.toFixed(1)}%
            </p>
          </div>

        </div>

        {/* INSIGHTS SECTION */}
        <div className="bg-white p-6 rounded-2xl shadow-md">

          <h2 className="text-xl font-bold mb-4">
            Smart Insights
          </h2>

          {data.insights.map((i, index) => (
            <div key={index} className="border-b py-3">

              <span
                className={`px-3 py-1 text-white rounded-full text-sm ${
                  i.type === "Positive"
                    ? "bg-emerald-500"
                    : i.type === "Warning"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              >
                {i.type}
              </span>

              <p className="mt-2">{i.message}</p>

            </div>
          ))}

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Insights;