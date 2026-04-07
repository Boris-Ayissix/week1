import PropTypes from 'prop-types';
import { useEffect } from "react";
import { trackEvent } from "../../src/utils/analytics";

export const Modal = ({ type, onClose }) => {
  useEffect(() => {
    if (type) {
      trackEvent("modal_open", { type });
    }
  }, [type]);

  // 🔴 CRITICAL: Strict condition
  if (type === null) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => {
          console.log("Backdrop clicked");
          onClose();
        }}
      />

      {/* MODAL CONTENT */}
      <div className="relative bg-white p-6 rounded-xl w-full max-w-md z-10">
        <h2 className="text-xl font-semibold mb-4">
          {type} Modal
        </h2>

        <button
          onClick={() => {
            console.log("Close button clicked");
            onClose();
          }}
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default Modal;

Modal.propTypes = {
  type: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};