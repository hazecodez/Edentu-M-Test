import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  //func for check the active page
  const isActive = (path) => location.pathname === path;
  //func for button to open/close sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isActive={isActive}
      />

      {/* Main content area */}
      <div className="flex-1">
        {/* Navbar */}
        <Navbar
          toggleSidebar={toggleSidebar}
          isOpen={isSidebarOpen}
          isActive={isActive}
        />

        {/* Main content (children) */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
