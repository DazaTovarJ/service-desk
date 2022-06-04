import React from "react";
import PropTypes from "prop-types";

function TableRow({request, deleteData, setQuestion, openModal, closeModal}) {
  const handleDelete = () => {
    setQuestion({
      question: `¿Está seguro de que desea eliminar la petición ${request.id}?`,
      handleConfirm() {
        deleteData(request.id);
        closeModal();
      },
    });
    openModal();
  };

  return (
    <tr>
      <td>{request.id}</td>
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
  setQuestion: PropTypes.func,
};

export default TableRow;
