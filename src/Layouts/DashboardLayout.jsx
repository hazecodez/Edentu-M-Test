import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import PropTypes from "prop-types";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content area */}
      <div className="flex-1">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />

        {/* Main content (children) */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
