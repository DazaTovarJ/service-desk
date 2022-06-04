import React, {useState} from "react";
import {Link} from "react-router-dom";
import FormModal from "../../components/FormModal";
import Message from "../../components/Message";
import ServiceForm from "../../components/ServiceForm";
import Table from "../../components/Table";
import {useModal} from "../../hooks/useModal";

const QueryRequest = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [, openModal, closeModal] = useModal(false);

  const createData = (data) => {
    setRequests([...requests, data]);
    setMessage({
      type: "success",
      msg: "Datos insertados satisfactoriamente",
    });
  };
  const deleteData = (id) => {
    let updatedData = requests.filter((user) => user.id !== id);

    setRequests(updatedData);
    setMessage({
      type: "success",
      msg: "Datos eliminados satisfactoriamente",
    });

    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  return (
    <div>
      <h2>Gestionar Solicitudes</h2>
      {message && <Message setMessage={setMessage} {...message} />}
      <Table data={requests} deleteData={deleteData} />
      <button
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#form-modal"
        onClick={openModal}
      >
        Agregar nueva solicitud
      </button>
      <FormModal
        title={editMode ? "Editar Solicitud" : "Agregar Solicitud"}
        closeModal={closeModal}
      >
        <ServiceForm insertRequest={createData} setMessage={setMessage} />
      </FormModal>
    </div>
  );
};

export default QueryRequest;
