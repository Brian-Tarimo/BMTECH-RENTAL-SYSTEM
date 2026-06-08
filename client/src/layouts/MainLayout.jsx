import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
  return (
    <div className="flex">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT AREA (FIX OVERLAP) */}
      <div className="flex-1 ml-72 md:ml-72 transition-all duration-300 bg-slate-100 min-h-screen">

        {children}

      </div>

    </div>
  );
}

export default MainLayout;