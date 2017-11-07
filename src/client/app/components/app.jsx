import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link }
from 'react-router-dom';
import Home from './views/home.jsx';
import Community from './views/community.jsx';
import Login from './views/login.jsx';

class App extends React.Component {

	constructor(props) {
    	super(props);
    	this.state = {
      
    	};

  	}

  	render () {
	    return(
	    	<div>
	    		<Router>
				  <div>
				  	<Route exact path="/" component={Home}/>
				   	<Route exact path="/home" component={Home}/>
				   	<Route path="/communities/:communityId" component={Community}/>
				   	<Route exact path="/login" component={Login} />
				  </div>
				</Router>
	    	</div>
	    	);
	}
}

export default App;