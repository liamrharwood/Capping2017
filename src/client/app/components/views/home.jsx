import React from 'react';
import {render} from 'react-dom';
import { browserHistory } from 'react-router';
import Navbar from '../Navbar.jsx';
import Dashboard from '../Dashboard.jsx';

class Home extends React.Component {

  render () {
    return(
    	<div id="home">
    		<Navbar />
    		<Dashboard />
    	</div>
    	);
  }
}

export default Home;