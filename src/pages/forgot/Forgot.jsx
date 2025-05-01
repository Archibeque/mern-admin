import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./forgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    // TODO: Integrate API for reset link
    if (!email) {
      toast.error("Please enter your email.");
    } else {
      toast.success("Password reset link sent (mock).");
    }
  };

  return (
    <div className="forgot">
     <header className="landing__header">
        <div className="landing__logo">
          <Link to="/"><img src='logon.png' width={120} height={60} /></Link>
        </div>
        <nav className="landing__nav"
        // {`landing__nav 
        // ${menuOpen ? 'landing__nav--open' : ''}
        // `}
        >
          
        </nav>

        <div className="landing__auth">
          <button className="landing__login" onClick={() => navigate('/login')}>Log in</button>
          <button className="landing__signup" onClick={() => navigate('/register')}>Sign up</button>
        </div>

        <div className="landing__hamburger" 
        // onClick={toggleMenu}
        >
          <span className="landing__bar"></span>
          <span className="landing__bar"></span>
          <span className="landing__bar"></span>
        </div>
      </header>

      <div className="forgot__box">
        <h2 className="forgot__title">Forgot Password</h2>
        <input
          className="forgot__input"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="forgot__button" onClick={handleReset}>
          Send Reset Link
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
