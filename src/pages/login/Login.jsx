import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/counter/apiCalls";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await login(dispatch, { username, password });
      toast.success("Login Successful!");
      navigate("/");
    } catch (error) {
      toast.error("Login Failed. Please try again.");
    }
  };

  return (
    <>
     <header className="landing__header">
        <div className="landing__logo">
          <Link to="/"><img src='logon.png' width={120} height={60} /></Link>
        </div>
        <nav className=
        {`landing__nav 
        ${menuOpen ? 'landing__nav--open' : ''}
        `}
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
    <div className="login">     
      <div className="login__box">
        <h2 className="login__title">Login</h2>
        <input
          className="login__input"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="login__input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login__button" onClick={handleClick}>
          Login
        </button>
        <p className="login__forgot" onClick={() => navigate('/forgot-password')}>Forgot Password?</p>
      </div>
      
    </div>
    <footer className="landing__footer">
        <p>© 2025 Nnadidan. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Login;