import React from 'react';
import {render} from 'react-dom';
import { browserHistory } from 'react-router';
import Navbar from '../Navbar.jsx';
import Dashboard from '../Dashboard.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class Login extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
      
    };

  }

  render () {
    return(
      <div id="home">
      <nav className="navbar navbar-expand-lg navbar-dark nav-purple">
        <ul className="navbar-nav mr-auto">
         <li className= "nav-item">
          <Link to="/home" className="nav-link"><i className="fa fa-home" aria-hidden="true"></i>&nbsp;&nbsp;Home</Link>
         </li>
        </ul>
     </nav>

    	<div className ="container">
    		<div className = "row mt-5">
          <div className = "offset-1 col-4">
          <h2>Register a New Account</h2>
              <div className="form-group">
                <label for="inputFirstName">First Name</label>
                <input type="text" className="form-control" id="inputFirstName" placeholder="Enter First Name" />
              </div>
              <div className="form-group">
                <label for="inputLastName">Last Name</label>
                <input type="text" className="form-control" id="inputLastName" placeholder="Enter First Name" />
              </div>
              <div className="form-group">
                <label for="inputUsername">Your Personal Username</label>
                <div class="input-group" id="inputUsername">
                  <span class="input-group-addon" id="basic-addon1">@</span>
                  <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
              </div>
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="form-group">
                <label for="inputPassword">Password</label>
                <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
              </div>
              <div className="form-group">
                <label for="inputConfirmPassword">Confirm Password</label>
                <input type="passwordConfirm" className="form-control" id="inputConfirmPassword" placeholder="Password" />
              </div>
              <button className="btn btn-primary">Register</button>
          </div>
          <div className = "offset-2 col-4">
            <h2>Log In with an Existing Account</h2>
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="inputLoginEmail" aria-describedby="emailHelp" placeholder="Enter email" />
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="inputLoginPassword" placeholder="Password" />
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" className="form-check-input" />
                  Remember Me
                </label>
              </div>
              <button className="btn btn-primary">Log In</button>
          </div>
        </div>
    	</div>
      </div>
    	);
  }
}

export default Login;