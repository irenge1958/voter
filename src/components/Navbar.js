import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const id = localStorage.getItem("userId");

  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Detect screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header style={styles.header}>
      <div style={styles.logo}>Election Commission Portal</div>

      {!id && (
        <>
          {/* Mobile Hamburger */}
          {isMobile && (
            <button
              style={styles.menuBtn}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          )}

          {/* Navigation */}
          <nav
            style={{
              ...styles.nav,
              ...(isMobile ? styles.mobileNav : styles.desktopNav),
              ...(menuOpen && isMobile ? styles.showMobileMenu : {}),
            }}
          >
            <Link to="/" style={styles.link}>
              Home
            </Link>

            <Link to="/register" style={styles.link}>
              Register
            </Link>

            <Link to="/login" style={styles.link}>
              Login
            </Link>
          </nav>
        </>
      )}
    </header>
  );
}

const styles = {
  header: {
    background: "#0B3D91",
    color: "white",
    padding: "15px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    flexWrap: "wrap",
  },

  logo: {
    fontSize: "20px",
    fontWeight: "bold",
  },

  /* Desktop Navigation */
  desktopNav: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },

  /* Mobile Navigation */
  mobileNav: {
    display: "none",
    flexDirection: "column",
    width: "100%",
    background: "#0B3D91",
    marginTop: "15px",
    padding: "10px 0",
  },

  showMobileMenu: {
    display: "flex",
  },

  menuBtn: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "30px",
    cursor: "pointer",
  },

  nav: {},

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    padding: "10px",
  },
};

export default Navbar;