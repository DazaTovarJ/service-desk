import React, {useState} from "react";
import PropTypes from "prop-types";
import Input from "./Input";

const defaultForm = {
  email: "",
  password: "",
};

function LoginForm({setRegisterMode, signIn, setMessage}) {
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

    signIn(form.email, form.password);
  };

  return (
    <>
      <h3>Iniciar Sesión</h3>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          value={form.email}
          placeholder="Ingrese su correo"
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
          value={form.password}
          placeholder="Ingrese su contraseña"
          handleChange={handleChange}
          constraints={{required: true}}
        />
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            Ingresar
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setRegisterMode(true)}
          >
            ¿No tienes usuario?
          </button>
        </div>
      </form>
    </>
  );
}

LoginForm.propTypes = {
  setRegisterMode: PropTypes.func,
  signIn: PropTypes.func,
};

export default LoginForm;
