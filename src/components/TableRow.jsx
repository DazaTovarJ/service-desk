import React from "react";
import PropTypes from "prop-types";

function TableRow({request, deleteData, setModal}) {
  const handleDelete = () => {
    setModal({
      type: "confirmation",
      msg: `¿Está seguro de que desea eliminar la solicitud con id ${request.id}?`,
      handleClick: function () {
        deleteData(request.id);
      },
    });
  };

  return (
    <tr>
      {/* <td>{request.id}</td> */}
      <td>{request.category}</td>
      <td>{request.service_type}</td>
      <td>{request.description}</td>
      <td>{request.location}</td>
      <td>{request.date}</td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#info-modal"
          onClick={handleDelete}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}

TableRow.propTypes = {
  request: PropTypes.object.isRequired,
  deleteData: PropTypes.func,
  message: PropTypes.object,
  setModal: PropTypes.func,
};

export default TableRow;
