import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function DashboardLayout({ children }) {
  return (
    <div className="flex bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="ml-64 w-full p-6">

        <Topbar />

        <div className="mt-6">
          {children}
        </div>

      </div>

    </div>
  );
}


export default DashboardLayout;