import React from "react";
import PropTypes from "prop-types";

function TableRow({ user, deleteData, setModal }) {
  const { id, nombre, apellido, correo, curso, tipo } = user;

  const handleDelete = () => {
    setModal({
      type: "confirmation",
      msg: `¿Está seguro de que desea eliminar el usuario con id ${id}?`,
      handleClick: function () {
        deleteData(id);
      },
    });
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{nombre}</td>
      <td>{apellido}</td>
      <td>{correo}</td>
      <td>{curso}</td>
      <td>{tipo}</td>
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
  user: PropTypes.object.isRequired,
  deleteData: PropTypes.func,
  message: PropTypes.object,
  setModal: PropTypes.func,
};

export default TableRow;
