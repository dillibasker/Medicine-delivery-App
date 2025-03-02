import { useState } from "react";
import { registerUser } from "../api";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", address: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(formData);
    alert("User Registered Successfully!");
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
      <input type="text" placeholder="Address" onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
