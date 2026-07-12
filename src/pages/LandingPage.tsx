import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Pocket Detective</h1>

      <p>Think Before You Click.</p>

      <button
        onClick={() => navigate("/upload")}
        style={{
          marginTop: "20px",
          padding: "12px 30px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "8px",
        }}
      >
        Start Investigation
      </button>
    </div>
  );
}

export default LandingPage;