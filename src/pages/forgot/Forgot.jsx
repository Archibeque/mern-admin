import { useState } from "react";
import { toast } from "react-toastify";
import { publicRequest } from "../../requestMethods";
import PublicHeader from "../../components/publicHeader/publicHeader";
import "./forgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email.");
    setLoading(true);
    try {
      await publicRequest.post("/auth/forgot-password", { email });
      toast.success("Password reset link sent! Check your email.");
    } catch {
      toast.error("Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PublicHeader />
      <div className="forgot">
        <div className="forgot__box">
          <h2 className="forgot__title">Forgot Password</h2>
          <input
            className="forgot__input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="forgot__button"
            onClick={handleReset}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
