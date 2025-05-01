import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //const handleRegister = async (e) => {
    //e.preventDefault();
    //try {
      //await registerUser(dispatch, { username, email, password });
      //toast.success("Registration Successful!");
      //navigate("/login");
    //} catch (error) {
      //toast.error("Registration Failed. Please try again.");
    //}
  //};

  return (
    <>
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
    <div className="register">  
      <div className="register__box">
        <h2 className="register__title">Sign Up</h2>
        <input
          className="register__input"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="register__input"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="register__input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="register__button" 
        //onClick={handleRegister}
        >
          Sign Up
        </button>
      </div>
      
    </div>
    <footer className="landing__footer">
        <p>© 2025 Nnadidan. All rights reserved.</p>
      </footer>
    </>

  );
};

export default Register;