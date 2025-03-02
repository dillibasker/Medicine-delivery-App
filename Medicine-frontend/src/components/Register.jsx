import { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Assuming you move CSS to a separate file

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", address: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.address) {
      setError("All fields are required.");
      return;
    }
    try {
      await registerUser(formData);
      alert("Signup successful!");
      navigate("/medicines");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h2>SIGN UP</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
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
        <input
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="#" onClick={() => navigate("/login")}>Login</a>
      </p>
    </div>
  );
};

export default Register;
