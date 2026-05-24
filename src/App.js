import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotId from "./pages/ForgotId";
import VotePage from "./pages/VotePage";
import Admin from "./pages/Admin";

function App() {

  const userId = localStorage.getItem("userId");

  // 👑 YOUR ADMIN ID RULE
  const isAdmin = userId === "6a0ef59ab6ddf8a5a8aad7eb";

  // 👤 NORMAL USER
  const isUser = userId && !isAdmin;

  return (
    <BrowserRouter>
      <Routes>

        {/* 🔥 ROOT ROUTING */}
        <Route
          path="/"
          element={
            isAdmin
              ? <Navigate to="/admin" />
              : isUser
                ? <Navigate to="/vote" />
                : <LandingPage />
          }
        />

        {/* 🧾 REGISTER */}
        <Route
          path="/register"
          element={
            isAdmin
              ? <Navigate to="/admin" />
              : isUser
                ? <Navigate to="/vote" />
                : <Register />
          }
        />

        {/* 🔑 LOGIN */}
        <Route
          path="/login"
          element={
            isAdmin
              ? <Navigate to="/admin" />
              : isUser
                ? <Navigate to="/vote" />
                : <Login />
          }
        />

        {/* ❓ FORGOT ID */}
        <Route
          path="/forgot-id"
          element={
            isAdmin
              ? <Navigate to="/admin" />
              : isUser
                ? <Navigate to="/vote" />
                : <ForgotId />
          }
        />

        {/* 🗳️ VOTE PAGE */}
        <Route
          path="/vote"
          element={
            isUser
              ? <VotePage />
              : isAdmin
                ? <Navigate to="/admin" />
                : <Navigate to="/login" />
          }
        />

        {/* 👑 ADMIN PAGE */}
        <Route
          path="/admin"
          element={
            isAdmin
              ? <Admin />
              : <Navigate to="/login" />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}


export default App;