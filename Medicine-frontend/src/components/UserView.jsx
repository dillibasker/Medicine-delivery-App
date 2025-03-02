import MapComponent from "./MapComponent";

const UserView = () => {
  return (
    <div>
      <h2>Track Your Order</h2>
      <MapComponent userType="user" />
    </div>
  );
};

export default UserView;
