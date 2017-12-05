import React from 'react';
import {render} from 'react-dom';
import { browserHistory } from 'react-router';
import Navbar from '../Navbar.jsx';
import Dashboard from '../Dashboard.jsx';

/**
*TODO
*
*/
class User extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	/**
	*TODO
	*
	*@return {} -
	*/
	render () {
		return(
			<div id="user">
				<Navbar 
					token={this.props.token} 
					username={this.props.username} 
					unauth={this.props.unauth} 
					uri={this.props.uri} 
					history={this.props.history}
				/>
				<Dashboard 
					profileQueryUri = {`${this.props.uri}/users`} 
					postsQueryUri = {`${this.props.uri}/posts`}
					userId = {this.props.match.params.userId}
					id={this.props.match.params.userId}
					infoCard = "user-profile"
					token={this.props.token} 
					username={this.props.username}
					uri={this.props.uri}
				/>

			</div>
		);
	}
}

export default User;