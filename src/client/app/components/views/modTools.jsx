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
class ModTools extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			profileData : PropTypes.Object,      //TODO
		};

	}

	/**
	*TODO
	*
	*/
	fetchData(){
		axios({
		method:'get',
			url: `${this.props.uri}/users/profile`,
			headers:{
				'Authorization': `HelpingHands ${window.btoa(this.props.username + ":" + this.props.token)}`
			},
			responseType: 'json'
		}).then(res => {
			ReactDOM.findDOMNode(this.refs.settingsFirstName).value = res.data.firstName;
			ReactDOM.findDOMNode(this.refs.settingsLastName).value = res.data.lastName;
			ReactDOM.findDOMNode(this.refs.settingsUserName).value = res.data.username;
			ReactDOM.findDOMNode(this.refs.settingsEmail).value = "";
			ReactDOM.findDOMNode(this.refs.settingsPassword).value = "";
			ReactDOM.findDOMNode(this.refs.settingsBio).value = res.data.bio;
			document.querySelector("img").src = "http://10.10.7.191/images/" + res.data.profileImagePath;
			this.setState({ profileData });
		}).catch(function (error) {
			if (error.response) {

			}
		});
	}

	/**
	*TODO
	*
	*@return {} -
	*/
	render(){
		return (
			<div id="modTools">
				<Navbar 
					settings="active" 
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

export default ModTools;