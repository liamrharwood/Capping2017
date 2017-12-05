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
			status: 0,
			errorMessage: PropTypes.string,
		};

		this.handleCommunitySubmit = this.handleCommunitySubmit.bind(this);
	}

	handleCommunitySubmit(){

		var self = this;

		axios({
			method:'post',
			url: `${this.props.uri}/communities`,
			headers:{
				'Authorization': `HelpingHands ${window.btoa(this.props.username + ":" + this.props.token)}`
			},
			data: {
				name: ReactDOM.findDOMNode(this.refs.communityName).value,
				description: ReactDOM.findDOMNode(this.refs.communityDescription).value,
			}
		}).then(res => {	        
			self.setState({ status: 1, errorMessage: null })
		}).catch(function (error) {
			if (error.response) {
				if(error.response.status == 401){
					props.unauth();
				} else {
					self.setState({ status: -1, errorMessage: error.response.data.message });
				}
			}
		});
	}
	
	renderErrors(){
		if(this.state.status == -1){
			return <div className = "alert alert-danger text-center">{this.state.errorMessage}</div>
		} else if (this.state.status == 1){
			return <div className = "alert alert-success text-center">Community created successfully!</div>
		} else {
			return
		}
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

				<div className = "container dashboard">
					<div className = "row">
						<div className = "col-10 offset-1 text-center">
							<h2>Create your own Community!</h2>
						</div>
					</div>
					<div className = "row">
						<div className = "col-8 offset-2 mt-4">
							<div className="form-group">
								<label 
									htmlFor="communityName">
									Community Name
								</label>
								<input 
									type="text" 
									ref="communityName"
									className="form-control" 
									id="communityName"
									placeholder="Community Name" 
								/>
							</div>
							<div className="form-group">
								<label 
									htmlFor="communityDescription">
									Community Description
								</label>
								<textarea
									type="text" 
									ref="communityDescription"
									className="form-control" 
									id="communityDescription"
									placeholder="Community Description"
									rows="5"
								/>
							</div>
						</div>
					</div>
					<div className = "row">
						<div className = "col-sm-6 offset-sm-3 col-10 offset-1">
						{this.renderErrors()}
						</div>
					</div>
					<div className = "row mt-4">
						<div className = "col-10 offset-1 text-center">
							<button 
								type="button" 
								className = "btn btn-primary" 
								onClick = {this.handleCommunitySubmit}
							>Create Community!
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CommunityCreator;