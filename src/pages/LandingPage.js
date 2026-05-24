import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function LandingPage() {
  const navigate = useNavigate();

  const registrationEnd = new Date("2026-06-30T23:59:59").getTime();
  const [isClosed, setIsClosed] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  /* COUNTDOWN */
  useEffect(() => {
    const check = setInterval(() => {
      const now = new Date().getTime();
      if (now >= registrationEnd) {
        setIsClosed(true);
        clearInterval(check);
      }
    }, 1000);

    return () => clearInterval(check);
  }, []);

  /* RESPONSIVE */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.logo}>
          Election Commission Portal
        </div>

        {isMobile && (
          <button
            style={styles.menuBtn}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        )}

        <nav
          style={{
            ...styles.nav,
            ...(isMobile ? styles.mobileNav : styles.desktopNav),
            ...(menuOpen && isMobile ? styles.showMenu : {}),
          }}
        >
          <a href="/" style={styles.link} onClick={() => setMenuOpen(false)}>Home</a>
          <a href="/register" style={styles.link} onClick={() => setMenuOpen(false)}>Register</a>
          <a href="/login" style={styles.link} onClick={() => setMenuOpen(false)}>Login</a>
        </nav>
      </header>

      {/* MAIN CARD */}
      <div style={styles.card}>

        <div style={styles.flagRow(isMobile)}>

          <img
            src="https://flagcdn.com/w320/lr.png"
            style={styles.flag(isMobile)}
            alt="Liberia"
          />

          <div style={styles.titleBlock}>
            <h1 style={styles.title}>
              Liberian Community Election Portal
            </h1>

            <p style={styles.subtitle}>
              Official digital voting system for Liberians in China. <br />
              Secure • Transparent • Verified
            </p>
          </div>

          <img
            src="https://flagcdn.com/w320/cn.png"
            style={styles.flag(isMobile)}
            alt="China"
          />
        </div>

        {/* INFO BOX */}
        <div style={styles.infoBox}>
          <h3>Important Notice</h3>
          <p>
            Only registered and confirmed voters are allowed to participate.
            Ensure your information is correct before voting.
          </p>
        </div>

        {/* BUTTON */}
        <button
          onClick={() => navigate("/register")}
          disabled={isClosed}
          style={{
            ...styles.button,
            background: isClosed ? "gray" : "#0B3D91",
            cursor: isClosed ? "not-allowed" : "pointer",
          }}
        >
          {isClosed ? "Registration Closed" : "Start Registration"}
        </button>
      </div>

      {/* FOOTER */}
      <footer style={styles.footer}>
        © 2026 Liberian Community Election System
      </footer>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {

  page: {
    minHeight: "100vh",
    background: "#f4f6f9",
    fontFamily: "Arial",
  },

  /* HEADER */
  header: {
    background: "#0B3D91",
    color: "white",
    padding: "15px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    position: "relative",
  },

  logo: {
    fontSize: "18px",
    fontWeight: "bold",
  },

  menuBtn: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "30px",
    cursor: "pointer",
  },

  nav: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },

  desktopNav: {
    display: "flex",
  },

  mobileNav: {
    display: "none",
    flexDirection: "column",
    width: "100%",
    marginTop: "10px",
    background: "#0B3D91",
    padding: "10px 0",
  },

  showMenu: {
    display: "flex",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    padding: "10px",
  },

  /* CARD */
  card: {
    maxWidth: "1000px",
    margin: "40px auto",
    background: "white",
    padding: "30px",
    borderRadius: "12px",
  },

  flagRow: (isMobile) => ({
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    textAlign: "center",
  }),

  flag: (isMobile) => ({
    width: isMobile ? "90px" : "120px",
    height: isMobile ? "60px" : "80px",
    objectFit: "cover",
    borderRadius: "8px",
  }),

  titleBlock: {
    flex: 1,
    textAlign: "center",
    minWidth: "200px",
  },

  title: {
    fontSize: "2rem",
    color: "#0B3D91",
  },

  subtitle: {
    color: "#555",
    fontSize: "1rem",
  },

  infoBox: {
    marginTop: "20px",
    padding: "15px",
    background: "#eef3ff",
    borderLeft: "5px solid #0B3D91",
  },

  button: {
    marginTop: "25px",
    width: "100%",
    padding: "15px",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
  },

  footer: {
    textAlign: "center",
    padding: "20px",
    color: "#777",
  },
};

export default LandingPage;