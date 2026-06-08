const payments = [
    {
      tenant: "John Mwangi",
      unit: "A-12",
      amount: "KES 25,000",
      status: "Paid",
    },
    {
      tenant: "Sarah Wanjiku",
      unit: "B-03",
      amount: "KES 18,000",
      status: "Pending",
    },
  ];
  
  function RecentPayments() {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md">
  
        <h2 className="text-xl font-semibold mb-6">
          Recent Payments
        </h2>
  
        <table className="w-full">
  
          <thead>
            <tr className="text-left border-b">
  
              <th className="pb-3">Tenant</th>
              <th className="pb-3">Unit</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Status</th>
  
            </tr>
          </thead>
  
          <tbody>
  
            {payments.map((payment, index) => (
              <tr
                key={index}
                className="border-b"
              >
  
                <td className="py-4">
                  {payment.tenant}
                </td>
  
                <td>
                  {payment.unit}
                </td>
  
                <td>
                  {payment.amount}
                </td>
  
                <td>
  
                  <span className={`px-3 py-1 rounded-full text-white text-sm ${
                    payment.status === "Paid"
                      ? "bg-emerald-500"
                      : "bg-red-500"
                  }`}>
                    {payment.status}
                  </span>
  
                </td>
  
              </tr>
            ))}
  
          </tbody>
  
        </table>
  
      </div>
    );
  }
  
  export default RecentPayments;