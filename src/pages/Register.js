import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    city: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      const res = await axios.post(
        "https://votemachinebackend-hujp.vercel.app/api/users/register",
        formData
      );

      localStorage.setItem("userId", res.data._id);

      if (res.data) {
        window.location.reload(); // recharge la page actuelle
      }

    } catch (error) {
      console.log(error);
      alert("Registration failed");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>

      {/* NAVBAR */}
      <Navbar />

      {/* CONTENT */}
      <div style={styles.container}>

        {/* LEFT SIDE */}
        <div style={styles.leftSection}>

          <h1 style={styles.title}>
            Register For The Election
          </h1>

          <p style={styles.description}>
            Join the official Liberian Community Election in China.
            Register securely and participate in shaping the future leadership
            of the community.
          </p>

          <img
            src="https://flagcdn.com/w320/lr.png"
            alt="Liberia Flag"
            style={styles.flag}
          />

        </div>

        {/* RIGHT SIDE */}
        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >

          <h2 style={styles.formTitle}>
            Voter Registration
          </h2>

          <input
            type="text"
            name="name"
            placeholder="First Name"
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="surname"
            placeholder="Surname"
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
  type="password"
  name="password"
  placeholder="Password"
  onChange={handleChange}
  style={styles.input}
  required
/>
          <button
            type="submit"
            style={styles.button}
          >
            {loading ? "Registering..." : "Continue to Vote"}
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
    gap: "50px",
    padding: "20px 20px",
    flexWrap: "wrap",
  },

  leftSection: {
    flex: 1,
    minWidth: "300px",
    maxWidth: "500px",
  },

  title: {
    fontSize: "2.5rem",
    color: "#0B3D91",
    marginBottom: "20px",
  },

  description: {
    fontSize: "1.1rem",
    color: "#555",
    lineHeight: "1.7",
    marginBottom: "30px",
  },

  flag: {
    width: "200px",
    borderRadius: "10px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
  },

  form: {
    background: "white",
    padding: "40px",
    borderRadius: "20px",
    width: "400px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
  },

  formTitle: {
    marginBottom: "25px",
    color: "#0B3D91",
    textAlign: "center",
  },

  input: {
    padding: "15px",
    marginBottom: "20px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    outline: "none",
  },

  button: {
    background: "#0B3D91",
    color: "white",
    padding: "15px",
    border: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },

};

export default Register;