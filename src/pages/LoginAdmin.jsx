import { useState } from "react";
import './LoginAdmin.scss'
import {
  signInWithEmailAndPassword
} from "firebase/auth";

import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const LoginAdmin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/admin");

    } catch (error) {

      alert("Email ou mot de passe incorrect");
    }
  };

  return (

    <div className="login-admin">

      <form onSubmit={handleLogin}>

        <h1>Admin Login</h1>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Connexion
        </button>

      </form>

    </div>
  );
};

export default LoginAdmin;