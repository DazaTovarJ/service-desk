import React from "react";
import PropTypes from "prop-types";

function TableRow({
  request,
  setDataToUpdate,
  deleteData,
  setQuestion,
  openModal,
  closeModal,
}) {
  const handleEdit = () => {
    setDataToUpdate(request);
    openModal();
  };

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
        <div className="btn-group-vertical">
          <button
            type="button"
            className="btn btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#form-modal"
            onClick={handleEdit}
          >
            Editar
          </button>
          <button
            type="button"
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#info-modal"
            onClick={handleDelete}
          >
            Eliminar
          </button>
        </div>
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
