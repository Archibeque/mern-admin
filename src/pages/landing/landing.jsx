import { useNavigate } from "react-router-dom";
import "./landing.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Fixed Header */}
      <header className="landing-header">
        <nav className="landing-nav">
          <a href="/landing" className="landing-logo">
            <span className="landing-logo-icon">
              <i className="landing-bowl-icon">🍜</i>
            </span>
            <span className="landing-logo-text">
              Nnadidan<span className="landing-logo-dot">.</span>
            </span>
          </a>
          <div className="landing-nav-actions">
            <button
              className="landing-btn landing-btn--outline"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="landing-btn landing-btn--primary"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
            <button
              className="landing-btn landing-btn--accent"
              onClick={() => navigate("/login?test=true")}
            >
              Test Login
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero-overlay" />
        <div className="landing-hero-content">
          <h1 className="landing-hero-title">Welcome to Nnadidan</h1>
          <p className="landing-hero-subtitle">Your admin platform</p>
          <div className="landing-hero-actions">
            <button
              className="landing-hero-btn landing-hero-btn--primary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="landing-hero-btn landing-hero-btn--ghost"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
            <button
              className="landing-hero-btn landing-hero-btn--accent"
              onClick={() => navigate("/login?test=true")}
            >
              Test Login
            </button>
          </div>
          <p className="landing-invite-note">Registration is by invitation only</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
