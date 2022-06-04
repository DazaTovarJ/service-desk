import React, {useState, useEffect} from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
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

const Requests = ({user}) => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState(null);
  const [dataToUpdate, setDataToUpdate] = useState(null);
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
  }, [user.email]);

  const insertData = async (data) => {
    try {
      const id = nanoid(4);
      await setDoc(doc(db, user.email, id), data);

      setRequests([...requests, {id, ...data}]);
      setMessage({
        type: "success",
        msg: "Datos insertados satisfactoriamente",
      });
    } catch (error) {
      setMessage({
        type: "danger",
        msg: "Ocurrió un error al ingresar los datos",
      });
    }
  };

  const updateData = async (data) => {
    try {
      const dataRef = doc(db, user.email, data.id);

      await updateDoc(dataRef, {
        category: data.category,
        service_type: data.service_type,
        description: data.description,
        location: data.location,
        date: data.date,
      });
      let newData = requests.map((request) =>
        request.id === data.id ? data : request,
      );
      setRequests(newData);
      setMessage({
        type: "success",
        msg: "Datos actualizados satisfactoriamente",
      });
    } catch (error) {
      setMessage({
        type: "danger",
        msg: "Ocurrió un error al actualizar los datos",
      });
    }
  };

  const deleteData = async (id) => {
    try {
      await deleteDoc(doc(db, user.email, id));
      let updatedData = requests.filter((request) => request.id !== id);

      setRequests(updatedData);
      setMessage({
        type: "info",
        msg: "Datos eliminados satisfactoriamente",
      });
    } catch (error) {
      setMessage({
        type: "success",
        msg: "Ocurrió un error al intentar eliminar los datos",
      });
    }
  };

  return (
    <div>
      <h2>Gestionar Solicitudes</h2>
      {message && <Message setMessage={setMessage} {...message} />}
      {loading ? (
        <Loader />
      ) : (
        <>
          <Table
            data={requests}
            setDataToUpdate={setDataToUpdate}
            deleteData={deleteData}
          />
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#form-modal"
            onClick={() => {
              if (dataToUpdate != null) {
                setDataToUpdate(null);
              }
              openModal();
            }}
          >
            Agregar nueva solicitud
          </button>
          <FormModal
            title={dataToUpdate ? "Editar Solicitud" : "Agregar Solicitud"}
            closeModal={closeModal}
          >
            <ServiceForm
              data={dataToUpdate}
              setData={setDataToUpdate}
              insertRequest={insertData}
              updateRequest={updateData}
              closeModal={closeModal}
            />
          </FormModal>
        </>
      )}
    </div>
  );
};

export default Requests;
