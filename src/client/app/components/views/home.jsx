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
    console.log(this.props);
    return(
    	<div id="home">
    		<Navbar home="active"/>
    		<Dashboard 
                profileQueryUri ="http://10.10.7.191:8080/users"
                postsQueryUri = "http://10.10.7.191:8080/posts"
                infoCard = "home"
            />
    	</div>
    	);
  }
}

export default Home;