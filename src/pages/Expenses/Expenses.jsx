import {
    useEffect,
    useState,
  } from "react";
  
  import DashboardLayout from "../../layouts/DashboardLayout";
  
  import API from "../../services/api";
  
  function Expenses() {
  
    const [expenses, setExpenses] =
      useState([]);
  
    const [formData, setFormData] =
      useState({
        title: "",
        category: "Maintenance",
        amount: "",
        description: "",
      });
  
    const fetchExpenses = async () => {
  
      const response =
        await API.get("/expenses");
  
      setExpenses(response.data);
    };
  
    useEffect(() => {
  
      fetchExpenses();
  
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
        "/expenses",
        formData
      );
  
      fetchExpenses();
  
      setFormData({
        title: "",
        category: "Maintenance",
        amount: "",
        description: "",
      });
    };
  
    const handleDelete = async (id) => {
  
      await API.delete(
        `/expenses/${id}`
      );
  
      fetchExpenses();
    };
  
    // TOTAL EXPENSES
  
    const totalExpenses =
      expenses.reduce(
        (acc, expense) =>
          acc + expense.amount,
        0
      );
  
    return (
      <DashboardLayout>
  
        <div>
  
          <h1 className="text-3xl font-bold mb-8">
            Expense Management
          </h1>
  
          {/* SUMMARY CARD */}
  
          <div className="bg-red-500 text-white p-6 rounded-2xl shadow-md mb-8">
  
            <h2 className="text-xl">
              Total Expenses
            </h2>
  
            <p className="text-4xl font-bold mt-2">
              KES {totalExpenses}
            </p>
  
          </div>
  
          {/* EXPENSE FORM */}
  
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow-md grid grid-cols-2 gap-4 mb-8"
          >
  
            <input
              type="text"
              name="title"
              placeholder="Expense Title"
              className="border p-3 rounded-lg"
              value={formData.title}
              onChange={handleChange}
            />
  
            <select
              name="category"
              className="border p-3 rounded-lg"
              value={formData.category}
              onChange={handleChange}
            >
  
              <option>
                Maintenance
              </option>
  
              <option>
                Salary
              </option>
  
              <option>
                Cleaning
              </option>
  
              <option>
                Security
              </option>
  
              <option>
                Utilities
              </option>
  
              <option>
                Internet
              </option>
  
              <option>
                Repairs
              </option>
  
              <option>
                Miscellaneous
              </option>
  
            </select>
  
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              className="border p-3 rounded-lg"
              value={formData.amount}
              onChange={handleChange}
            />
  
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="border p-3 rounded-lg"
              value={formData.description}
              onChange={handleChange}
            />
  
            <button
              className="bg-emerald-500 text-white p-3 rounded-lg col-span-2"
            >
              Add Expense
            </button>
  
          </form>
  
          {/* EXPENSE TABLE */}
  
          <div className="bg-white p-6 rounded-2xl shadow-md overflow-x-auto">
  
            <table className="w-full">
  
              <thead>
  
                <tr className="border-b text-left">
  
                  <th className="pb-4">
                    Title
                  </th>
  
                  <th className="pb-4">
                    Category
                  </th>
  
                  <th className="pb-4">
                    Amount
                  </th>
  
                  <th className="pb-4">
                    Status
                  </th>
  
                  <th className="pb-4">
                    Date
                  </th>
  
                  <th className="pb-4">
                    Actions
                  </th>
  
                </tr>
  
              </thead>
  
              <tbody>
  
                {expenses.map((expense) => (
  
                  <tr
                    key={expense._id}
                    className="border-b"
                  >
  
                    <td className="py-4">
                      {expense.title}
                    </td>
  
                    <td>
                      {expense.category}
                    </td>
  
                    <td>
                      KES {expense.amount}
                    </td>
  
                    <td>
  
                      <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm">
                        {expense.status}
                      </span>
  
                    </td>
  
                    <td>
                      {new Date(
                        expense.expenseDate
                      ).toLocaleDateString()}
                    </td>
  
                    <td>
  
                      <button
                        onClick={() =>
                          handleDelete(
                            expense._id
                          )
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
  
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
  
  export default Expenses;