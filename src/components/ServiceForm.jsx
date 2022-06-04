import React, {useState} from "react";
import Input from "./Input";

const dateFormat = (date) => {
  const offset = date.getTimezoneOffset();

  date = new Date(date.getTime() - offset * 60 * 1000);

  return date.toISOString().split(["T"])[0];
};

const defaultForm = {
  category: "",
  service_type: "",
  description: "",
  location: "",
  date: dateFormat(new Date()),
};

const categories = [
  "Mantenimiento Inmuebles",
  "Mantenimiento Muebles",
  "Servicios",
];
const propertyServices = [
  "Baños",
  "Cielo Raso",
  "Eléctrico",
  "Pared",
  "Puerta",
];
const furnitureServices = [
  "Aire acondicionado",
  "Archivador",
  "Puesto de trabajo",
  "Silla",
];
const generalServices = ["Aseo", "Transporte", "Vigilancia"];

const loadServices = (option) => {
  if (option === categories[0]) {
    return propertyServices;
  }
  if (option === categories[1]) {
    return furnitureServices;
  }
  if (option === categories[2]) {
    return generalServices;
  }

  return [];
};

const ServiceForm = ({editMode, insertRequest, updateRequest, setMessage}) => {
  const [form, setForm] = useState(defaultForm);

  const handleChange = (e) => {
    const {name, value} = e.target;

    setForm({...form, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      setMessage({type: "danger", msg: "Campos requeridos"});
      return;
    }

    setMessage(null);
    insertRequest(form);

    setForm(defaultForm);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Input
        type="select"
        name="category"
        value={form.category}
        label="Categoría"
        data={categories}
        handleChange={handleChange}
        constraints={{required: true}}
      />
      <Input
        type="select"
        name="service_type"
        value={form.service_type}
        label="Tipo de servicio"
        data={loadServices(form.category)}
        handleChange={handleChange}
        constraints={{required: true}}
      />
      <Input
        type="textarea"
        name="description"
        value={form.description}
        label="Descripción"
        placeholder="Ej. Se dañó el aire acondicionado en..."
        handleChange={handleChange}
        constraints={{required: true}}
      />
      <Input
        name="location"
        value={form.location}
        label="Ubicación en la empresa"
        placeholder="Ej. Sistemas"
        handleChange={handleChange}
        constraints={{required: true}}
      />
      <Input
        type="date"
        name="date"
        value={form.date}
        label="Fecha de mantenimiento"
        placeholder="Ej. Sistemas"
        handleChange={handleChange}
        constraints={{required: true}}
      />
      <div className="d-grid gap-2">
        <button type="reset" className="btn btn-primary">
          Limpiar
        </button>
        <button type="submit" className="btn btn-secondary">
          Enviar
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;
