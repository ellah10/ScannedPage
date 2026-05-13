import { useState } from "react";
import './LoginAdmin.scss';
import LogoAvi from "../assets/AVi.jpg"

import {
  signInWithEmailAndPassword
} from "firebase/auth";

import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const LoginAdmin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err) {
      setError("Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-admin">

      <div className="login-card">

        <div className="login-logo">
          <img src={LogoAvi} alt="Logo" />
        </div>

        <p className="login-subtitle">Espace administration</p>

        <form onSubmit={handleLogin}>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="admin@avicenter.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Mot de passe</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="login-error">{error}</p>
          )}

          <button
            type="submit"
            className={loading ? "loading" : ""}
            disabled={loading}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default LoginAdmin;