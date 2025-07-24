import { useState } from "react";
import Sidebar from "./Sidebar";
import "./DashboardLayout.css";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      {isSidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}

      <div className="dashboard-wrapper">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} closeSidebar={closeSidebar} />
        <main className="dashboard-content">{children}</main>
      </div>
    </>
  );
}
