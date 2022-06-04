import React, {useState} from "react";
import PropTypes from "prop-types";
import TableRow from "./TableRow";
import QuestionModal from "./QuestionModal";
import {useModal} from "../hooks/useModal";

function Table({data, setDataToUpdate, deleteData}) {
  const [, openModal, closeModal] = useModal(false);
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
                  setDataToUpdate={setDataToUpdate}
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
    <>
      <h3>Información de servicios</h3>
      {renderData}
    </>
  );
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteData: PropTypes.func,
};

export default Table;
