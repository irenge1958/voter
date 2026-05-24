import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Countdown from "../components/Countdown";

function VotePage() {

  const [user, setUser] = useState(null);
  const [votes, setVotes] = useState({});
  const [loading, setLoading] = useState(true);

  const candidates = [
    {
      name: "Candidate One",
      image: "/download.jfif",
    },
    {
      name: "Candidate Two",
      image: "/download (2).jfif",
    },
    {
      name: "Candidate Three",
      image: "/download (1).jfif",
    },
  ];

  const fetchData = async () => {

    const id = localStorage.getItem("userId");
console.log(id)
    try {
      const res = await axios.get(
        "https://votemachinebackend-hujp.vercel.app/api/users/all"
      );

      const allUsers = res.data;

      const currentUser = allUsers.find(u => u._id === id);
      setUser(currentUser);
      setLoading(false);

      const voteCount = {};

      allUsers.forEach(u => {
        if (u.votes) {
          voteCount[u.votes] = (voteCount[u.votes] || 0) + 1;
        }
      });

      setVotes(voteCount);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    fetchData();
  
    const interval = setInterval(() => {
  
      console.log("Updating after 5 minutes");
  
      fetchData();
  
    }, 300000);
  
    return () => clearInterval(interval);
  
  }, []);

  const handleVote = async (candidate) => {

    const id = localStorage.getItem("userId");

    try {
      await axios.put(
        `"https://votemachinebackend-hujp.vercel.app/api/users/vote/${id}`,
        { candidate }
      );

      alert(`You voted for ${candidate}`);

      fetchData();

    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  const isConfirmed = user?.voter === "confirmed";
  const hasVoted = user?.votes==='none'?false:true;
console.log(hasVoted)
  return (
    <div style={styles.page}>

      <Navbar />

      {/* GREETING */}
      <div style={styles.greeting}>
        <h2>Hello, {user?.name} 👋</h2>
      </div>

      {/* ❌ ONLY THIS TEXT IS CONDITIONALLY REMOVED */}
      {isConfirmed && !hasVoted && (
        <h1 style={styles.title}>
          Select Your Candidate
        </h1>
      )}

      {/* STATUS MESSAGES */}
      {!isConfirmed && (
        <div style={styles.warning}>
          ⚠️ Your account is not confirmed. You cannot vote.
        </div>
      )}

      {hasVoted && (
        <div style={styles.success}>
          ✅ You already voted for: <b>{user.votes}</b>
        </div>
      )}

      {/* CANDIDATES ALWAYS SHOWN */}
      <div style={styles.container}>

        {candidates.map((c, index) => (

          <div key={index} style={styles.card}>

            <img
              src={c.image}
              alt={c.name}
              style={styles.image}
            />

            <h3>{c.name}</h3>

            <p style={styles.voteCount}>
              Votes: {votes[c.name] || 0}
            </p>

            <button
              onClick={() => handleVote(c.name)}
              disabled={!isConfirmed || hasVoted}
              style={{
                ...styles.button,
                background: (!isConfirmed || hasVoted) ? "gray" : "#0B3D91",
                cursor: (!isConfirmed || hasVoted) ? "not-allowed" : "pointer",
              }}
            >
              Vote
            </button>

          </div>

        ))}

      </div>

      {/* COUNTDOWN AT BOTTOM */}
      <div style={styles.bottomCountdown}>
        <Countdown />
      </div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background: "#f4f6f9",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
  },

  greeting: {
    textAlign: "center",
   
    color: "#0B3D91",
  },

  title: {
    textAlign: "center",
    marginTop: "10px",
    color: "#333",
  },

  container: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
    marginTop: "20px",
    padding: "0 20px",
    flex: 1,
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    width: "250px",
  },

  image: {
    width: "200px",
    height: "200px",
    borderRadius: "10px",
    objectFit: "cover",
  },

  button: {
    marginTop: "10px",
    padding: "10px 20px",
    color: "white",
    border: "none",
    borderRadius: "8px",
    width: "100%",
  },

  voteCount: {
    marginTop: "10px",
    fontWeight: "bold",
    color: "#0B3D91",
  },

  warning: {
    background: "#fff3cd",
    color: "#856404",
    padding: "10px",
    margin: "10px auto",
    width: "80%",
    textAlign: "center",
    borderRadius: "8px",
  },

  success: {
    background: "#d4edda",
    color: "#155724",
    padding: "10px",
    margin: "10px auto",
    width: "80%",
    textAlign: "center",
    borderRadius: "8px",
  },

  bottomCountdown: {
    marginTop: "auto",
    padding: "20px",
    textAlign: "center",
    background: "#fff",
    borderTop: "1px solid #ddd",
    marginTop:"20px"
  },
};

export default VotePage;