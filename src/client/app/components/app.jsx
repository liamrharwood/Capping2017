import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link }
from 'react-router-dom';
import Home from './views/home.jsx';
import Community from './views/community.jsx';


class App extends React.Component {
  render () {
    return(
    	<div>
    		<Router>
			  <div>
			   	<Route exact path="/home" component={Home}/>
			   	<Route path="/community" component={Community}/> 
			  </div>
			</Router>
    	</div>
    	);
  }
}

export default App;