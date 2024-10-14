import PropTypes from "prop-types";

export default function Button({ handleButton, ButtonName }) {
  return (
    <button
      onClick={handleButton}
      className="border rounded-2xl transition-colors duration-500 w-32 h-10 bg-gray-200 hover:bg-white"
    >
      {ButtonName}
    </button>
  );
}

Button.propTypes = {
  handleButton: PropTypes.func.isRequired,
  ButtonName: PropTypes.string.isRequired,
};
