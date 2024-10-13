import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { TiWeatherPartlySunny } from "react-icons/ti";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed inset-0 bg-gray-800 text-white w-64 p-6 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
    >
      {/* Close button for mobile */}
      <button
        className="absolute top-4 right-4 md:hidden"
        onClick={toggleSidebar}
      >
        <FaTimes className="w-6 h-6 text-white" />
      </button>
      <ul className="space-y-6 mt-10">
        <li className="flex gap-6">
          <GoHomeFill className="text-2xl" />
          <a href="#" className="block">
            Users
          </a>
        </li>
        <li className="flex gap-6">
          <TiWeatherPartlySunny className="text-2xl" />
          <a href="#" className="block">
            Weather
          </a>
        </li>
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
