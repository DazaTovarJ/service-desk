import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

function FormModal({children, opened, closeModal, title}) {
  return ReactDOM.createPortal(
    <div
      className={`modal fade${opened ? " show" : ""}`}
      tabIndex="-1"
      id="form-modal"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-area"),
  );
}

FormModal.propTypes = {
  opened: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default FormModal;
