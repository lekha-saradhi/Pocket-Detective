import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <h1>Pocket Detective 🕵️</h1>

      <p>Think Before You Click.</p>

      <Link to="/upload">
        <button>Get Started</button>
      </Link>
    </div>
  );
}