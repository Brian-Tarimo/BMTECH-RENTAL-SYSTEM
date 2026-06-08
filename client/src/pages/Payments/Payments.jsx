import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../services/api";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [invoices, setInvoices] = useState([]);

  const [formData, setFormData] = useState({
    invoiceId: "",
    amount: "",
    paymentMethod: "M-Pesa",
  });

  const fetchPayments = async () => {
    const response = await API.get("/payments");
    setPayments(response.data);
  };

  const fetchInvoices = async () => {
    const response = await API.get("/invoices");

    const unpaidInvoices = response.data.filter(
      (invoice) => invoice.status !== "Paid"
    );

    setInvoices(unpaidInvoices);
  };

  useEffect(() => {
    fetchPayments();
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

    await API.post("/payments", formData);

    fetchPayments();
    fetchInvoices();

    setFormData({
      invoiceId: "",
      amount: "",
      paymentMethod: "M-Pesa",
    });
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold mb-8">
          Payments Management
        </h1>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-md grid grid-cols-2 gap-4 mb-8"
        >
          <select
            name="invoiceId"
            className="border p-3 rounded-lg"
            value={formData.invoiceId}
            onChange={handleChange}
          >
            <option value="">Select Invoice</option>

            {invoices.map((invoice) => (
              <option key={invoice._id} value={invoice._id}>
                {invoice.invoiceNumber} - {invoice.tenant?.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="amount"
            placeholder="Payment Amount"
            className="border p-3 rounded-lg"
            value={formData.amount}
            onChange={handleChange}
          />

          <select
            name="paymentMethod"
            className="border p-3 rounded-lg"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="M-Pesa">M-Pesa</option>
            <option value="Bank">Bank</option>
            <option value="Cash">Cash</option>
          </select>

          <button className="bg-emerald-500 text-white p-3 rounded-lg">
            Record Payment
          </button>
        </form>

        {/* TABLE */}
        <div className="bg-white p-6 rounded-2xl shadow-md overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-4">Transaction</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Method</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Date</th>
                <th className="pb-4">Receipt</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id} className="border-b">
                  <td className="py-4">{payment.transactionCode}</td>
                  <td>KES {payment.amount}</td>
                  <td>{payment.paymentMethod}</td>
                  <td>
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm">
                      {payment.status}
                    </span>
                  </td>
                  <td>
                    {new Date(payment.paymentDate).toLocaleDateString()}
                  </td>

                  {/* FIXED: moved INSIDE map */}
                  <td>
                    <a
                      href={`http://localhost:5000/api/payments/receipt/${payment._id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                      Receipt
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

export default Payments;