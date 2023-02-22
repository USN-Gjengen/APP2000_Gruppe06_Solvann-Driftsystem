import React from 'react';
import { emailValidator, passwordValidator } from '../components/regexValidator';
import {useNavigate} from "react-router-dom"

const Login = () => {
	const navigate = useNavigate()

	const [input, setInput] = React.useState({ email: '', password: '' });

	const [errorMessage, seterrorMessage] = React.useState('');
	const [successMessage, setsuccessMessage] = React.useState('');

	const handleChange = e => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	React.useEffect(()=>{
		if(localStorage.getItem('auth')) navigate('/Prototype')
	})

	const formSubmitter = e => {
		e.preventDefault();
		setsuccessMessage('');
		if (!emailValidator(input.email)) return seterrorMessage('Please enter valid email id');

		if (!passwordValidator(input.password))
			return seterrorMessage(
				'Password should have minimum 8 character with the combination of uppercase, lowercase, numbers and specialcharaters'
			);
		// setsuccessMessage('Successfully Validated');
		if(input.email !== 'admin@a.com' || input.password !== 'Password@1') return seterrorMessage('Invalid email or password');

		navigate('/Prototype')
		localStorage.setItem('auth', true)

	};

	return (
		<div>
			<div>
				<div className="login_container">
					<div className="wrap-login">
						<form className="login-form" onSubmit={formSubmitter}>
							<span className="form-title-login">Login</span>
							
							{errorMessage.length > 0 && <div style={{ marginBottom: '10px', color: 'red' }}>{errorMessage}</div>}
							
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
							<div className="text-right">
								<a href="#">Forgot password?</a>
							</div>
								<button className="form-btn-login">Login</button>
							 {/* <div className="txt1 text-center p-t-54 p-b-20">
								<span>Or Sign Up Using (under maintenance) </span>
							</div>
							<div className="flex-c-m">
								<a href="#" className="login100-social-item bg1">
									<i className="fa fa-facebook" />
								</a>
								<a href="#" className="login100-social-item bg2">
									<i className="fa fa-twitter" />
								</a>
								<a href="#" className="login100-social-item bg3">
									<i className="fa fa-google" />
								
							</div>*/}
						</form>
					</div>
				</div>
			</div>
			<div id="dropDownSelect1" />
		</div>
	);
};

export default Login;