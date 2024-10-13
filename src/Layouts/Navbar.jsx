import PropTypes from "prop-types";
import { CgProfile } from "react-icons/cg";
import { FaBarsStaggered } from "react-icons/fa6";

const Navbar = ({ toggleSidebar, isOpen }) => {
  return (
    <nav className="bg-[#f0eee4] p-4 flex justify-between items-center">
      <div className="text-black text-2xl font-bold xl:pl-72 md:pl-72">Dashboard</div>
      <div className="hidden md:flex space-x-4">
        <CgProfile className="text-4xl cursor-pointer text-gray-600 hover:text-black transition-colors duration-500 hover:bg-gray-300 rounded-full" />
      </div>
      {/* Hamburger menu for smaller screens */}
      {!isOpen && (
        <div
          className="md:hidden text-gray-600 hover:text-black transition-colors duration-500 cursor-pointer"
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
