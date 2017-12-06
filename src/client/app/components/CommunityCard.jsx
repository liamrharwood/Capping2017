import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';

/**
*TODO
*
*/
class CommunityCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: PropTypes.Object,  //TODO
		};

		this.renderFollowButton = this.renderFollowButton.bind(this);
		this.follow = this.follow.bind(this);
		this.unFollow = this.unFollow.bind(this);
		this.goToModTools = this.goToModTools.bind(this);
	}

	/**
	*TODO
	*
	*/
	componentDidMount() {
		this.fetchCommunityProfile();
	}

	/**
	*TODO
	*
	*@param {} prevProps-
	*@param {} prevState- 
	*/
	componentDidUpdate(prevProps, prevState) {
		if (this.props.location != prevProps.location){
			this.fetchCommunityProfile();
		}
	}

	/**
	*TODO
	*
	*/
	fetchCommunityProfile() {
		axios({
			method:'get',
			url: `${this.props.queryUri}profile?id=${this.props.id}`,
			headers:{
				'Authorization': `HelpingHands ${window.btoa(this.props.username + ":" + this.props.token)}`
			},
			responseType: 'json'
		}).then(res => {
			const data = res.data;
			this.setState({ data });
		}).catch(function (error) {
			if (error.response) {
			
			}
		});
	}

	goToModTools(){
		this.props.history.push(`/communities/${this.props.id}/mod`)
	}

	/**
	*TODO
	*
	*@return {} -
	*/
	renderFollowButton() {
		if(this.state.data.moderating){

			return (
				<button 
					type="button" 
					className="btn btn-block btn-outline-danger" 
					onClick={this.goToModTools}>
					Mod Tools
				</button>
			);

		} else if(!this.state.data.following){
			return (
				<button 
					type="button" 
					className="btn btn-block btn-info" 
					onClick={this.follow}>
					Follow
				</button>
			);
		} else {
			return (
				<button 
					type="button" 
					className="btn btn-block btn-outline-secondary" 
					onClick={this.unFollow}>
					Followed
				</button>
			);
		} 
	}

	/**
	*TODO
	*
	*/
	follow(){
		axios({
			method:'put',
			url: `${this.props.queryUri}follow?community_id=${this.props.id}`,
			headers:{
				'Authorization': `HelpingHands ${window.btoa(this.props.username + ":" + this.props.token)}`
			},
		}).then(res => {
			this.fetchCommunityProfile();
		}).catch(function (error) {
			if (error.response) {

			}
		});
	}

	/**
	*TODO
	*
	*/
	unFollow() {
		axios({
			method:'put',
			url: `${this.props.queryUri}unfollow?community_id=${this.props.id}`,
			headers:{
				'Authorization': `HelpingHands ${window.btoa(this.props.username + ":" + this.props.token)}`
			},
		}).then(res => {
			this.fetchCommunityProfile();
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
	renderProfile(){
		if(this.state.data){
			return(
				<div className = "card-body container">
					<div className="row">
						<h4 className="col-12 card-title">
							{this.state.data.name}
						</h4>
					</div>
					<div className="row mt-2">
						<div className= "col-6 offset-3">
							{this.renderFollowButton()}
						</div>
					</div>
					<div className="row mt-4">
						<div className="col-6">
							<a 
								className="community-count" 
								href="#">
								Prayers 
								<br/>
								{this.state.data.postCount}
							</a>
						</div>
						<div className="col-6">
							<a 
								className="community-count" 
								href="#">
								Followers 
								<br/>
								{this.state.data.followerCount}
							</a>
						</div>
					</div>
					<div className="row mt-4">
						<div className="col-12">
							{this.state.data.description}
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
	*TODO
	*
	*@return {} -
	*/
	render() {
		return (
			<div className="card profile-card">
				{this.renderProfile()}
			</div>
		);
	}
}

export default CommunityCard;
