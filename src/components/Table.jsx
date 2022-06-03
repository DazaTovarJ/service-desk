import React, { useState } from "react";
import PropTypes from "prop-types";
import TableRow from "./TableRow";
import Modal from "./Modal";

function Table({ data, deleteData }) {
  const [modal, setModal] = useState(null);

  let renderData = null;

  if (data.length === 0) {
    renderData = <p>No hay datos para mostrar. Crea un registro</p>;
  } else {
    renderData = (
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Curso</th>
            <th>Tipo de usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => (
            <TableRow
              key={user.id}
              user={user}
              deleteData={deleteData}
              setModal={setModal}
            />
          ))}
        </tbody>
      </table>
    );
  }
  return (
    <div className="col-sm-12 col-lg-9">
      <h2>Información de usuario</h2>
      <div className="table-responsive">{renderData}</div>
      {data.length > 0 && <Modal {...modal} />}
    </div>
  );
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteData: PropTypes.func,
};

export default Table;
