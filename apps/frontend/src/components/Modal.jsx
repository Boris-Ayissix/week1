import PropTypes from 'prop-types';

export const Modal = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div style={{ position: "fixed", top: 0, left: 0 }}>
      <div>
        <h2>{type} Modal</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  type: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};