function TenantPayments({ payments }) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow">
  
        <h2 className="text-xl font-bold mb-4">
          Payment History
        </h2>
  
        {payments.length === 0 ? (
          <p>No payments yet</p>
        ) : (
          payments.map((payment) => (
            <div
              key={payment._id}
              className="flex justify-between border-b py-3"
            >
              <span>
                {payment.paymentMethod}
              </span>
  
              <span>
                KES {payment.amount}
              </span>
            </div>
          ))
        )}
  
      </div>
    );
  }
  
  export default TenantPayments;