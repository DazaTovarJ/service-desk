import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import {auth, db} from "../firebase";
import Loader from "../components/Loader";
import LoginForm from "../components/LoginForm";
import Message from "../components/Message";
import RegisterForm from "../components/RegisterForm";

const Login = () => {
  const [registerMode, setRegisterMode] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signUp = async (email, password) => {
    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await setDoc(doc(db, "users", userCredential.user.email), {
        email: userCredential.user.email,
        id: userCredential.user.uid,
      });

      navigate("/service-desk/");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setMessage({
          type: "danger",
          message: "El correo especificado no es válido",
        });
      }

      if (error.code === "auth/email-already-in-use") {
        setMessage({type: "danger", msg: "El usuario ya existe"});
      }
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password);
      navigate("/service-desk/");
    } catch (error) {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setMessage({type: "danger", msg: "Credenciales incorrectas"});
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Ingreso al sistema</h2>
      {message && <Message setMessage={setMessage} {...message} />}
      {!registerMode ? (
        <LoginForm
          setRegisterMode={setRegisterMode}
          signIn={signIn}
          setMessage={setMessage}
        />
      ) : (
        <RegisterForm
          setRegisterMode={setRegisterMode}
          signUp={signUp}
          setMessage={setMessage}
        />
      )}
      {loading && <Loader />}
    </div>
  );
};

export default Login;
