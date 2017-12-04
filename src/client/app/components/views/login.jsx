import React from 'react';
import {render} from 'react-dom';
import { browserHistory } from 'react-router';
import Navbar from '../Navbar.jsx';
import Dashboard from '../Dashboard.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Login extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
      registerError: -1
    };

    this.authLogin = this.authLogin.bind(this);
    this.redirect = this.redirect.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.registerButtonClick = this.registerButtonClick.bind(this)
  }

  authLogin(){
    var username = ReactDOM.findDOMNode(this.refs.loginUsername).value
    var password = ReactDOM.findDOMNode(this.refs.loginPassword).value

    this.props.auth(username,password, this.redirect)

    
  }

  keyPress(e){
    if(e.keyCode == 13){
         this.authLogin();
      }
  }

  redirect(){
    this.props.history.push('/home');
  }

  registerButtonClick(){
    if(ReactDOM.findDOMNode(this.refs.registerPassword).value != ReactDOM.findDOMNode(this.refs.registerPasswordConfirm).value){
      this.setState({ registerError: 1 });
    } else {
      this.registerNewUser();
    }
  }

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
    })
      .then(res => {
        ReactDOM.findDOMNode(this.refs.registerUsername).value = "",
        ReactDOM.findDOMNode(this.refs.registerPassword).value = "",
        ReactDOM.findDOMNode(this.refs.registerPasswordConfirm).value = "",
        ReactDOM.findDOMNode(this.refs.registerFirstName).value = "",
        ReactDOM.findDOMNode(this.refs.registerLastName).value = "",
        ReactDOM.findDOMNode(this.refs.registerEmail).value = "",
        ReactDOM.findDOMNode(this.refs.registerBirth).value = "",
        this.setState({ registerError: 0} )
      }).catch((error) => {
          if (error.response) {
            return;
          }
      });
  }

  renderLoginErrors(props){
    if(this.props.wrongCreds){
      return(<div className="alert alert-danger">Wrong Username or Password</div>);
    } else {
      return;
    }
  }

  renderRegisterErrors(){

    var re = this.state.registerError;
    switch(re){
      case(-1): 
        return  
        break;
      case(0):
        return <div className="alert alert-success">Account created successfully! Please log in to the right.</div>
        break;
      case(1): 
        return <div className="alert alert-danger">Entered passwords don't match</div>
        break;
    }
  }

  render () {
    return(
      <div id="login">
        {/* Basic Non-authed Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark nav-purple">
          <ul className="navbar-nav mr-auto">
           <li className= "nav-item">
            <Link to="/login" className="nav-link">Helping Hands</Link>
           </li>
          </ul>
        </nav>

      	<div className ="container mb-4">
      		<div className = "row mt-5">
            <div className = "offset-1 col-4">
              <h2>Register a New Account</h2>

              {this.renderRegisterErrors()}

              <div className="form-group">
                <label htmlFor="inputFirstName">First Name</label>
                <input type="text" ref="registerFirstName" className="form-control" id="inputFirstName" placeholder="Enter First Name" />
              </div>
              <div className="form-group">
                <label htmlFor="inputLastName">Last Name</label>
                <input type="text" ref="registerLastName" className="form-control" id="inputLastName" placeholder="Enter First Name" />
              </div>
              <div className="form-group">
                <label htmlFor="inputUsername">Your Personal Username</label>
                <div className="input-group" id="inputUsername">
                  <span className="input-group-addon" id="basic-addon1">@</span>
                  <input type="text" className="form-control" ref="registerUsername" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="text" className="form-control" ref="registerEmail" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="form-group">
                <label htmlFor="inputPassword">Password</label>
                <input type="password" className="form-control" ref="registerPassword" id="inputPassword" placeholder="Password" />
              </div>
              <div className="form-group">
                <label htmlFor="inputConfirmPassword">Confirm Password</label>
                <input type="password" className="form-control" ref="registerPasswordConfirm" id="inputConfirmPassword" placeholder="Password" />
              </div>
              <div className="form-group">
                <label htmlFor="inputBirth">Birth Date</label>
                <input type="date" className="form-control" ref="registerBirth" id="inputBirth" />
              </div>
              <button className="btn btn-primary" onClick={this.registerButtonClick} >Register</button>
            </div>
          
            <div className = "offset-2 col-4">
            <h2>Log In with an Existing Account</h2>

            {this.renderLoginErrors()}

              <div className="form-group">
                <label htmlFor="loginUsername">Username</label>
                <input type="text" ref="loginUsername" className="form-control" id="inputLoginUsername" aria-describedby="emailUsername" onKeyDown={this.keyPress} placeholder="Username" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" ref="loginPassword"className="form-control" id="inputLoginPassword" onKeyDown={this.keyPress} placeholder="Password" />
              </div>

              

              <button className="btn btn-primary" onClick={this.authLogin}>Log In</button>
            </div>
          </div>
    	  </div>
      </div>
    	);
  }
}

export default Login;