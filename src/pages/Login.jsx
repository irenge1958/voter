import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    try {

      const res = await axios.post(
        "https://votemachinebackend-hujp.vercel.app/api/users/login",
        formData
      );

console.log(res.data.user)
      // SAVE USER ID
      localStorage.setItem("userId", res.data.user._id);

      if (res.data.user) {
        window.location.reload(); // recharge la page actuelle
      }
    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Invalid email or password"
      );
    }
  };

  return (
    <div style={styles.page}>

      {/* NAVBAR */}
      <Navbar />

      <div style={styles.container}>

        <form
          onSubmit={handleLogin}
          style={styles.form}
        >

          <h1 style={styles.title}>
            Voter Login
          </h1>

          <p style={styles.subtitle}>
            Login to access the election portal
          </p>

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* ERROR MESSAGE */}
          {error && (
            <p style={styles.error}>
              {error}
            </p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            style={styles.button}
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background: "#f4f6f9",
    fontFamily: "Arial, sans-serif",
  },

  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
  },

  form: {
    background: "white",
    padding: "40px",
    borderRadius: "15px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
  },

  title: {
    textAlign: "center",
    color: "#0B3D91",
    marginBottom: "10px",
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: "30px",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "14px",
    background: "#0B3D91",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },

  error: {
    color: "red",
    marginBottom: "15px",
    textAlign: "center",
    fontSize: "14px",
  },
};

export default Login;