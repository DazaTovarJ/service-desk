import React, {useState} from "react";
import PropTypes from "prop-types";
import Input from "./Input";

const defaultForm = {
  email: "",
  password: "",
};

function RegisterForm({setRegisterMode, signUp, setMessage}) {
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
    signUp(form.email, form.password);

    setForm(defaultForm);
  };

  return (
    <>
      <h3>Registrar</h3>
      <form onSubmit={handleSubmit} noValidate>
        <Input
          type="email"
          name="email"
          placeholder="Ingrese su correo"
          value={form.email}
          handleChange={handleChange}
          constraints={{
            pattern:
              "[a-zA-Z0-9!#$%&'*_+-]([.]?[a-zA-Z0-9!#$%&'*_+-])+@[a-zA-Z0-9]([^@&%$/()=?¿!.,:;]|d)+[a-zA-Z0-9][.][a-zA-Z]{2,4}([.][a-zA-Z]{2})?",
            required: true,
          }}
        />
        <Input
          type="password"
          name="password"
          placeholder="Ingrese su contraseña"
          value={form.password}
          handleChange={handleChange}
          constraints={{minLength: 6, required: true}}
        />
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            Registrarse
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setRegisterMode(false)}
          >
            ¿Tienes Usuario?
          </button>
        </div>
      </form>
    </>
  );
}

RegisterForm.propTypes = {
  setRegisterMode: PropTypes.func,
  signUp: PropTypes.func,
};

export default RegisterForm;
