import React, {useState} from "react";
import PropTypes from "prop-types";
import TableRow from "./TableRow";
import QuestionModal from "./QuestionModal";
import {useModal} from "../hooks/useModal";

function Table({data, deleteData}) {
  const [opened, openModal, closeModal] = useModal(false);
  const [question, setQuestion] = useState({question: ""});

  let renderData = null;

  if (data.length === 0) {
    renderData = <p>No hay datos para mostrar. Crea un registro</p>;
  } else {
    renderData = (
      <>
        <QuestionModal title="Confirmación" {...question} />
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Id</th>
                <th>Categoría</th>
                <th>Servicio</th>
                <th>Descripción</th>
                <th>Área</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((request) => (
                <TableRow
                  key={request.id}
                  request={request}
                  deleteData={deleteData}
                  setQuestion={setQuestion}
                  openModal={openModal}
                  closeModal={closeModal}
                />
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
  return (
    <div className="col-sm-12 col-lg-9">
      <h2>Información de usuario</h2>
      {renderData}
    </div>
  );
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteData: PropTypes.func,
};

export default Table;
