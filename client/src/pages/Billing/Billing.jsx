import {
    useEffect,
    useState,
  } from "react";
  
  import DashboardLayout from "../../layouts/DashboardLayout";
  
  import API from "../../services/api";
  
  function Billing() {
  
    const [tenants, setTenants] =
      useState([]);
  
    const [invoices, setInvoices] =
      useState([]);
  
    const [formData, setFormData] =
      useState({
        tenant: "",
        waterBill: "",
        electricityBill: "",
        garbageFee: "",
        penalty: "",
        dueDate: "",
      });
  
    const fetchTenants = async () => {
  
      const response =
        await API.get("/tenants");
  
      const activeTenants =
        response.data.filter(
          (tenant) =>
            tenant.status === "Active"
        );
  
      setTenants(activeTenants);
    };
  
    const fetchInvoices = async () => {
  
      const response =
        await API.get("/invoices");
  
      setInvoices(response.data);
    };
  
    useEffect(() => {
  
      fetchTenants();
  
      fetchInvoices();
  
    }, []);
  
    const handleChange = (e) => {
  
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
  
    };
  
    const handleSubmit = async (e) => {
  
      e.preventDefault();
  
      await API.post(
        "/invoices",
        formData
      );
  
      fetchInvoices();
  
      setFormData({
        tenant: "",
        waterBill: "",
        electricityBill: "",
        garbageFee: "",
        penalty: "",
        dueDate: "",
      });
    };
  
    const handlePayment = async (id) => {
  
      const amount =
        prompt("Enter payment amount");
  
      if (!amount) return;
  
      await API.put(
        `/invoices/pay/${id}`,
        { amount }
      );
  
      fetchInvoices();
    };
  
    return (
      <DashboardLayout>
  
        <div>
  
          <h1 className="text-3xl font-bold mb-8">
            Billing & Invoices
          </h1>
  
          {/* Invoice Form */}
  
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow-md grid grid-cols-2 gap-4 mb-8"
          >
  
            <select
              name="tenant"
              className="border p-3 rounded-lg"
              value={formData.tenant}
              onChange={handleChange}
            >
  
              <option value="">
                Select Tenant
              </option>
  
              {tenants.map((tenant) => (
  
                <option
                  key={tenant._id}
                  value={tenant._id}
                >
                  {tenant.fullName}
                </option>
  
              ))}
  
            </select>
  
            <input
              type="number"
              name="waterBill"
              placeholder="Water Bill"
              className="border p-3 rounded-lg"
              value={formData.waterBill}
              onChange={handleChange}
            />
  
            <input
              type="number"
              name="electricityBill"
              placeholder="Electricity Bill"
              className="border p-3 rounded-lg"
              value={formData.electricityBill}
              onChange={handleChange}
            />
  
            <input
              type="number"
              name="garbageFee"
              placeholder="Garbage Fee"
              className="border p-3 rounded-lg"
              value={formData.garbageFee}
              onChange={handleChange}
            />
  
            <input
              type="number"
              name="penalty"
              placeholder="Penalty"
              className="border p-3 rounded-lg"
              value={formData.penalty}
              onChange={handleChange}
            />
  
            <input
              type="date"
              name="dueDate"
              className="border p-3 rounded-lg"
              value={formData.dueDate}
              onChange={handleChange}
            />
  
            <button
              className="bg-emerald-500 text-white p-3 rounded-lg col-span-2"
            >
              Generate Invoice
            </button>
  
          </form>
  
          {/* Invoice Table */}
  
          <div className="bg-white p-6 rounded-2xl shadow-md overflow-x-auto">
  
            <table className="w-full">
  
              <thead>
  
                <tr className="border-b text-left">
  
                  <th className="pb-4">
                    Invoice
                  </th>
  
                  <th className="pb-4">
                    Tenant
                  </th>
  
                  <th className="pb-4">
                    Total
                  </th>
  
                  <th className="pb-4">
                    Paid
                  </th>
  
                  <th className="pb-4">
                    Balance
                  </th>
  
                  <th className="pb-4">
                    Status
                  </th>
  
                  <th className="pb-4">
                    Actions
                  </th>
  
                </tr>
  
              </thead>
  
              <tbody>
  
                {invoices.map((invoice) => (
  
                  <tr
                    key={invoice._id}
                    className="border-b"
                  >
  
                    <td className="py-4">
                      {invoice.invoiceNumber}
                    </td>
  
                    <td>
                      {invoice.tenant?.fullName}
                    </td>
  
                    <td>
                      KES {invoice.totalAmount}
                    </td>
  
                    <td>
                      KES {invoice.paidAmount}
                    </td>
  
                    <td>
                      KES {invoice.balance}
                    </td>
                    
  
                    <td>
  
                      <span className={`px-3 py-1 rounded-full text-white text-sm ${
                        invoice.status === "Paid"
                          ? "bg-emerald-500"
                          : invoice.status === "Partial"
                          ? "bg-yellow-500"
                          : invoice.status === "Overdue"
                          ? "bg-red-500"
                          : "bg-blue-500"
                      }`}>
                        {invoice.status}
                      </span>
  
                    </td>
  
                    <td>
  
                      {invoice.status !== "Paid" && (
  
                        <button
                          onClick={() =>
                            handlePayment(
                              invoice._id
                            )
                          }
                          className="bg-emerald-500 text-white px-4 py-2 rounded-lg"
                        >
                          Pay
                        </button>
                        
  
                      )}

<a
  href={`http://localhost:5000/api/invoices/pdf/${invoice._id}`}
  target="_blank"
  rel="noreferrer"
  className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2 inline-block"
>
  PDF
</a>
  
                    </td>
  
                  </tr>
  
                ))}
  
              </tbody>
  
            </table>
  
          </div>
  
        </div>
  
      </DashboardLayout>
    );
  }
  
  export default Billing;