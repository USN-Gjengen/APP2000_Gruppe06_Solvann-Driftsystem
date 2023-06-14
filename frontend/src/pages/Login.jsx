import React from 'react';
import { emailValidator, passwordValidator } from '../components/regexValidator';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css';

const Login = () => {
	const navigate = useNavigate();

	const [input, setInput] = React.useState({ email: '', password: '' });

	const [errorMessage, setErrorMessage] = React.useState('');
	const [successMessage, setSuccessMessage] = React.useState('');

	const handleChange = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	React.useEffect(() => {
		if (localStorage.getItem('auth')) navigate('/Dashboard');
	});

	const formSubmitter = (e) => {
		e.preventDefault();
		setSuccessMessage('');
		if (!emailValidator(input.email)) return setErrorMessage('Please enter a valid email id and/or password');

		if (!passwordValidator(input.password))
			return setErrorMessage(
				'Please enter a valid email id and/or password'
			);

		if (input.email !== 'admin@a.com' || input.password !== 'Password@1')
			return setErrorMessage('Invalid email or password');

		navigate('/Dashboard');
		localStorage.setItem('auth', true);
	};

	return (
		<div>
			<div>
				<div className="login_container">
					<div className="wrap-login">
						<div className="title-container">
							<span className="form-title-login">SOLVANN DRIFTSYSTEM</span>
						</div>
						<form className="login-form" onSubmit={formSubmitter}>
							{errorMessage.length > 0 && (
								<div style={{ marginBottom: '10px', color: 'red' }}>{errorMessage}</div>
							)}

							{successMessage.length > 0 && (
								<div style={{ marginBottom: '10px', color: 'green' }}>{successMessage}</div>
							)}

							<div className="wrap-input" data-validate="email is required">
								<span className="label-input">Email</span>
								<input
									className="input"
									type="text"
									name="email"
									placeholder="Type your username"
									onChange={handleChange}
								/>
							</div>
							<div className="wrap-input" data-validate="Password is required">
								<span className="label-input">Password</span>
								<input
									className="input"
									type="password"
									name="password"
									placeholder="Type your password"
									onChange={handleChange}
								/>
							</div>
							<button className="form-btn-login">Login</button>
						</form>
					</div>
				</div>
			</div>
			<div id="dropDownSelect1" />
		</div>
	);
};

export default Login;
