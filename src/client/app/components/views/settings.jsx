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
class Settings extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			profileData : PropTypes.Object,      //TODO
		};

		this.uploadProfilePicture = this.uploadProfilePicture.bind(this);
		this.fetchData = this.fetchData.bind(this);
		this.foo = this.foo.bind(this);
	}

	foo() {
		console.log(this.state);
	}

	/**
	*TODO
	*
	*/
	componentDidMount(){
		this.fetchData();
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.state.profileData == prevState.profileData){
			this.fetchPostCards();
		}
	}

	uploadProfilePicture(){
		const data = new FormData();
		const imageData = document.querySelector('#imageFile').files[0];
		const fileName = document.querySelector('#imageFile').value.replace("C:\\fakepath\\", "");

		data.append('file', imageData);
		data.append('fileName', fileName);

		axios({
		method:'post',
			url: `${this.props.uri}/users/images`,
			headers:{
				'Authorization': `HelpingHands ${window.btoa(this.props.username + ":" + this.props.token)}`
			},
			responseType: 'json',
			data: data
		}).then(res => {
			console.log(res);
			this.fetchData();
		}).catch(function (error) {
			if (error.response) {
				console.log(error);
			}
		});
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
			document.querySelector("img").src = "images/" + res.data.profileImagePath;
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
			<div id="settings">
				<Navbar 
					settings="active" 
					token={this.props.token} 
					username={this.props.username} 
					unauth={this.props.unauth} 
					uri={this.props.uri}
					history={this.props.history}
				/>
				<div className ="container dashboard">
					<div className ="row">
						<div className= "offset-1 col-10">
							<h2>
								Change Your Settings
							</h2>
						</div>
					</div>
					<div className = "row">
						<div className = "offset-1 col-sm-4 col-10">
							<div className="form-group">
								<label htmlFor="settingsFirstName">
									First Name
								</label>
								<input 
									type="text" 
									className="form-control" 
									ref="settingsFirstName" 
									id="settingsFirstName" 
									aria-describedby="First Name" 
									placeholder="First Name"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="settingsLastName">
									Last Name
								</label>
								<input 
									type="text" 
									className="form-control" 
									ref="settingsLastName" 
									id="settingsLastName" 
									aria-describedby="Last Name" 
									placeholder="Last Name"
								/>
							</div>
						</div>
						<div className = "offset-1 col-sm-4 col-10">
							<div className="form-group">
								<label htmlFor="settingsUserName">
									Username
								</label>
								<input 
									type="text" 
									className="form-control" 
									ref="settingsUserName" 
									id="settingsUserName" 
									aria-describedby="Username" 
									placeholder="Username"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="settingsEmail">
									Email Address
								</label>
								<input 
									type="text" 
									className="form-control" 
									ref="settingsEmail" 
									id="settingsEmail" 
									aria-describedby="Email" 
									placeholder="Email"
								/>
							</div>
						</div>
					</div>
					<div className = "row">
						<div className = "offset-1 col-9">
							<div className="form-group">
								<label htmlFor="settingsBio">
									Bio
								</label>
								<textarea 
									name="Text1" 
									cols="40" 
									rows="5" 
									type="text" 
									className="form-control" 
									ref="settingsBio" 
									id="settingsBio" 
									aria-describedby="Bio" 
									placeholder="Bio"
								/>
							</div>
						</div>
					</div>
					<div className = "row">
						<div className = "offset-1 col-3">
							<button className="btn btn-primary" /*onClick={this.saveAccountChanges}*/ >Save Changes</button>
						</div>
					</div>
					<div className = "row mb-5">
						<div className = "offset-1 col-9">
							<h2 onClick={this.foo} className= "mt-5">
								Change Your Profile Picture
							</h2>
							<h3>
								Image must be square and be less than 5MB.
							</h3>
						</div>
						<div className="form-group">
								<img 
									src=""
									ref="settingProfilePic"
									class="profile-pic"
								/>
     							<input 
     								id="imageFile"
     								type="file" 
     								name="file"
     							/>
     							<input 
     								type="submit" 
     								value="Upload"
     								onClick={this.uploadProfilePicture}
     							/>
						</div>					
					</div>
					<div className = "row mb-5">
						<div className = "offset-1 col-9">
							<h2 className= "mt-5">
								Change Your Password
							</h2>
							<div className="form-group">
								<label htmlFor="settingsPassword">
									Password
								</label>
								<input 
									type="password" 
									className="form-control" 
									ref="settingsPassword" 
									id="settingsPassword" 
									aria-describedby="Password" 
									placeholder="Password"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="settingsPasswordConfirm">
									Confirm Password
								</label>
								<input 
									type="password" 
									className="form-control" 
									ref="settingsPasswordConfirm" 
									id="settingsPasswordConfirm" 
									aria-describedby="Re-type Password" 
									placeholder="Re-type Password"
								/>
							</div>
							<button className="btn btn-primary" /*onClick={this.savePasswordChanges}*/ >
								Change Password
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Settings;