import React from "react";
import "../App.css";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const history = useHistory();
  const [logout, setLogout] = React.useState(false);

  React.useEffect(() => {
    if (!localStorage.getItem("auth")) history.push("/login");
  }, [logout]);

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("auth");
    setLogout(true);
  };

  return (
    <>
      <button onClick={logoutHandler} className="LogoutBtn">
        Logout
      </button>
	  <hr/>
      <div className="Dashboard">Dashboard</div>
    </>
  );
};

export default Dashboard;