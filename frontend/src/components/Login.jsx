import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../css/login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5076/api/Account/login",
        {
          email,
          password,
        }
      );
      let res = response.data;
      sessionStorage.setItem("userId", res);
      console.log(res);
      navigate("/test");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="center">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="txt_field">
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span></span>
          <label>Email</label>
        </div>
        <div className="txt_field">
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <span></span>
          <label>Password</label>
        </div>
        <input type="submit" value="Login" />
        <div className="signup_link">
          Not a member? <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
