import { Link, useNavigate } from "react-router-dom";
import "./publicHeader.css";

const PublicHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="public-header">
      <div className="public-header__logo">
        <Link to="/"><img src="/logon.png" alt="Logo" height={40} /></Link>
      </div>
      <div className="public-header__nav">
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/register")}>Register</button>
      </div>
    </header>
  );
};

export default PublicHeader;
