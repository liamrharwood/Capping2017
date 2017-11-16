import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch }
from 'react-router-dom';
import Home from './views/home.jsx';
import Community from './views/community.jsx';
import Login from './views/login.jsx';
import User from './views/user.jsx';
import NotFound from './views/404.jsx';

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
				  	<Switch>
				  		<Route exact path="/login" component={Login} />
					  	<Route exact path="/" component={Home}/>
					   	<Route exact path="/home" component={Home}/>
					   	<Route path="/communities/:communityId" component={Community}/>
					   	<Route path="/users/:userId" component={User} />
					   	<Route component={NotFound} />
				   	</Switch>
				  </div>
				</Router>
	    	</div>
	    	);
	}
}

export default App;