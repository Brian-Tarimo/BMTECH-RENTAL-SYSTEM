import { useEffect, useState } from "react";
import API from "../../services/api";
import DashboardLayout from "../../layouts/DashboardLayout";

function Forecast() {

  const [data, setData] = useState(null);

  useEffect(() => {

    const fetchData = async () => {

      const res = await API.get("/forecast");

      setData(res.data);

    };

    fetchData();

  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* REVENUE FORECAST */}
        <div className="bg-emerald-500 text-white p-6 rounded-2xl">
          <h2>Revenue Forecast</h2>
          <p className="text-2xl font-bold">
            KES {data.revenue.forecastRevenue?.toFixed(0)}
          </p>
        </div>

        {/* EXPENSE FORECAST */}
        <div className="bg-red-500 text-white p-6 rounded-2xl">
          <h2>Expense Forecast</h2>
          <p className="text-2xl font-bold">
            KES {data.expenses.forecastExpenses?.toFixed(0)}
          </p>
        </div>

        {/* OCCUPANCY FORECAST */}
        <div className="bg-blue-500 text-white p-6 rounded-2xl">
          <h2>Occupancy Forecast</h2>
          <p className="text-2xl font-bold">
            {data.occupancy.forecastOccupancy?.toFixed(1)}%
          </p>
        </div>

        {/* PROFIT FORECAST */}
        <div className="bg-purple-500 text-white p-6 rounded-2xl">
          <h2>Profit Forecast</h2>
          <p className="text-2xl font-bold">
            KES {data.profitForecast?.toFixed(0)}
          </p>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Forecast;