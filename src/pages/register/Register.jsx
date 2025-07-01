import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import { publicRequest } from "../../requestMethods";

const RegisterAdmin = () => {
  const [validToken, setValidToken] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const token = new URLSearchParams(location.search).get("token");
  console.log(token)

  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = await publicRequest.get(`/auth/validate-invite?token=${token}`);
        if (res.data.valid) setValidToken(true);
        else navigate("/login");
      } catch (error){
        console.error("🔴 Token validation failed:", error);
        navigate("/login");
      }
    };
    validateToken();
  }, [token, navigate]);

  return validToken ? <RegisterForm token={token} /> : null;
};


export default RegisterAdmin;