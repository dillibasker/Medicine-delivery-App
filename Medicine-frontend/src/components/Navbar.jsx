import { Link } from "react-router-dom";
import "./Nav.css"
const Navbar = () => {
  return (
    <nav>
      <div className="nav-heading">Medicine App</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/medicines">Medicines</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/tracking">Login</Link>
        
      </div>
    </nav>
  );
};

export default Navbar;
