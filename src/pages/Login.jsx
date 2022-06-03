import React, {useState} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {addDoc, collection, doc, setDoc} from "firebase/firestore";
import Loader from "../components/Loader";
import LoginForm from "../components/LoginForm";
import Message from "../components/Message";
import RegisterForm from "../components/RegisterForm";
import {auth, db} from "../firebase";

const Login = () => {
  const [registerMode, setRegisterMode] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

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

      await addDoc(collection(db, userCredential.user.email), {});

      setMessage({type: "success", msg: "Usuario registrado exitosamente"});
      // navigate("/admin");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setMessage({
          type: "danger",
          message: "El correo especificado no es válido",
        });
      }

      if (error.code === "auth/email-already-in-use") {
        setMessage({type: "danger", message: "El usuario ya existe"});
      }
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password);
      setMessage({type: "success", msg: "Inicio de sesión exitoso"});
      // navigate("/admin");
    } catch (error) {
      console.error(error.code);
      console.error(error.message);

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
      {message && <Message />}
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
