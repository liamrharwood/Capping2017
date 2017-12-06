import React from 'react';
import {render} from 'react-dom';
import { browserHistory } from 'react-router';
import Navbar from '../Navbar.jsx';
import Dashboard from '../Dashboard.jsx';
import {
	BrowserRouter as Router,
	Route,
	Link } 
	from 'react-router-dom';
import ReactDOM from 'react-dom';
import axios from 'axios';

/**
*TODO
*
*/
class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			registerError: -1,     //TODO
			showLogin: true,
		};
		this.authLogin = this.authLogin.bind(this);
		this.redirect = this.redirect.bind(this);
		this.keyPress = this.keyPress.bind(this);
		this.registerButtonClick = this.registerButtonClick.bind(this);
		this.switchToLogin = this.switchToLogin.bind(this);
		this.switchToRegister = this.switchToRegister.bind(this);
	}

	/**
	*TODO
	*
	*/
	authLogin(){
		var username = ReactDOM.findDOMNode(this.refs.loginUsername).value;
		var password = ReactDOM.findDOMNode(this.refs.loginPassword).value;
		var rememberMe = ReactDOM.findDOMNode(this.refs.rememberCheckbox).checked;
		this.props.auth(username,password, rememberMe, this.redirect)
	}

	/**
	*TODO
	*
	*@param {} e -
	*/
	keyPress(e){
		if(e.keyCode == 13){
			this.authLogin();
		}
	}

	switchToLogin(){
		this.setState({ showLogin: true });
	}

	switchToRegister(){
		this.setState({ showLogin: false });
	}

	/**
	*TODO
	*
	*/
	redirect(){
		this.props.history.push('/home');
	}

	/**
	*TODO
	*
	*/
	registerButtonClick(){
		if (ReactDOM.findDOMNode(this.refs.registerFirstName).value.trim() == ""
			|| ReactDOM.findDOMNode(this.refs.registerLastName).value.trim() == ""
			|| ReactDOM.findDOMNode(this.refs.registerUsername).value.trim() == ""
			|| ReactDOM.findDOMNode(this.refs.registerPassword).value.trim() == ""
			|| ReactDOM.findDOMNode(this.refs.registerEmail).value.trim() == ""
			|| ReactDOM.findDOMNode(this.refs.registerBirth).value.trim() == ""
			|| ReactDOM.findDOMNode(this.refs.registerPasswordConfirm).value.trim() == ""){
			this.setState({ registerError: 3 });
		} else if(ReactDOM.findDOMNode(this.refs.registerPassword).value != ReactDOM.findDOMNode(this.refs.registerPasswordConfirm).value){
			this.setState({ registerError: 1 });
		} else {
			this.registerNewUser();
		}
	}

	/**
	*TODO
	*
	*/
	registerNewUser(){
		axios({
			method:'post',
			url: `${this.props.uri}/users/register`,
			data:{
				username: ReactDOM.findDOMNode(this.refs.registerUsername).value,
				password: ReactDOM.findDOMNode(this.refs.registerPassword).value,
				firstName: ReactDOM.findDOMNode(this.refs.registerFirstName).value,
				lastName: ReactDOM.findDOMNode(this.refs.registerLastName).value,
				email: ReactDOM.findDOMNode(this.refs.registerEmail).value,
				birthDate: ReactDOM.findDOMNode(this.refs.registerBirth).value,
			},
		}).then(res => {
			ReactDOM.findDOMNode(this.refs.registerUsername).value = "",
			ReactDOM.findDOMNode(this.refs.registerPassword).value = "",
			ReactDOM.findDOMNode(this.refs.registerPasswordConfirm).value = "",
			ReactDOM.findDOMNode(this.refs.registerFirstName).value = "",
			ReactDOM.findDOMNode(this.refs.registerLastName).value = "",
			ReactDOM.findDOMNode(this.refs.registerEmail).value = "",
			ReactDOM.findDOMNode(this.refs.registerBirth).value = "",
			this.setState({ registerError: 0});
		}).catch((error) => {
			if (error.response) {
				if(error.response.status == 205){
					this.setState({ registerError: 2 });
				}
			}
		});
	}

	/**
	*TODO
	*
	*@param {} props -
	*@return {} -
	*/
	renderLoginErrors(props){
		if(this.props.wrongCreds){
			return (
				<div className="alert alert-danger">
					Wrong Username or Password
				</div>
			);
		} else {
			return;
		}
	}

	/**
	*TODO
	*
	*@return {} -
	*/
	renderRegisterErrors(){
		var re = this.state.registerError;
		switch(re){
			case(-1): 
				return;
				break;
			case(0):
				return( 
					<div className="alert alert-success mt-3">
						Account created successfully! <a className = "alert-link registration-alert-link" onClick={this.switchToLogin} >Click here</a> to log in.
					</div>
				);
				break;
			case(1): 
				return( 
					<div className="alert alert-danger">
						Entered passwords don't match
					</div>
				);
				break;
			case(2): 
				return( 
					<div className="alert alert-danger">
						Sorry, that username is already taken.
					</div>
				);
				break;
			case(3): 
				return( 
					<div className="alert alert-danger">
						Please fill in all required fields.
					</div>
				);
				break;
		}
	}

	/**
	*TODO
	*
	*@return {} -
	*/
	render () {
		
		if(!this.state.showLogin){

			return(
				<div className = "container">
					<div className = "row pt-5 pb-5">
						<div className = "col-10 offset-1 col-sm-8 offset-sm-2 p-0 text-center">
							<h1>Helping Hands</h1>
						</div>
					</div>
					<div className = "row mb-5">
						<div className = "card col-sm-6 offset-sm-3 col-10 offset-1 p-0">
							<div className="card-header">
							    <ul className="nav nav-tabs card-header-tabs">
							      <li className="nav-item">
							        <button type="button" className="nav-link login-link" onClick={this.switchToLogin}>Log In</button>
							      </li>
							      <li className="nav-item">
							        <button type="button" className="nav-link active">Register</button>
							      </li>
							    </ul>
							  </div>
							<div className = "card-body">
								<h2>
									Register a New Account
								</h2>
								
								<div className="form-group">
									<label htmlFor="inputFirstName">
										First Name
										<span style={{ color: 'red' }}>
											*
										</span>
									</label>
									<input 
										type="text" 
										ref="registerFirstName" 
										className="form-control" 
										id="inputFirstName" 
										placeholder="Enter First Name" 
									/>
								</div>
								<div className="form-group">
									<label htmlFor="inputLastName">
										Last Name
										<span style={{ color: 'red' }}>
											*
										</span>
									</label>
									<input 
										type="text" 
										ref="registerLastName" 
										className="form-control" 
										id="inputLastName" 
										placeholder="Enter First Name" 
									/>
								</div>
								<div className="form-group">
									<label htmlFor="inputUsername">
										Your Personal Username
										<span style={{ color: 'red' }}>
											*
										</span>
									</label>
									<div 
										className="input-group" 
										id="inputUsername">
										<span 
											className="input-group-addon" 
											id="basic-addon1">
											@
										</span>
										<input 
											type="text" 
											className="form-control" 
											ref="registerUsername" 
											placeholder="Username" 
											aria-label="Username" 
											aria-describedby="basic-addon1" 
										/>
									</div>
								</div>
								<div className="form-group">
									<label htmlFor="exampleInputEmail1">
										Email address
										<span style={{ color: 'red' }}>
											*
										</span>
									</label>
									<input 
										type="text" 
										className="form-control" 
										ref="registerEmail" 
										id="inputEmail" 
										aria-describedby="emailHelp" 
										placeholder="Enter email" 
									/>
									<small 
										id="emailHelp" 
										className="form-text text-muted">
										We'll never share your email with anyone else.
									</small>
								</div>
								<div className="form-group">
									<label htmlFor="inputPassword">
										Password
										<span style={{ color: 'red' }}>
											*
										</span>
									</label>
									<input 
										type="password" 
										className="form-control" 
										ref="registerPassword" 
										id="inputPassword" 
										placeholder="Password"
									/>
								</div>
								<div className="form-group">
									<label htmlFor="inputConfirmPassword">
										Confirm Password
										<span style={{ color: 'red' }}>
											*
										</span>
									</label>
									<input 
										type="password" 
										className="form-control" 
										ref="registerPasswordConfirm" 
										id="inputConfirmPassword" 
										placeholder="Password" 
									/>
								</div>
								<div className="form-group">
									<label htmlFor="inputBirth">
										Birth Date
										<span style={{ color: 'red' }}>
											*
										</span>
									</label>
									<input 
										type="date" 
										className="form-control" 
										ref="registerBirth" 
										id="inputBirth"
									/>
								</div>
								<button 
									className="btn btn-primary" 
									onClick={this.registerButtonClick}>
									Register
								</button>
								{this.renderRegisterErrors()}
							</div>
						</div>
					</div>
				</div>
				);

			} else {

				return(
				<div className = "container">
					<div className = "row pt-5 pb-5">
						<div className = "col-10 offset-1 col-sm-8 offset-sm-2 p-0 text-center">
							<h1>Helping Hands</h1>
						</div>
					</div>
					<div className = "row">
						<div className = "card col-sm-6 offset-sm-3 col-10 offset-1 p-0">
							<div className="card-header">
							    <ul className="nav nav-tabs card-header-tabs">
							      <li className="nav-item">
							        <button type="button" className="nav-link active">Log In</button>
							      </li>
							      <li className="nav-item">
							        <button type="button" className="nav-link login-link" onClick={this.switchToRegister}>Register</button>
							      </li>
							    </ul>
							  </div>
							<div className = "card-body">
								<h2>
									Log In with an Existing Account
								</h2>
								{this.renderLoginErrors()}
								<div className="form-group">
									<label htmlFor="loginUsername">
										Username
									</label>
									<input 
										type="text" 
										ref="loginUsername" 
										className="form-control" 
										id="inputLoginUsername" 
										aria-describedby="emailUsername" 
										onKeyDown={this.keyPress} 
										placeholder="Username" 
									/>
								</div>
								<div className="form-group">
									<label 
										className=""
										htmlFor="exampleInputPassword1">
										Password
									</label>
									<input 
										type="password" 
										ref="loginPassword"
										className="form-control" 
										id="inputLoginPassword" 
										onKeyDown={this.keyPress} 
										placeholder="Password" 
									/>
								</div>
								<div className="form-check mt-4">
					                <label className="form-check-label">
						                <input type="checkbox" ref="rememberCheckbox" className="form-check-input" />
						                Remember Me
					                </label>
					            </div>
								<button 
									className="btn btn-primary mt-3" 
									onClick={this.authLogin}>
									Log In
								</button>
								<p className="mt-3">Don't have an account? <a className = "link" onClick={this.switchToRegister}>Register a new account!</a></p>
							</div>
						</div>
					</div>
				</div>

				);

		}
	}
}

export default Login;