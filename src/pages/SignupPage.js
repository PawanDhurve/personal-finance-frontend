import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaGoogle, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import "./SignUpLogin.css";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const url = isSignup
        ? "http://localhost:5000/api/auth/signup"
        : "http://localhost:5000/api/auth/login";

      const res = await axios.post(url, formData);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        navigate(isSignup ? "/select-avatar" : "/dashboard");
      }
    } catch (error) {
      console.error("Authentication failed", error);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      window.location.href = `http://localhost:5000/api/auth/${provider}`;
    } catch (error) {
      console.error("Social login failed", error);
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-box ${isSignup ? "" : "slide"}`}>
        {/* Left Side (Greeting) */}
        <motion.div className="auth-left" animate={{ x: isSignup ? 0 : "100%" }} transition={{ duration: 0.5 }}>
          <h2>{isSignup ? "Hello, Welcome!" : "Hi, Welcome Back!"}</h2>
          <p>{isSignup ? "Already have an account?" : "Don't have an account?"}</p>
          <button onClick={() => setIsSignup(!isSignup)}>{isSignup ? "Login" : "Sign Up"}</button>
        </motion.div>

        {/* Right Side (Form) */}
        <motion.div className="auth-right" animate={{ x: isSignup ? 0 : "-100%" }} transition={{ duration: 0.5 }}>
          <h2>{isSignup ? "Sign Up" : "Login"}</h2>
          <form onSubmit={handleAuth}>
            {isSignup && (
              <input
                type="text"
                placeholder="Username"
                required
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            )}
            <input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
          </form>
          {/* Social Media Login */}
          <div className="social-icons">
            <FaGoogle onClick={() => handleSocialLogin("google")} />
            <FaFacebook onClick={() => handleSocialLogin("facebook")} />
            <FaLinkedin onClick={() => handleSocialLogin("linkedin")} />
            <FaTwitter onClick={() => handleSocialLogin("twitter")} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;