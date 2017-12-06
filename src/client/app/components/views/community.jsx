import React from 'react';
import {render} from 'react-dom';
import Navbar from '../Navbar.jsx';
import Dashboard from '../Dashboard.jsx';

/**
*TODO
*
*/
class Community extends React.Component {
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
			<div id="community">
				<Navbar 
					communities="active" 
					location={this.props.location.pathname} 
					token={this.props.token} 
					username={this.props.username} 
					unauth={this.props.unauth} 
					uri={this.props.uri} 
					history={this.props.history}
				/>
				<Dashboard 
					location = {this.props.location.pathname}
					postsQueryUri = {`${this.props.uri}/posts`}
					profileQueryUri = {`${this.props.uri}/communities/`}
					communityId = {this.props.match.params.communityId}
					id={this.props.match.params.communityId}
					infoCard="community-profile"
					token={this.props.token} 
					username={this.props.username}
					uri={this.props.uri}
                    unauth={this.props.unauth} 
                    history={this.props.history}
				/>
			</div>
		);
	}
}

export default Community;