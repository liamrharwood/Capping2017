import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import { browserHistory } from 'react-router';
import Navbar from '../Navbar.jsx';
import PropTypes from 'prop-types';
import axios from 'axios';

/**
*TODO
*
*/
class CommunityCreator extends React.Component {
	constructor(props){
		super(props);
		this.state = {
				
		};
	}
	
	/**
	*TODO
	*
	*@return {} -
	*/
	render(){
		return (
			<div id="creator">
				<Navbar 
					communities = "active"
					token={this.props.token} 
					username={this.props.username} 
					unauth={this.props.unauth} 
					uri={this.props.uri}
					history={this.props.history}
				/>
			</div>
		);
	}
}

export default CommunityCreator;