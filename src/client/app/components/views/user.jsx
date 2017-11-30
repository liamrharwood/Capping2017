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
    		<Navbar token={this.props.token} username={this.props.username} unauth={this.props.unauth}/>
    		<Dashboard 
        profileQueryUri = {`http://10.10.7.191:8080/users`} 
        postsQueryUri = {`http://10.10.7.191:8080/posts?user_id=${this.props.match.params.userId}`}
        id={this.props.match.params.userId}
        infoCard = "user-profile"
        token={this.props.token} 
        username={this.props.username}/>
    	</div>
    	);
  }
}

export default User;