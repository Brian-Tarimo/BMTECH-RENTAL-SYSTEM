import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  
  const data = [
    { month: "Jan", revenue: 120000 },
    { month: "Feb", revenue: 210000 },
    { month: "Mar", revenue: 180000 },
    { month: "Apr", revenue: 300000 },
    { month: "May", revenue: 250000 },
    { month: "Jun", revenue: 450000 },
  ];
  
  function RevenueChart() {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md">
  
        <h2 className="text-xl font-semibold mb-6">
          Monthly Revenue
        </h2>
  
        <div className="h-80">
  
          <ResponsiveContainer width="100%" height="100%">
  
            <LineChart data={data}>
  
              <XAxis dataKey="month" />
  
              <YAxis />
  
              <Tooltip />
  
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={4}
              />
  
            </LineChart>
  
          </ResponsiveContainer>
  
        </div>
  
      </div>
    );
  }
  
  export default RevenueChart;