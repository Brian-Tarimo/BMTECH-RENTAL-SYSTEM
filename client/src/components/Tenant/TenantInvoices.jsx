function TenantInvoices({ invoices }) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow">
  
        <h2 className="text-xl font-bold mb-4">
          My Invoices
        </h2>
  
        {invoices.length === 0 ? (
          <p>No invoices available</p>
        ) : (
          invoices.map((invoice) => (
            <div
              key={invoice._id}
              className="flex justify-between border-b py-3"
            >
              <span>{invoice.title}</span>
  
              <span>
                KES {invoice.balance}
              </span>
            </div>
          ))
        )}
  
      </div>
    );
  }
  
  export default TenantInvoices;