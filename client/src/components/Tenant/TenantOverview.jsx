import {
    FaHome,
    FaMoneyBill,
    FaFileInvoiceDollar,
    FaCheckCircle,
  } from "react-icons/fa";
  
  function TenantOverview({
    tenant,
    totalPaid,
    totalDue,
  }) {
    return (
      <>
        <div className="grid md:grid-cols-4 gap-6">
  
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-6 rounded-2xl">
            <FaHome className="text-2xl mb-2" />
            <p>Unit</p>
            <h2 className="text-2xl font-bold">
              {tenant.unit?.unitNumber || "N/A"}
            </h2>
          </div>
  
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl">
            <FaMoneyBill className="text-2xl mb-2" />
            <p>Monthly Rent</p>
            <h2 className="text-2xl font-bold">
              KES {tenant.monthlyRent || 0}
            </h2>
          </div>
  
          <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-6 rounded-2xl">
            <FaFileInvoiceDollar className="text-2xl mb-2" />
            <p>Total Due</p>
            <h2 className="text-2xl font-bold">
              KES {totalDue}
            </h2>
          </div>
  
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-2xl">
            <FaCheckCircle className="text-2xl mb-2" />
            <p>Total Paid</p>
            <h2 className="text-2xl font-bold">
              KES {totalPaid}
            </h2>
          </div>
  
        </div>
      </>
    );
  }
  
  export default TenantOverview;