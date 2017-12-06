import React from 'react';
import {render} from 'react-dom';
import { browserHistory } from 'react-router';
import Navbar from '../Navbar.jsx';
import Dashboard from '../Dashboard.jsx';

/**
*TODO
*
*/
class Home extends React.Component {
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
			<div id="home">
				<Navbar 
					home="active" 
					token={this.props.token} 
					username={this.props.username} 
					unauth={this.props.unauth} 
					uri={this.props.uri}
					history={this.props.history}
				/>
				<Dashboard 
					profileQueryUri ={`${this.props.uri}/users`}
					postsQueryUri = {`${this.props.uri}/posts`}
					infoCard = "home"
					token={this.props.token}
					userId={this.props.userId}
					username={this.props.username}
					uri={this.props.uri}
					unauth={this.props.unauth} 
				/>
			</div>
		);
	}
}

export default Home;