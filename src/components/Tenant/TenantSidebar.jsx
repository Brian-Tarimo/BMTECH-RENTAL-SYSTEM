import {
    FaChartPie,
    FaBuilding,
    FaFileInvoiceDollar,
    FaMoneyBillWave,
    FaTools,
    FaUser,
  } from "react-icons/fa";
  
  function TenantSidebar({ activeTab, setActiveTab }) {
    const menus = [
      {
        name: "Overview",
        icon: <FaChartPie />,
      },
      {
        name: "Units",
        icon: <FaBuilding />,
      },
      {
        name: "Invoices",
        icon: <FaFileInvoiceDollar />,
      },
      {
        name: "Payments",
        icon: <FaMoneyBillWave />,
      },
      {
        name: "Maintenance",
        icon: <FaTools />,
      },
      {
        name: "Profile",
        icon: <FaUser />,
      },
    ];
  
    return (
      <div className="bg-slate-900 text-white h-screen w-64 fixed left-0 top-0 shadow-xl">
  
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold">
            BMTECH
          </h2>
  
          <p className="text-sm text-slate-400">
            Tenant Portal
          </p>
        </div>
  
        <div className="p-4 space-y-2">
  
          {menus.map((menu) => (
            <button
              key={menu.name}
              onClick={() => setActiveTab(menu.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === menu.name
                  ? "bg-emerald-500"
                  : "hover:bg-slate-800"
              }`}
            >
              {menu.icon}
              {menu.name}
            </button>
          ))}
  
        </div>
      </div>
    );
  }
  
  export default TenantSidebar;