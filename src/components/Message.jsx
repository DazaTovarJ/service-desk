import React from "react";
import PropTypes from "prop-types";

function Message({ setMessage, type, msg }) {
  return (
    <div className={`alert alert-${type} ${!msg ? "d-none" : ""}`} role="alert">
      {msg}
      <button
        type="button"
        className="btn-close"
        aria-label="Cerrar"
        onClick={() => setMessage(null)}
      ></button>
    </div>
  );
}

Message.propTypes = {
  setMessage: PropTypes.func,
  type: PropTypes.string,
  msg: PropTypes.string,
};

export default Message;
