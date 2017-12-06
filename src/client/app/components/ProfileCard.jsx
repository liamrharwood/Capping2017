import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
	BrowserRouter as Router,
	Route,
	Link }
	from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

/**
*Profile card component
*Used in multiple views (profile, user, home, etc.)
*/
class ProfileCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			profileData: PropTypes.Object,      //JSON of auth'd user's profile data
		};

	this.follow = this.follow.bind(this);
	this.unFollow = this.unFollow.bind(this);
}

	/**
	*Called after component is mounted
	*Triggers re-rendering
	*/
	componentDidMount() {
		this.fetchUserProfile();
	}

	/**
	*Called after update, not called upon initial render
	*
	*@param {Object} prevProps - previous props
	*@param {Object} prevState - previous state
	*/
	componentDidUpdate(prevProps, prevState) {
		if(this.props.location != prevProps.location){
			this.fetchUserProfile();
		}
	}

	/**
	*Acquires the user's profile info
	*updates state with new JSON
	*/
	fetchUserProfile() {
		if(this.props.id){
			axios({
				method:'get',
				url: `${this.props.queryUri}/profile?user_id=${this.props.id}`,
				headers:{
					'Authorization': `HelpingHands ${window.btoa(this.props.username + ":" + this.props.token)}`
				},
				responseType: 'json'
			})
			.then(res => {
				const profileData = res.data;
				this.setState({ profileData });
			}).catch(function (error) {
				if (error.response) {					
				
				}
			});
		} else {
			axios({
				method:'get',
				url: `${this.props.queryUri}/profile`,
				headers:{
					'Authorization': `HelpingHands ${window.btoa(this.props.username + ":" + this.props.token)}`
				},
				responseType: 'json'
			})
			.then(res => {
				const profileData = res.data;
				this.setState({ profileData });
			}).catch(function (error) {
				if (error.response) {
				
				}
			});
		}
	}

	/**
	*Follow button with functionality
	*
	*@return {React Component} - Button w/ functionality
	*/
	renderFollowButton() {
		if(this.props.type=="user-profile" && this.state.profileData.username != this.props.username){
			if(!this.state.profileData.following){
				return (
					<div className="row mt-2">
						<div className= "col-6 offset-3">
							<button 
								type="button" 
								className="btn btn-block btn-info" 
								onClick={this.follow}>Follow
							</button>
						</div>
					</div>
					);
			} else {
				return (
					<div className="row mt-2">
						<div className= "col-6 offset-3">
							<button 
								type="button" 
								className="btn btn-block btn-outline-secondary" 
								onClick={this.unFollow}>Followed
							</button>
						</div>
					</div>)
			}
		} else {
			return null;
		}
	}

	/**
	*Profile picture
	*
	*@return {React Component} - User's profile picture
	*/
	renderProfilePicture(){
		if(this.state.profileData && this.state.profileData.profileImagePath && this.state.profileData.profileImagePath != ""){
			return  (
				<img 
					src={`${this.props.uri.substring(0, this.props.uri.length-5)}/images/${this.state.profileData.profileImagePath}`} 
					className="profile-pic"
				/>);
		} else {
			//return <img src={`http://10.10.7.191/images/nopic.jpg`} className="profile-pic" />
		}
	}

	/**
	*Follows user
	*re-acquires profile info
	*/
	follow(){
		axios({
			method:'put',
			url: `${this.props.queryUri}/follow?user_id=${this.props.id}`,
			headers:{
				'Authorization': `HelpingHands ${window.btoa(this.props.username + ":" + this.props.token)}`
			},
		}).then(res => {
			this.fetchUserProfile();
		}).catch(function (error) {
			if (error.response) {
			
			}
		});
	}

	/**
	*Unfollows user
	*re-acquires profile info
	*/
	unFollow() {
		axios({
			method:'put',
			url: `${this.props.queryUri}/unfollow?user_id=${this.props.id}`,
			headers:{
				'Authorization': `HelpingHands ${window.btoa(this.props.username + ":" + this.props.token)}`
			},
		}).then(res => {
			this.fetchUserProfile();
		}).catch(function (error) {
			if (error.response) {
			
			}
		});
	}

	/**
	*Helper function for render
	*
	*@return {React Component} - Profile card if profile data is received, loading icon otherwise
	*/
	renderProfile(){
		if(this.state.profileData){
			return(
				<div className = "card-body container">
					<div className="row">
						<div className="col-4">
							{this.renderProfilePicture()}
						</div>
						<div className="col-8 container">
							<div className="row">
								{this.state.profileData.firstName}
								&nbsp;
								{this.state.profileData.lastName}
							</div>
							<div className="row">
								<Link 
									to={`/users/${this.props.userId}`} 
									className="text-muted">
									@{this.state.profileData.username}
								</Link>
							</div>
						</div>
					</div>

					{this.renderFollowButton()}

					<div className="row mt-4">
						<div className="col-4">
							<a 
								className="follower-count" 
								href="#">
								Prayers
								<br/>
								{this.state.profileData.postCount}
							</a>
						</div>
						<div className="col-4">
							<a 
								className="follower-count" 
								href="#">
								Followers
								<br/>
								{this.state.profileData.followersCount}
							</a>
						</div>
						<div className="col-4">
							<a 
								className="follower-count" 
								href="#">
								Following
								<br/>
								{this.state.profileData.followedUsersCount}
							</a>
						</div>
					</div>
					<div className="row mt-4">
						<div className="col-4 text-center offset-1 score-box p-1">
							{this.state.profileData.prayPoints}
							<i className="em em-pray ml-4"></i>
						</div>
						<div className="col-4 text-center offset-2 score-box p-1">
							{this.state.profileData.answeredPoints}
							<i className="em em-angel ml-4"></i>
						</div>
					</div>
					<div className="row mt-2">
						<div className="col-4 text-center offset-1 score-box p-1">
							{this.state.profileData.reportPoints}
							<i className="em em-hammer_and_pick ml-4"></i>
						</div>
						<div className="col-4 text-center offset-2 score-box p-1">
							{this.state.profileData.upvotePoints}
							<i className="em em---1 ml-4"></i>
						</div>
					</div>
					<div className="row mt-2">
						<div className="col-10 offset-1 text-center score-box p-1">
							Reputation: {this.state.profileData.overallReputationPoints}
						</div>
					</div>
					<div className="row mt-4">
						<div className="col-12">
							{this.state.profileData.bio}
						</div>
					</div>
				</div>
				);
		} else {
			return (
				<div 
					className="text-center" 
					style={{ 
						paddingTop: "100px", 
						paddingBottom: "100px" 
					}}>
				<PulseLoader 
					loading={true} 
					size={15} 
					margin={"2px"} 
					color={"#633d91"} 
				/>
				</div>
			);
		}
	}

	/**
	*When component is mounted
	*@return {React Component} - profile card (is rendered by helper function)
	*/
	render() {
		return (
			<div className="card profile-card">
				{this.renderProfile()}
			</div>
		);
	}
}

export default ProfileCard;
