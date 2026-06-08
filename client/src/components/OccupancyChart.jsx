import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  
  const data = [
    { name: "Occupied", value: 84 },
    { name: "Vacant", value: 16 },
  ];
  
  const COLORS = ["#10b981", "#1e293b"];
  
  function OccupancyChart() {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md">
  
        <h2 className="text-xl font-semibold mb-6">
          Occupancy Status
        </h2>
  
        <div className="h-80">
  
          <ResponsiveContainer width="100%" height="100%">
  
            <PieChart>
  
              <Pie
                data={data}
                dataKey="value"
                outerRadius={100}
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>
  
              <Tooltip />
  
            </PieChart>
  
          </ResponsiveContainer>
  
        </div>
  
      </div>
    );
  }
  
  export default OccupancyChart;