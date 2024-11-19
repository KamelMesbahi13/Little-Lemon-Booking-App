import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out bg-black bg-opacity-50 md:p-12">
      <div className="relative z-10 w-full max-w-lg p-6 transition-transform duration-300 ease-in-out transform bg-white rounded-lg shadow-lg md:p-12">
        <button
          className="absolute mt-4 text-gray-600 transition duration-200 top-4 right-4 hover:text-red-600"
          onClick={onClose}
          aria-label="Close Modal"
        >
          <FaTimes size={24} />
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

// Add PropTypes validation
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
