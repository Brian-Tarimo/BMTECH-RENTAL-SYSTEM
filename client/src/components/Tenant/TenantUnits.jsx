function TenantUnits({
    vacantUnits,
    handleRequestUnit,
  }) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow">
  
        <h2 className="text-xl font-bold mb-4">
          Available Units
        </h2>
  
        <div className="grid md:grid-cols-3 gap-4">
  
          {vacantUnits.map((unit) => (
            <div
              key={unit._id}
              className="border rounded-xl p-4"
            >
              <h3 className="font-bold">
                Unit {unit.unitNumber}
              </h3>
  
              <p>
                Rent: KES {unit.rent}
              </p>
  
              <button
                onClick={() =>
                  handleRequestUnit(unit._id)
                }
                className="mt-3 w-full bg-emerald-500 text-white py-2 rounded-lg"
              >
                Request Unit
              </button>
            </div>
          ))}
  
        </div>
  
      </div>
    );
  }
  
  export default TenantUnits;