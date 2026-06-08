function TenantProfile({ tenant }) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow">
  
        <h2 className="text-xl font-bold mb-6">
          Profile Settings
        </h2>
  
        <div className="space-y-4">
  
          <input
            defaultValue={tenant.fullName}
            className="w-full border p-3 rounded-lg"
          />
  
          <input
            defaultValue={tenant.email}
            className="w-full border p-3 rounded-lg"
          />
  
          <button className="bg-emerald-500 text-white px-5 py-2 rounded-lg">
            Save Profile
          </button>
  
        </div>
  
        <hr className="my-6" />
  
        <h3 className="font-bold mb-3">
          Change Password
        </h3>
  
        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-3 rounded-lg mb-3"
        />
  
        <button className="bg-blue-500 text-white px-5 py-2 rounded-lg">
          Change Password
        </button>
  
      </div>
    );
  }
  
  export default TenantProfile;