import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerAdmin } from "../../features/counter/apiCalls";
import "./Register.css";
import PublicHeader from "../../components/publicHeader/publicHeader";

const RegisterForm = ({token}) => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerAdmin({ username,firstname,lastname, email, password, token});
      toast.success("Registration Successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Registration Failed. Please try again.");
    }
  };

  return (
    <>
    <PublicHeader />
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account</h2>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="text" placeholder="firstname" onChange={(e) => setFirstname(e.target.value)} />
        <input type="text" placeholder="lastname" onChange={(e) => setLastname(e.target.value)} />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleRegister}>Sign Up</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
    </>

  );
};

export default RegisterForm;
