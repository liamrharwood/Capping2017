import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class ProfileCard extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	profileData: PropTypes.Object,
    };
  }

  componentDidMount() {
    this.fetchUserProfile();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.location != prevProps.location){
      this.fetchUserProfile();
    }
  }

  fetchUserProfile() {
	axios({
		method:'get',
  		url: this.props.queryUri,
  		auth: {
  			username: 'user1',
  			password: 'password'
  		},
  		responseType: 'json'
	})
      .then(res => {
        const profileData = res.data;
        this.setState({ profileData });
      }).catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  renderProfile(){
  	if(this.state.profileData){
  		return(
  			<div className = "card-body container">
  	 			<div className="row">
  	 				<div className="col-4"><img src={this.state.profileData.profileImg} /></div>
  	 				<div className="col-8">{this.state.profileData.firstName}&nbsp;{this.state.profileData.lastName}</div>
  	 			</div>
  	 			<div className="row">
  	 				<div className="col-4" />
  	 				<div className="col-8"><a className="text-muted" href="#">@{this.state.profileData.username}</a></div>
  	 			</div>
  	 			<div className="row mt-4">
  	 				<div className="col-4"><a className="follower-count" href="#">Prayers <br />{this.state.profileData.postCount} </a></div>
  	 				<div className="col-4"><a className="follower-count" href="#">Followers <br />{this.state.profileData.followersCount} </a></div>
  	 				<div className="col-4"><a className="follower-count" href="#">Following<br />{this.state.profileData.followedUsersCount}</a></div>
  	 			</div>
  	 			<div className="row mt-4">
  	 				<div className="col-12">{this.state.profileData.bio}</div>
  	 			</div>
  	 		</div>
  		);
  	} else {
  		return (<p>Loading</p>);
  	}
  }

  render() {
  	return (
  	 	<div className="card profile-card">
  	 		{this.renderProfile()}
  	 	</div>
  	);
  }
}

export default ProfileCard;
