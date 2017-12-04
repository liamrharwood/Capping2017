import React from 'react';
import {render} from 'react-dom';
import { browserHistory } from 'react-router';
import Navbar from '../Navbar.jsx';
import Dashboard from '../Dashboard.jsx';

class NotFound extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
      
    };

  }

  render () {
    return(
    	<div id="home">
    		<Navbar token={this.props.token} username={this.props.username} unauth={this.props.unauth} uri={this.props.uri} history={this.props.history}/>
    		<div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-3">404 - Page not found.</h1>
                <p className="lead">Sorry, the page you are trying to reach doesn't exist.</p>
              </div>
            </div>
    	</div>
    	);
  }
}

export default NotFound;