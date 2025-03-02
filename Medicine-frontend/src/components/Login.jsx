import { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Common CSS for both Login and Signup
import "./Register";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }
    try {
      const res = await loginUser(formData);
      localStorage.setItem("token", res.data.token);
      alert("Login Successful!");
      navigate("/medicines");
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="signup-container">
      <h2>LOGIN</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="#" onClick={() => navigate("/register")}>Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
