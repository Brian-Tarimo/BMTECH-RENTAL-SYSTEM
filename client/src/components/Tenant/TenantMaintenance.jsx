function TenantMaintenance({
    maintenance,
  }) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow">
  
        <h2 className="text-xl font-bold mb-4">
          Maintenance Requests
        </h2>
  
        <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg">
          Submit Request
        </button>
  
        <div className="mt-4">
  
          {maintenance.length === 0 ? (
            <p>No requests submitted.</p>
          ) : (
            maintenance.map((item) => (
              <div
                key={item._id}
                className="border-b py-2"
              >
                {item.title}
              </div>
            ))
          )}
  
        </div>
  
      </div>
    );
  }
  
  export default TenantMaintenance;