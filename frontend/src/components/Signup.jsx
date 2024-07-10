import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../css/login.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5076/api/Account/signup",
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
      setError("Error creating account");
    }
  };

  return (
    <div className="center">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="txt_field">
          <input
            type="email"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span></span>
          <label>Password:</label>
        </div>
        <input type="submit" value="Register" />
        <div className="signup_link">
          Already Registered? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
