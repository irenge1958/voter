import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {

  const [users, setUsers] = useState([]);
  const [city, setCity] = useState("");
  const [filtered, setFiltered] = useState([]);

  // GET ALL USERS
  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://votemachinebackend-hujp.vercel.app/api/users/all");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // DELETE USER
  const deleteUser = async (id) => {
    await axios.delete(`https://votemachinebackend-hujp.vercel.app/api/users/delete/${id}`);
    fetchUsers();
  };

  // CONFIRM ALL USERS
  const confirmAll = async () => {
    await axios.put("https://votemachinebackend-hujp.vercel.app/api/users/confirm-all");
    fetchUsers();
  };

  // CONFIRM BY CITY
  const confirmByCity = async () => {
    if (!city) return alert("Enter a city");

    await axios.put(
      `https://votemachinebackend-hujp.vercel.app/api/users/confirm-city/${city}`
    );

    fetchUsers();
    setCity("");
  };

  // FILTER BY CITY
  const filterByCity = async () => {
    if (!city) return setFiltered([]);

    const res = await axios.get(
      `https://votemachinebackend-hujp.vercel.app/api/users/city/${city}`
    );

    setFiltered(res.data);
  };

  // PRINT USERS
  const printUsers = () => {
    window.print();
  };

  const displayUsers = filtered.length > 0 ? filtered : users;

  return (
    <div style={styles.page}>

      <h1 style={styles.title}>Admin Dashboard</h1>

      {/* ACTIONS */}
      <div style={styles.actions}>

        <button onClick={confirmAll} style={styles.btnBlue}>
          Confirm ALL Users
        </button>

        <button onClick={printUsers} style={styles.btnGray}>
          Print Users
        </button>

      </div>

      {/* CITY ACTIONS */}
      <div style={styles.cityBox}>

        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          style={styles.input}
        />

        <button onClick={filterByCity} style={styles.btnSmall}>
          Filter
        </button>

        <button onClick={confirmByCity} style={styles.btnGreen}>
          Confirm City
        </button>

      </div>

      {/* TABLE */}
      <table style={styles.table}>

        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Surname</th>
            <th style={styles.th}>City</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Vote</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {displayUsers.map((u) => (
            <tr key={u._id}>

              <td style={styles.td}>{u.name}</td>
              <td style={styles.td}>{u.surname}</td>
              <td style={styles.td}>{u.city}</td>

              <td style={styles.td}>
                <span style={{
                  color: u.voter === "confirmed" ? "green" : "red",
                  fontWeight: "bold"
                }}>
                  {u.voter}
                </span>
              </td>

              <td style={styles.td}>
                {u.votes || "Not voted"}
              </td>

              <td style={styles.td}>
                <button
                  onClick={() => deleteUser(u._id)}
                  style={styles.btnDanger}
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

const styles = {

  page: {
    padding: "30px",
    fontFamily: "Arial",
    background: "#f4f6f9",
    minHeight: "100vh",
  },

  title: {
    textAlign: "center",
    color: "#0B3D91",
    marginBottom: "20px",
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    justifyContent: "center",
  },

  cityBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    justifyContent: "center",
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  table: {
    width: "100%",
    background: "white",
    borderCollapse: "collapse",
    border: "1px solid #ddd",
  },

  th: {
    border: "1px solid #ddd",
    padding: "12px",
    background: "#0B3D91",
    color: "white",
    textAlign: "left",
  },

  td: {
    border: "1px solid #ddd",
    padding: "12px",
  },

  btnBlue: {
    background: "#0B3D91",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  btnGreen: {
    background: "green",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  btnGray: {
    background: "gray",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  btnSmall: {
    background: "#555",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  btnDanger: {
    background: "red",
    color: "white",
    padding: "6px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Admin;