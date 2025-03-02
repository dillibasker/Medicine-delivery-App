import "./home.css"
const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-heading">Get Medicines Delivered Instantly to Your Doorstep!</h1>
      <h2 className="home-subheading">Safe, Fast, and Reliable Medicine Delivery – Anytime, Anywhere.</h2>

      <div className="features-container">
        <p className="features-title">🚚 Why Choose Our Service?</p>
        <ul className="features-list">
          <li>🔍 <strong>Easy Search:</strong> Find medicines quickly by name or category.</li>
          <li>📦 <strong>Real-Time Tracking:</strong> Track your order live until it reaches your doorstep.</li>
          <li>💳 <strong>Secure Payments:</strong> Multiple payment options with end-to-end encryption.</li>
          <li>🏥 <strong>Verified Pharmacies:</strong> Only trusted vendors and certified pharmacies.</li>
          <li>📍 <strong>Location-Based Delivery:</strong> Fast delivery from nearby pharmacies.</li>
          <li>📊 <strong>Order History:</strong> Quick reorders with saved prescriptions.</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
