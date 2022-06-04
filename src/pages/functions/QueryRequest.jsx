import React, {useState, useEffect} from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import {nanoid} from "nanoid";
import {db} from "../../firebase";
import FormModal from "../../components/FormModal";
import Message from "../../components/Message";
import ServiceForm from "../../components/ServiceForm";
import Table from "../../components/Table";
import Loader from "../../components/Loader";
import {useModal} from "../../hooks/useModal";

const QueryRequest = ({user}) => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [, openModal, closeModal] = useModal(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await getDocs(collection(db, user.email));

        const services = data.docs.map((doc) => ({id: doc.id, ...doc.data()}));
        setRequests(services);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const insertData = async (data) => {
    try {
      const id = nanoid(4);
      await setDoc(doc(db, user.email, id), data);

      setRequests([...requests, {id, ...data}]);
      setMessage({
        type: "success",
        msg: "Datos insertados satisfactoriamente",
      });
    } catch {
      setMessage({
        type: "danger",
        msg: "Ocurrió un error al ingresar los datos",
      });
    }
  };

  const updateData = (data) => {
    let newData = requests.map((el) => (el.id === data.id ? data : el));
    setRequests(newData);
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
      {loading ? (
        <Loader />
      ) : (
        <>
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
            <ServiceForm
              editMode={editMode}
              insertRequest={insertData}
              updateRequest={updateData}
              setMessage={setMessage}
              closeModal={closeModal}
            />
          </FormModal>
        </>
      )}
    </div>
  );
};

export default QueryRequest;
