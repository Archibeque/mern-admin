import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/counter/apiCalls";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";
import PublicHeader from "../../components/publicHeader/publicHeader";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(dispatch, { username, password });
      toast.success("Login successful!");
      navigate("/");
    } catch {
      toast.error("Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        <PublicHeader />
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-info-box">
            <strong>Note:</strong> New accounts must be invited by an admin. Use  <strong>nnadidan:ready007</strong> to log in.
          </div>
        <h2>Sign In</h2>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} disabled={loading} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} disabled={loading} />
        <button onClick={handleLogin}>Login</button>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
    </>
  );
};

export default Login;
