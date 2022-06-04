import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

function QuestionModal({title, question, opened, closeModal, handleConfirm}) {
  return ReactDOM.createPortal(
    <div
      className={`modal fade${opened ? " show" : ""}`}
      tabIndex="-1"
      id="info-modal"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">{question}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={closeModal}
            >
              No
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={handleConfirm}
            >
              Sí
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-area"),
  );
}

QuestionModal.propTypes = {
  title: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  opened: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default QuestionModal;
