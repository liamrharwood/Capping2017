import React from 'react';
import PropTypes from 'prop-types';
import PostsContainer from '../components/PostsContainer.jsx';
import ProfileCard from '../components/ProfileCard.jsx';
import CommunityCard from '../components/CommunityCard.jsx';

/**
*TODO
*
*/
class Dashboard extends React.Component {
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
	renderInfoCard(){
		switch(this.props.infoCard){
			case ("home"): 
				return (
					<ProfileCard 
						token={this.props.token} 
						username={this.props.username} 
						location = {this.props.location} 
						queryUri={this.props.profileQueryUri} 
						type="home"
						userId={this.props.id}
						uri={this.props.uri}
					/>
				);
			case ("user-profile"): 
				return (
					<ProfileCard 
						token={this.props.token} 
						username={this.props.username} 
						location = {this.props.location} 
						queryUri={this.props.profileQueryUri}
						id={this.props.id} 
						type="user-profile" 
						uri={this.props.uri}
					/>
				);
			case ("community-profile"): 
				return (
					<CommunityCard 
						token={this.props.token} 
						username={this.props.username} 
						location = {this.props.location} 
						queryUri = {this.props.profileQueryUri} 
						id={this.props.id} 
						type = "community-profile" 
						uri={this.props.uri}
						history={this.props.history}
					/>
				);
			default: 
				return(
					<p>Bad Profile Prop</p>
				);
		}
	}

	/**
	*TODO
	*
	*@return {} -
	*/
	renderMessage(){
		switch(this.props.infoCard){
			case ("home"): 
				return "What's New: Timeline";
			case ("user-profile"): 
				return "Profile";
			case ("community-profile"): 
				return "What's New: Community";
			default: 
				return "What's New";
		}
	}


	/**
	*TODO
	*
	*@return {} -
	*/
	render() {
		return (
			<div className="container dashboard">
				<h1 className="pl-3 pb-4">
					{this.renderMessage()}
				</h1>
				<div className="row">
					<div className="col-lg-8 col-12">
						<PostsContainer 
							queryUri = {this.props.postsQueryUri} 
							token={this.props.token} 
							username={this.props.username} 
				            communityId={this.props.communityId}
				            userId={this.props.userId} 
							uri={this.props.uri}
							unath={this.props.unath}
						/>
					</div>
					<div className="col-md-4 d-none d-lg-block">
						{this.renderInfoCard()}
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;