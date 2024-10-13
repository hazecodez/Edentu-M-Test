import PropTypes from "prop-types";
import { FaBarsStaggered } from "react-icons/fa6";


const Navbar = ({ toggleSidebar, isOpen }) => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-2xl font-bold">Admin Dashboard</div>
      <div className="hidden md:flex space-x-4">
        
      </div>
      {/* Hamburger menu for smaller screens */}
      {!isOpen && (
        <div
          className="md:hidden text-white cursor-pointer"
          onClick={toggleSidebar}
        >
          <FaBarsStaggered className="w-6 h-6" />
        </div>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Navbar;
