import React from 'react';
import {render} from 'react-dom';
import { browserHistory } from 'react-router';
import Navbar from '../Navbar.jsx';
import Dashboard from '../Dashboard.jsx';

class User extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
      
    };

  }

  render () {
    return(
    	<div id="user">
    		<Navbar />
    		<Dashboard 
        profileQueryUri = "http://10.10.7.191:8080/users/profile" 
        postsQueryUri = "http://10.10.7.191:8080/posts" 
        infoCard = "user-profile"/>
    	</div>
    	);
  }
}

export default User;