import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

const HeaderSection = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [logout, setLogout] = React.useState(false);

	React.useEffect(() => {
		if (!localStorage.getItem("auth")) navigate("/login");
	}, [navigate, logout]);

	const handleGoBack = () => {
		navigate(-1); // Navigate back to the previous page
	};

	const logoutHandler = (e) => {
		e.preventDefault();
		localStorage.removeItem("auth");
		setLogout(true);
	};

	return (
		<div className="Header">
			<div className="nav">
				<div className="left">
					<li>
						{location.pathname !== '/Dashboard' && (
							<button onClick={handleGoBack} className="btn">
								Tilbake
							</button>
						)}
					</li>
				</div>
				<div className="center">
					<h1 onClick={() => navigate('/Dashboard')} style={{ cursor: 'pointer' }}>SOLVANN DRIFTSYSTEM</h1>
				</div>
				<div className="right">
					<li>
						<button onClick={logoutHandler} className="btn">
							Logg ut
						</button>
						<button className="btn">
							Profil
						</button>
					</li>
				</div>
			</div>
		</div>
	);
};

export default HeaderSection;
