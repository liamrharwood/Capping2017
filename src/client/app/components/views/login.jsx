import React from 'react';
import {render} from 'react-dom';
import { browserHistory } from 'react-router';
import Navbar from '../Navbar.jsx';
import Dashboard from '../Dashboard.jsx';

class Login extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
      
    };

  }

  render () {
    return(
    	<div id="home" className ="container">
    		<div className = "row mt-5">
          <div className = "offset-1 col-4">
          <h2>Register a New Account</h2>
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" className="form-check-input" />
                  Check me out
                </label>
              </div>
              <button className="btn btn-primary">Submit</button>
          </div>
          <div className = "offset-2 col-4">
            <h2>Log In with an Existing Account</h2>
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" className="form-check-input" />
                  Check me out
                </label>
              </div>
              <button className="btn btn-primary">Submit</button>
          </div>
        </div>
    	</div>
    	);
  }
}

export default Login;