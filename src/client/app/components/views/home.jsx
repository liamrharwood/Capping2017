import React from 'react';
import {render} from 'react-dom';
import { browserHistory } from 'react-router';
import Navbar from '../Navbar.jsx';
import Dashboard from '../Dashboard.jsx';

class Home extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
      
    };

  }

  render () {
    return(
    	<div id="home">
    		<Navbar home="active"/>
    		<Dashboard queryUri = "http://10.10.7.191:8080/posts"/>
    	</div>
    	);
  }
}

export default Home;